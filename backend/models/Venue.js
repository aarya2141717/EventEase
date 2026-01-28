const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/db");

const Venue = sequelize.define("Venue", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  images: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  capacity: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  amenities: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rating: {
    type: DataTypes.DECIMAL(3, 1),
    defaultValue: 0,
  },
  reviews: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  createdBy: {
    type: DataTypes.UUID,
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
}, {
  timestamps: true,
  tableName: "venues",
});

module.exports = Venue;
