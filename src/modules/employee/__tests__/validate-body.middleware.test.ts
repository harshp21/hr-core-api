import { validateBody } from "@shared/middleware/validate-body-middleware";
import z from "zod";

describe("validateBody", () => {
  it("should call next when body is valid", () => {
    const schema = z.object({
      firstName: z.string(),
    });

    const middleware =
      validateBody(schema);

    const req = {
      body: {
        firstName: "John",
      },
    };

    const res = {};

    const next = jest.fn();

    middleware(
      req as any,
      res as any,
      next,
    );

    expect(next).toHaveBeenCalled();
  });
});