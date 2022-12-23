require('dotenv').config()
const { Telegraf, session } = require('telegraf');
const { Stage } = require('telegraf/scenes');
const { errorMessageHandler } = require('./middleware/errorMessageHandler');
const { privateTypeHandler } = require('./middleware/privateTypeHandler');
const { groupLeftTypeHandler, groupJoinTypeHandler } = require('./middleware/groupTypeHandler');
const { channelTypeHandler } = require('./middleware/channelTypeHandler');
const { updateLog } = require("./middleware/updateLog");
const { backToMainMenuHandler } = require("./middleware/backToMainMenuHandler");
const { startHandler } = require('./src/startHandler');
const { loginHandler } = require('./src/loginHandler');
const { logoutHandler } = require('./src/logoutHandler');
const { channelsHandler } = require('./src/channelsHandler');
const { dynamicButtonHandler } = require('./src/dynamicButtonHandler');
const GetUserPasswordScene = require('./scenes/PasswordInput.scene');


const bot = new Telegraf(process.env.BOT_TOKEN);
const getUserPasswordScene = new GetUserPasswordScene(process.env.PASSWORD);
const getUserPassword = getUserPasswordScene.getUserPassword();
const PasswordInputStage = new Stage([getUserPassword]);


bot.use(updateLog);
bot.use(privateTypeHandler);
bot.use(groupJoinTypeHandler);
bot.use(groupLeftTypeHandler);
bot.use(channelTypeHandler);

bot.use(session());

bot.use(PasswordInputStage.middleware());

bot.start(startHandler);
bot.help(errorMessageHandler);

bot.action('login', loginHandler);
bot.action('logout', logoutHandler);
bot.action('channels', channelsHandler);
bot.action('backToMainMenu', backToMainMenuHandler);
bot.action('help', errorMessageHandler);

bot.on('callback_query', dynamicButtonHandler);
bot.on(['text', 'sticker', 'photo', 'video', 'document', 'poll', 'music', 'location', 'contact'], errorMessageHandler);

bot.launch();