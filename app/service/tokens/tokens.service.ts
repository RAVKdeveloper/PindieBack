import * as jwt from 'jsonwebtoken'

import type { GenerateTokenDto } from '../../dto'

class TokenService {
  private expiresTokenInSeconds = Number(process.env.ACCESS_TOKEN_LIFE_TIME ?? 7) * 24 * 60 * 60

  public generateToken(dto: GenerateTokenDto) {
    const payload = jwt.sign(dto, process.env.SECRET, {
      expiresIn: this.expiresTokenInSeconds,
    })

    return payload
  }

  public validateToken(token: string) {
    const payload = jwt.verify(token, process.env.SECRET)
    return payload
  }
}

export default new TokenService()
