const { isUserExists, isUserAuthorized, createUser } = require('../dbQuery/dbQuerys');


const privateTypeHandler = async (ctx, next) => {
    try {
        const { id, first_name, last_name, is_bot, username, language_code } = ctx.message.from;
        const userFullName = `${first_name} ${last_name ? last_name : ""}`;
    
        const userInfo = {
            telegramUserId: id,
            isBot: is_bot,
            firstName: first_name,
            lastName: last_name,
            username,
            languageCode: language_code
        };

        const isUserExistsInDB = await isUserExists(userInfo);
        const isUserAuthorizedInDB = await isUserAuthorized(userInfo);

        if (!isUserExistsInDB) {
            createUser(userInfo);
        }

        ctx.state.privateTypeInfo = {
            userFullName,
            isUserExistsInDB,
            isUserAuthorizedInDB,
            telegramUserId: id
        }
    } catch (err) {
        ctx.state.privateTypeInfo = {
            userFullName: null,
            isUserExistsInDB: null,
            isUserAuthorizedInDB: null,
            telegramUserId: null
        }
    }
    
    await next();
};

module.exports = { privateTypeHandler };