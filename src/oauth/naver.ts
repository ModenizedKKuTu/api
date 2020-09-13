import passport from 'passport'
import Strategy, { IUser } from './Strategy'
import config from '../config'

class NaverStrategy extends Strategy {
  constructor () {
    super()

    this.vendor = 'naver'
    this.strategy = require('passport-naver').Strategy as passport.Strategy

    const clientID = config.oauth.info.naver?.clientID
    const clientSecret = config.oauth.info.naver?.clientSecret
    const callbackURL = config.oauth.info.naver?.callbackURL

    this.strategyConfig = {
      clientID,
      clientSecret,
      callbackURL,
      passReqToCallback: true
    }

    this.afterLoginHandler = (profile) => {
      const $p: IUser = {
        authType: 'naver',
        id: profile.id,
        name: profile.displayName,
        title: profile.displayName,
        image: profile._json.profile_image
      }

      /* 망할 셧다운제
      $p._age = profile._json.age.split('-').map(Number);
      $p._age = { min: ($p._age[0] || 0) - 1, max: $p._age[1] - 1 };
      $p.birth = profile._json.birthday.split('-').map(Number);
      if(MONTH < $p.birth[0] || (MONTH == $p.birth[0] && DATE < $p.birth[1])){
          $p._age.min--;
          $p._age.max--;
      }
      $p.isAjae = Ajae($p.birth, $p._age);
      */
      // $p.sex = profile[0].gender[0];

      return $p
    }
  }
}

export default new NaverStrategy()
