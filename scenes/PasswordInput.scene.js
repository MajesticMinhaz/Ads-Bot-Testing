const { BaseScene } = require('telegraf/scenes');
const { makeUserAuthorized } = require('../dbQuery/dbQuerys');
const { mainMenu } = require('../keyboards/mainMenu');
const { loginMenu } = require("../keyboards/loginMenu");


class GetUserPasswordScene {
  constructor(adminPassword) {
    this.adminPassword = adminPassword;
  }

  getUserPassword = () => {
    const userPasswordScene = new BaseScene('loginStage');

    userPasswordScene.enter(async (ctx) => {
      ctx.replyWithHTML(`<i>Enter the admin password to login.</i> \n\n<b>cancel     👉 /cancel</b>`)
    });

    userPasswordScene.command(['cancel'], async (ctx) => {
      ctx.scene.leave();
      ctx.deleteMessage();
      ctx.replyWithPhoto(
        "https://cdn.pixabay.com/photo/2018/03/27/17/25/cat-3266673__340.jpg",
        {
          caption: 'You have canceled the login process. I\'m really sorry about that :(',
          reply_markup: {
            inline_keyboard: loginMenu
          }
        }
      );
    });
  
    userPasswordScene.on('text', async (ctx) => {
      const userPassword = ctx.message.text;
  
      if (this.adminPassword === userPassword) {
        ctx.deleteMessage();
        
        const userInfo = {
          telegramUserId: ctx.message.from.id,
          isAuthorized: true
        };
  
        makeUserAuthorized(userInfo);
        ctx.replyWithPhoto(
          "https://images.unsplash.com/photo-1547637589-f54c34f5d7a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHN1Y2Nlc3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
          {
            caption: "Congrats! You have been successfully authorized 🎉",
            reply_markup: {
              inline_keyboard: mainMenu
            }
          }
        );
          
        ctx.scene.leave();
      } else {
        ctx.replyWithPhoto(
          "https://cdn.pixabay.com/photo/2018/03/06/06/27/emoji-3202669_960_720.jpg",
          {
            caption: 'Wrong Password :(. No worry, keep trying...'
          }
        )
        ctx.scene.reenter();
      }
    });
      
    userPasswordScene.on('message', async(ctx) => {
      ctx.scene.reenter();
    });
  
    return userPasswordScene;
  };
};

module.exports = GetUserPasswordScene;
