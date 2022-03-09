require('dotenv').config();
let opentok = require('opentok');
let OT = new opentok(process.env.API_KEY, process.env.API_SECRET);

OT.createSession(function (error, result) {
    console.log(result);
});
