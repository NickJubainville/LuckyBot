module.exports = {
	name: 'autoplay',
	description: 'Toggles autoplay on or off',
	execute: async (message, args, client) => {
        if(client.distube.isPlaying(message)) {
            console.log(client.distube);
            const mode = client.distube.toggleAutoplay(message);
            message.channel.send("Set autoplay mode to `" + (mode ? "On" : "Off") + "`");
        }
	},
};

