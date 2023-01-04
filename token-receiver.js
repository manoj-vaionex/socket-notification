const axios = require('axios').default;
const { io } = require('socket.io-client')

const relysiaEndpoint = 'api.relysia.com';

(async () => {
    // Login into account
    const loginObject = await axios.post(`https://${relysiaEndpoint}/v1/auth`, {email: "test14@vaionex.com", password: "123456"});
    console.log('Login completed', loginObject.data);
    // Connect websocket for this account
    const socket = io(`wss://${relysiaEndpoint}`, {
        extraHeaders: {
            authToken: loginObject.data.data.token,
        },
        transports: ['websocket', 'polling']
    });

    socket.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });

        // Listen for message and log them as notification arrive
    socket.on('notification', function (message) {
        console.log('event received', message);
    })

    // listen for balance and log them on balance arrive
    socket.on('balance', function (balance) {
        console.log('event received', balance);
    })

    // listen for history and log them on history arrive
    socket.on('history', function (history) {
        console.log('event received', history);
    })
    
    socket.on('connect', function(connection) {
        console.log('WebSocket Client Connected');

        
        socket.on('close', function() {
            console.log('echo-protocol Connection Closed');
        });
    });
})()