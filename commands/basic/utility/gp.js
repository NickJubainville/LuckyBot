const { connect, getData, sheetsid, ranges } = require('../../../spreadsheet');

module.exports = {
	name: 'gp',
	description: 'Lists a member\'s GP earned this week (Updates on Tuesday and Saturday)',
	aliases: ['guildpoints'],
	usage: '[member name]',
	execute: async (message, args) => {
		const auth = await connect();

        let initialUsername = '';

        // Get author's username if no arguments are supplied, otherwise set username to supplied arguments
        if (!args.length) {
            message.member.nickname === null ? initialUsername = message.author.username : initialUsername = message.member.nickname;
        }
        else {
            initialUsername = args.toString();
        }

        const options = {
        spreadsheetId: sheetsid,
        range: ranges.userData,
        };

        // All spreadsheet data in the aforementioned range is held in values array
        const { values } = await getData(auth, options);

        // Set flag for time of week that most recent update occurred
        const flag = values[1][0];
        const lastUpdate = values[1][1];

        const multipleUsers = initialUsername.includes("&");

        let username = [];

        if (multipleUsers) {
            username = initialUsername.replace(/,&,/g, "&").toLowerCase();
            username = username.replace(/,/g, " ");
            username = username.split("&");
        }
        else {
            username.push(initialUsername.replace(/,/g, " ").toLowerCase());
        }

        username.forEach(name => {
            name = name.trim();

            if (name === 'trolzoku') {
                return message.channel.send(`Oh? You think you can come back here and use **OUR** GP command as if record of you would still exist‽ There isn't a single member that holds you in their memory, let alone our spreadsheet. Traitor <:traitor:844401068872171550>`);
            }

            else if (name === 'phosphophyllito') {
                return message.channel.send(`Press F to pay respects`);
            }

            if (name === 'yonic') {
                name = 'yonıc';
            }

            let found = -1;
            // Search through the array for a matching username. If exists, set found to the index
            for (let i = 0; i < values.length; i++) {
                const item = values[i];
                const itemLower = item.toString().toLowerCase();
                    if (itemLower.includes(name)) {
                    found = i;
                }
            }

            if (found > -1) {
                // Attach user info to stat variable, then break it into the components we want to use
                const stat = values[found];
                const gpGoal = 250;
                const memberName = stat[2];
                const weeklyGP = stat[14];
                const ranking = stat[15];

                let compareGP = weeklyGP + ` GP`;

                console.log(`${memberName} has earned ${weeklyGP} GP this week.`);

                if(weeklyGP == 420) {
                    compareGP = compareGP + ` ||ɴɪᴄᴇ||`;
                }

                // Exceeds or meets weekly goal, then check overall ranking
                if (weeklyGP >= gpGoal) {
                    if (ranking == 1) {
                        message.channel.send(`<:STAR:814075576414896148> ${memberName} has earned ${compareGP} and is the highest rank as of ${lastUpdate}! <:STAR:814075576414896148>`);
                    }
                    else if (ranking == 69) {
                        message.channel.send(`${memberName} has earned ${compareGP} and is ranked #${ranking} as of ${lastUpdate}! <:heh:829135032106352650>`);
                    }
                    else if (ranking <= 10) {
                        message.channel.send(`${memberName} has earned ${compareGP} and is ranked #${ranking} as of ${lastUpdate}! <:pigchamp:819862646437838858>`);
                    }
                    else {
                        message.channel.send(`${memberName} has earned ${compareGP} and is ranked #${ranking} as of ${lastUpdate}! <:happy:814038639138308147>`);
                    }
                }
                // Doesn't meet weekly goal, but still shows activity
                else if (weeklyGP < gpGoal && weeklyGP > 0) {
                    if(flag === 'Mid') {
                        message.channel.send(`${memberName} has earned ${compareGP}. Only ${gpGoal - weeklyGP} left to earn before Tuesday! Currently #${ranking} as of ${lastUpdate}.`);
                    }
                    else {
                        message.channel.send(`${memberName} has earned ${compareGP} putting them ${gpGoal - weeklyGP} below the weekly target <:uganda:814038639204892682>; currently ranked #${ranking} as of ${lastUpdate}.`);
                    }

                }
                // Member is inactive
                else {
                    // eslint-disable-next-line no-lonely-if
                    if(flag === 'Mid') {
                    message.channel.send(`${memberName} hasn't earned any GP as of ${lastUpdate}. Reach ${gpGoal} before Tuesday to hit our target!`);
                    }
                    else {
                        message.channel.send(`${memberName} hasn't earned any GP as of ${lastUpdate} <:wtf:814038639260205076>`);
                    }
                }
            }
            else {
                return message.channel.send('I couldn\'t find that member <:uganda:814038639204892682>');
            }
        });
	},
};