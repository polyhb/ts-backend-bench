import { Service } from "encore.dev/service";
import { middleware } from "encore.dev/api";

interface User {
  id: number;
  name: string;
}

// Authorization middleware that only allows users to make modifications on themselves.
const permissionMiddleware = middleware(
  { target: { auth: true } },
  async (req, next) => {
    const authedUser: User = { id: 1, name: "John Doe" };
    // run the handler
    return await next(req);
  },
);

// Encore will consider this directory and all its subdirectories as part of the "hello" service.
// https://encore.dev/docs/ts/primitives/services
export default new Service("hello", {
  middlewares: [permissionMiddleware],
});
