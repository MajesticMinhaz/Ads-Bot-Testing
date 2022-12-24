const { adsMenu } = require('../keyboards/adsMenu');

const adsHandler = async (ctx) => {
    const image = "https://images.unsplash.com/photo-1541535650810-10d26f5c2ab3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YWRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60";

    ctx.deleteMessage();

    ctx.replyWithPhoto(
        image,
        {
            caption: "Available operations ...",
            reply_markup: {
                inline_keyboard: adsMenu
            }
        }
    )

};

module.exports = { adsHandler };