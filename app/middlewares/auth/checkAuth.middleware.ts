import type { Response, NextFunction } from 'express'
import type { RequestWithUser } from '../../constants/RequestWithUser.type'

import { TokensService } from '../../service'
import { ErrorHandling } from '../../decorators'
import { ApiError } from '../../helpers/Error.utils'

class CheckAuthGuard {
  @ErrorHandling()
  public async checkToken(req: RequestWithUser, res: Response, next: NextFunction) {
    if (req.method === 'OPTIONS') {
      next()
      return
    }

    const token = req.cookies[process.env.NAME_TOKEN]

    if (!token) throw new ApiError('Нет токена', 401)

    const payload = TokensService.validateToken(token)

    req.user = payload

    next()
    return
  }
}

export default new CheckAuthGuard()
