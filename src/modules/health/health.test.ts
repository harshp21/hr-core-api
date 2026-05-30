import request from "supertest";
import app from "../../app";

describe("Health endpoint", () => {
  it("should return 200 and the expected response", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });

  it("should not include any extra fields", async () => {
    const response = await request(app).get("/health");

    expect(Object.keys(response.body)).toEqual(["status"]);
  });
});
