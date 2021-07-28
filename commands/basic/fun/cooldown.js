const { connect, getData, setData, sheetsid, ranges } = require('../../../spreadsheet');

module.exports = {
	name: 'cooldown',
	description: 'Lower the cooldown on command usage by 10 seconds!',
	execute: async (message) => {

        if (message.channel.id === '843483374009188392') {

            const auth = await connect();

            let messageFlag = true;

            const getOptions = {
                spreadsheetId: sheetsid,
                range: ranges.eventCooldown,
            };

            let values = await getData(auth, getOptions);

            let currentCooldown = parseInt(values.values);

            if (currentCooldown <= 600) {
                message.channel.send(`If you're hoping for this to drop below 10minutes you're going to have to convince Nymiir`);
                messageFlag = false;
            }
            else {
                console.log(currentCooldown);
                currentCooldown -= 10;
            }

            if (currentCooldown < 600) {
                currentCooldown = 600;
            }

            values = [[
                currentCooldown,
            ]];

            const resource = {
                values,
            };

            const setOptions = {
                    spreadsheetId: sheetsid,
                    range: ranges.eventCooldown,
                    valueInputOption: "USER_ENTERED",
                    resource,
            };

            const response = await setData(auth, setOptions);

            const cooldownSeconds = currentCooldown % 60;
            const cooldownMinutes = (currentCooldown - cooldownSeconds) / 60;

            if (response && messageFlag) {
                message.channel.send(`${message.author} has **lowered** event cooldowns by 10 seconds. They can now be used every **${cooldownMinutes} minutes ${cooldownSeconds ? ' and ' + cooldownSeconds + ' seconds' : ''}**.`);
                return;
            }
        }
	},
};