const { channelsKeyboard } = require('../keyboards/channelsMenu');

const channelsHandler = async (ctx) => {
    const images = [
        "https://images.pexels.com/photos/14118271/pexels-photo-14118271.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/302428/pexels-photo-302428.jpeg?auto=compress&cs=tinysrgb&w=1600"
    ];

    ctx.deleteMessage();

    const { keyboards, backButton } = await channelsKeyboard();

    if (!keyboards) {
        ctx.replyWithPhoto(
            images[1],
            {
                caption: "No channels and groups available...",
                reply_markup: {
                    inline_keyboard: backButton
                }
            },
        );
    } else {
        ctx.replyWithPhoto(
            images[0],
            {
                caption: "Here are your available channels and groups ...",
                reply_markup: {
                    inline_keyboard: keyboards.concat(backButton)
                }
            }
        )
    }

};

module.exports = { channelsHandler };