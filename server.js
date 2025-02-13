const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require("cors");

const app = express();
app.use(cors());
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('✅ New WebSocket Connection');

    ws.on('message', (message) => {
        console.log(`📩 Received: ${message}`);
        ws.send(`Echo: ${message}`);  // Send back the same message
    });

    ws.on('close', () => {
        console.log('❌ WebSocket Disconnected');
    });
});

const PORT = process.env.PORT || 3000;  // Render provides a PORT env variable
server.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
