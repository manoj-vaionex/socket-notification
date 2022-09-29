const axios = require('axios').default;

const relysiaEndpoint = 'https://dev.relysia.com';

(async () => {
    // Login int op account
    const loginObject = await axios.post(`${relysiaEndpoint}/v1/auth`, {email: "viral@vaionex.com", password: "4m4z1ngT3ch"});

    // Send BSV to the receiver address
    console.log('Sending BSV to the receiver address');
    const sendResp = await axios.post(`${relysiaEndpoint}/v1/send`, {
        "dataArray":[
           {
              "to":"1oGvamrRyL2qDsSHpLJKqBC8fEuoBAiUT", // Receiver address
              "amount": 0.0000005, // Amount to send
              "notes": "Good test token for BSV" // Notes to send
           }
        ]
     }, {headers: {
        authToken: loginObject.data.data.token, // Auth token of sender
        walletID: 'ec4ae905-c5ef-41bd-adfb-4db361093245', // Wallet Id of the sender
    }});

    console.log('Send completed', sendResp.data);
})()