import passport from 'passport'
import Strategy, { IUser } from './Strategy'
import config from '../config'

class FacebookStrategy extends Strategy {
  constructor () {
    super()

    this.vendor = 'facebook'
    this.strategy = require('passport-facebook').Strategy as passport.Strategy

    const clientID = config.oauth.info.facebook?.clientID
    const clientSecret = config.oauth.info.facebook?.clientSecret
    const callbackURL = config.oauth.info.facebook?.callbackURL

    this.strategyConfig = {
      clientID,
      clientSecret,
      callbackURL,
      passReqToCallback: true,
      profileFields: [
        'id',
        'name'
      ]
    }

    this.afterLoginHandler = (profile) => {
      const $p: IUser = {
        authType: 'facebook',
        id: profile.id,
        name: profile.displayName,
        title: profile.displayName,
        image: `https://graph.facebook.com/${profile.id}/picture`
      }

      return $p
    }
  }
}

export default new FacebookStrategy()
