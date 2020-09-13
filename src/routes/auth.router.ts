import Express, { Router } from 'express'
import passport from 'passport'
import config from '../config'
import * as oauth from '../oauth'
import { afterLoginHandler, IUser } from '../oauth/Strategy'

const router = Router()

passport.serializeUser((_user, done) => {
  done(null, {})
})

passport.deserializeUser((_user, done) => {
  done(null, {})
})

// passport auth configure
const configurePassport = (configure: { vendor: string, Strategy: any, StrategyConfig: object, afterLoginHandler: typeof afterLoginHandler }) => {
  const { vendor, Strategy, StrategyConfig } = configure
  const option = {
    successRedirect: '/login/loginsuccess',
    failureRedirect: '/login/loginfail'
  }

  router.get(`/${vendor}`, passport.authenticate(vendor))
  router.get(`/${vendor}/callback`, passport.authenticate(vendor, option))

  passport.use(new Strategy(StrategyConfig, (req: Express.Request, accessToken: string, refreshToken: string, profile: IUser, done: Function) => {
    oauth.LoginHandler(req, accessToken, refreshToken, afterLoginHandler(profile), done)
  }))
}

for (const i in config.oauth.info) {
  if (!oauth.vendors[i]) {
    throw Error(`${i} vendor isan't defined!`)
  } else {
    configurePassport({
      vendor: i,
      Strategy: oauth.vendors[i].strategy,
      StrategyConfig: oauth.vendors[i].strategyConfig,
      afterLoginHandler: oauth.vendors[i].afterLoginHandler
    })
  }
}

// oauth success
router.get('/loginsuccess', (_req, res) => {
  res.status(200)
  res.jsonp('oauth success')
  res.end()
})

router.get('/loginfail', (_req, res) => {
  res.status(400)
  res.jsonp('oauth error')
  res.end()
})

export default { name: 'login', router }
