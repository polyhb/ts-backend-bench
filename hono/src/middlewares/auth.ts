import { createMiddleware } from 'hono/factory';

interface User {
  id: number;
  name: string;
}

export const authMiddleware = createMiddleware<{
  Variables: {
    user: User;
  };
}>(async (c, next) => {
  const user = { id: 1, name: 'John Doe' };
  c.set('user', user);
  await next();
});
