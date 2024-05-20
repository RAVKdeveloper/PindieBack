import type { Response } from 'express'

import type { RequestWithUser } from '../../constants/RequestWithUser.type'
import { StatusRespones } from '../../constants/StatusRes.constant'
import { Controller, Delete, ErrorHandling, Middleware, Post, Service } from '../../decorators'
import { CreateVoteDto, RemoveVoteDto } from '../../dto'
import { CheckAuthGuard } from '../../middlewares'
import { VoteService } from '../../service'

@Controller('/vote')
@Service()
class VoteController {
  private voteService: VoteService = new VoteService()

  @Post('/')
  @Middleware(CheckAuthGuard.checkToken)
  @ErrorHandling()
  public async createVote(req: RequestWithUser, res: Response) {
    const body = CreateVoteDto.parse(req.body)
    const gameWithVote = await this.voteService.createVote(body, req.user.id)

    res.status(200).send({ status: StatusRespones.OK, data: gameWithVote, code: 200 })
  }

  @Delete('/:gameId')
  @Middleware(CheckAuthGuard.checkToken)
  @ErrorHandling()
  public async deleteVote(req: RequestWithUser, res: Response) {
    const dto = RemoveVoteDto.parse(req.params)
    const updatedGame = await this.voteService.removeVote(dto, req.user.id)

    res.status(200).send({ status: StatusRespones.OK, data: updatedGame, code: 200 })
  }
}

export default new VoteController()
