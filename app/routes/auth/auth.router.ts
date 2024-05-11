import { Router } from 'express'

import { AuthController } from '../../controllers'

export const authRouter = Router()

authRouter.post('/registr', AuthController.registr)
