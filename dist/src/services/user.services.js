import { pool } from "../config/db.js";
import { redis } from "../config/redis.js";
//Here we are doing the write through head to maintian the consistancy Here Problem arise will be Delay
export const createUser = async (user) => {
    const result = await pool.query(`INSERT INTO users(name,email)
         VALUES($1,$2)
         RETURNING *`, [user.name, user.email]);
    const createdUser = result.rows[0];
    const cacheKey = `users:${createdUser.id}`;
    await redis.set(`user:${createdUser.id}`, JSON.stringify(createdUser), { EX: 60 });
    return result.rows[0];
};
export const getUsers = async () => {
    const result = await pool.query(`SELECT * FROM users ORDER BY id`);
    return result.rows;
};
export const getUserById = async (id) => {
    const cachedKey = `user:${id}`;
    console.log(cachedKey);
    let result = await redis.get(cachedKey);
    console.log(result);
    if (!result) {
        const userData = await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);
        if (!userData)
            throw new Error("user is not present");
        const userId = userData.rows[0];
        await redis.set(cachedKey, userId);
        result = userId;
    }
    return result;
};
export const updateUser = async (id, user) => {
    const result = await pool.query(`UPDATE users
         SET name=$1,email=$2
         WHERE id=$3
         RETURNING *`, [user.name, user.email, id]);
    return result.rows[0];
};
export const deleteUser = async (id) => {
    await pool.query(`DELETE FROM users
         WHERE id=$1`, [id]);
    return true;
};
//# sourceMappingURL=user.services.js.map