const express = require('express');
const { admin } = require('../../../config/vars');

const router = express.Router();
const http = require('http').Server(router);
const io = require('socket.io')(http);

router.get('/status', (req, res) => res.send('OK'));

io.on('connection', function(socket){
    admin.auth().verifyIdToken(idToken)
        .then(function(decodedToken) {
            var uid = decodedToken.uid;
            console.log('a user connected');
        }).catch(function(error) {
        // Handle error
    });
});

module.exports = router;
