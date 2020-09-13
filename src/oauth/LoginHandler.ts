import { jwt } from 'lib'
import config from '../config'
import Express from 'express'
import { IUser } from './Strategy'

const jwtConfig = config.jwt
const JWTBuilder = jwt.default

const JWT = new JWTBuilder({
  issuer: jwtConfig.issuer,
  key: {
    public: jwtConfig.publkey,
    private: jwtConfig.privkey
  },
  subject: jwtConfig.subject,
  maxAge: jwtConfig.maxAge
})

export default async (req: Express.Request, accessToken: string, refreshToken: string, profile: IUser, done: Function) => {
  done(null, profile)
}
