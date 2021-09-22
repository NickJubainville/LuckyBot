module.exports = {
	name: 'skip',
	description: 'Skips the current song',
	execute: async (message, args, client) => {
        if(client.distube.isPlaying(message)) {
            client.distube.skip(message);
        }
	},
};