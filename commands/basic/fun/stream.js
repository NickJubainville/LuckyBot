module.exports = {
	name: 'stream',
	description: 'Link Lava\'s twitch stream',
	aliases: ['twitch'],
	execute(message) {
		message.channel.send(`https://www.twitch.tv/lava_flame2/`);
	},
};