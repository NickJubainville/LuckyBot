module.exports = {
	name: 'loop',
	description: '0 - Stop loop, 1 - loop current song, 2 - loop entire queue',
    usage: '[loop option]',
	execute: async (message, args, client) => {
        if(client.distube.isPlaying(message)) {
            client.distube.setRepeatMode(message, parseInt(args[0]));
        }
	},
};