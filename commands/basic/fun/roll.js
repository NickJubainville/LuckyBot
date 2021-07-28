const { connect, getData, sheetsid, ranges } = require('../../../spreadsheet');

module.exports = {
	name: 'roll',
	description: 'This will roll a die with x number of sides (starting at 10,000, with a minimum of 1,000), if you roll a 777 you win and the event is over!',
	execute: async (message) => {

        if (message.channel.id === '843483374009188392') {

            const auth = await connect();

            const getOptions = {
                spreadsheetId: sheetsid,
                range: ranges.dieSides,
            };

            const values = await getData(auth, getOptions);

            const range = parseInt(values.values);

            const rolledNumber = Math.floor(Math.random() * range) + 1;

            if(rolledNumber === 777) {
                message.channel.send(`${message.author} rolls <:dice:818655068756115456> 777`);
                message.channel.startTyping();
                setTimeout(function() { message.channel.send(`Wait, you mean <@!89918398351290368> *didn't* remove 777 from the pool of possible rolls? LOL, alright time to pay up. ${message.author} is deserving of a $10 Google Play card <:pigchamp:819862646437838858>`); }, 6000);
                message.channel.stopTyping();

                message.channel.updateOverwrite('814044645486231562', {
                    SEND_MESSAGES: false,
                })
                    .then(channel => console.log(channel.permissionOverwrites.get('814044645486231562')))
                    .catch(console.error);
                return;
            }
            else if(rolledNumber === 420) {
                message.channel.send(`${message.author} rolls <:dice:818655068756115456> 420`);
                message.channel.send(`lol nice`);
            }
            else if(rolledNumber === 69) {
                message.channel.send(`${message.author} rolls <:dice:818655068756115456> 69`);
                message.channel.send(`*heh*`);
            }
            else if(rolledNumber === 1) {
                message.channel.send(`${message.author} rolls <:dice:818655068756115456> a 1`);
                message.channel.send(`Damn, too bad you aren't rolling in game right now :(`);
            }
            else {
                message.channel.send(`${message.author} rolls <:dice:818655068756115456> ${rolledNumber}`);
            }
        }
	},
};