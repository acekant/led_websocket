const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors()); // Enable CORS
app.use(express.json()); // Support JSON requests

// ✅ Handle Root Request
app.get('/', (req, res) => {
  res.send('WebSocket Server is Running 🚀');
});

// ✅ WebSocket Connection
wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.send('Hello from server');

    ws.on('message', (message) => {
        console.log(`Received: ${message}`);

        // ✅ Broadcast message to all connected clients (including ESP32)
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// ✅ Start Server
const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
