const { mainMenu } = require("../keyboards/mainMenu");
const { loginMenu } = require("../keyboards/loginMenu");


const startHandler = async (ctx) => {
    const { privateTypeInfo } = ctx.state;
    const { userFullName, isUserExistsInDB, isUserAuthorizedInDB } = privateTypeInfo;
    
    ctx.deleteMessage();

    try {
        const { type } = ctx.update.message.chat;

        const imageUrls = [
            "https://images.unsplash.com/photo-1634804306598-f2efe3ead034?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHBhc3N3b3JkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
            "https://cdn.pixabay.com/photo/2016/11/21/13/58/ball-1845546__340.jpg",
            "https://images.unsplash.com/photo-1633989464081-16ccd31287a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGhlbGxvfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"

        ]

        if (type === "private") {
            if (!isUserExistsInDB) {
                ctx.replyWithPhoto(
                    imageUrls[0],
                    {
                        caption: `Hi ${userFullName} - Please login to continue 😊`,
                        reply_markup: {
                            inline_keyboard: loginMenu
                        }
                    }
                )
    
            } else if (isUserExistsInDB && !isUserAuthorizedInDB) {
                ctx.replyWithPhoto(
                    imageUrls[1],
                    {
                        caption: `Hi ${userFullName} - Please login to continue 😊`,
                        reply_markup: {
                            inline_keyboard: loginMenu
                        }
                    }
                )
            } else {
                ctx.replyWithPhoto(
                    imageUrls[2],
                    {
                        caption: `${userFullName} - Welcome to Ads Bot 👋`,
                        reply_markup: {
                            inline_keyboard: mainMenu
                        }
                    }
                )
            }
    
            console.log(`\nBot Username : ${ctx.botInfo.username}`);
            console.log(`Bot Name : ${ctx.botInfo.first_name}`);
            console.log(`Bot ID : ${ctx.botInfo.id}\n`);
        }

    } catch {}
};

module.exports = { startHandler };