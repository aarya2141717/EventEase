const request = require("supertest");
const app = require("../index.js");

describe("Auth API Tests", () => {

  it("should handle invalid login credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "wrong@email.com",
        password: "wrongpassword"
      });

    console.log("STATUS:", res.statusCode);
    console.log("BODY:", res.body);

    // This test checks if response has a message property
    expect(res.body).toHaveProperty("message");

  });

});

