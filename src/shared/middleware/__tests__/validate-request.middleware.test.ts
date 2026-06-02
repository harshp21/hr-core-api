import { z } from "zod";
import { validateRequest } from "../validate-request.middleware";

describe("validateRequest", () => {
  it("should validate request body", () => {
    const middleware =
      validateRequest({
        body: z.object({
          firstName: z.string(),
        }),
      });

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

  it("should validate request params", () => {
    const middleware =
      validateRequest({
        params: z.object({
          id: z.string().uuid(),
        }),
      });

    const req = {
      params: {
        id: crypto.randomUUID(),
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

  it("should validate request query", () => {
    const middleware =
      validateRequest({
        query: z.object({
          page: z.string(),
        }),
      });

    const req = {
      query: {
        page: "1",
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