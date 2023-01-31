import express from "express";
import "dotenv/config";
import models from "./models/index.js";
import { sequelize } from "./models/index.js";
import routes from "./routes/index.js";
const PORT = process.env.PORT || 3030;

const app = express();

// sequelize
//   .authenticate()
//   .then(() => {
//     sequelize.sync();
//     console.log("Connection has been established successfully.");
//   })
//   .catch((err) => {
//     console.error("Unable to connect to the database:", err);
//   });
app.use(express.json());

app.use("/activity-groups", routes.activityGroup);
app.use("/todo-items", routes.todoItem);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
