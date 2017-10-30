'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const cobolscript = require('cobolscript');


const hookConsoleLog = (logs) => {
    console.log = (d) => logs.push(d);
};


const defaultAccessToken = 'defaultValue';
const defaultSecret = 'defaultValue';
//const defaultAccessToken = 'Meibx80EfJcZLqbykv+AjhxA3NeCwGD7fdRLVX9BijrRYN/ePVuZX7M4Z2XZy8esN5NVJ6EbBESBDuI9/f+up2VOD69zd3zXJuCbgpQtB4Ef7ztNA8WSgCz1Xt5HD7if30pnDA1J14WmluhzR3c1mwdB04t89/1O/w1cDnyilFU=';
//const defaultSecret = '413829a91d6b1579b452c44969153e2d';

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || defaultAccessToken,
  channelSecret: process.env.CHANNEL_SECRET || defaultSecret,
};

const client = new line.Client(config);

const app = express();

process.on('unhandledRejection', console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  var logs = [];
  var program = cobolscript.compileProgramFile('./hello.cob');

  hookConsoleLog(logs);
  program.run(cobolscript.getRuntime());

  var msgtext = event.message.text + '\n' + logs.join('\n'); 
  const echo = { type: 'text', text: msgtext };

  return client.replyMessage(event.replyToken, echo);
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
