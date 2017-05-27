$(function() {
    loadImg(function() {
        let data = getImgData();
        layout(data);
        data = getImgData();
        layout(data);
    });
});

function loadImg(callback) {
    let loadImgNum = 0;
    $("img").on("load", function() {
        loadImgNum++;
        if (loadImgNum == $("img").size()) { //图片全部加载好了
            callback(); // 回调函数
        }
    });
}

function getImgData() {
    let arr = [];
    $("img").each(function() {
        let that = $(this);
        let w = that.width();
        let h = that.height();
        let mul = w / h;
        let obj = {
            "src": that.attr("src"),
            "w": w,
            "h": h,
            "mul": mul
        };
        arr.push(obj);
        that.attr("data-msg", JSON.stringify(obj));
    });
    return arr;
}

function layout(data) {
    let arr = [];
    for (let i = 0, len = data.length; i < len; i++) {
        arr.push(data[i].mul);
    }
    let allMul = 0;
    for (let i = 0, len = arr.length; i < len; i++) {
        allMul += arr[i];
    }

    let contentWidth = $(".content").width();
    let len = arr.length;
    console.log(allMul, len, contentWidth);
    let h = count(allMul, len, contentWidth);
    $(".img-wrap").height(h);

}

function count(mul, len, contentWidth) {
    console.log((contentWidth - (len + 1) * 5),mul);
    return (contentWidth - (len + 1) * 5) / mul; //一排图片的高度
}
