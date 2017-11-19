var config = require('config');

class ChatUtils {
<<<<<<< HEAD
    static sayInChat (client, message) {
        client.say(config.get('channel'), message);
    }
=======
    static sayInChat(client, message) {
        client.say(config.get('channel'), message);
    }

    static clearChat(client) {
        client.clear(config.get('channel'));
    }
>>>>>>> bc6253771e367531ca00b479f59577070a8762f6
}

module.exports = ChatUtils;