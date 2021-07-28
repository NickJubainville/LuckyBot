module.exports = {
	name: 'reset',
	description: 'Guild weekly reset information',
    cooldown: 5,
	execute(message) {
		message.channel.send(`The GP tracker is updated twice a week on Tuesday (our reset) & Saturday. If you'd like to be notified of GP updates, claim the role in <#825523888233512970>.`);
	},
};