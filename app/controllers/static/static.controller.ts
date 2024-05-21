import type { Request, Response } from 'express'
import * as path from 'path'

import { Controller, ErrorHandling, Get, Middleware, Service } from '../../decorators'

import { CheckAuthGuard } from '../../middlewares'

@Controller('/dashboard')
@Service()
class StaticController {
  @Get('/')
  @Middleware(CheckAuthGuard.checkToken)
  @ErrorHandling()
  public async sendDashboard(req: Request, res: Response) {
    res.sendFile(path.join(__dirname, '../../../public/admin/dashboard.html'))
  }
}

export default new StaticController()
