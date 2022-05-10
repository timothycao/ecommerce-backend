const pick = (obj, ...keys) => {
    return Object.fromEntries(
        keys
        .filter(key => key in obj)
        .map(key => [key, obj[key]])
    );
};

module.exports = pick;