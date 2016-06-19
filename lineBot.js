
module.exports = {

    /*
     * 用來註冊 line bot 驗證網址用的
     */
    test: function(req, res, next) {
        res.status(200);
        return res.send('ok');
    },

};