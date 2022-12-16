const errorMessageHandler = async (ctx) => {
    ctx.deleteMessage();
    ctx.replyWithHTML(`
        <code><b style=\"color:blue\">❌ Something Went Wrong ❌</b></code>

        <b>Start    👉 /start</b>
        <b>Settings 👉 /settings</b>
        <b>Help     👉 /help</b>
        <b>Exit     👉 /exit</b>
    `);
};

module.exports = { errorMessageHandler };