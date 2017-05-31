$(function() {
    loadImg(function() {
        getDataAndLayout(true);
        $(window).on("resize", function() {
            getDataAndLayout(true);
        });
    });
});

/**
 * 检测是否全部图片load完
 * @param  {Function} callback load完的回调
 */
function loadImg(callback) {
    let loadImgNum = 0;
    $("img").css("opacity", 0);
    $("img").on("load", function() {
        loadImgNum++;
        if (loadImgNum == $("img").size()) { //图片全部加载好了
            callback(); // 回调函数
            $("img").css("opacity", 1);
        }
    });
}


function getDataAndLayout(bool) {
    //获取信息所需变量
    let allImgObj = $("img"),
        dataLen = allImgObj.length;

    // 获取限制信息
    let contentWidth = $(".content").width(); // 获取大容器宽度,会影响每排多少个图片
    let max = parseInt(contentWidth / 200); //每张图片宽度200px;

    // 分组
    let groupArr = [], //这是一个记录排信息的数组,数组里面的内容还是数组
        columnMul = 0, //每排的总宽度
        firstIndex = 0, //mulArr一级下标
        secondIndex = 0; //mulArr二级下标

    /**
     * 遍历
     */
    for (let i = 0; i < dataLen; i++) {

        // 获取数据
        let that = allImgObj.eq(i),
            w = that.width(),
            h = that.height(),
            mul = w / h;
        that.attr("data-mul", mul);

        // 分组
        columnMul += mul; //总宽度递加
        if (columnMul >= max) { //如果一排总宽度大于最大值
            columnMul = mul; // 如果加起来是大于最大值,那么mul应该就是属于下一组的了,所以columnMul = mul
            if (i != 0) { //这个做个判断,加入第一数据就超出了极限,那么下标就切换到下一排,就会导致第一组数据为空
                firstIndex++; //切换到下一排,所以mulArr一级下标+1
            }
            secondIndex = 0; //数据存储切到下一组,所以mulArr二级下标归0
        }
        if (secondIndex == 0) { //如果二级下标为0的时候,表明mulArr[firstIndex]的类型还没有定义
            groupArr[firstIndex] = []; //定义为数组
        }
        groupArr[firstIndex][secondIndex] = mul; //放入数据,这样也保证一排至少有个数据
        secondIndex++;
    }

    // 布局
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
            allImgObj.slice(beginIndex, lastIndex).height(h); //找出每排图片,设置高度
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

