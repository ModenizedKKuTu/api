// util
import LoginHandler from './LoginHandler'

// vendor
import facebook from './facebook'
import google from './google'
import kakao from './kakao'
import naver from './naver'
import twitter from './twitter'
import Strategy from './Strategy'

interface IVendors {
  [key: string]: Strategy
}

const vendors: IVendors = {
  facebook,
  google,
  kakao,
  naver,
  twitter
}

export { LoginHandler, vendors }
