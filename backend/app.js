const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const { read_state, write_state } = require('./state');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ port: 8080 });


wss.on("connection", ws => {
    console.log('Connected to WebSocket server');
    read_state()
        .then((content) => {
            ws.send(JSON.stringify({ 
                op: '10', 
                state: true ? content == 'true' : false 
            }));
        })
        .catch((err) => {
            console.log(err);
            ws.send(JSON.stringify({
                op: '10',
                state: ''
            }));
        });
    ws.on("message", (data) => {
        data = JSON.parse(data);
        if (data.op === '0') {
            ws.send(JSON.stringify({ op: '9', state: data.data }));
        } else if (data.op === '1') {
            if (!data.data) return;
            write_state(data.data.state ? "true" : "false")
                .then(() => {
                    ws.send(JSON.stringify({ message: 'Success', state: data.data }));
                })
                .catch((err) => {
                    console.log(err);
                    ws.send(JSON.stringify({ message: 'Error', state: '' }));
                });
        }
    })
})

server.listen(3100, () => {
    console.log('Server running');
})