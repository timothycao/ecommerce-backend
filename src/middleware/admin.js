const admin = (req, res, next) => {
    if (!req.user.admin) throw { code: 403, message: 'Admin is required for access' };
    next();
};

module.exports = admin;