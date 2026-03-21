const { sequelize } = require('../config/db');
require('./User');
require('./Project');
require('./Comment');

sequelize.sync({ alter: true }); // Use { force: true } for dev to drop/recreate tables