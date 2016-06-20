
/*
 * 處理 ssl 相關事務
 */
let config = require('./config.js');
let fs = require('fs');
let https = require('https');
let sslKey = fs.readFileSync(config.ssl.key, 'utf8');
let sslCrt = fs.readFileSync(config.ssl.cert, 'utf8');
let sslOptions = {
    key: sslKey,
    cert: sslCrt
};


/*
 * server
 */
let express = require('express');
let app = express();

/*
 * body parser 很重要，我卡了半天 Orz
 */
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*
 * Line Bot 會用到的相關端點
 */
let lineBot = require('./lineBot');

/*
 * Routers
 */
app.post('/line/callback', function(req, res, next) {
    console.log(req.body);
    return res.send(200);
});

/*
 * 啟動 server
 */
let httpsServer = https.createServer(sslOptions, app);
httpsServer.listen(3000);
console.log('Listen https server at port 3000');