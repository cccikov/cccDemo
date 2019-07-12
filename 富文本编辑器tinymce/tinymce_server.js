var express = require("express");
var app = express();
var path = require("path");

var multer = require('multer')

var storage = multer.diskStorage({

    // destination - 存储在哪个文件夹。可以是函数，可以是字符串
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, "./img"));
    },
    // destination: "uploads",

    // 存储文件名
    filename: function (req, file, cb) {
        var nameToArr = file.originalname.split(".");
        nameToArr[0] += '-' + Date.now();
        var name = nameToArr.join(".");
        cb(null, name);
    }
});

var upload = multer({
    /* dest or storage 二选一 */
    // dest: 'uploads/',
    storage: storage
});


/**
 * 上传多个文件
 * .array(fieldname[, maxCount])
 * 接受一个以 fieldname 命名的文件数组。可以配置 maxCount 来限制上传的最大数量。这些文件的信息保存在 req.files。
 *
 * fieldname--Field name 由表单指定的 name
 */
app.post("/multiple", upload.array('file'), (req, res, next) => {
    res.send({
        files: req.files,
        body: req.body,
    });
});

app.use(express.static(path.resolve(__dirname, "./"), {
    index: "./tinymce2.html"
})); // 以当前文件夹作为静态资源根目录

console.log("\n 启动服务 localhost:3000 \n");
app.listen(3000);