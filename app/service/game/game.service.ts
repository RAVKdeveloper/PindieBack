import mongoose from 'mongoose'

import { Game } from '../../models/Game.model'
import { User } from '../../models/User.model'
import { ApiError } from '../../helpers/Error.utils'
import { ICreateGameDto, IUpdateGameDto } from '../../dto'

class GameService {
  public async findAllGames() {
    const games = await Game.find()

    return games
  }

  public async findGameById(id: string) {
    const game = await Game.findById(id)

    if (!game) throw new ApiError('Такой игры не существует', 404)

    return game
  }

  public async createGame(dto: ICreateGameDto, userId: string) {
    const user = await this.checkCreaterUser(userId)
    const isEmptyGame = await Game.findOne({ title: dto.title })

    if (isEmptyGame) throw new ApiError('Такая игра уже существует', 403)

    const newGame = await Game.create({
      ...dto,
      users: [user],
      categories: [],
    })

    return newGame
  }

  public async updateGame(dto: IUpdateGameDto, userId: string, gameId: string) {
    const game = await Game.findById(gameId)

    if (!game) throw new ApiError('Такой игры не существует', 404)

    const validUserId = new mongoose.mongo.ObjectId(userId)

    const isUserCreator = game.users.find(
      user => user._id.toHexString() === validUserId.toHexString(),
    )

    if (!isUserCreator) throw new ApiError('Доступ запрещён', 403)

    const updatedGame = await Game.updateOne(
      { title: game.title, _id: game._id },
      {
        $set: {
          title: dto.title,
          description: dto.description,
          image: dto.image,
          link: dto.link,
        },
      },
    )

    return updatedGame
  }

  public async deleteGame(id: string) {
    const game = await Game.findById(id)

    if (!game) throw new ApiError('Такой игры не существует', 404)

    await Game.deleteOne({ _id: game._id })

    return game
  }

  private async checkCreaterUser(id: string) {
    const user = await User.findById(id)

    if (!user) throw new ApiError('Такой пользователь не существует', 404)

    return user
  }
}

export default new GameService()
