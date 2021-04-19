const { google } = require('googleapis');

const keys = require('./credentials.json');

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
  });
}

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
  });
}

module.exports = { connect, getData };
