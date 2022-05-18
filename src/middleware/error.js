const error = (err, req, res, next) => {
    const { code, message } = err;
    if (err.code) return res.status(code).send(message);
    res.status(500).send('Something went wrong!');
};

module.exports = error;