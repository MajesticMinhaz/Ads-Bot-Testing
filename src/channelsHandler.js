const { getAllAvailableChannels, getAllAvailableGroups } = require('../dbQuery/dbQuerys');

const channelsHandler = async (ctx) => {
    const images = [
        "https://images.pexels.com/photos/14118271/pexels-photo-14118271.jpeg?auto=compress&cs=tinysrgb&w=1600",
        "https://images.pexels.com/photos/302428/pexels-photo-302428.jpeg?auto=compress&cs=tinysrgb&w=1600"
    ];

    ctx.deleteMessage();

    const channels = await getAllAvailableChannels();
    const groups = await getAllAvailableGroups();

    if (channels.length > 0 || groups.length > 0) {
        const channelButtons = [];
        const groupButtons = [];

        channels.forEach((channel) => {
            channelButtons.push(
                [
                    { text: `☀️ ${channel.channelName}`, callback_data: Number(channel.channelChatId).toString() }
                ]
            );
        });

        groups.forEach((group) => {
            groupButtons.push(
                [
                    { text: `👥 ${group.groupName}`, callback_data: Number(group.groupChatId).toString() }
                ]
            );
        });

        ctx.replyWithPhoto(
            images[0],
            {
                caption: "Here are your available channels and groups ...",
                reply_markup: {
                    inline_keyboard: channelButtons.concat(groupButtons),
                }
            }
        )
    } else {
        ctx.replyWithPhoto(
            images[1],
            {
                caption: "No channels and groups available...",
            }
        )
    }

};

module.exports = { channelsHandler };