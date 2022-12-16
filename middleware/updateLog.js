const updateLog = async (ctx, next) => {
    console.time(`Processing update ${ctx.update.update_id}`);
    await next() // runs next middleware
    // runs after next middleware finishes
    console.timeEnd(`Processing update ${ctx.update.update_id}`);
};

module.exports = { updateLog };