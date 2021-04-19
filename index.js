const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const { connect, getData } = require('./spreadsheet');

const client = new Discord.Client();
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	}
    else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

client.cooldowns = new Discord.Collection();
client.commands = new Discord.Collection();
client.hiddenCommands = new Discord.Collection();
const commandFolders = fs.readdirSync('./commands/basic');
const adminCommands = fs.readdirSync('./commands/admin');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/basic/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/basic/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

for (const folder of adminCommands) {
	const adminFiles = fs.readdirSync(`./commands/admin/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of adminFiles) {
		const adminCommand = require(`./commands/admin/${folder}/${file}`);
		client.hiddenCommands.set(adminCommand.name, adminCommand);
	}
}

client.on('message', async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    let command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    const auth = await connect();

    if(commandName === 'gp' || command === 'guildpoints') {
        if (!args.length) {
            return message.channel.send(`Please specify the member you want to lookup.`);
        }

        const initialUsername = args.toString();
        const username = initialUsername.replace(",", " ").toLowerCase();

        const options = {
        spreadsheetId: '12H32mk28mfFVkxeWA4cipXqGHCx8uU_YTXHRRb6wCSM',
        range: 'DATA!A5:P145',
        };
        const { values } = await getData(auth, options);
        let found = -1;
        const flag = values.pop().toString();

        for (let i = 0; i < values.length; i++) {
            const item = values[i];
            const itemLower = item.toString().toLowerCase();
                if (itemLower.includes(username)) {
                found = i;
            }
        }
        if (found > -1) {
            const stat = values[found];
            const memberName = stat[2];
            const weeklyGP = stat[14];
            const ranking = stat[15];
            console.log(`${memberName} has earned ${weeklyGP} GP this week.`);
            switch (flag) {
                case "Mid":
                    if (weeklyGP >= 150) {
                        if (ranking == 1) {
                            return message.channel.send(`<:STAR:814075576414896148> ${memberName} has earned ${weeklyGP} GP and is currently the highest rank at midweek! <:STAR:814075576414896148>`);
                        }
                        else if (ranking == 69) {
                            return message.channel.send(`${memberName} has earned ${weeklyGP} GP and is currently ranked #${ranking} midweek! <:heh:829135032106352650>`);
                        }
                        else if (ranking <= 10) {
                            return message.channel.send(`${memberName} has earned ${weeklyGP} GP and is currently ranked #${ranking} midweek! <:pigchamp:819862646437838858>`);
                        }
                        else {
                            return message.channel.send(`${memberName} has earned ${weeklyGP} GP and is currently ranked #${ranking} midweek! <:happy:814038639138308147>`);
                        }
                    }
                    else if (weeklyGP < 150 && weeklyGP > 0) {
                        return message.channel.send(`${memberName} has earned ${weeklyGP} GP. Only ${150 - weeklyGP} GP left to earn before Tuesday! Currently #${ranking}.`);
                    }
                    else {
                        return message.channel.send(`${memberName} hasn't earned any GP yet. Reach 150 before Tuesday to hit our target!`);
                    }
                case "End":
                    if (weeklyGP >= 150) {
                        if (ranking == 1) {
                            return message.channel.send(`<:STAR:814075576414896148> ${memberName} has earned ${weeklyGP} GP and is our highest ranked this week! <:STAR:814075576414896148>`);
                        }
                        else if (ranking == 69) {
                            return message.channel.send(`${memberName} has earned ${weeklyGP} GP and is currently ranked #${ranking} this week! <:heh:829135032106352650>`);
                        }
                        else if (ranking <= 10) {
                            return message.channel.send(`${memberName} has earned ${weeklyGP} GP and is currently ranked #${ranking} this week! <:pigchamp:819862646437838858>`);
                        }
                        else {
                            return message.channel.send(`${memberName} has earned ${weeklyGP} GP and is currently ranked #${ranking} this week! <:happy:814038639138308147>`);
                        }
                    }
                    else if (weeklyGP < 150 && weeklyGP > 0) {
                        return message.channel.send(`${memberName} has earned ${weeklyGP} GP putting them ${150 - weeklyGP} below the weekly target <:uganda:814038639204892682>; currently ranked #${ranking}.`);
                    }
                    else {
                        return message.channel.send(`${memberName} hasn't earned any GP this week <:wtf:814038639260205076>`);
                    }
                default:
                    console.log("Please check update flag");
            }
        }
        else {
            return message.channel.send('I couldn\'t find that member <:uganda:814038639204892682>');
        }
    }
    else if (commandName === 'status') {
        const options = {
            spreadsheetId: '12H32mk28mfFVkxeWA4cipXqGHCx8uU_YTXHRRb6wCSM',
            range: 'DATA!A5:A143',
            };

        const { values } = await getData(auth, options);
        let found = 0;

        for (let i = 0; i < values.length; i++) {
            const item = values[i];
            const itemLower = item.toString();
                if (itemLower.includes("*")) {
                found++;
            }
        }

        switch (found) {
            case 0:
                return message.channel.send(`Lucky is currently **full**. If you'd like to be notified when we have available slots, please claim the applicant role in <#814036308992458802> if you haven't already done so.`);
                
            case 1:
                return message.channel.send(`Lucky has ${found} open slot. <@&814044385519075378> if you're still interested in joining please let Nymiir know.`);

            default:
                return message.channel.send(`Lucky has ${found} open slots. <@&814044385519075378> if you're still interested in joining please let Nymiir know.`);
        }

    }
    else {
        if (message.author.id == '89918398351290368') {
            command = client.hiddenCommands.get(commandName) 
            || client.commands.get(commandName)
            || client.hiddenCommands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)) 
            || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        }
    
        if (!command) return;    

        if (command.guildOnly && message.channel.type === 'dm') {
            return message.reply('I can\'t execute that command inside DMs.');
        }

        if (command.permissions) {
            const authorPerms = message.channel.permissionsFor(message.author);
            if (!authorPerms || !authorPerms.has(command.permissions)) {
                return message.reply('You don\'t have permission to use this command.');
            }
        }

        if (command.args && !args.length) {
            let reply = `You didn't provide any arguments, ${message.author}.`;

            if (command.usage) {
                reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
            }

            return message.channel.send(reply);
            }

            const { cooldowns } = client;

            if (!cooldowns.has(command.name)) {
                cooldowns.set(command.name, new Discord.Collection());
            }

            const now = Date.now();
            const timestamps = cooldowns.get(command.name);
            const cooldownAmount = (command.cooldown || 3) * 1000;

            if (timestamps.has(message.author.id)) {
                const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
                }
            }

            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        try {
            command.execute(message, args);
        }
        catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command.');
        }
    }
});

client.login(token);