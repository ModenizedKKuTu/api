import dotenv from 'dotenv'
import { resolve } from 'path'
import logger from './logger'

try {
  dotenv.config({
    path: resolve(__dirname, '../.env')
  })
} catch (error) {
  logger.debug('.env file not find')
}

export interface Config {
  readonly db: {
    readonly database: string
    readonly username: string
    readonly password: string
    readonly host: string
    readonly port: number
  },
  readonly redis: {
    readonly wordDatabase: number
    readonly userDatabase: number
    readonly password: string
    readonly host: string,
    readonly port: number
  },
  readonly jwt: {
    readonly issuer: string
    readonly publkey: string
    readonly privkey: string
    readonly subject: string
    readonly maxAge: string
  },
  readonly server: {
    readonly frontend: string
    readonly game: string[]
    readonly trustproxy: string | undefined
    readonly port: number
  },
  readonly recaptcha: {
    readonly toGuest: boolean
    readonly toUser: boolean
    readonly siteKey: string
    readonly secretKey: string
  },
  readonly oauth: {
    readonly vendors: string
    readonly info: {
      readonly clientID: string
      readonly clientSecret: string
      readonly callbackURL: string
    }[]
  }
}

const config: Config = {
  db: {
    database: process.env.database!,
    username: process.env.dbuser!,
    password: process.env.dbpw!,
    host: process.env.dbhost!,
    port: parseInt(process.env.dbport!, 10) || 3306
  },
  redis: {
    wordDatabase: parseInt(process.env.rworddb!, 10) || 0,
    userDatabase: parseInt(process.env.ruserdb!, 10) || 1,
    password: process.env.rpw || '',
    host: process.env.rhost || '127.0.0.1',
    port: parseInt(process.env.rport!, 10) || 6379
  },
  jwt: {
    issuer: process.env.jwtissuer!,
    publkey: process.env.jwtpublkey!,
    privkey: process.env.jwtprivkey!,
    subject: process.env.subject!,
    maxAge: process.env.jwtmaxage || '7d'
  },
  server: {
    frontend: process.env.frontend!,
    game: process.env.game?.split(/,/m) || [],
    trustproxy: process.env.trustproxy || undefined,
    port: parseInt(process.env.port!, 10) || 8080
  },
  recaptcha: {
    toGuest: Boolean(process.env.captoguest!),
    toUser: Boolean(process.env.captouser!),
    siteKey: process.env.capsitekey!,
    secretKey: process.env.capseckey!
  },
  oauth: {
    vendors: process.env.oauth || '',
    info: []
  }
}

const vendors = config.oauth.vendors.trim().split(/,/m)

vendors.forEach((value, _idx, _arr) => {
  config.oauth.info.push({
    clientID: process.env[`${value}id`]!,
    clientSecret: process.env[`${value}sec`]!,
    callbackURL: process.env[`${value}url`]!
  })
})

export default config
