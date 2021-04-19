module.exports = {
	name: 'botavatar',
	description: 'Change the bot\'s avatar',
	aliases: ['ba'],
	execute(message, args) {
        if (message.author.id === '89918398351290368') {
            if (!args.length) {
                return message.channel.send(`Aren't you going to include an image, ${message.author}?`);
            }
            else {
                const url = args[0];
                const valid = /^(ftp|http|https):\/\/[^ "]+$/.test(url);
                if (valid) {
                    message.client.user.setAvatar(url);
                }
                else {
                    return message.channel.send(`That isn't a valid URL, ${message.author}.`);
                }
            }
        }
        else {
            return message.channel.send(`You're not my owner, ${message.author}. >:(`);
        }
	},
};