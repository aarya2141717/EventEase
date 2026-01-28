const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const Booking = sequelize.define(
  "Booking",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM("venue", "artist"),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "approved", "rejected", "cancelled"),
      defaultValue: "pending",
    },
    vendorApproval: {
      type: DataTypes.ENUM("pending", "approved", "rejected"),
      defaultValue: "pending",
      allowNull: false,
    },
    adminApproval: {
      type: DataTypes.ENUM("pending", "approved", "rejected"),
      defaultValue: "pending",
      allowNull: false,
    },
    vendorApprovalDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    adminApprovalDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    ownerId: {
      // venue creator (vendor) or artist creator (admin)
      type: DataTypes.UUID,
      allowNull: true,
    },
    itemId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    itemName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactPhone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Venue fields
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    startTime: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    endTime: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    numberOfGuests: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // Artist fields
    eventDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    eventTime: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    numberOfTickets: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    eventType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    specialRequirements: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
    tableName: "bookings",
  }
);

module.exports = Booking;
