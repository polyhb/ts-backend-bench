import authors from './routes/authors';
import books from './routes/books';

import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';

import { treaty } from '@elysiajs/eden';

const app = new Elysia()
  .use(
    swagger({
      documentation: {
        info: {
          title: 'Poly Elysia',
          version: '1.0.0'
        }
      },
      path: '/reference'
    })
  )
  .group('/authors', (app) => app.use(authors))
  .group('/books', (app) => app.use(books));

export type App = typeof app;

const client = treaty<App>('localhost:3000');

client
  .authors({ id: 12 })
  .put({ age: 42, name: 'John Doe' })
  .then((res) => console.log(res.data));

app.listen(3000);
