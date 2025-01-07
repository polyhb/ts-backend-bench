import Elysia from 'elysia';

interface User {
  id: number;
  name: string;
}

export const authMiddleware = new Elysia().derive({ as: 'scoped' }, () => {
  const user: User = { id: 1, name: 'John Doe' };
  return { user: user };
});
