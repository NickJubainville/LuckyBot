module.exports = {
	name: 'role',
	description: 'Add a role to a user.',
	aliases: ['r'],
	execute(message, args) {
		if (!args.length) {
			return message.channel.send(`I need to know the user & desired role, ${message.author}.`);
		}
		else {
			if (!message.mentions.users.size) {
				return message.channel.send(`Aren't you going to tag someone to be added, ${message.author}?`);
			}
			if (!args[1]) {
				return message.channel.send(`I need to know the role you want assigned, ${message.author}.`);
			}
			else {
				const role = args[1].toLowerCase();
				switch(role) {
					case 'm':
					case 'member': {
						const guildRole = message.guild.roles.cache.find(r => r.name === 'Member');
						const removeRole = message.guild.roles.cache.find(r => r.name === 'Applicant');
						const member = message.mentions.members.first();
						member.roles.add(guildRole);
						member.roles.remove(removeRole);
						return message.channel.send(`Welcome to Lucky ${member}! \n• Our weekly GP requirement is **250** \
						\n• If you'd like to hang out with other members, set <:dice:818655068756115456>Dice 7 as your favourite world \
						\n• Type ~help to get a list of our server's bot commands and visit <#825523888233512970> for additional roles \
						\n<:STAR:814075576414896148> You get 10GP from logging in daily but can double it to 20 with a bribe purchased from the stamp pig`);
					}
					case 'v':
					case 'visitor': {
						const guildRole = message.guild.roles.cache.find(r => r.name === 'Visitor');
						const member = message.mentions.members.first();
						member.roles.add(guildRole);
						return message.channel.send(`Thanks for hanging out with us ${member}!`);
					}
					case 'l':
					case 'leader': {
						const guildRole = message.guild.roles.cache.find(r => r.name === 'Leader');
						const member = message.mentions.members.first();
						member.roles.add(guildRole);
						return message.channel.send(`Congrats on becoming a leader ${member}!`);
					}
					case 'a':
					case 'app':
					case 'applicant': {
						const guildRole = message.guild.roles.cache.find(r => r.name === 'Applicant');
						const member = message.mentions.members.first();
						member.roles.add(guildRole);
						return message.channel.send(`We hope to have you join us soon ${member}!`);
					}
					default:
						return message.channel.send(`That isn't a valid role, ${message.author}.`);
				}
			}
		}

	},
};
