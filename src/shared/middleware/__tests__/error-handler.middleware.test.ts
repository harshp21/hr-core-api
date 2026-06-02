import { NotFoundError } from "@shared/errors/app.error";
import { errorHandler } from "../error-handler.middleware";

describe("errorHandler", () => {
  it("should return 404 for NotFoundError", () => {
    const error = new NotFoundError(
      "EMPLOYEE_NOT_FOUND",
      "Employee not found",
    );

    const req = {};

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    errorHandler(
      error,
      req as any,
      res as any,
      next,
    );

    expect(res.status)
      .toHaveBeenCalledWith(404);

    expect(res.json)
      .toHaveBeenCalledWith({
        code: "EMPLOYEE_NOT_FOUND",
        message: "Employee not found",
      });
  });
});