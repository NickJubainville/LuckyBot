const { connect, getData, setData, sheetsid, ranges } = require('../../../spreadsheet');

module.exports = {
	name: 'level',
	description: 'You can remove 25 sides from the die making it easier for everyone!',
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

            if (currentLevel <= 1000) {
                message.channel.send(`Roll has already reached max level!`);
                messageFlag = false;
            }
            else {
                console.log(currentLevel);
                currentLevel -= 25;
            }

            if (currentLevel < 1000) {
                currentLevel = 1000;
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
                message.channel.send(`You put 1 point into roll, ${message.author}. There are now ${currentLevel} sides!`);
                return;
            }
        }
	},
};