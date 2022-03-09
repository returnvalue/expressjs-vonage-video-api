require('dotenv').config();
let express = require('express');
let nedb = require('nedb');
let nunjucks = require('nunjucks');
let opentok = require('opentok');

let app = express();
let sessionsDb = new nedb({filename: 'sessions.db', autoload: true});
nunjucks.configure('views', {autoescape: true, express: app});
let OT = new opentok(process.env.API_KEY, process.env.API_SECRET);

app.get('/:room', function (req, res) {
    sessionsDb.findOne({name: req.params.room}, function (error, room) {
        if (room) {
            let token = OT.generateToken(room.sessionId, {role: 'publisher'});
            res.render('room.html', {
                apiKey: process.env.API_KEY,
                sessionId: room.sessionId,
                token: token,
                room: req.params.room
            });
        } else {
            OT.createSession(function (error, result) {
                sessionsDb.insert({
                    name: req.params.room, sessionId: result.sessionId,
                })

                let token = OT.generateToken(result.sessionId, {role: 'publisher'});
                res.render('room.html', {
                    apiKey: process.env.API_KEY,
                    sessionId: result.sessionId,
                    token: token,
                    room: req.params.room
                });
            })
        }
    })
});

app.listen(3000);
