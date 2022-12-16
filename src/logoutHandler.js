const { loginMenu } = require('../keyboards/loginMenu');
const { makeUserUnAuthorized } = require('../dbQuery/dbQuerys');

const logoutHandler = async (ctx) => {
    const { id, first_name, last_name } = ctx.update.callback_query.from;
    const userFullName = `${first_name} ${last_name ? last_name : ""}`;

    await makeUserUnAuthorized({ telegramUserId: id });

    ctx.deleteMessage();

    ctx.replyWithPhoto(
        "https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c21pbGUlMjBjYXJ0b29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        {
            caption: `Hi ${userFullName} - Please login to continue 😊`,
            reply_markup: {
                inline_keyboard: loginMenu
            }
        }
    )
};

module.exports = {logoutHandler};