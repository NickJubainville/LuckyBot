const { connect, getData, sheetsid, ranges } = require('../../../spreadsheet');

module.exports = {
	name: 'status',
	description: 'Checks if there are any openings in Lucky',
	aliases: ['apply'],
	execute: async (message) => {

		const auth = await connect();

        const options = {
            spreadsheetId: sheetsid,
            range: ranges.statusData,
            };

        const { values } = await getData(auth, options).catch(error => console.error(error));

        let found = 0;

        for (let i = 0; i < values.length; i++) {
            const item = values[i];
            const itemLower = item.toString();
                if (itemLower.includes("*")) {
                found++;
            }
        }

        // If any *'s are found in the spreadsheet in the A column, it marks an available spot. Therefore, send a message based on number of openings
        switch (found) {
            case 0:
                return message.channel.send(`Lucky has 5 open slots. If you're still interested in joining please let Nymiir or one of our leaders know.`);

            case 1:
                return message.channel.send(`Lucky has ${found} open slot. If you're still interested in joining please let Nymiir or one of our leaders know.`);

            default:
                return message.channel.send(`Lucky has ${found} open slots. If you're still interested in joining please let Nymiir or one of our leaders know.`);
        }
	},
};