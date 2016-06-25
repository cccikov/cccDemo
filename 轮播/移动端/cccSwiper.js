// 轮播 obj滚动的对象，btn包住span.btn-item的对象，perWidth一个画面的宽度，num滑动的个数


function swiper(obj, btn, perWidth, num) {
	var timer = null;
	var index = 0;

	obj.on("touchstart", function(e) {

		autoStop();

		obj.stop();
		var allMove = 0; //总共改变量
		var ago = now = touchPoint = e.originalEvent.touches[0].clientX;
		var moveLeft = 0; //每次需要设置
		var posiLeft = $(this).position().left;
		var deltaX = 0; //每次改变量
		// var perWidth = obj.find(".img-item").width();

		$(window).off("touchmove").on("touchmove", function(e) { //应该是window而非obj
			now = e.originalEvent.touches[0].clientX;
			deltaX = now - ago;
			posiLeft = obj.position().left;
			moveLeft = posiLeft + deltaX;
			// 用于限定滑动的极限
			if (moveLeft > 130) {
				moveLeft = 130;
			} else if (moveLeft < -(num - 1) * perWidth - 130) {
				moveLeft = -(num - 1) * perWidth - 130;
			}
			obj.css("left", moveLeft);
			ago = now;
			allMove = now - touchPoint;
		});
		
		// 如果有多swiper的时候一定放进touchstart里面，不然会被别的swiper off了touchend事件
		$(window).off("touchend").on("touchend", function() {
			console.log(allMove);

			$(window).off("touchmove"); //一定要清除这个事件，不然在obj外面也可以滑动；
			if (allMove < -120) {
				next();
			} else if (allMove > 120) {
				prev();
			} else {//距离不够，退回原来
				obj.animate({"left": -index * perWidth}, 300); //退回原来位置，要做到移动的时候点击无效，或者点击的时候，这个动画取消。(已解决，在点击的时候加了一个obj.stop()用来停止，如果不加，连续多次点击再拖会出现抖动，是因为退回原来位置与touchmove里面的方法冲突)
			}
			allMove = 0; //要清零，不然window一直touchend，就会一直滚动
		});
	});
	
	obj.on("touchend", function() {
		autoGo();
	})
	

	function next() {
		index++;
		if (index > num - 1) {
			index = 0;
		}
		btn.find(".btn-item").eq(index).addClass("active").siblings().removeClass("active");
		obj.animate({
			"left": -index * perWidth
		}, 300);
	}

	function prev() {
		index--;
		if (index < 0) {
			index = num - 1;
		}
		btn.find(".btn-item").eq(index).addClass("active").siblings().removeClass("active");
		obj.animate({
			"left": -index * perWidth
		}, 300);
	}

	function autoGo() {
		timer = setInterval(function() {
			next();
		}, 5000);
	}
	autoGo();

	function autoStop() {
		clearInterval(timer);
	}
};


/*
*
* 性能不是很好 ，尝试用transform改动
*
*/ 


function swiper2(param) {
	var timer = null;
	var index = 0;

	var obj = param.obj;
	var btn = param.btn;
	var perWidth = param.perWidth;
	var num = param.num;

	obj.on("touchstart", function(e) {

		autoStop();
		obj.stop();

		var oldPX = newPX = touchPX = e.originalEvent.touches[0].clientX;//上次move的点，这次move的点，touchstart时的点
		var moveX = 0; //每次需要设置的移动量
		var Eleft = $(this).position().left; //element的左偏移
		var deltaX = 0; //每次move改变量
		var allMove = 0; //touchstart 到 touchend 的总移动改变量
		// var perWidth = obj.find(".img-item").width();//一个轮播画面的跨度

		$(window).off("touchmove").on("touchmove", function(e) { //应该是window而非obj
			newPX = e.originalEvent.touches[0].clientX;
			deltaX = newPX - oldPX;
			Eleft = obj.position().left;
			moveX = Eleft + deltaX;
			// 用于限定滑动的极限
			if (moveX > 130) {
				moveX = 130;
			} else if (moveX < -(num - 1) * perWidth - 130) {
				moveX = -(num - 1) * perWidth - 130;
			}
			obj.css("left", moveX);
			oldPX = newPX;
			allMove = newPX - touchPX;
		});
		
		// 如果有多swiper的时候一定放进touchstart里面，不然会被别的swiper off了touchend事件
		$(window).off("touchend").on("touchend", function() {
			console.log(allMove);

			$(window).off("touchmove"); //一定要清除这个事件，不然在obj外面也可以滑动；
			if (allMove < -120) {
				next();
			} else if (allMove > 120) {
				prev();
			} else {//距离不够，退回原来
				obj.animate({"left": -index * perWidth}, 300); //退回原来位置，要做到移动的时候点击无效，或者点击的时候，这个动画取消。(已解决，在点击的时候加了一个obj.stop()用来停止，如果不加，连续多次点击再拖会出现抖动，是因为退回原来位置与touchmove里面的方法冲突)
			}
			allMove = 0; //要清零，不然window一直touchend，就会一直滚动
		});
	});
	
	obj.on("touchend", function() {
		autoGo();
	})
	

	function next() {
		index++;
		if (index > num - 1) {
			index = 0;
		}
		btn.find(".btn-item").eq(index).addClass("active").siblings().removeClass("active");
		obj.animate({
			"left": -index * perWidth
		}, 300);
	}

	function prev() {
		index--;
		if (index < 0) {
			index = num - 1;
		}
		btn.find(".btn-item").eq(index).addClass("active").siblings().removeClass("active");
		obj.animate({
			"left": -index * perWidth
		}, 300);
	}

	function autoGo() {
		timer = setInterval(function() {
			next();
		}, 5000);
	}
	autoGo();

	function autoStop() {
		clearInterval(timer);
	}
};


function swiper3(param) {
	var timer = null;
	var index = 0;

	var obj = param.obj;
	var imgList = obj.find(".img-list");
	var btnList = obj.find(".btn-list");
	var imgItem = imgList.find(".img-item");
	var btnItem = btnList.find(".btn-item");

	console.log(btnList,btnItem);

	var perWidth = imgItem.width();
	var num = imgItem.length;

	imgList.on("touchstart", function(e) {

		autoStop();
		imgList.stop();

		var oldPX = newPX = touchPX = e.originalEvent.touches[0].clientX;//上次move的点，这次move的点，touchstart时的点
		var moveX = 0; //每次需要设置的移动量
		var Eleft = $(this).position().left; //element的左偏移
		var deltaX = 0; //每次move改变量
		var allMove = 0; //touchstart 到 touchend 的总移动改变量
		// var perWidth = imgList.find(".img-item").width();//一个轮播画面的跨度

		$(window).off("touchmove").on("touchmove", function(e) { //应该是window而非imgList
			newPX = e.originalEvent.touches[0].clientX;
			deltaX = newPX - oldPX;
			Eleft = imgList.position().left;
			moveX = Eleft + deltaX;
			// 用于限定滑动的极限
			if (moveX > 130) {
				moveX = 130;
			} else if (moveX < -(num - 1) * perWidth - 130) {
				moveX = -(num - 1) * perWidth - 130;
			}
			imgList.css("left", moveX);
			oldPX = newPX;
			allMove = newPX - touchPX;
		});
		
		// 如果有多swiper的时候一定放进touchstart里面，不然会被别的swiper off了touchend事件
		$(window).off("touchend").on("touchend", function() {
			console.log(allMove);

			$(window).off("touchmove"); //一定要清除这个事件，不然在imgList外面也可以滑动；
			if (allMove < -120) {
				next();
			} else if (allMove > 120) {
				prev();
			} else {//距离不够，退回原来
				imgList.animate({"left": -index * perWidth}, 300); //退回原来位置，要做到移动的时候点击无效，或者点击的时候，这个动画取消。(已解决，在点击的时候加了一个imgList.stop()用来停止，如果不加，连续多次点击再拖会出现抖动，是因为退回原来位置与touchmove里面的方法冲突)
			}
			allMove = 0; //要清零，不然window一直touchend，就会一直滚动
		});
	});
	
	imgList.on("touchend", function() {
		autoGo();
	})

	function next() {
		index++;
		if (index > num - 1) {
			index = 0;
		}
		btnItem.eq(index).addClass("active").siblings().removeClass("active");
		imgList.animate({
			"left": -index * perWidth
		}, 300);
	}

	function prev() {
		index--;
		if (index < 0) {
			index = num - 1;
		}
		btnItem.eq(index).addClass("active").siblings().removeClass("active");
		imgList.animate({
			"left": -index * perWidth
		}, 300);
	}

	function autoGo() {
		timer = setInterval(function() {
			next();
		}, 5000);
	}
	autoGo();

	function autoStop() {
		clearInterval(timer);
	}
};