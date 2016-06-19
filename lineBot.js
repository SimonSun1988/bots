


module.exports = {

    /*
     * Line channal 傳過來的資料
     */
    callback: function(req, res, next) {

        let data = req.body.result[0]; // 從 channal post 過來的資料
        let contentType = data.content.contentType; // 傳過來的資料類型
        let fromWho = data.content.from; // 誰傳過來的
        let toChannel = data.toChannel; // 哪個 channel
        const eventType = '138311608800106203'; // 固定的值(我原本以為是隨機的，直到我膝蓋中了一箭)

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

        res.status(200);
        return res.send('ok');
    },

};