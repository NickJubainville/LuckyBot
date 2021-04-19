module.exports = {
	name: 'message',
	execute(message) {
		console.log(`${message.author.tag} in #${message.channel.name} sent: ${message.content}`);

		// if (message.author.bot) return;
		// const messageText = message.content.toLowerCase();

		// if(messageText.includes("lava") || messageText.includes("lavaflame")) {
		// 	const names = ["lame", "shame", "came", "blame"];
		// 	const random = Math.floor(Math.random() * names.length);
		// 	message.channel.send(`Are you talking about THE lava${names[random]}?!`);
		// }
	},
};