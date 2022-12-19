const { mainMenu } = require("../keyboards/mainMenu");

const backToMainMenuHandler = async (ctx) => {
    ctx.deleteMessage();

    const image = "https://images.unsplash.com/photo-1592050862964-24213d0aee33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJldmlvdXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60";


    ctx.replyWithPhoto(
        image,
        {
            caption: "We are back to the main menu",
            reply_markup: {
                inline_keyboard: mainMenu
            }
        }
    );
};

module.exports = { backToMainMenuHandler };