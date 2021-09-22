module.exports = {
	name: 'play',
	description: 'Plays the linked song in the current voice channel',
	aliases: ['p'],
	usage: '[song link]',
	execute: async (message, args, client) => {
        const music = args.join(" ");
        client.distube.play(message, music);
	},
};