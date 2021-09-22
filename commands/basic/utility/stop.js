module.exports = {
	name: 'stop',
	description: 'Stops the music',
	execute: async (message, args, client) => {
        if(client.distube.isPlaying(message)) {
            client.distube.stop(message);
            message.channel.send("Sorry you didn't like my music senpai ;A;");
        }
	},
};