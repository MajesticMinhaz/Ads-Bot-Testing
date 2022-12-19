const { PrismaClient } = require("@prisma/client");


const prisma = new PrismaClient();

const isUserExists = async ({ telegramUserId }) => {
    numberOfUser = await prisma.UserInformation.count({
        where: { telegramUserId }
    });

    if (numberOfUser === 0) {
        return false;
    }
    return true;
};

const isUserAuthorized = async ({ telegramUserId }) => {
    try {
        const { isAuthorized } = await prisma.UserInformation.findFirst({
            where: { telegramUserId }
        });

        return isAuthorized;
    } catch {
        return false;
    }
};

const makeUserAuthorized = async ({ telegramUserId }) => {
    const updateUser = await prisma.UserInformation.update({
        where: { telegramUserId },
        data: { isAuthorized: true }
    });

    return updateUser;
};

const makeUserUnAuthorized = async ({ telegramUserId }) => {
    const updateUser = await prisma.UserInformation.update({
        where: { telegramUserId },
        data: { isAuthorized: false }
    });

    return updateUser;
};

const createUser = async ({ telegramUserId, isBot, firstName, lastName, username, languageCode }) => {
    const user = await prisma.UserInformation.create({
        data: {
            telegramUserId,
            isBot,
            firstName,
            lastName,
            username,
            languageCode
        },
    });

    return user;
};

const updateGroupInfo = async ({ name, chatId, isActive }) => { 
    const upsertGroup = await prisma.Channels.upsert({
        where: { 
            chatId
        },
        update: {
            isActive, 
            name,
            isChannel: false
        },
        create: {
            name,
            chatId,
            isActive,
            isChannel: false,
        }
    });

    return upsertGroup;
};

const updateChannelInfo = async ({ chatId, name, username, isActive }) => {
    const updateChannel = await prisma.Channels.upsert({
        where: {
            chatId
        },
        update: {
            name,
            username,
            isActive,
            isChannel: true
        },
        create: {
            chatId,
            name,
            username,
            isActive,
            isChannel: true,
        }
    });

    return updateChannel;
};

const getAllAvailableChannels = async () => {
    const channels = await prisma.Channels.findMany({
        where: {
            isActive: true
        }
    });
    return channels;
};

module.exports = {
    isUserExists,
    createUser,
    isUserAuthorized,
    makeUserAuthorized,
    makeUserUnAuthorized,
    updateGroupInfo,
    updateChannelInfo,
    getAllAvailableChannels
}