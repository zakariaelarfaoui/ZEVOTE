const asyncWrapper = (cb) => {
    return async (req, res, next) => {
    try {
        await cb(req, res, next);
    } catch (error) {
        next(error);
    }
}
}

export default asyncWrapper