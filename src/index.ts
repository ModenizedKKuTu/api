import log4js from 'log4js'
import express from 'express'
import onFinished from 'on-finished'
import * as bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import session from 'express-session'
import swaggerUI from 'swagger-ui-express'
import swaggerOptions from './swagger-options'
import 'express-async-errors'

import routers, * as routes from './routes'
import config from './config'

const app = express()
const logger = log4js.getLogger()

logger.info('ModenizedKKuTu API server is started')

try {
  if (process.env.NODE_ENV === 'production') {
    logger.level = 'INFO'
  } else if (process.env.NODE_ENV === 'development') {
    logger.level = 'DEBUG'
  } else {
    logger.level = 'DEBUG'
    process.env.NODE_ENV = 'development'
  }
  logger.info(`process.env.NODE_ENV = ${process.env.NODE_ENV}`)

  app.disable('x-powered-by')
  // app.set('trust proxy', '')

  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  app.use(cookieParser())

  app.use(session({
    secret: 'random secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true
    }
  }))

  app.use(passport.initialize())
  app.use(passport.session())

  app.use(cors({ origin: '' }))

  // health monitor
  app.all('/health', (_req, res) => {
    res.status(200).end()
  })

  // logger setup
  app.use((req, res, next) => {
    onFinished(res, (err, response) => {
      if (err) {
        logger.error(err)
      } else {
        const { statusCode } = response
        const { protocol, method, ip, originalUrl } = req
        const message = [
          protocol,
          method,
          statusCode,
          ip.replace('::ffff:', ''),
          originalUrl
        ].join(' ')

        logger.info(message)
      }
    })

    next()
  })

  app.all('/', (_req, res) => {
    res.status(200).send('Hello').end()
  })

  if (process.env.NODE_ENV === 'development') {
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerOptions))
  }

  routers.forEach((value, _idx, _arr) => {
    app.use(`/${value.name}`, value.router)
  })

  app.use((_req, res) => {
    res.status(404).end()
  })

  // error handler
  app.use((err: express.ErrorRequestHandler,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction): void => {
    if (!err) return

    logger.error(err)

    const payload = {
      error: 'Something went wrong. Please contact the administrator.'
    }

    res.status(500)
    res.jsonp(payload)
    res.end()
  })

  /* db.on('error', (err) => {
    logger.error(err)
  }) */

  const port = 8080
  app.listen(port, () => logger.info(`HTTP listening: ${port}`))
} catch (error) {
  logger.error(error)
}
