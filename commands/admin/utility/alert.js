module.exports = {
	name: 'alert',
	description: 'Enables alerts for Baba Yaga',
	aliases: ['baba'],
    guildOnly: true,
	execute(message) {
        if (message.author.id !== '89918398351290368') return;
        setInterval(channelMessage, 60000);
        console.log('baba timer started');
        function channelMessage() {
            const currentDate = new Date();
            const time = currentDate.getMinutes();
            if (time == 55) {
                console.log('it\'s time');
                const guildRole = message.guild.roles.cache.find(r => r.name === 'YagattaKillBaba');
                message.channel.send(`${guildRole}`);
                message.channel.send(`https://media.discordapp.net/attachments/738868424813445172/815492250209484800/spike-baba-alert3.gif`);
            }
            else if (time == 1) {
                message.channel.bulkDelete(2, true).catch(err => {
                    console.error(err);
                });
            }
        }
	},
};