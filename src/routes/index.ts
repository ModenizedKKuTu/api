import { Router } from 'express'
import auth from './auth.router'
import test from './test.router'

export interface IRouter {
  name: String,
  router: Router
}

const routers: IRouter[] = [
  auth,
  test
]

export default routers
