
let request = require('request-promise');
let config = require('./config');

module.exports = {

    /*
     * Facebook message 傳過來的資料
     */
    verify: function(req, res, next) {
        // 驗證這個 url 是否正確
        if (req.query['hub.verify_token'] === '阿不就好棒棒') {
            return res.send(req.query['hub.challenge']);
        } else {
            return res.send('Error, wrong validation token');    
        }
    },

    /*
     * Facebook message
     */
    callback: function(req, res, next) {

        // 處理傳進來的訊息
        let messaging_events = req.body.entry[0].messaging; // 訊息的內容
        let sender; // 送出訊息的人
        let recipient; // 收到訊息的人

        // 處理發訊息，收訊息，訊息的內容
        for(let i = 0; i < messaging_events.length; i++) {
            let event = req.body.entry[0].messaging[i];
            sender = event.sender.id;
            recipient = event.recipient.id;
            if (event.message && event.message.text) {
                let text = event.message.text;
            }
        }

        // 要送出去的訊息格式
        let messageData = {
            text: 'JavaScript 好棒棒'
        };

        //  訊息選項
        let options = {
            method: 'POST',
            uri: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {
                access_token: config.facebook.accessToken
            },
            body: {
                message: messageData,
                recipient: {
                    id: sender
                }
            },
            json: true
        };

        // 送出訊息
        request(options)
            .then(function (body) {
                return res.status(200).send();
            })
            .catch(function (err) {
                console.log(err);
                return res.status(400).send();
            });
    }
};