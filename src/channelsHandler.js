const { getAllAvailableChannels } = require('../dbQuery/dbQuerys');

const channelsHandler = async (ctx) => {
    const images = [
        "https://images.pexels.com/photos/14118271/pexels-photo-14118271.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/302428/pexels-photo-302428.jpeg?auto=compress&cs=tinysrgb&w=1600"
    ];

    ctx.deleteMessage();

    const channels = await getAllAvailableChannels();

    if (channels.length > 0) {
        const channelButtons = await Promise.all(channels.map(async ({ name, chatId, isChannel }) => {
            
            if (isChannel) {
                return [ { text: `☀️ ${name}`, callback_data: Number(chatId).toString() } ]
            } else {
                return [ { text: `👥 ${name}`, callback_data: Number(chatId).toString() } ]
            }
        }));

        const backButton = [
            [ {text: `⏪ Back`, callback_data: 'backToMainMenu'} ]
        ];

        ctx.replyWithPhoto(
            images[0],
            {
                caption: "Here are your available channels and groups ...",
                reply_markup: {
                    inline_keyboard: channelButtons.concat(backButton),
                }
            }
        )
    } else {
        ctx.replyWithPhoto(
            images[1],
            {
                caption: "No channels and groups available...",
            }
        )
    }

};

module.exports = { channelsHandler };