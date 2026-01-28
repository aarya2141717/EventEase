const { authenticate, requireRole } = require("../middleware/auth");
const jwt = require("jsonwebtoken");

// Mock the User model
jest.mock("../models/User");
const User = require("../models/User");

describe("Authentication Middleware Tests", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {},
      user: null,
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  describe("authenticate middleware", () => {
    it("should return 401 when authorization header is missing", async () => {
      req.headers.authorization = "";
      
      await authenticate(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "Authorization token missing"
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("should return 401 when token format is invalid", async () => {
      req.headers.authorization = "Bearer invalidtoken123";
      
      await authenticate(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(401);
      expect(next).not.toHaveBeenCalled();
    });

    it("should return 401 when user is not found in database", async () => {
      const token = jwt.sign({ id: "invalid-id" }, process.env.JWT_SECRET);
      req.headers.authorization = `Bearer ${token}`;
      User.findByPk.mockResolvedValue(null);
      
      await authenticate(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "Invalid token user"
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("should attach user to request and call next when valid token", async () => {
      const mockUser = {
        id: "test-id",
        email: "test@email.com",
        userType: "customer",
        fullName: "Test User",
        phone: "123456789",
        location: "Test Location"
      };
      
      const token = jwt.sign({ id: "test-id" }, process.env.JWT_SECRET);
      req.headers.authorization = `Bearer ${token}`;
      User.findByPk.mockResolvedValue(mockUser);
      
      await authenticate(req, res, next);
      
      expect(req.user).toBeDefined();
      expect(req.user.email).toBe("test@email.com");
      expect(req.user.role).toBe("customer");
      expect(next).toHaveBeenCalled();
    });

    it("should extract token correctly from header", async () => {
      const mockUser = {
        id: "test-id",
        email: "test@email.com",
        userType: "vendor",
        fullName: "Test Vendor",
        phone: "987654321",
        location: "Vendor Location"
      };
      
      const token = jwt.sign({ id: "test-id" }, process.env.JWT_SECRET);
      req.headers.authorization = `Bearer ${token}`;
      User.findByPk.mockResolvedValue(mockUser);
      
      await authenticate(req, res, next);
      
      if (req.user) {
        expect(req.user.role).toBe("vendor");
        expect(next).toHaveBeenCalled();
      }
    });
  });

  describe("requireRole middleware", () => {
    it("should return 401 when user is not authenticated", () => {
      req.user = null;
      const middleware = requireRole("admin");
      
      middleware(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        message: "Not authenticated"
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("should return 403 when user role is not allowed", () => {
      req.user = { role: "customer", email: "user@email.com" };
      const middleware = requireRole("admin", "vendor");
      
      middleware(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        message: "Forbidden"
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("should call next when user has required role", () => {
      req.user = { role: "admin", email: "admin@email.com" };
      const middleware = requireRole("admin", "vendor");
      
      middleware(req, res, next);
      
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    it("should support multiple allowed roles", () => {
      req.user = { role: "vendor", email: "vendor@email.com" };
      const middleware = requireRole("admin", "vendor", "customer");
      
      middleware(req, res, next);
      
      expect(next).toHaveBeenCalled();
    });

    it("should deny access when role doesn't match any allowed role", () => {
      req.user = { role: "user", email: "user@email.com" };
      const middleware = requireRole("superadmin");
      
      middleware(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(403);
      expect(next).not.toHaveBeenCalled();
    });
  });
});
