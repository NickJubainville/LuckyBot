module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		client.user.setActivity('Idleon | ~help', { type: 'PLAYING' })
            .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
            .catch(console.error);


		if(client.guilds.cache.get('813107432317780010') != null) {

			client.channels.fetch('823270375865188442')
			.then(channel => {
				setInterval(babaMessage, 60000);
				console.log('baba timer started');
				function babaMessage() {
					const currentDate = new Date();
					const time = currentDate.getMinutes();
					if (time == 55) {
						console.log('it\'s time');
						channel.send(`<@&823270848252739644>`);
						channel.send(`https://media.discordapp.net/attachments/738868424813445172/815492250209484800/spike-baba-alert3.gif`);
					}
					else if (time == 1) {
						channel.bulkDelete(2, true).catch(err => {
							console.error(err);
						});
					}
				}
			})
			.catch(console.error);

			client.channels.fetch('823270400791150664')
			.then(channel => {
				setInterval(dootMessage, 60000);
				console.log('doot timer started');
				function dootMessage() {
					const currentDate = new Date();
					const dayOfWeek = currentDate.getUTCDay();
					if (dayOfWeek == 0 || dayOfWeek == 6) {
						const utcHour = currentDate.getUTCHours();
						if (utcHour == 17) {
							const time = currentDate.getMinutes();
							if (time == 50) {
								console.log('doot doot');
								channel.send(`<@&825420735669469244> runs beginning in 10 minutes, grab your keys and head to Limeedle 1! Don't forget to equip drop rate cards & gear if you can <:doot:825421374205722665>`);
							}
						}
					}
				}
			})
			.catch(console.error);
			}
	},
};