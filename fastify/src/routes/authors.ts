import { createRoute, z, OpenAPIHono } from '@hono/zod-openapi';
import { authMiddleware } from '../middlewares/auth';

// Zod OpenAPI
const ParamsSchema = z.object({
  id: z
    .string()
    .min(1)
    .openapi({
      param: {
        name: 'id',
        in: 'path'
      },
      example: '1212121',
      description: 'The ID of the user'
    })
});

const UserSchema = z
  .object({
    id: z.string().openapi({
      example: '123'
    }),
    name: z.string().openapi({
      example: 'John Doe'
    }),
    age: z.number().openapi({
      example: 42
    })
  })
  .openapi('User');

const route = createRoute({
  method: 'put',
  path: '/{id}',
  summary: 'Update an author',
  description: 'Update an author ID. This author will be a user in the library.',
  request: {
    params: ParamsSchema,
    body: {
      content: {
        'application/json': {
          schema: z.object({
            age: z.number().openapi({ description: 'The age of the user', example: 42 })
          })
        }
      }
    }
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: UserSchema
        }
      },
      description: 'Retrieve the user'
    }
  },
  // The as const is important, without it the middleware will not type properly the instance
  middleware: [authMiddleware] as const
});

const app = new OpenAPIHono().openapi(route, (c) => {
  const { id } = c.req.valid('param');
  const { age } = c.req.valid('json');

  // The Json is hard typed with the user schema
  return c.json({
    id,
    age: age,
    // User is typed properly
    name: c.var.user.name,
    // This is not part of the schema but still will returned
    test: 'test'
  });
});

export default app;
