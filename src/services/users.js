const { User } = require('../models/user');

const createUser = async (createBody) => {
    const user = await User.create(createBody);
    return user;
};

const getUsers = async () => {
    const users = await User.find();
    return users;
};

const getUser = async (id) => {
    const user = await User.findById(id);
    return user;
};

const updateUser = async (id, updateBody) => {
    const user = await getUser(id);
    Object.assign(user, updateBody);
    await user.save();
    return user;
};

const deleteUser = async (id) => {
    const user = await getUser(id);
    await user.remove();
    return user;
};

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
};