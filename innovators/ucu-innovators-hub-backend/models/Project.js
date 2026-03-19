const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  technologies: {
    type: DataTypes.STRING, // Comma-separated string
  },
  githubLink: {
    type: DataTypes.STRING,
  },
  document: {
    type: DataTypes.STRING, // Path to uploaded PDF
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending',
  },
  faculty: {
    type: DataTypes.STRING,
  },
  department: {
    type: DataTypes.STRING,
  },
  year: {
    type: DataTypes.INTEGER,
  },
  teamMembers: {
    type: DataTypes.STRING, // Comma-separated string
  },
  creatorId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
}, {
  timestamps: true,
});

Project.belongsTo(User, { foreignKey: 'creatorId', as: 'creator' });

module.exports = Project;