import request from "supertest";
import app from "../../app";

describe("Health endpoint", () => {
  it("should return ok status", async () => {
    const response = await request(app).get("/api/v1/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        status: "ok",
        timestamp: expect.any(String)
      })
    );
  });
});
