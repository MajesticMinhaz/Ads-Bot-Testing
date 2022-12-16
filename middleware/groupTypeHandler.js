const { updateGroupInfo } = require('../dbQuery/dbQuerys');


const groupLeftTypeHandler = async (ctx, next) => {
    const { message } = ctx.update;

    try {
        const groupName = message.chat.title;
        const groupChatId = message.chat.id;
        const groupStatusIsActive = message.left_chat_member !== undefined ? false : true;

        const groupInfo = {
            groupName,
            groupChatId,
            groupStatusIsActive
        };

        await updateGroupInfo(groupInfo);
    } catch {}
    await next();
};


const groupJoinTypeHandler = async (ctx, next) => {
    const { message } = ctx.update;

    try {
        const groupName = message.chat.title;
        const groupChatId = message.chat.id;
        const groupStatusIsActive = message.new_chat_member !== undefined ? true : false;

        const groupInfo = {
            groupName,
            groupChatId,
            groupStatusIsActive
        };

        await updateGroupInfo(groupInfo);
    } catch {}
    await next();
};


module.exports = { groupLeftTypeHandler, groupJoinTypeHandler };