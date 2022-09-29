const axios = require('axios').default;
const WebSocketClient = require('websocket').client;

const relysiaEndpoint = 'dev.relysia.com';

(async () => {
    // Login into account
    const loginObject = await axios.post(`https://${relysiaEndpoint}/v1/auth`, {email: "test16@gmail.com", password: "123456"});
    console.log('Login completed', loginObject.data);
    // Connect websocket for this account
    const client = new WebSocketClient();
    client.connect(`wss://${relysiaEndpoint}/websocket-connection`, null, null, {authToken: loginObject.data.data.token});

    client.on('connect', function(connection) {
        console.log('WebSocket Client Connected');

        connection.on('error', function(error) {
            console.log("Connection Error: " + error.toString());
        });
        connection.on('close', function() {
            console.log('echo-protocol Connection Closed');
        });

        // Listen for messages and log them as notification arrive
        connection.on('message', function(message) {
            const data = JSON.parse(message.utf8Data);
            console.log('Socket event received: ', data);
        });
    });
})()