import express from "express";
import userRoutes from "./src/routes/user.route.js";
import { Request,Response,NextFunction } from "express";
import client from "prom-client"
const register=new client.Registry()
client.collectDefaultMetrics({
    register:register,
    prefix:"node_",
    
})
const app = express();

app.use(express.json());
app.get('/metrices',async(req:Request,res:Response,next:NextFunction)=>{
 res.setHeader("Content-type", register.contentType);
  res.send(await register.metrics());
  next();
})
app.use("/users", userRoutes);

export default app;