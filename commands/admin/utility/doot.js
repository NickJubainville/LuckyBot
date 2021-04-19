module.exports = {
	name: 'doot',
	description: 'Enables alerts for Doot raids',
    guildOnly: true,
	execute(message) {
        if (message.author.id !== '89918398351290368') return;
        setInterval(channelMessage, 60000);
        console.log('doot timer started');
        function channelMessage() {
            const currentDate = new Date();
            const dayOfWeek = currentDate.getUTCDay();
            if (dayOfWeek == 0 || dayOfWeek == 6) {
                const utcHour = currentDate.getUTCHours();
                if (utcHour == 17) {
                    const time = currentDate.getMinutes();
                    if (time == 50) {
                        console.log('doot doot');
                        const guildRole = message.guild.roles.cache.find(r => r.name === 'Doot');
                        message.channel.send(`${guildRole} runs beginning in 10 minutes, grab your keys and head to Limeedle 1! Don't forget to equip drop rate cards & gear if you can <:doot:825421374205722665>`);
                    }
                }
            }
        }
	},
};