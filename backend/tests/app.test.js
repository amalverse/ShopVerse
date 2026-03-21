require("dotenv").config({ override: true });
const request = require("supertest");
const app = require("../app");

describe("Express App Basic Routes", () => {
  test("GET / should return ShopVerse E-commerce Running!", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain("ShopVerse E-commerce Running!");
  });

  test("GET /api-docs should return 200 (Redirecting to Swagger UI)", async () => {
    const response = await request(app).get("/api-docs/");
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain("swagger-ui");
  });
});
