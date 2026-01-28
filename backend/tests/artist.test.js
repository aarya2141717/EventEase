const request = require("supertest");
const app = require("../index.js");

describe("Artist API Tests", () => {

  // Test 1: Get all artists
  it("should get all artists", async () => {
    const res = await request(app)
      .get("/api/artists");

    console.log("STATUS:", res.statusCode);
    console.log("ARTISTS COUNT:", res.body.length);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Test 2: Get specific artist by ID (should fail without valid ID)
  it("should return 404 for non-existent artist", async () => {
    const res = await request(app)
      .get("/api/artists/00000000-0000-0000-0000-000000000000");

    console.log("STATUS:", res.statusCode);
    console.log("BODY:", res.body);

    expect(res.statusCode).toBe(404);
    // Response might be empty object or have message
    expect(typeof res.body).toBe("object");
  });

  // Test 3: Verify artist response structure
  it("should return artists with correct structure", async () => {
    const res = await request(app)
      .get("/api/artists");

    console.log("STATUS:", res.statusCode);

    expect(res.statusCode).toBe(200);
    if (res.body.length > 0) {
      const artist = res.body[0];
      expect(artist).toHaveProperty("id");
      expect(artist).toHaveProperty("name");
    }
  });

});
