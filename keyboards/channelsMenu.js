const { getAllAvailableChannels } = require('../dbQuery/dbQuerys');


const channelsKeyboard = async () => {
    const channels = await getAllAvailableChannels();

    const backButton = [
        [ {text: `⏪ Back`, callback_data: 'backToMainMenu'} ]
    ];

    const keyboard = {};

    if (channels.length > 0) {
        const keyboards = await Promise.all(channels.map(async ({ name, chatId, isChannel }) => {
            
            if (isChannel) {
                return [ { text: `☀️ ${name}`, callback_data: Number(chatId).toString() } ]
            } else {
                return [ { text: `👥 ${name}`, callback_data: Number(chatId).toString() } ]
            }
        }));

        keyboard.keyboards = keyboards;
    }

    keyboard.backButton = backButton;

    return keyboard;
};

module.exports = { channelsKeyboard };