
let request = require('request-promise');
let config = require('./config');

/*
 * 這兩個值是固定的，一定要固定唷
 */
const eventType = '138311608800106203';
const toChannel = '1383378250';

module.exports = {

    /*
     * Facebook message 傳過來的資料
     */
    callback: function(req, res, next) {

        // 驗證這個 url 是否正確
        if (req.query['hub.verify_token'] === '阿不就好棒棒') {
            res.send(req.query['hub.challenge']);
        } else {
            res.send('Error, wrong validation token');    
        }
    }
};