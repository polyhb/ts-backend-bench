import { defaultEndpointsFactory } from 'express-zod-api';

import { z } from 'zod';
import { authMiddleware } from '../middlewares/auth';

const authorsEndpoint = defaultEndpointsFactory.addMiddleware(authMiddleware).build({
  // method: "get" (default) or array ["get", "post", ...]
  method: 'put',
  input: z.object({
    id: z.string().describe('The ID of the author').min(1).example('12'),
    age: z.number().describe('The age of the author').example(32)
  }),
  output: z.object({
    id: z.string().describe('The ID of the author').example('12'),
    name: z.string().describe('The name of the author').example('John Doe'),
    age: z.number().describe('The age of the author').example(42)
  }),
  shortDescription: 'Update an author',
  description: 'Update an author in the library by providing a name and an age',
  handler: async ({ input: { id, age }, options }) => {
    // options.user is defined by the authMiddleware
    return {
      id: id, // Comes from params
      name: options.user.name,
      age: age // Comes from body
    };
  }
});

export default authorsEndpoint;
