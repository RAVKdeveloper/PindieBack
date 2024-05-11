import type { Request, Response } from 'express'
import { Service } from 'typedi'

import { Controller, Get, Middleware, ErrorHandling, Put, Delete } from '../../decorators'
import { CheckAuthGuard } from '../../middlewares'
import { UsersService } from '../../service'
import { StatusRespones } from '../../constants/StatusRes.constant'
import { UpdateUserDto } from '../../dto'

@Controller('/users')
@Service()
class UsersController {
  @Get('/')
  @Middleware(CheckAuthGuard.checkToken)
  @ErrorHandling()
  public async findAllUsers(req: Request, res: Response) {
    const users = await UsersService.findAllUsers()

    res.status(200).send({ status: StatusRespones.OK, data: [...users], code: 200 })
  }

  @Get('/:id')
  @Middleware(CheckAuthGuard.checkToken)
  @ErrorHandling()
  public async findUserById(req: Request, res: Response) {
    const user = await UsersService.findUserById(req.params.id)

    res.status(200).send({ status: StatusRespones.OK, user, code: 200 })
  }

  @Put('/:id')
  @Middleware(CheckAuthGuard.checkToken)
  @ErrorHandling()
  public async updateUser(req: Request, res: Response) {
    const dto = UpdateUserDto.parse(req.body)

    const user = await UsersService.updateUser(dto, req.params.id)

    res.status(200).send({ status: StatusRespones.OK, user, code: 200 })
  }

  @Delete('/:id')
  @Middleware(CheckAuthGuard.checkToken)
  @ErrorHandling()
  public async deleteUser(req: Request, res: Response) {
    await UsersService.deleteUser(req.params.id)

    res
      .status(200)
      .send({ status: StatusRespones.OK, message: 'Successful user delete', code: 200 })
  }
}

export default new UsersController()
