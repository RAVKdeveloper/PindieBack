import {
  IAddGameToCategory,
  ICreateCategory,
  IRemoveGameToCategoryDto,
  IUpdateCategoryDto,
} from '../../dto'
import { Category } from '../../models/Category.model'
import { Game } from '../../models/Game.model'

import { ApiError } from '../../helpers/Error.utils'

class CategoryService {
  private gameRepo = Game
  private categoryRepo = Category

  public async getAllCategories() {
    const categories = await this.categoryRepo.find()

    return categories
  }

  public async createCategory(dto: ICreateCategory) {
    const category = await this.categoryRepo.create(dto)

    return category
  }

  public async addGameToCategory(dto: IAddGameToCategory, userId: string) {
    const { category, game } = await this.checkNotEmptyGameAndCategory(
      dto.categoryId,
      dto.gameId,
      userId,
    )

    if (game.categories.includes(category._id)) throw new ApiError('Категория уже добавлена', 403)

    const newCategoriesInGame = [...game.categories, category._id]

    const updateGame = await this.gameRepo.updateOne(
      { title: game.title, description: game.description, developer: game.developer },
      { $set: { categories: newCategoriesInGame } },
    )

    return updateGame
  }

  public async removeGameToCategory(dto: IRemoveGameToCategoryDto, userId: string) {
    const { category, game } = await this.checkNotEmptyGameAndCategory(
      dto.categoryId,
      dto.gameId,
      userId,
    )

    if (!game.categories.includes(category._id)) throw new ApiError('Категория уже удалена', 403)

    const newCategories = game.categories.filter(
      id => id.toHexString() !== category._id.toHexString(),
    )

    console.log(newCategories, category._id)

    const updatedGame = await this.gameRepo.updateOne(
      {
        title: game.title,
        developer: game.developer,
        description: game.description,
      },
      { $set: { categories: newCategories } },
    )

    return updatedGame
  }

  public async updateCategory(dto: IUpdateCategoryDto, id: string) {
    const category = await this.categoryRepo.findById(id)

    if (!category) throw new ApiError('Категория не найдена', 404)

    const updatedCategory = await this.categoryRepo.updateOne(
      {
        name: category.name,
      },
      { $set: { name: dto.name } },
    )

    return updatedCategory
  }

  public async deleteCategory(id: string) {
    const category = await this.categoryRepo.findById(id)

    if (!category) throw new ApiError('Категория не найдена', 404)

    await this.categoryRepo.deleteOne({ name: category.name })

    return category
  }

  private async checkNotEmptyGameAndCategory(categoryId: string, gameId: string, userId: any) {
    const game = await this.gameRepo.findById(gameId)
    const category = await this.categoryRepo.findById(categoryId)

    if (!game.users.includes(userId)) throw new ApiError('Доступ запрещен', 403)

    if (!game) throw new ApiError('Игра не найдены', 404)
    if (!category) throw new ApiError('Категория не найдена', 404)

    return { category, game }
  }
}

export default new CategoryService()
