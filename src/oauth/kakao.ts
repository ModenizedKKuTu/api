import passport from 'passport'
import Strategy, { IUser } from './Strategy'
import config from '../config'

class KakaoStrategy extends Strategy {
  constructor () {
    super()

    this.vendor = 'kakao'
    this.strategy = require('passport-kakao').Strategy as passport.Strategy

    const clientID = config.oauth.info.kakao?.clientID
    const callbackURL = config.oauth.info.kakao?.callbackURL

    this.strategyConfig = {
      clientID,
      callbackURL,
      passReqToCallback: true
    }

    this.afterLoginHandler = (profile) => {
      const $p: IUser = {
        authType: 'kakao',
        id: profile.id.toString(),
        name: profile.displayName,
        title: profile.displayName,
        image: profile._json.properties.profile_image
      }

      return $p
    }
  }
}

export default new KakaoStrategy()
