const express = require('express');
const basicAuth = require('express-basic-auth');

const app = express();

app.use(basicAuth({
    users: { 'admin': 'pass' },
    challenge: true,
    unauthorizedResponse: getUnauthorizedResponse
}));

function getUnauthorizedResponse(req) {
    return req.auth ?
        ('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected') :
        'No credentials provided'
};

app.get('/', function (req, res) {
    res.send('Hello World');
 })

const server = app.listen(3000, function () {
    console.log("Example app listening at http://localhost:3000")
});
