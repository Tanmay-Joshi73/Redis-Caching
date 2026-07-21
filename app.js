import express from "express";
import userRoutes from "./src/routes/user.route.js";
const app = express();
import client from "prom-client"
app.use(express.json());
app.use("/users", userRoutes);
export default app;
