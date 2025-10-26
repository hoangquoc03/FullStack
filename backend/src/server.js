import express from "express";
import taskRoute from "./route/tasksRouters.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5001;
const app = express();

connectDB();

app.use("/api/tasks", taskRoute);

app.listen(PORT, () => {
  console.log("Server bat dau tren cong {PORT}");
});
