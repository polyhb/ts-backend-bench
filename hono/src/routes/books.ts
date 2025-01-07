import { Hono } from 'hono';
import { describeRoute } from 'hono-openapi';
import { resolver, validator as vValidator } from 'hono-openapi/typebox';
import { Type } from '@sinclair/typebox';
import { authMiddleware } from '../middlewares/auth';

// With typebox

const responseSchema = Type.Object({
  id: Type.Number(),
  name: Type.String()
});

const querySchema = Type.Object({
  search: Type.String({ description: 'Search query term' })
});

const queryParamSchema = Type.Object({
  test: Type.Number({ description: 'Book ID' })
});

const app = new Hono()
  .use(authMiddleware)
  .get('/', (c) => c.json('list books'))
  .post('/', (c) => c.json('create a book', 201))
  .get('/:id', (c) => c.json(`get ${c.req.param('id')}`))
  .post(
    '/:id',
    describeRoute({
      // Cannot describe query or param ?
      description: 'Update a book using POST',
      summary: 'Update a book',
      responses: {
        200: {
          description: 'Book has been updated',
          content: {
            'text/plain': {
              schema: resolver(responseSchema)
            }
          }
        },
        400: { description: 'Bad request' }
      }
    }),
    vValidator('query', querySchema),
    vValidator('param', queryParamSchema),
    (c) => {
      const query = c.req.valid('query');
      const param = c.req.valid('param');
      const user = c.var.user;
      console.log(query, param, user);
      // No type checking between the openapi schema and the actual request
      return c.json(`update ${c.req.param('id')}`);
    }
  );

export default app;
