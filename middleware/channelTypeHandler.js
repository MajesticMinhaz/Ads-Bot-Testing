const { updateChannelInfo } = require('../dbQuery/dbQuerys');


const channelTypeHandler = async (ctx, next) => {
    try {
        const { chat, new_chat_member } = ctx.update.my_chat_member;
        const { id, title, username } = chat;
        const { status } = new_chat_member;

        const channelInfo = {
            channelName: title,
            channelChatId: id,
            channelUsername: username,
            channelStatusIsActive: status === 'administrator' ? true : false
        };

        await updateChannelInfo(channelInfo);
        
    } catch {};

    await next();
};

module.exports = { channelTypeHandler };