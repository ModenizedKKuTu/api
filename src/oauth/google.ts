import passport from 'passport'
import Strategy, { IUser } from './Strategy'
import config from '../config'

class GoogleStrategy extends Strategy {
  constructor () {
    super()

    this.vendor = 'google'
    this.strategy = require('passport-google-oauth2').Strategy as passport.Strategy

    const clientID = config.oauth.info.google?.clientID
    const clientSecret = config.oauth.info.google?.clientSecret
    const callbackURL = config.oauth.info.google?.callbackURL

    this.strategyConfig = {
      clientID,
      clientSecret,
      callbackURL,
      passReqToCallback: true,
      scope: [
        'profile',
        'email'
      ]
    }

    this.afterLoginHandler = (profile) => {
      const $p: IUser = {
        authType: 'google',
        id: profile.id,
        name: profile.name.nickname,
        title: profile.nickname,
        image: profile.photos[0].value
      }

      return $p
    }
  }
}

export default new GoogleStrategy()
