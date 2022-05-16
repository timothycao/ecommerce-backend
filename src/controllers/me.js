const usersService = require('../services/users');

const getUser = async (req, res) => {
    const user = await usersService.getUser(req.user._id);
    res.send(user);
};

const updateUser = async (req, res) => {
    const { _id, __v, admin, ...updateBody } = req.body;
    const user = await usersService.getUser(req.user._id);
    const updatedUser = await usersService.updateUser(user, updateBody);
    res.send(updatedUser);
};

module.exports = {
    getUser,
    updateUser
};