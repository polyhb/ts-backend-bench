/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import AutoSwagger from 'adonis-autoswagger'
import openapi from '#config/openapi'

const AuthorsController = () => import('#controllers/authors_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.resource('authors', AuthorsController).only(['update'])

// Returns the OpenAPI file as YAML
router.get('/openapi', async () => {
  return AutoSwagger.default.docs(router.toJSON(), openapi)
})

// Renders the API reference with Scalar
router.get('/reference', async () => {
  return AutoSwagger.default.scalar('/openapi')
})
