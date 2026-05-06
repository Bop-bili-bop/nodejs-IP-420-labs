const parsePositiveInt = (value, fallback = null) => {
    const parsed = Number.parseInt(value, 10);
    if (Number.isInteger(parsed) && parsed > 0) return parsed;
    return fallback;
}

module.exports = {
    parsePositiveInt
}