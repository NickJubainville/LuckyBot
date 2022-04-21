const { google } = require('googleapis');

const keys = require('./credentials.json');

const sheetsid = '12H32mk28mfFVkxeWA4cipXqGHCx8uU_YTXHRRb6wCSM';

const ranges = {
  userData      : 'DATA!A1:S165',
  statusData    : 'DATA!A5:A165',
  // dieSides      : 'DATA!A162',
  // eventCooldown : 'DATA!B162',
  // eventValues   : 'DATA!A162:B162',
};

// Instantiate connection with Google Sheets API
function connect() {
  return new Promise((resolve, reject) => {
    const scope = ['https://www.googleapis.com/auth/spreadsheets'];
    const { client_email, private_key, private_key_id } = keys;
    const client = new google.auth.JWT(
      client_email,
      private_key_id,
      private_key,
      scope,
    );

    client.authorize((err) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(client);
      }
    });
  }).catch(function() {
    console.log('Promise Rejected');
  });
}

// Retrieve data from the specified sheet
function getData(client, options) {
  return new Promise((resolve, reject) => {
    const endpoint = google.sheets({ version: 'v4', auth: client });

    endpoint.spreadsheets.values.get(options, (err, data) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(data.data);
      }
    });
  }).catch(function() {
    console.log('Promise Rejected');
  });
}

function setData(client, options) {
  return new Promise((resolve, reject) => {
    const endpoint = google.sheets({ version: 'v4', auth: client });

    endpoint.spreadsheets.values.update(options, (err, data) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(data.data);
      }
    });
  }).catch(function() {
    console.log('Promise Rejected');
  });
}

module.exports = { connect, getData, setData, sheetsid, ranges };