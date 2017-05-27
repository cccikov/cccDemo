$(function() {
    loadImg(function() {
        let data = getImgData();
        layout(data,true);
    });
});

/**
 * 检测是否全部图片load完
 * @param  {Function} callback load完的回调
 */
function loadImg(callback) {
    let loadImgNum = 0;
    $("img").on("load", function() {
        loadImgNum++;
        if (loadImgNum == $("img").size()) { //图片全部加载好了
            callback(); // 回调函数
        }
    });
}

/**
 * 获取图片信息
 * @return {arr} 获取了的图片信息
 */
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

/**
 * 图片布局
 * @param  {arr} data 获取的图片信息
 * @param  {Boolean} bool 是否再次布局
 */
function layout(data,bool) {
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
    let h = count(allMul, len, contentWidth);
    $(".img-wrap").height(h);

    bool = bool || false;
    if(bool){//由于有些情况是布局前会出现滚动条,而布局后,会没了滚动条,容器宽度就会有所变化,所以根据需求是否再次布局
        contentWidth = $(".content").width();
        h = count(allMul, len, contentWidth);
        $(".img-wrap").height(h);
    }
}

/**
 * 计算一排图片的高度
 * @param  {num} mul          宽度总倍数
 * @param  {num} len          一排图片的图片个数
 * @param  {num} contentWidth 大容器宽度
 * @return {num}              应该设置的图片高度
 */
function count(mul, len, contentWidth) {
    return (contentWidth - (len + 1) * 5) / mul; //一排图片的高度
}
