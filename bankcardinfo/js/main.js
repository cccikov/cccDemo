requirejs(['js/index.js'], function (info) {
    var card = "6214620421000384932";
    info.getBankBin(card, function (err, data) {
        if (!err) { // 没有错误的时候
            console.dir(data);
            console.log(data.bankName);
        } else {
            console.log(err);
        }
    });
});