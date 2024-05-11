import { Router } from 'express'

import { authRouter } from './auth/auth.router'

export const globalRouter = Router()

globalRouter.use('/auth', authRouter)
