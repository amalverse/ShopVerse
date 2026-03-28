require("dotenv").config({ override: true });
const request = require("supertest");
const app = require("../app");

describe("Auth Route Validation", () => {
  test("POST /api/auth/register with missing data should return 400", async () => {
    const response = await request(app).post("/api/auth/register").send({});
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("errors");
  });

  test("POST /api/auth/register with invalid email and matching password should return 400", async () => {
    const response = await request(app).post("/api/auth/register").send({
      username: "testuser",
      email: "invalid-email",
      password: "123", // too short
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.errors.some(e => e.path === 'email')).toBeTruthy();
    expect(response.body.errors.some(e => e.path === 'password')).toBeTruthy();
  });
});
