const { updateGroupInfo } = require('../dbQuery/dbQuerys');


const groupLeftTypeHandler = async (ctx, next) => {
    const { message } = ctx.update;

    try {
        const name = message.chat.title;
        const chatId = message.chat.id;
        const isActive = message.left_chat_member !== undefined ? false : true;

        const groupInfo = {
            name,
            chatId,
            isActive
        };

        await updateGroupInfo(groupInfo);
    } catch {}
    await next();
};


const groupJoinTypeHandler = async (ctx, next) => {
    const { message } = ctx.update;

    try {
        const name = message.chat.title;
        const chatId = message.chat.id;
        const isActive = message.new_chat_member !== undefined ? true : false;

        const groupInfo = {
            name,
            chatId,
            isActive
        };

        await updateGroupInfo(groupInfo);
    } catch {}
    await next();
};


module.exports = { groupLeftTypeHandler, groupJoinTypeHandler };