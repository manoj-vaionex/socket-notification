const axios = require('axios').default;

const relysiaEndpoint = 'https://api.relysia.com';

(async () => {
    // Login int op account
    const loginObject = await axios.post(`${relysiaEndpoint}/v1/auth`, {email: "test15@vaionex.com", password: "123456"});

    // Send BSV to the receiver address
    console.log('Sending BSV to the receiver address');
    const sendResp = await axios.post(`${relysiaEndpoint}/v1/send`, {
        "dataArray":[
           {
              "to":"1QDUCAWWmQqzp5kgEJqa1BqeyjtHaxhMe4", // Receiver address
              "amount": 0.0000001, // Amount to send
              "notes": "Good test token for BSV" // Notes to send
           }
        ]
     }, {headers: {
        authToken: loginObject.data.data.token, // Auth token of sender
        walletID: '00000000-0000-0000-0000-000000000000', // Wallet Id of the sender
    }});

    console.log('Send completed', sendResp.data);
})()