import passport from 'passport'
import Strategy, { IUser } from './Strategy'
import config from '../config'

class TwitterStrategy extends Strategy {
  constructor () {
    super()

    this.vendor = 'twitter'
    this.strategy = require('passport-twitter').Strategy as passport.Strategy

    const consumerKey = config.oauth.info.twitter?.clientID
    const consumerSecret = config.oauth.info.twitter?.clientSecret
    const callbackURL = config.oauth.info.twitter?.callbackURL

    this.strategyConfig = {
      consumerKey,
      consumerSecret,
      callbackURL,
      passReqToCallback: true
    }

    this.afterLoginHandler = (profile) => {
      const $p: IUser = {
        authType: 'twitter',
        id: profile.id,
        name: profile.displayName,
        title: profile.displayName,
        image: profile.photos[0].value
      }

      return $p
    }
  }
}

export default new TwitterStrategy()
