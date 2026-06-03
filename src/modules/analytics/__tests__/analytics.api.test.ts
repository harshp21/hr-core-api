import request from "supertest";
import app from "../../../app";

describe("GET /api/v1/analytics/countries", () => {
  it("should return country salary insights", async () => {
    const response = await request(app)
      .get("/api/v1/analytics/countries");

    expect(response.status).toBe(200);
  });
});