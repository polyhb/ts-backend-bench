import { authMiddleware } from '../middlewares/auth';
import { Elysia, t } from 'elysia';

const app = new Elysia().use(authMiddleware).put(
  '/:id',
  ({ params, body, user }) => {
    // user object is defined by the authMiddleware
    return {
      id: params.id,
      name: user.name,
      age: body.age
    };
  },
  {
    params: t.Object({
      // Cannot user examples here or it breaks scalar
      id: t.String({ description: 'The ID of the author', minLength: 1 })
    }),
    body: t.Object({
      age: t.Number({ description: 'The age of the author', examples: [32] })
    }),
    response: t.Object(
      {
        id: t.String({ description: 'The ID of the author', examples: ['12'] }),
        name: t.String({ description: 'The name of the author', examples: ['John Doe'] }),
        age: t.Number({ description: 'The age of the author', examples: [42] })
      },
      { description: 'The updated author' }
    ),
    detail: {
      description: 'Update an author in the library by providing a name and an age',
      summary: 'Update an author'
    }
  }
);

export default app;
