import type { Request, Response } from 'express'

import { StatusRespones } from '../../constants/StatusRes.constant'
import { ErrorHandling } from '../../decorators'
import { AuthService } from '../../service'
import { RegistrationUserDto } from '../../dto'

class AuthController {
  @ErrorHandling()
  public async registr(req: Request, res: Response) {
    const body = RegistrationUserDto.parse(req.body)

    const { user, token } = await AuthService.registration(body)

    res.cookie(process.env.NAME_TOKEN, token, {
      httpOnly: true,
    })

    res.status(200).send({ status: StatusRespones.OK, user })
  }

  @ErrorHandling()
  public async login(req: Request, res: Response) {}
}

export default new AuthController()
