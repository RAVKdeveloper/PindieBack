import * as bcrypt from 'bcrypt'

import { User } from '../../models/User.model'
import { TokensService } from '../'
import { ApiError } from '../../helpers/Error.utils'

import { IRegistrationUserDto, ILoginUserDto } from '../../dto'

class AuthService {
  public async registration(dto: IRegistrationUserDto) {
    const emptyUser = await User.findOne({ email: dto.email })

    if (emptyUser) throw new ApiError('Такой пользователь уже существует', 403)

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(dto.password, salt)

    const newUser = await User.create({ ...dto, password: hashPassword })

    const token = TokensService.generateToken({ id: newUser.id })

    return { user: newUser, token }
  }

  public async login(dto: ILoginUserDto) {
    const user = await this.checkUserCredentials(dto.email, dto.password)

    const token = TokensService.generateToken({ id: user.id })

    return { user, token }
  }

  public async me(id: string) {
    const user = await User.findById(id)

    if (!user) throw new ApiError('Такой пользователь не существует', 404)

    return user
  }

  private async checkUserCredentials(email: string, password: string) {
    const user = await User.findOne({ email })

    if (!user) throw new ApiError('Такой пользователь не существует', 404)

    const passwordsIsEqual = await bcrypt.compare(password, user.password)

    if (!passwordsIsEqual) throw new ApiError('Неверный логин или пароль', 403)

    return user
  }
}

export default new AuthService()
