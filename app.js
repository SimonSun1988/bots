
/*
 * 處理 ssl 相關事務
 */
const fs = require('fs');
const https = require('https');
const sslKey = fs.readFileSync('./ssl/XXX.key', 'utf8');
const sslCrt = fs.readFileSync('./ssl/real.crt', 'utf8');
const sslOptions = {
    key: sslKey,
    cert: sslCrt
};


/*
 * server
 */
const express = require('express');
const app = express();
const lineBot = require('./lineBot');

/*
 * 處理 router
 */
app.get('/line/test', lineBot.test);

/*
 * 啟動 server
 */
const httpsServer = https.createServer(sslOptions, app);
httpsServer.listen(3000);
console.log('Listen https server at port 3000');