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

  it("should throw when body is invalid", () => {
    const schema = z.object({
      firstName: z.string(),
    });

    const middleware =
      validateBody(schema);

    const req = {
      body: {},
    };

    const res = {};

    const next = jest.fn();

    expect(() =>
      middleware(
        req as any,
        res as any,
        next,
      ),
    ).toThrow();
  });
});