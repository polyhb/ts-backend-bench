import { Controller } from "@tsed/di";
import { UseBefore } from "@tsed/platform-middlewares";
import { BodyParams, Context, PathParams } from "@tsed/platform-params";
import { Description, Example, Get, Groups, Put, Returns, Summary } from "@tsed/schema";
import { AuthMiddleware } from "src/middlewares/AuthMiddleware.js";
import { AuthorModel } from "src/models/AuthorModel.js";
import { type User } from "src/models/UserModel.js";

@Controller("/authors")
export class AuthorsController {
  // The returns decorator make scalar bugs !
  // @Returns(200, AuthorModel)
  @Put("/:id")
  @Description("Update an author")
  @Summary("Update an author")
  @UseBefore(AuthMiddleware)
  update(
    @PathParams("id") @Description("Author ID to update") @Example("12") id: string,
    @BodyParams() @Groups("update") author: AuthorModel,
    // Not great because the type does not come from the AuthMiddleware which means that I can put String instead of User and it will work
    // Also, if I forget to put the AuthMiddleware, the user will be undefined but the compiler will not complain
    @Context("auth") user: User
  ) {
    // Returned type is not checked with the @Returns decorator :'(
    return {
      id,
      age: author.age,
      name: user.name
    };
  }
}
