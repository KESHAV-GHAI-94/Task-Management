const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "taskmanagement",
  "postgres",
  "1234",
  {
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    logging: false,
  }
);

module.exports = sequelize;

require("../models/userModel");
require("../models/tasksModel");
require("../models/commentsModel");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected");
    await sequelize.sync({ alter: true });
    console.log("All tables synced");
  } catch (err) {
    console.error(err);
  }
})();
