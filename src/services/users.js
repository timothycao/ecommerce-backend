const { User } = require('../models/user');

const createUser = async (createBody) => {
    const user = await User.create(createBody);
    return user;
};

const getUsers = async (query) => {
    const users = await User.find(query);
    return users;
};

const getUser = async (id) => {
    const user = await User.findById(id);
    return user;
};

const getUserByEmail = async (email) => {
    const user = await User.findOne({ email });
    return user;
{  }};

const updateUser = async (user, updateBody) => {
    Object.assign(user, updateBody);
    await user.save();
    return user;
};

const deleteUser = async (user) => {
    await user.remove();
    return user;
};

module.exports = {
    createUser,
    getUsers,
    getUser,
    getUserByEmail,
    updateUser,
    deleteUser
};