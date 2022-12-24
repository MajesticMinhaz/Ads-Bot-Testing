const createNewAdsHandler = async (ctx) => { 
    ctx.deleteMessage();
    await ctx.scene.enter('adsNameStage');
};

module.exports = {createNewAdsHandler};