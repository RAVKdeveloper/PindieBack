import * as express from 'express'
import * as cors from 'cors'
import * as cookieParser from 'cookie-parser'
import { config } from 'dotenv'
import mongoose from 'mongoose'

import './controllers'
import { router } from './decorators/controller/Controller.decorator'

async function bootstrap() {
  try {
    config()

    const app = express()
    const port = process.env.PORT ?? 3005

    app.use(
      cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
        optionsSuccessStatus: 200,
      }),
    )
    app.use(express.json())
    app.use(cookieParser())
    app.use('/api', router)

    await mongoose.connect(process.env.DB_URL)

    app.listen(port, () => console.log(`[server]: Listen to ${port} port`))
  } catch (e) {
    console.log(`Initial server error: ${e}`)
  }
}

bootstrap()
