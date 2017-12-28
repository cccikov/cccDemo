// nodejs 版本
var info = require('bankcardinfo');

info.getBankBin('6214620421000384932', function (err, data) {
    if (!err) { // 没有错误的时候
        console.dir(data);
        console.log(data.bankName);
    } else {
        console.log(err);
    }
});

// promise 方式调用, 2.0.0 及以上版本支持
info.getBankBin('6227003320240034988')
    .then(function (data) {
        console.dir(data);
        console.log(data.bankName);
    })
    .catch(function (err) {
        console.log(err);
    });