import type { Request, Response } from 'express'
import { Service } from 'typedi'

import { RequestWithUser } from '../../constants/RequestWithUser.type'
import { StatusRespones } from '../../constants/StatusRes.constant'
import { Controller, Delete, ErrorHandling, Get, Middleware, Post, Put } from '../../decorators'
import { CreateGameDto, QueryGamesDto, UpdateGameDto } from '../../dto'
import { CheckAuthGuard } from '../../middlewares'
import { GameService } from '../../service'

@Controller('/game')
@Service()
class GameController {
  private gameService = new GameService()

  @Get('/')
  @ErrorHandling()
  public async findAllGames(req: Request, res: Response) {
    const query = QueryGamesDto.parse(req.query)
    const games = await this.gameService.findAllGames(query)

    res.status(200).send({ status: StatusRespones.OK, data: [...games], code: 200 })
  }

  @Get('/:id')
  @ErrorHandling()
  public async findGameById(req: Request, res: Response) {
    const game = await this.gameService.findGameById(req.params.id)

    res.status(200).send({ status: StatusRespones.OK, data: game, code: 200 })
  }

  @Post('/')
  @Middleware(CheckAuthGuard.checkToken)
  @ErrorHandling()
  public async createGame(req: RequestWithUser, res: Response) {
    const dto = CreateGameDto.parse(req.body)
    const game = await this.gameService.createGame(dto, req.user.id)

    res.status(201).send({ status: StatusRespones.OK, data: game, code: 201 })
  }

  @Put('/:id')
  @Middleware(CheckAuthGuard.checkToken)
  @ErrorHandling()
  public async updateGame(req: RequestWithUser, res: Response) {
    const dto = UpdateGameDto.parse(req.body)
    const game = await this.gameService.updateGame(dto, req.user.id, req.params.id)

    res.status(200).send({ status: StatusRespones.OK, data: game, code: 200 })
  }

  @Delete('/:id')
  @Middleware(CheckAuthGuard.checkToken)
  @ErrorHandling()
  public async deleteGame(req: Request, res: Response) {
    const game = await this.gameService.deleteGame(req.params.id)

    res.status(200).send({ status: StatusRespones.OK, data: game, code: 200 })
  }
}

export default new GameController()
