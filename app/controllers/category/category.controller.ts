import type { Request, Response } from 'express'
import { Service } from 'typedi'

import { RequestWithUser } from '../../constants/RequestWithUser.type'
import { StatusRespones } from '../../constants/StatusRes.constant'
import { Controller, Delete, ErrorHandling, Get, Middleware, Post, Put } from '../../decorators'
import {
  AddGameToCategoryDto,
  CreateCategoryDto,
  IdDto,
  RemoveGameToCategoryDto,
  UpdateCategoryDto,
} from '../../dto'
import { CheckAuthGuard } from '../../middlewares'
import { CategoryService } from '../../service'

@Controller('/category')
@Service()
class CategoryController {
  private categoryService = CategoryService

  @Get('/')
  @Middleware(CheckAuthGuard.checkToken)
  @ErrorHandling()
  public async getAllGames(req: Request, res: Response) {
    const categories = await this.categoryService.getAllCategories()

    res.status(200).send({ status: StatusRespones.OK, data: categories, code: 200 })
  }

  @Post('/')
  @Middleware(CheckAuthGuard.checkToken)
  @ErrorHandling()
  public async createCategory(req: Request, res: Response) {
    const body = CreateCategoryDto.parse(req.body)
    const game = await this.categoryService.createCategory(body)

    res.status(200).send({ status: StatusRespones.OK, data: game, code: 201 })
  }

  @Put('/add-game')
  @Middleware(CheckAuthGuard.checkToken)
  @ErrorHandling()
  public async addGameToCategory(req: RequestWithUser, res: Response) {
    const body = AddGameToCategoryDto.parse(req.body)
    const updatedGame = await this.categoryService.addGameToCategory(body, req.user.id)

    res.status(200).send({ status: StatusRespones.OK, data: updatedGame, code: 200 })
  }

  @Put('/remove-game')
  @Middleware(CheckAuthGuard.checkToken)
  @ErrorHandling()
  public async removeGameToCategory(req: RequestWithUser, res: Response) {
    const body = RemoveGameToCategoryDto.parse(req.body)
    const updatedGame = await this.categoryService.removeGameToCategory(body, req.user.id)

    res.status(200).send({ status: StatusRespones.OK, data: updatedGame, code: 200 })
  }

  @Put('/:id')
  @Middleware(CheckAuthGuard.checkToken)
  @ErrorHandling()
  public async updateCategory(req: Request, res: Response) {
    const body = UpdateCategoryDto.parse(req.body)
    const updatedCategory = await this.categoryService.updateCategory(body, req.params.id)

    res.status(200).send({ status: StatusRespones.OK, data: updatedCategory, code: 200 })
  }

  @Delete('/:id')
  @Middleware(CheckAuthGuard.checkToken)
  @ErrorHandling()
  public async deleteCategory(req: RequestWithUser, res: Response) {
    const categoryId = IdDto.parse(req.params)
    const deletedCategory = await this.categoryService.deleteCategory(categoryId.id)

    res.status(200).send({ status: StatusRespones.OK, data: deletedCategory, code: 200 })
  }
}

export default new CategoryController()
