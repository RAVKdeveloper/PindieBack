import type { Request, Response } from 'express'
import { Service } from 'typedi'

import type { RequestWithUser } from '../../constants/RequestWithUser.type'
import { StatusRespones } from '../../constants/StatusRes.constant'
import { Controller, ErrorHandling, Get, Middleware, Post, Put } from '../../decorators'
import { LoginUserDto, RegistrationUserDto } from '../../dto'
import { CheckAuthGuard } from '../../middlewares'
import { AuthService } from '../../service'

@Controller('/auth')
@Service()
class AuthController {
  @Post('/registration')
  @ErrorHandling()
  public async registr(req: Request, res: Response) {
    const body = RegistrationUserDto.parse(req.body)

    const { user, token } = await AuthService.registration(body)

    res.cookie(process.env.NAME_TOKEN, token, {
      httpOnly: true,
    })

    res.status(200).send({ status: StatusRespones.OK, user })
  }

  @Post('/login')
  @ErrorHandling()
  public async login(req: Request, res: Response) {
    const dto = LoginUserDto.parse(req.body)

    const { user, token } = await AuthService.login(dto)

    res.cookie(process.env.NAME_TOKEN, token, {
      httpOnly: true,
    })

    res.status(200).send({ status: StatusRespones.OK, user })
  }

  @Get('/me')
  @Middleware(CheckAuthGuard.checkToken)
  @ErrorHandling()
  public async me(req: RequestWithUser, res: Response) {
    const user = await AuthService.me(req.user.id)

    res.status(200).send({ status: StatusRespones.OK, user, code: 200 })
  }

  @Put('/logout')
  @Middleware(CheckAuthGuard.checkToken)
  @ErrorHandling()
  public async logout(req: Request, res: Response) {
    await AuthService.logout(res)

    res.status(200).send({ status: StatusRespones.OK, data: 'Delete cookie' })
  }
}

export default new AuthController()
