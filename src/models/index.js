import Sequelize from "sequelize";

import getTodoModel from "./todoModel.js";
import getActivityModel from "./activityModel.js";

const sequelize = new Sequelize(
  process.env.MYSQL_DBNAME,
  process.env.MYSQL_USERNAME,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOSTNAME,
    port: process.env.MYSQL_PORT,
    dialect: "mysql",
  }
);

const Todo = getTodoModel(sequelize, Sequelize);
const Activity = getActivityModel(sequelize, Sequelize);

Activity.hasMany(Todo, {
  foreignKey: "activity_group_id",
});
Todo.belongsTo(Activity);

const models = {
  Todo,
  Activity,
};

export { sequelize };
export default models;
