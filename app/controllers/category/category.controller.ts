import type { Request, Response } from 'express'
import { Service } from 'typedi'

import { ErrorHandling, Controller, Get, Post, Put, Delete, Middleware } from '../../decorators'
import { StatusRespones } from '../../constants/StatusRes.constant'
import { CheckAuthGuard } from '../../middlewares'
import { CategoryService } from '../../service'

@Controller('/category')
@Service()
class CategoryController {
  @Get('/')
  @Middleware(CheckAuthGuard.checkToken)
  @ErrorHandling()
  public async getAllGames(req: Request, res: Response) {
    const categories = await CategoryService.getAllCategories()

    res.status(200).send({ status: StatusRespones.OK, data: categories, code: 200 })
  }
}

export default new CategoryController()
