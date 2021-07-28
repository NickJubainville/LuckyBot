const { connect, getData, setData, sheetsid, ranges } = require('../../../spreadsheet');

module.exports = {
	name: 'sabotage',
	description: 'You can add 15 sides to the die and make everyone like you a little less!',
	execute: async (message) => {

        if (message.channel.id === '843483374009188392') {

            const auth = await connect();

            let messageFlag = true;

            const getOptions = {
                spreadsheetId: sheetsid,
                range: ranges.dieSides,
            };

            let values = await getData(auth, getOptions);

            let currentLevel = parseInt(values.values);

            if (currentLevel >= 10000) {
                message.channel.send(`Looks like it's back up to 10000. I don't think you're playing this right...`);
                messageFlag = false;
            }
            else {
                console.log(currentLevel);
                currentLevel += 15;
            }

            if (currentLevel > 10000) {
                currentLevel = 10000;
            }

            values = [[
                currentLevel,
            ]];

            const resource = {
                values,
            };

            const setOptions = {
                    spreadsheetId: sheetsid,
                    range: ranges.dieSides,
                    valueInputOption: "USER_ENTERED",
                    resource,
            };

            const response = await setData(auth, setOptions);

            if (response && messageFlag) {
                message.channel.send(`Your sabotage has added 15 sides to the die, it's now up to ${currentLevel}! Everyone throw rocks at ${message.author}.`);
                return;
            }
        }
	},
};