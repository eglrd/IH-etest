var express = require('express'); // webserver serving prototype apps
var dotenv = require('dotenv'); // package loading .env configuration files
var request = require('request'); // initial request to get access_token
var morgan  = require('morgan'); // get/posts requests logger/tracker

var sandboxes = [
    {name: "Production", url: "https://apx.cisco.com/spvss/infinitehome/infinitetoolkit/v_sandbox_1/"},
    {name: "Dev", url: "https://apx.cisco.com/spvss/infinitehome/infinitetoolkit/v_sandbox_1/"},
    {name: "IBC", url: "https://apx.cisco.com/spvss/infinitehome/infinitetoolkit/v2_ibc_2016/"}
];

var access_token;
var token_type;
var expires_in;

// loading env variables
dotenv.load();
console.log(process.env.DEFAULT_CLIENT_ID);

// performing initial SSO, retreaving access_token
request.post({
    url: 'https://cloudsso.cisco.com/as/token.oauth2',
    form: {
        'client_id': process.env.DEFAULT_CLIENT_ID,
        'client_secret': process.env.DEFAULT_CLIENT_SECRET,
        'grant_type': "client_credentials"
    },
    body: "test"
}, function(error, response, body) {
    if (!error && response.statusCode == 200) { // TODO will need to manage errors...
        body= JSON.parse(body);

        access_token=body.access_token;
        token_type=body.token_type;
        expires_in= body.expires_in;

        console.log(access_token);
        console.log(token_type);
        console.log(expires_in);
    }
});


// webserver serving the client application(s)
var app = express();
app.use(express.static('public'));
app.use(morgan('dev')); //logging post/get requests to the express server
var server = app.listen(3000);
