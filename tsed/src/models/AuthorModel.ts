import { Description, Example, Groups, Property, Required } from "@tsed/schema";

export class AuthorModel {
  @Property()
  @Required()
  @Description("Author's ID")
  @Groups("!update")
  @Example("12")
  id: string;

  @Property()
  @Required()
  @Description("Author's name")
  @Groups("!update")
  @Example("John Doe")
  name: string;

  @Property()
  @Description("Author's age")
  @Required()
  @Example(42)
  age: number;
}
