import swaggerJSDoc from 'swagger-jsdoc'

const definition = {
  info: {
    title: 'ModenizedKKuTu',
    version: require('../package.json').version,
    description: 'MozenizedKKuTu API'
  },
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      in: 'header'
    }
  }
}

const options = {
  definition,
  apis: ['**/src/routes/*.router.ts']
}

export default swaggerJSDoc(options)
