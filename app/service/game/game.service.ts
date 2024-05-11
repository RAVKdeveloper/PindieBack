import { Game } from '../../models/Game.model'
import { User } from '../../models/User.model'
import { ApiError } from '../../helpers/Error.utils'
import { ICreateGameDto } from '../../dto'

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

  private async checkCreaterUser(id: string) {
    const user = await User.findById(id)

    if (!user) throw new ApiError('Такой пользователь не существует', 404)

    return user
  }
}

export default new GameService()
