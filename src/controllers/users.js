const service = require('../services/users');

const createUser = async (req, res) => {
    const user = await service.createUser(req.body);
    res.send(user);
};

const getUsers = async (req, res) => {
    const users = await service.getUsers();
    res.send(users);
};

const getUser = async (req, res) => {
    const user = await service.getUser(req.params.id);
    res.send(user);
};

const updateUser = async (req, res) => {
    const user = await service.updateUser(req.params.id, req.body);
    res.send(user);
};

const deleteUser = async (req, res) => {
    const user = await service.deleteUser(req.params.id);
    res.send(user);
};

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
};