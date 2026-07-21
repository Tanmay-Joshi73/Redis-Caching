import express from "express";
import userRoutes from "./src/routes/user.route.js";
import client from "prom-client";
const register = new client.Registry();
client.collectDefaultMetrics({
    register: register,
    prefix: "node_",
});
const app = express();
app.use(express.json());
app.get('/metrics', async (req, res, next) => {
    res.setHeader("Content-type", register.contentType);
    res.send(await register.metrics());
    next();
});
app.use("/users", userRoutes);
export default app;
//# sourceMappingURL=app.js.map