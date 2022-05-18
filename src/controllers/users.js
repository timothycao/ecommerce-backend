const pick = require('../utils/pick');
const asyncHandler = require('../utils/async');
const service = require('../services/users');

const createUser = asyncHandler(async (req, res) => {
    const user = await service.createUser(req.body);
    res.send(user);
});

const getUsers = asyncHandler(async (req, res) => {
    const query = pick(req.query, 'name', 'email', 'address', 'admin');
    const users = await service.getUsers(query);
    res.send(users);
});

const getUser = asyncHandler(async (req, res) => {
    const user = await service.getUser(req.params.id);
    res.send(user);
});

const updateUser = asyncHandler(async (req, res) => {
    const user = await service.getUser(req.params.id);
    const updatedUser = await service.updateUser(user, req.body);
    res.send(updatedUser);
});

const deleteUser = asyncHandler(async (req, res) => {
    const user = await service.getUser(req.params.id);
    const deletedUser = await service.deleteUser(user);
    res.send(deletedUser);
});

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
};