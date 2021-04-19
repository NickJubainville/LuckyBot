module.exports = {
	name: 'role',
	description: 'Add a role to a user.',
	aliases: ['r'],
	permissions: 'MANAGE_ROLES',
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
						const member = message.mentions.members.first();
						member.roles.add(guildRole);
						return message.channel.send(`Welcome to Lucky ${member}! 
						• Our weekly GP requirement is **150**. 						
						• If you'd like to hang out with other members, visit <:dice:818655068756115456>Dice 7. 
						• You can find a plethora of useful information in the Resources channel group as well as sign up for boss pings in <#825523888233512970>`);
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
