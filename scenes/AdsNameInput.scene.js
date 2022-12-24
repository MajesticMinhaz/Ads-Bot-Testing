const { BaseScene } = require("telegraf/scenes");
const { adsMenu } = require("../keyboards/adsMenu");
const { createOrUpdateAdName } = require("../dbQuery/dbQuerys")

class GetUserAdsNameScene {
    
    getUserAdsName = () => {
        const userAdsNameScene = new BaseScene('adsNameStage');

        userAdsNameScene.enter(async (ctx) => {
            ctx.replyWithHTML(`<b>Enter the Ads Name</b><i>(Only strings are accepted)</i>\n<b>cancel     👉 /cancel</b>`);
        });

        userAdsNameScene.command(['cancel'], async (ctx) => {
            ctx.scene.leave();
            ctx.deleteMessage();
            ctx.replyWithPhoto(
                "https://images.pexels.com/photos/127027/pexels-photo-127027.jpeg?auto=compress&cs=tinysrgb&w=1600",
                {
                    caption: "You have canceled the creation of a new ad process ...",
                    reply_markup: {
                        inline_keyboard: adsMenu
                    }
                }
            );
        });

        userAdsNameScene.on('text', async (ctx) => {
            const { text } = ctx.message;

            await createOrUpdateAdName({ name: text });
            ctx.scene.leave();
            ctx.deleteMessage();
            ctx.replyWithPhoto(
                "https://images.pexels.com/photos/327533/pexels-photo-327533.jpeg?auto=compress&cs=tinysrgb&w=300",
                {
                    caption: `You have successfully created a new ad name '${text}'`,
                    reply_markup: {
                        inline_keyboard: adsMenu
                    }
                }
            );
        });

        userAdsNameScene.on('message', async (ctx) => {
            ctx.scene.reenter();
        });

        return userAdsNameScene;
    };
};

const getUserAdsNameScene = new GetUserAdsNameScene();
const getUserAdsNameStage = getUserAdsNameScene.getUserAdsName();

module.exports = { getUserAdsNameStage };