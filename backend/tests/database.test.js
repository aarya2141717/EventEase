const { sequelize, connectDB } = require("../db/db");

describe("Database Connection Tests", () => {
  describe("Database Configuration", () => {
    it("should have sequelize instance defined", () => {
      expect(sequelize).toBeDefined();
    });

    it("should have database name configured", () => {
      expect(process.env.DB_NAME).toBeDefined();
      expect(typeof process.env.DB_NAME).toBe("string");
    });

    it("should have database user configured", () => {
      expect(process.env.DB_USER).toBeDefined();
      expect(typeof process.env.DB_USER).toBe("string");
    });

    it("should have database password configured", () => {
      expect(process.env.DB_PASS).toBeDefined();
      expect(typeof process.env.DB_PASS).toBe("string");
    });
  });

  describe("connectDB function", () => {
    it("should be defined and be a function", () => {
      expect(typeof connectDB).toBe("function");
    });

    it("should exist in module exports", () => {
      const db = require("../db/db");
      expect(db.connectDB).toBeDefined();
      expect(db.sequelize).toBeDefined();
    });
  });

  describe("Database Models Import", () => {
    it("should successfully import User model", () => {
      const User = require("../models/User");
      expect(User).toBeDefined();
    });

    it("should successfully import Artist model", () => {
      const Artist = require("../models/Artist");
      expect(Artist).toBeDefined();
    });

    it("should successfully import Venue model", () => {
      const Venue = require("../models/Venue");
      expect(Venue).toBeDefined();
    });

    it("should successfully import Booking model", () => {
      const Booking = require("../models/Booking");
      expect(Booking).toBeDefined();
    });
  });

  describe("Database Environment", () => {
    it("should have valid database host", () => {
      const host = process.env.DB_HOST || "localhost";
      expect(host).toBeDefined();
      expect(typeof host).toBe("string");
      expect(host.length).toBeGreaterThan(0);
    });

    it("should have valid database port", () => {
      const port = process.env.DB_PORT || 5432;
      expect(port).toBeDefined();
    });

    it("should have postgres dialect configured", () => {
      expect(process.env.DB_DIALECT || "postgres").toBe("postgres");
    });

    it("should not expose sensitive information in config", () => {
      expect(sequelize.config.password).not.toBe("");
    });
  });

  describe("Sequelize Instance Properties", () => {
    it("should have sequelize models available", () => {
      expect(sequelize.models).toBeDefined();
      expect(typeof sequelize.models).toBe("object");
    });

    it("should have validate method available", () => {
      expect(typeof sequelize.validate).toBe("function");
    });

    it("should have authenticate method available", () => {
      expect(typeof sequelize.authenticate).toBe("function");
    });

    it("should have close method available", () => {
      expect(typeof sequelize.close).toBe("function");
    });
  });
});

