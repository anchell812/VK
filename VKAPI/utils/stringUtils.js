const logger = require("../logger/log");

class StringUtils {

static async createMessage(length) {
    logger.info("Creating random message");
    let message = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        message += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return message;
}
}

module.exports = StringUtils;