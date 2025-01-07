import { describe, expect, test } from "vitest";
import { get } from "./hello";

describe("get", () => {
  test("should combine string with parameter value", async () => {
    const resp = await get({ age: 42, id: "12" });
    expect(resp.age).toBe(42);
  });
});
