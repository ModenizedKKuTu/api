import { Strategy as PassportStrategy } from 'passport'
import * as Express from 'express'

export interface IUser {
  authType: string
  id: string
  name: string
  title: string
  image: string
}

export function afterLoginHandler (
  profile: any
): IUser {
  return {
    authType: '',
    id: '',
    name: '',
    title: '',
    image: ''
  }
}

export default class Strategy {
  public vendor: string
  public strategy: PassportStrategy
  public strategyConfig: object
  public afterLoginHandler: typeof afterLoginHandler

  constructor () {
    this.vendor = ''
    this.strategy = new PassportStrategy()
    this.strategyConfig = {}
    this.afterLoginHandler = afterLoginHandler
  }
}
