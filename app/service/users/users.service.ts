import * as bcrypt from 'bcrypt'

import { User } from '../../models/User.model'
import { ApiError } from '../../helpers/Error.utils'
import { IUpdateUserDto } from '../../dto'

class UsersService {
  public async findAllUsers() {
    const users = await User.find()

    return users
  }

  public async findUserById(id: string) {
    const user = await User.findById(id)

    if (!user) throw new ApiError('Такой пользователь не существует', 404)

    return user
  }

  public async updateUser(dto: IUpdateUserDto, id: string) {
    const user = await User.findById(id)

    if (!user) throw new ApiError('Такой пользователь не существует', 404)

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(dto.password, salt)

    await User.updateOne(
      { email: user.email, username: user.username },
      { $set: { username: dto.username, password: hashPassword } },
    )

    return user
  }

  public async deleteUser(id: string) {
    const user = await User.findById(id)

    if (!user) throw new ApiError('Такой пользователь не существует', 404)

    await User.deleteOne({ username: user.username, email: user.email })
  }
}

export default new UsersService()
