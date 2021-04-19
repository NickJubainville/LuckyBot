module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		client.user.setActivity('Idleon | ~help', { type: 'PLAYING' })
            .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
            .catch(console.error);
	},
};