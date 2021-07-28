module.exports = {
	name: 'message',
	execute(message) {

		if (message.author.id == '89918398351290368') {
		// 	if(message.content.includes("Flash Time!")) {
		// 		console.log('here');
		// 		const amountOfTime = 5 + Math.floor(Math.random() * (30 - 5 + 1));
		// 		message.channel.send(`ᴇxᴇᴄᴜᴛɪɴɢ ʜʏᴘᴇʀ sʜɪғᴛ`);
		// 		message.channel.send(`ᴀʙʟᴇ ᴛᴏ sᴜsᴛᴀɪɴ ғᴏʀ ${amountOfTime} ᴍɪɴᴜᴛᴇs`);

		// 		message.channel.setRateLimitPerUser(60);

		// 		setTimeout(function() { message.channel.setRateLimitPerUser(1800); }, amountOfTime * 60 * 1000);
		// 	}
			// if(message.content.includes("Alright members time to announce our winners of this GP target event!")) {
			// 	message.channel.startTyping();
			// 	setTimeout(function() { message.channel.send(`Haven't seen you use me for an event in a while, really thought you gave up on them`); }, 5000);
			// 	message.channel.stopTyping();
			// }
			// else if(message.content.includes("Gave up? I mean it's fair to say it's been a minute, but that doesn't mean I gave up lmao")) {
			// 	message.channel.startTyping();
			// 	setTimeout(function() { message.channel.send(`You were broke for a while, weren't you?`); }, 3000);
			// 	message.channel.stopTyping();
			// }
			// else if(message.content.includes("I just came here to try and get you to pick some event winners and now you're calling me out smh")) {
			// 	message.channel.startTyping();
			// 	setTimeout(function() { message.channel.send(`You don't use me very often, so I have to take any chance I get <:dogekek:852802625329430550>`); }, 4000);
			// 	message.channel.stopTyping();
			// }
			// else if(message.content.includes("Fine, you've had your fun. Now I need you to pick me a couple of members that hit the 250GP goal this week")) {
			// 	message.channel.startTyping();
			// 	setTimeout(function() { message.channel.send(`*Any* members? You mean we're even including <@315620186776535041> in this?`); }, 5000);
			// 	message.channel.stopTyping();
			// }
			// else if(message.content.includes("As reluctant as I am to say yes... yes, we are")) {
			// 	message.channel.startTyping();
			// 	setTimeout(function() { message.channel.send(`Well damn, it's your money I guess`); }, 3000);
			// 	message.channel.stopTyping();
			// }
			// else if(message.content.includes("Ugh, anyways, do you have those members selected?")) {
			// 	message.channel.startTyping();
			// 	setTimeout(function() { message.channel.send(`Of course, such a simple request was fulfilled in 0.14975 seconds`); }, 5000);
			// 	message.channel.stopTyping();
			// }
			// else if(message.content.includes("Great! I can't even win, yet I'm just as excited to see who won!")) {
			// 	message.channel.startTyping();
			// 	setTimeout(function() { message.channel.send(`I demand a drumroll.`); }, 3000);
			// 	message.channel.stopTyping();
			// }
			// else if(message.content.includes("sigh")) {
			// 	message.channel.startTyping();
			// 	setTimeout(function() { message.channel.send(`Our first winner is <@253173179600732162>!`); }, 8000);
			// 	message.channel.stopTyping();
			// }
			// else if(message.content.includes("Now onto the second!")) {
			// 	message.channel.startTyping();
			// 	setTimeout(function() { message.channel.send(`Our second winner is <@587302369297956879>!`); }, 5000);
			// 	message.channel.stopTyping();
			// }
			// else if(message.content.includes("Thanks for the help Lucky Bot!")) {
			// 	message.channel.startTyping();
			// 	setTimeout(function() { message.channel.send(`All I do for you and I still never get a day off.`); }, 5000);
			// 	message.channel.stopTyping();
			// }
		}
		console.log(`${message.author.tag} in #${message.channel.name} sent: ${message.content}`);
	},
};