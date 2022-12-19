const { updateChannelInfo } = require('../dbQuery/dbQuerys');


const channelTypeHandler = async (ctx, next) => {
    try {
        const { chat, new_chat_member } = ctx.update.my_chat_member;
        const { id, title, username } = chat;
        const { status } = new_chat_member;

        const channelInfo = {
            name: title,
            chatId: id,
            username,
            isActive: status === 'administrator' ? true : false
        };

        await updateChannelInfo(channelInfo);
        
    } catch {};

    await next();
};

module.exports = { channelTypeHandler };