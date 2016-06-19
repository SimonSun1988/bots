
/*
 * 處理 ssl 相關事務
 */
const config = require('./config.js');
const fs = require('fs');
const https = require('https');
const sslKey = fs.readFileSync(config.ssl.key, 'utf8');
const sslCrt = fs.readFileSync(config.ssl.cert, 'utf8');
const sslOptions = {
    key: sslKey,
    cert: sslCrt
};


/*
 * server
 */
const express = require('express');
const app = express();

/*
 * Line Bot 會用到的相關端點
 */
const lineBot = require('./lineBot');

/*
 * Routers
 */
app.post('/line/callback', lineBot.callback);

/*
 * 啟動 server
 */
const httpsServer = https.createServer(sslOptions, app);
httpsServer.listen(3000);
console.log('Listen https server at port 3000');