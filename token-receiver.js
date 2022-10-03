const axios = require('axios').default;
const { io } = require('socket.io-client')

const relysiaEndpoint = 'api.relysia.com';

(async () => {
    // Login into account
    const loginObject = await axios.post(`http://${relysiaEndpoint}/v1/auth`, {email: "viral@vaionex.com", password: "4m4z1ngT3ch"});
    console.log('Login completed', loginObject.data);
    // Connect websocket for this account
    const socket = io(`ws://${relysiaEndpoint}`, {
        extraHeaders: {
            authToken: loginObject.data.data.token,
        },
    });

    socket.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });

    // Listen for messages and log them as notification arrive
    socket.on('notification', function (message) {
        console.log('event received', message);
    })

    socket.on('connect', function(connection) {
        console.log('WebSocket Client Connected');

        
        socket.on('close', function() {
            console.log('echo-protocol Connection Closed');
        });
    });
})()