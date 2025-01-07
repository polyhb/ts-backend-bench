import { authMiddleware } from '../middlewares/auth';
import Elysia from 'elysia';

const app = new Elysia().use(authMiddleware);

export default app;
