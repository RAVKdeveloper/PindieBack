import * as express from 'express'
import * as cors from 'cors'
import * as cookieParser from 'cookie-parser'
import { config } from 'dotenv'

async function bootstrap() {
  try {
    config()

    const app = express()

    app.use(cors())
    app.use(express.json())
    app.use(cookieParser())

    app.listen(5050, () => console.log(`[server]: Listen to 5050 port`))
  } catch (e) {
    console.log(`Initial server error: ${e}`)
  }
}

bootstrap()
