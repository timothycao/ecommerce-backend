const { User } = require('../models/user');

const createUser = async (createBody) => {
    try {
        const user = await User.create(createBody);
        return user;
    } catch (error) {
        throw { code: 400, message: error.message };
    }
};

const getUsers = async (query) => {
    const users = await User.find(query);
    if (!users.length) throw { code: 404, message: 'No users found' };
    return users;
};

const getUser = async (id) => {
    const user = await User.findById(id);
    if (!user) throw { code: 404, message: 'No user found with the given ID' };
    return user;
};

const getUserByEmail = async (email) => {
    const user = await User.findOne({ email });
    if (!user) throw { code: 404, message: 'No user found with the given email' };
    return user;
};

const updateUser = async (user, updateBody) => {
    try {
        Object.assign(user, updateBody);
        await user.save();
        return user;
    } catch (error) {
        throw { code: 400, message: error.message };
    }
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