const { getChannelByChatId, makeUnavailableChannel } = require('../dbQuery/dbQuerys');
const { mainMenu } = require('../keyboards/mainMenu')

const dynamicButtonHandler = async (ctx) => {
    const isRemoveChannelButton = /removeChannel-\d+/;
    const isChannelButton = /-\d+/;
    const { data } = ctx.update.callback_query;

    if (isRemoveChannelButton.test(data)) {
        const chatId = BigInt(data.replace(/removeChannel/i, '').trim());
        await makeUnavailableChannel({ chatId });

        ctx.deleteMessage();

        ctx.replyWithPhoto(
            "https://media.istockphoto.com/id/172315669/photo/error.jpg?b=1&s=170667a&w=0&k=20&c=bo7T-NmwhEBt9rCdhzhLc306a0sXUrRj7fGUT_STFJM=",
            {
                caption: `Chat Id (${chatId}) is now unavailable`,
                reply_markup: {
                    inline_keyboard: mainMenu
                }
            }
        );
        
    } else if (isChannelButton.test(data)) {
        const chatId = BigInt(data);
        const { name, username, isChannel, isActive } = await getChannelByChatId({ chatId });

        const keyboards = [
            [
                { text: `🗑️ Remove "${name}"`, callback_data: `removeChannel${chatId}` }
            ],
            [
                { text: '⏪ Back', callback_data: 'backToChannelsMenu' }
            ]
        ];

        ctx.deleteMessage();

        if (isChannel && isActive) {
            const message = `Channel - ${name} - @${username}`;
            
            ctx.reply(
                message,
                {
                    reply_markup: {
                        inline_keyboard: keyboards
                    }
                }
            );
        } else if (!isChannel && isActive) {
            const message = `Group - ${name}`;

            ctx.reply(
                message,
                {
                    reply_markup: {
                        inline_keyboard: keyboards
                    }
                }
            );
        } else {}
    } else {}
};

module.exports = {dynamicButtonHandler};