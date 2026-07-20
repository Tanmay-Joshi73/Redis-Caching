import * as service from "../services/user.services.js";
export const createUser = async (req, res) => {
    const user = await service.createUser(req.body);
    res.status(201).json(user);
};
export const getUsers = async (req, res) => {
    const users = await service.getUsers();
    res.json(users);
};
export const getUser = async (req, res) => {
    const user = await service.getUserById(Number(req.params.id));
    if (!user)
        return res.status(404).json({
            message: "User not found"
        });
    res.json(user);
};
export const updateUser = async (req, res) => {
    const user = await service.updateUser(Number(req.params.id), req.body);
    res.json(user);
};
export const deleteUser = async (req, res) => {
    await service.deleteUser(Number(req.params.id));
    res.json({
        message: "User deleted successfully"
    });
};
//# sourceMappingURL=user.controller.js.map