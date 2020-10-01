const express = require('express');
const path = require('path');
require('dotenv').config();

// Appde express
const app = express();

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');



// http://localhost:3001/socket.io/socket.io.js
// path publico
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

server.listen(process.env.PORT, (err) => {
    if(err) throw new Error(err);
    console.log('servidor corriendo en el puerto: ', process.env.PORT);
});