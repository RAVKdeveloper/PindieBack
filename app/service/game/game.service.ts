import mongoose from 'mongoose'

import { ICreateGameDto, IQueryGamesDto, IUpdateGameDto } from '../../dto'
import { ApiError } from '../../helpers/Error.utils'
import { Game } from '../../models/Game.model'
import { User } from '../../models/User.model'

export class GameService {
  private gameRepo = Game
  private userRepo = User

  public async findAllGames(query: IQueryGamesDto) {
    const games = await this.gameRepo.find().populate('categories').populate('vote')

    if (query.category) {
      const gamesWithCategory = games.filter(game => {
        return game.categories.find(category => category.toString() === query.category)
      })

      return gamesWithCategory
    }

    return games
  }

  public async findGameById(id: string) {
    const game = await this.gameRepo.findById(id).populate('categories').populate('vote')

    if (!game) throw new ApiError('Такой игры не существует', 404)

    return game
  }

  public async createGame(dto: ICreateGameDto, userId: string) {
    const user = await this.checkCreaterUser(userId)
    const isEmptyGame = await this.gameRepo.findOne({ title: dto.title })

    if (isEmptyGame) throw new ApiError('Такая игра уже существует', 403)

    const newGame = await this.gameRepo.create({
      ...dto,
      users: [user],
      categories: dto.categories ?? [],
    })

    return newGame
  }

  public async updateGame(dto: IUpdateGameDto, userId: string, gameId: string) {
    const game = await this.gameRepo.findById(gameId)

    if (!game) throw new ApiError('Такой игры не существует', 404)

    const validUserId = new mongoose.mongo.ObjectId(userId)

    const isUserCreator = game.users.find(
      user => user._id.toHexString() === validUserId.toHexString(),
    )

    if (!isUserCreator) throw new ApiError('Доступ запрещён', 403)

    const updatedGame = await this.gameRepo.updateOne(
      { title: game.title, _id: game._id },
      {
        $set: {
          title: dto.title,
          description: dto.description,
          image: dto.image,
          link: dto.link,
          categories: dto.categories ?? game.categories,
        },
      },
    )

    return updatedGame
  }

  public async deleteGame(id: string) {
    const game = await this.gameRepo.findById(id)

    if (!game) throw new ApiError('Такой игры не существует', 404)

    await this.gameRepo.deleteOne({ _id: game._id })

    return game
  }

  private async checkCreaterUser(id: string) {
    const user = await this.userRepo.findById(id)

    if (!user) throw new ApiError('Такой пользователь не существует', 404)

    return user
  }
}
