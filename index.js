const express = require('express')
const bodyParser = require('body-parser')
const snek = require('snekfetch')
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.post('/fact', async function (req, res) {
    var num = await req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "There seems to be a problem. Please try again."
    console.log(num)
    var send = await snek.get(`http://numbersapi.com/${num}`)
    await console.log(send.text)
    req.body.result.parameters.echoText = send.text
    var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "There seems to be a problem. Please try again."
    await res.json({
        speech: speech,
        displayText: speech,
        source: 'number-fact',
        expectUserResponse: false
    })
})

app.listen((process.env.PORT || 8000), function () {
    console.log("Server up and listening");
})