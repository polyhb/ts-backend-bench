import { Middleware, MiddlewareMethods } from "@tsed/platform-middlewares";
import { Context } from "@tsed/platform-params";
import { User } from "src/models/UserModel.js";

@Middleware()
export class AuthMiddleware implements MiddlewareMethods {
  use(@Context() ctx: Context) {
    if (!ctx.has("auth")) {
      const user: User = { id: 1, name: "John Doe" };
      ctx.set("auth", user);
    }
  }
}
