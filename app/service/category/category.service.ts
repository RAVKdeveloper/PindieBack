import { Category } from '../../models/Category.model'
import { ApiError } from '../../helpers/Error.utils'

class CategoryService {
  public async getAllCategories() {
    const categories = await Category.find()

    return categories
  }
}

export default new CategoryService()
