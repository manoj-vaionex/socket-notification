const axios = require('axios').default;
const { io } = require('socket.io-client')

const relysiaEndpoint = 'api.relysia.com';

(async () => {
    // Login into account
    const loginObject = await axios.post(`https://${relysiaEndpoint}/v1/auth`, { email: "test14@vaionex.com", password: "123456" });
    console.log('Login completed', loginObject.data);
    // Connect websocket for this account
    const socket = io(`wss://${relysiaEndpoint}`, {
        auth: {
            authtoken: loginObject.data.data.token,
            // serviceId: 'your service id' // It's optional parameter if you want to connect to specific serviceId than you can pass it here
        },
        transports: [ 'websocket', 'polling' ],
    });

    socket.on('error', function(error) {
        console.log("Connection Error: " + error);
    });

    // Listen for messages and log them as notification arrive
    socket.on('notification', function (message) {
        console.log('event received', message);
    })

    socket.on('connect_error', function() {
        console.log('connection error')
    });

    socket.on('disconnect', function(reason) {
        console.log('sokcet disconnect', reason);
    });

    socket.on('connect', function(connection) {
        console.log('WebSocket Client Connected');
    });
            
    socket.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
})()