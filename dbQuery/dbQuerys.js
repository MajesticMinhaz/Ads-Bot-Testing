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

const updateGroupInfo = async ({ groupName, groupChatId, groupStatusIsActive }) => { 
    const upsertGroup = await prisma.Groups.upsert({
        where: { 
            groupChatId
        },
        update: {
            groupStatusIsActive, 
            groupName
        },
        create: {
            groupName,
            groupChatId,
            groupStatusIsActive
        }
    });

    return upsertGroup;
};

const updateChannelInfo = async ({ channelChatId, channelName, channelUsername, channelStatusIsActive }) => {
    const updateChannel = await prisma.Channels.upsert({
        where: {
            channelChatId
        },
        update: {
            channelName,
            channelUsername,
            channelStatusIsActive
        },
        create: {
            channelChatId,
            channelName,
            channelUsername,
            channelStatusIsActive
        }
    });

    return updateChannel;
};

const getAllAvailableChannels = async () => {
    const channels = await prisma.Channels.findMany({
        where: {
            channelStatusIsActive: true
        }
    });
    return channels;
};

const getAllAvailableGroups = async () => {
    const groups = await prisma.Groups.findMany({
        where: {
            groupStatusIsActive: true
        }
    });
    return groups;
};

module.exports = {
    isUserExists,
    createUser,
    isUserAuthorized,
    makeUserAuthorized,
    makeUserUnAuthorized,
    updateGroupInfo,
    updateChannelInfo,
    getAllAvailableChannels,
    getAllAvailableGroups
}