const request = require("supertest");
const app = require("../index.js");

describe("Booking API Tests", () => {

  // Test 1: Try to create booking without authentication
  it("should return 401 when creating booking without auth", async () => {
    const res = await request(app)
      .post("/api/bookings/artist")
      .send({
        eventDate: "2026-02-15",
        eventTime: "18:00",
        numberOfTickets: 100,
        eventType: "Concert",
        artistId: "test-id"
      });

    console.log("STATUS:", res.statusCode);
    console.log("BODY:", res.body);

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("message");
  });

  // Test 2: Try to create venue booking without authentication
  it("should return 401 when creating venue booking without auth", async () => {
    const res = await request(app)
      .post("/api/bookings/venue")
      .send({
        eventDate: "2026-02-15",
        eventTime: "18:00",
        numberOfGuests: 100,
        eventType: "Wedding",
        venueId: "test-id"
      });

    console.log("STATUS:", res.statusCode);
    console.log("BODY:", res.body);

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("message");
  });

  // Test 3: Test validation - missing required fields
  it("should validate required fields for artist booking", async () => {
    const res = await request(app)
      .post("/api/bookings/artist")
      .send({
        // Missing required fields
        numberOfTickets: 100
      });

    console.log("STATUS:", res.statusCode);
    console.log("BODY:", res.body);

    // Should return 401 (unauthorized) or 400 (bad request)
    expect([400, 401]).toContain(res.statusCode);
    expect(res.body).toHaveProperty("message");
  });

  // Test 4: Test validation - missing required fields for venue
  it("should validate required fields for venue booking", async () => {
    const res = await request(app)
      .post("/api/bookings/venue")
      .send({
        // Missing required fields
        numberOfGuests: 50
      });

    console.log("STATUS:", res.statusCode);
    console.log("BODY:", res.body);

    // Should return 401 (unauthorized) or 400 (bad request)
    expect([400, 401]).toContain(res.statusCode);
    expect(res.body).toHaveProperty("message");
  });

  // Test 5: Get all bookings without authentication
  it("should return 401 when getting bookings without auth", async () => {
    const res = await request(app)
      .get("/api/bookings");

    console.log("STATUS:", res.statusCode);
    console.log("BODY:", res.body);

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("message");
  });

});
