const admin = (req, res, next) => {
    if (!req.user.admin) return res.status(403).send('Admin access only');
    next();
};

module.exports = admin;