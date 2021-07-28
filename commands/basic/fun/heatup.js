const { connect, getData, setData, sheetsid, ranges } = require('../../../spreadsheet');

module.exports = {
	name: 'heatup',
	description: 'Raise the cooldown on command usage by 8 seconds!',
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

            if (currentCooldown >= 1800) {
                message.channel.send(`What, is 30minutes not long enough for you?`);
                messageFlag = false;
            }
            else {
                console.log(currentCooldown);
                currentCooldown += 8;
            }

            if (currentCooldown > 1800) {
                currentCooldown = 1800;
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
                message.channel.send(`${message.author} has *raised* event cooldowns by 8 seconds. Now you have to wait every **${cooldownMinutes} minutes ${cooldownSeconds ? ' and ' + cooldownSeconds + ' seconds' : ''}** <:pikawat:852802625673625630>`);
                return;
            }
        }
	},
};