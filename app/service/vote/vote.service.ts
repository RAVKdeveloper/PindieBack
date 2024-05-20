import { ApiError } from '../../helpers/Error.utils'
import { Game } from '../../models/Game.model'

import { ICreateVoteDto, IRemoveVoteDto } from '../../dto'

export class VoteService {
  private gameRepo = Game

  public async createVote(dto: ICreateVoteDto, userId: string) {
    const { game, includeThisUser } = await this.checkGameIsNotEmpty(dto.gameId, userId)

    if (includeThisUser) throw new ApiError('Голос уже добавлен', 403)

    const newVotesInTheGame = [...game.vote, userId]

    const updatedGame = await this.gameRepo.updateOne(
      {
        title: game.title,
        developer: game.developer,
        description: game.description,
      },
      { $set: { vote: newVotesInTheGame } },
    )

    return updatedGame
  }

  public async removeVote(dto: IRemoveVoteDto, userId: string) {
    const { game, includeThisUser } = await this.checkGameIsNotEmpty(dto.gameId, userId)

    if (!includeThisUser) throw new ApiError('Голос не существует', 404)

    const newVotes = game.vote.filter(user => user.toHexString() !== userId)

    const updatedGame = await this.gameRepo.updateOne(
      {
        title: game.title,
        description: game.description,
        developer: game.developer,
      },
      { $set: { vote: newVotes } },
    )

    return updatedGame
  }

  private async checkGameIsNotEmpty(gameId: string, userId: any) {
    const game = await this.gameRepo.findById(gameId)

    if (!game) throw new ApiError('Игра не найдена', 404)

    if (game.vote.includes(userId)) return { game, includeThisUser: true }

    return { game, includeThisUser: false }
  }
}
