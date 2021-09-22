module.exports = {
	name: 'queue',
	description: 'Lists the song queue',
	execute: async (message, args, client) => {
        const queue = client.distube.getQueue(message);
        if(queue) {
            message.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
                `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``).slice(0, 10).join("\n"));
        }
        else {
            message.channel.send('There are no currently queued songs.');
        }
	},
};