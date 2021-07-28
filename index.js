const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const { connect, getData, setData, sheetsid, ranges } = require('./spreadsheet');

const client = new Discord.Client();
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

const leaders = [
    // Nymiir
    '89918398351290368',
    // ClassicSteel
    '90594734891859968',
    // Mateo
    '94897361578360832',
    // Phos
    '697177576535228456',
    // Hector
    '333983557024481281',
    // CantTouched
    '155357743249620992',
];

let eventFlag = false;

// Trigger an event file depending on the type of event occuring
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

// Separate file structure to ensure regular users aren't shown admin commands in help function
const commandFolders = fs.readdirSync('./commands/basic');
const adminCommands = fs.readdirSync('./commands/admin');

// Look through the command folder for all js files to know which commands exist
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/basic/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/basic/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

// Do the same for admin commands
for (const folder of adminCommands) {
	const adminFiles = fs.readdirSync(`./commands/admin/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of adminFiles) {
		const adminCommand = require(`./commands/admin/${folder}/${file}`);
		client.hiddenCommands.set(adminCommand.name, adminCommand);
	}
}

// Event handler for messages
client.on('message', async (message) => {

    if (message.author.id == '89918398351290368') {
        if(message.content.includes("Flash Time!") || message.content.includes("Initiate Protocol 7b2")) {
            const amountOfTime = 5 + Math.floor(Math.random() * (30 - 5 + 1));
            message.channel.send(`𝙀𝙭𝙚𝙘𝙪𝙩𝙞𝙣𝙜 𝙃𝙮𝙥𝙚𝙧 𝙎𝙝𝙞𝙛𝙩`);
            message.channel.send(`𝘼𝙗𝙡𝙚 𝙩𝙤 𝙨𝙪𝙨𝙩𝙖𝙞𝙣 𝙛𝙤𝙧 [${amountOfTime}] 𝙢𝙞𝙣𝙪𝙩𝙚𝙨`);

            const auth = await connect();

            let values = [[
                60,
            ]];

            let resource = {
                values,
            };

            let setOptions = {
                    spreadsheetId: sheetsid,
                    range: ranges.eventCooldown,
                    valueInputOption: "USER_ENTERED",
                    resource,
            };

            const response1 = await setData(auth, setOptions);

            if(response1) {
                console.log('cooldown set to 60 seconds');
                eventFlag = true;
            }

            setTimeout(async function() {

                values = [[
                    1800,
                ]];

                resource = {
                    values,
                };
                setOptions = {
                    spreadsheetId: sheetsid,
                    range: ranges.eventCooldown,
                    valueInputOption: "USER_ENTERED",
                    resource,
                };

                const response2 = await setData(auth, setOptions);

                if(response2) {
                    console.log('cooldown set to 1800 seconds');
                    message.channel.send(`sʏsᴛᴇᴍs ᴄʀɪᴛɪᴄᴀʟ: ᴄᴇᴀsɪɴɢ ʜʏᴘᴇʀ sʜɪғᴛ`);
                    eventFlag = false;
                }
            }, amountOfTime * 60 * 1000);
        }
    }

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    let command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    // else if (commandName === 'gems' || commandName === 'gem') {
    //     if (message.channel.id === '843483374009188392') {
    //         message.channel.send(`You found the easter egg, ${message.author}! Hit up <@!89918398351290368> for a $10 Google Play card <:pigchamp:819862646437838858>`);
    //         message.channel.updateOverwrite('814044645486231562', {
    //             SEND_MESSAGES: false,
    //         })
    //             .then(channel => console.log(channel.permissionOverwrites.get('814044645486231562')))
    //             .catch(console.error);
    //         return;
    //     }
    // }

    if (commandName === 'soup') {
        message.channel.send(`Why do you keep trying to use this? You already know it won't do anything`);
        message.channel.send(`https://i.imgur.com/b9doIeO.png`);
        return;
    }

    else {

        // If I or another leader sent the message, make admin commands accessible
        if (leaders.includes(message.author.id)) {
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

            let commandNameOverride = command.name;

            if(!eventFlag) {
                if(commandName === 'level' || commandName === 'roll' || commandName === 'sabotage' || commandName === 'cooldown' || commandName === 'heatup') {
                    commandNameOverride = 'rollEvent';
                }
            }

            if (!cooldowns.has(commandNameOverride)) {
                cooldowns.set(commandNameOverride, new Discord.Collection());
            }

            const now = Date.now();
            const timestamps = cooldowns.get(commandNameOverride);
            let cooldownAmount = (command.cooldown || 3) * 1000;

            if(commandName === 'level' || commandName === 'roll' || commandName === 'sabotage' || commandName === 'cooldown' || commandName === 'heatup') {

                const auth = await connect();

                const getOptions = {
                    spreadsheetId: sheetsid,
                    range: ranges.eventValues,
                };

                const { values } = await getData(auth, getOptions);

                const dynamicCooldown = values[0][1];

                if(commandName === 'level' && values[0][0] <= 1000) {
                    message.channel.send(`Roll has already reached max level!`);
                    return;
                }
                else if(commandName === 'heatup' && values[0][1] >= 1800) {
                    message.channel.send(`What, is 30minutes not long enough for you?`);
                    return;
                }
                else if(commandName === 'cooldown' && values[0][1] <= 600) {
                    message.channel.send(`If you're hoping for this to drop below 10minutes you're going to have to convince Nymiir`);
                    return;
                }
                else {
                    cooldownAmount = dynamicCooldown * 1000;
                }
            }

            if (timestamps.has(message.author.id)) {
                const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

                if (now < expirationTime) {
                    let timeLeft = (expirationTime - now) / 1000;

                    if(timeLeft > 60) {
                        timeLeft = timeLeft / 60;
                        return message.reply(`Please wait ${timeLeft.toFixed(0)} more minute(s) before reusing the \`${command.name}\` command.`);
                    }
                    else {
                        return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
                    }
                }
            }

            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

            const timeoutAmount = 30;

        try {
            command.execute(message, args, timeoutAmount);
        }
        catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command.');
        }
    }
});

client.login(token);