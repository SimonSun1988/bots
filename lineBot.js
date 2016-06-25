
let request = require('request-promise');
let config = require('./config');
let co = require('co');
let Promise = require('bluebird');

/*
 * 這兩個值是固定的，一定要固定唷
 */
const eventType = '138311608800106203';
const toChannel = '1383378250';

module.exports = {

    /*
     * Line channal 傳過來的資料
     */
    callback: function(req, res, next) {

        // 1. 處理 line 傳過來的訊息
        let data = req.body.result[0]; // 從 channal post 過來的資料
        let text = data.content.text || '這不是文字訊息 Q____________Q'; // 得到的訊息資料
        let contentType = data.content.contentType; // 傳過來的資料類型
        let fromWho = data.content.from; // 誰傳過來的

        console.log(data);
        console.log('------------------------');

        // 2. 分辨不同的內容
        let content;
        switch(contentType) {
            case 1:
                content = {
                    toType: 1,
                    contentType: 1,
                    text: '你傳文字訊息給我'
                };
                break;
            case 2:
                content = {
                    toType: 1,
                    contentType: 1,
                    text: '你傳照片給我'
                };
                break;
            case 8:
                content = {
                    toType: 1,
                    contentType: 1,
                    text: '你傳貼圖給我'
                };
                break;
            default:
                content = {
                    toType: 1,
                    contentType: 1,
                    text: '我現在分別不出來你傳什麼碗糕給我'
                };
        }

        // 3. 組成回傳的物件
        let options = {
            method: 'POST',
            uri: 'https://trialbot-api.line.me/v1/events',
            body: {
                to: [fromWho],
                toChannel: toChannel,
                eventType: eventType,
                content: content
            },
            headers: {
                'Content-Type': 'application/json; charser=UTF-8',
                'X-Line-ChannelID': config.line.channelId,
                'X-Line-ChannelSecret': config.line.channelSecret,
                'X-Line-Trusted-User-With-ACL': config.line.channelMID
            },
            json: true
        };

        //  Slack webhook
        let slackOptions = {
            method: 'POST',
            uri: config.slack.webhook,
            body: JSON.stringify({text: text}),
            headers: {
                'Content-Type': 'application/json; charser=UTF-8'
            },
        };

        co(function*() {
            let results = yield [
                request(options),
                request(slackOptions)
            ];

            return Promise.resolve(results);
        })
        .then(function(results) {
            console.log(results[0]);
            console.log(results[1]);
            return res.status(200).send();
        })
        .catch(function(err) {
            console.log(err);
            return res.status(400).send();
        });
    }
};