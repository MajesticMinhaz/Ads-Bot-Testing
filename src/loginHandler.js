const loginHandler = async (ctx) => { 
    const { type } = ctx.update.callback_query.message.chat;
    const { first_name, last_name, username } = ctx.update.callback_query.from;

    const userFullName = `${first_name} ${last_name ? last_name : ""}`;
    const targetName = username ? `@${username}` : userFullName;

    ctx.deleteMessage();

    if (type === 'private') {
        await ctx.scene.enter('loginStage');
    } else {
        ctx.replyWithPhoto(
            "https://images.unsplash.com/photo-1506702315536-dd8b83e2dcf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHdyb25nJTIwcm9hZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
            {
                caption: `Hey ${targetName}\n\n\nYou have to login using @${ctx.update.callback_query.message.from.username} this bot.\n\n`,
            }
        )
    }
};

module.exports = {loginHandler};
