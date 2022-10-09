// Startup DB
const { config } = require('dotenv');
const database = require('../db/models');

// Sync Models
database.Incomes.sync({ force: true });
database.Expenses.sync({ force: true });
database.User.sync({ force: true });