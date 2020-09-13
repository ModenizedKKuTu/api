import { Router } from 'express'

const router = Router()

/**
 * @swagger
 * tags:
 *  name: Test
 *  description: Swagger test
 */

/**
 * @swagger
 * /test/test:
 *  get:
 *    tags: [Test]
 *    summary: Return 200
 *    produces:
 *    - text/plain
 *    responses:
 *      200:
 *        description: if successfully executed, return "Hello~"
 */
router.get('/test', (_req, res) => {
  res.status(200).send('Hello~').end()
})

export default { name: 'test', router }
