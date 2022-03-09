require('dotenv').config();
let opentok = require('opentok');
let OT = new opentok(process.env.API_KEY, process.env.API_SECRET);

let token = OT.generateToken('1_MX40NzQ2MDgzMX5-MTY0Njg0OTI2OTg4N35XdXJmVkxCR0NIbFJVMGNnM2IxbG1tWVR-UH4', {role: 'publisher'});
console.log(token);
