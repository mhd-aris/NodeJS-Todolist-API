import express from "express";
import "dotenv/config";
import { sequelize } from "./models/index.js";
const PORT = process.env.PORT || 3030;

const app = express();

app.use(express.json());

sequelize.sync();

app.listen(PORT, () => {
  console.log(`'Server running on port ${PORT}`);
});
