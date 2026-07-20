import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

export const redis = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT)
    }
});

redis.on("error", (err) => {
    console.log("Redis Error", err);
});

(async () => {
    await redis.connect();
    console.log("Redis Connected");
})();