const request = require("supertest");
const app = require("../index.js");

describe("Venue API Tests", () => {

  // Test 1: Get all venues
  it("should get all venues", async () => {
    const res = await request(app)
      .get("/api/venues");

    console.log("STATUS:", res.statusCode);
    console.log("VENUES COUNT:", res.body.length);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Test 2: Get specific venue by ID (should fail without valid ID)
  it("should return 404 for non-existent venue", async () => {
    const res = await request(app)
      .get("/api/venues/00000000-0000-0000-0000-000000000000");

    console.log("STATUS:", res.statusCode);
    console.log("BODY:", res.body);

    expect(res.statusCode).toBe(404);
    // Response might be empty object or have message
    expect(typeof res.body).toBe("object");
  });

  // Test 3: Verify venue response structure
  it("should return venues with correct structure", async () => {
    const res = await request(app)
      .get("/api/venues");

    console.log("STATUS:", res.statusCode);

    expect(res.statusCode).toBe(200);
    if (res.body.length > 0) {
      const venue = res.body[0];
      expect(venue).toHaveProperty("id");
      expect(venue).toHaveProperty("name");
      expect(venue).toHaveProperty("location");
    }
  });

  // Test 4: Test filtering by location (if exists)
  it("should handle venue listing without errors", async () => {
    const res = await request(app)
      .get("/api/venues");

    console.log("STATUS:", res.statusCode);
    console.log("RESPONSE TYPE:", typeof res.body);

    expect(res.statusCode).toBe(200);
    expect(typeof res.body).toBe("object");
  });

});
