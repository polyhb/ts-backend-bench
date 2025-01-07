import { updateAuthorValidator } from '#validators/author'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthorsController {
  /**
   * @update
   * @summary Update an author
   * @description Update an author by ID
   * @operationId updateAuthor
   * @responseBody 200 - <Author>
   */
  async update({ request }: HttpContext) {
    // Why not ?
    const payload = await request.validateUsing(updateAuthorValidator)

    return {
      id: payload.params.id,
      age: payload.age,
    }
  }
}
