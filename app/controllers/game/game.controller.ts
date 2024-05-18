import type { Request, Response } from 'express'
import { Service } from 'typedi'

import { Controller, Get, Post, Put, Delete, ErrorHandling, Middleware } from '../../decorators'
import { StatusRespones } from '../../constants/StatusRes.constant'
import { RequestWithUser } from '../../constants/RequestWithUser.type'
import { CheckAuthGuard } from '../../middlewares'
import { GameService } from '../../service'
import { CreateGameDto, UpdateGameDto } from '../../dto'

@Controller('/game')
@Service()
class GameController {
  @Get('/')
  @Middleware(CheckAuthGuard.checkToken)
  @ErrorHandling()
  public async findAllGames(req: Request, res: Response) {
    const games = await GameService.findAllGames()

    res.status(200).send({ status: StatusRespones.OK, data: [...games], code: 200 })
  }

  @Get('/:id')
  @Middleware(CheckAuthGuard.checkToken)
  @ErrorHandling()
  public async findGameById(req: Request, res: Response) {
    const game = await GameService.findGameById(req.params.id)

    res.status(200).send({ status: StatusRespones.OK, game, code: 200 })
  }

  @Post('/')
  @Middleware(CheckAuthGuard.checkToken)
  @ErrorHandling()
  public async createGame(req: RequestWithUser, res: Response) {
    const dto = CreateGameDto.parse(req.body)
    const game = GameService.createGame(dto, req.user.id)

    res.status(201).send({ status: StatusRespones.OK, game, code: 201 })
  }

  @Put('/:id')
  @Middleware(CheckAuthGuard.checkToken)
  @ErrorHandling()
  public async updateGame(req: RequestWithUser, res: Response) {
    const dto = UpdateGameDto.parse(req.body)
    const game = await GameService.updateGame(dto, req.user.id, req.params.id)

    res.status(200).send({ status: StatusRespones.OK, game, code: 200 })
  }

  @Delete('/:id')
  @Middleware(CheckAuthGuard.checkToken)
  @ErrorHandling()
  public async deleteGame(req: Request, res: Response) {
    const game = await GameService.deleteGame(req.params.id)

    res.status(200).send({ status: StatusRespones.OK, deleteGame: game, code: 200 })
  }
}

export default new GameController()
