import { Middleware } from 'express-zod-api';

interface User {
  id: number;
  name: string;
}

export const authMiddleware = new Middleware({
  handler: async () => {
    const user: User = { id: 1, name: 'John Doe' };
    return { user }; // provides endpoints with options.user
  }
});
