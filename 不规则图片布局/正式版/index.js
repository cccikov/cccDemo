$(function() {
    loadImg(function() {
        let data = getImgData();
        layout(data, true);
        $(window).on("resize", function() {
            layout(data);
        });
    });
});

/**
 * 函数之间的调用关系
 * loadImg
 *     getImgData
 *     layout
 *         group
 *         count
 *         column
 */

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
function layout(data, bool) {
    let arr = [];
    for (let i = 0, len = data.length; i < len; i++) {
        arr.push(data[i].mul);
    }

    let contentWidth = $(".content").width(); // 获取大容器宽度,会影响每排多少个图片
    let max = parseInt(contentWidth / 200); //每张图片宽度200px;
    let groupArr = group(arr, max); //将数据分组

    column(); //进行每排布局

    bool = bool || false;
    if (bool) { //由于有些情况是布局前会出现滚动条,而布局后,会没了滚动条,容器宽度就会有所变化,所以根据需求是否再次布局
        column();
    }

    function column() { //每排布局
        let beginIndex = 0; //开始下标 每排分别对应总图片的第几个开始
        let lastIndex = 0; //结束下标 每排分别对应总图片的第几个结束
        let columnMul, h, dataLen; //每排总宽度倍数,每排高度,每排图片数

        for (let i = 0, len = groupArr.length; i < len; i++) { //循环中的每次就是一组,就是一排
            columnMul = 0; //每排总宽度倍数归0
            dataLen = groupArr[i].length; //图片数更新
            lastIndex = beginIndex + dataLen //结束下标 = 开始下标 + 长度
            for (let j = 0; j < dataLen; j++) {
                columnMul += groupArr[i][j];
            }

            h = count(columnMul, dataLen, contentWidth); //计算每排高度
            $(".img-wrap img").slice(beginIndex, lastIndex).height(h); //找出每排图片,设置高度
            beginIndex = lastIndex; //这一组的结束下标 , 就是下一组的开始下标
        }
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

/**
 * 将数据进行分组 每组数据总和不超过max
 * @param  {obj} data 分组的数据
 * @param  {num} max  每组数据最大的总和
 * @return {arr}      分组好的数据
 */
function group(data, max) {
    let mulArr = []; //这是一个记录排信息的数组,数组里面的内容还是数组
    let columnMul = 0; //每排的总宽度
    let firstIndex = 0; //mulArr一级下标
    let secondIndex = 0; //mulArr二级下标

    for (let i = 0, len = data.length; i < len; i++) {
        columnMul += data[i]; //总宽度递加
        if (columnMul >= max) { //如果一排总宽度大于最大值
            columnMul = data[i]; // 如果加起来是大于最大值,那么data[i]应该就是属于下一组的了,所以columnMul = data[i]
            if (i != 0) { //这个做个判断,加入第一数据就超出了极限,那么下标就切换到下一排,就会导致第一组数据为空
                firstIndex++; //切换到下一排,所以mulArr一级下标+1
            }
            secondIndex = 0; //数据存储切到下一组,所以mulArr二级下标归0
        }
        if (secondIndex == 0) { //如果二级下标为0的时候,表明mulArr[firstIndex]的类型还没有定义
            mulArr[firstIndex] = []; //定义为数组
        }
        mulArr[firstIndex][secondIndex] = data[i]; //放入数据,这样也保证一排至少有个数据
        secondIndex++;
    }
    return mulArr;
}
