function cccPerfectSwiper(param) {
	var timer = null;
	var raf = null;//requestAnimationFrame
	var index = 0;

	var obj = param.obj;
	var imgList = obj.find(".img-list");
	var btnList = obj.find(".btn-list");
	var imgItem = imgList.find(".img-item");
	var btnItem = btnList.find(".btn-item");

	var perWidth = imgItem.width();//一个轮播画面的跨度
	var num = imgItem.length;

	var moveX = 0; //transform 偏移量

	imgList.on("touchstart", function(e) {

		autoStop();
		window.cancelAnimationFrame(raf)//本来是在tab函数里面的，但是这样的话，在动画过程中，图片是无法随着手指移动而移动，所以经过考虑，还是放在这里比较好

		var oldPX = newPX = touchPX = e.originalEvent.touches[0].clientX;//上次move的点，这次move的点，touchstart时的点

		var deltaX = 0; //每次move改变量
		var allMove = 0; //touchstart 到 touchend 的总移动改变量

		$(window).off("touchmove").on("touchmove", function(e) { //应该是window而非imgList
			newPX = e.originalEvent.touches[0].clientX;
			deltaX = newPX - oldPX;
			moveX += deltaX;
			// 用于限定滑动的极限
			if (moveX > 130) {
				moveX = 130;
			} else if (moveX < -(num - 1) * perWidth - 130) {
				moveX = -(num - 1) * perWidth - 130;
			}

			imgList.css("transform", "translate3d("+moveX+"px,0,0)");
			oldPX = newPX;
			allMove = newPX - touchPX;
		});
		
		// 如果有多swiper的时候一定放进touchstart里面，不然会被别的swiper off了touchend事件
		$(window).off("touchend").on("touchend", function() {
			$(window).off("touchmove"); //一定要清除这个事件，不然在imgList外面也可以滑动；
			if (allMove <= -1) {
				next();
			} else if (allMove >= 1) {
				prev();
			} 
			// else {//距离不够，退回原来
			// 	moveX = -index * perWidth;
			// 	console.log(moveX);
			// 	// imgList.animate({"transform":"translate3d("+moveX+"px,0,0)"}); //退回原来位置，要做到移动的时候点击无效，或者点击的时候，这个动画取消。(已解决，在点击的时候加了一个imgList.stop()用来停止，如果不加，连续多次点击再拖会出现抖动，是因为退回原来位置与touchmove里面的方法冲突)
			// }
			allMove = 0; //要清零，不然window一直touchend，就会一直滚动
		});
	});
	
	function tab(){
		// window.cancelAnimationFrame(raf);//这样才不会还没走完就触发多个raf(改为点击的时候就停止)
		var t = 0;
		var start = moveX;
		var change = -index * perWidth - moveX;
		var maxT = 20;
		function move(){
			t++;
			moveX = change * t / maxT + start;
			imgList.css("transform", "translate3d("+moveX+"px,0,0)");
			raf = window.requestAnimationFrame(move);
			if(t>=maxT){
				window.cancelAnimationFrame(raf);
			}
		}
		raf = window.requestAnimationFrame(move);
	}

	function next() {
		index++;
		if (index > num - 1) {
			index = 0;
		}
		tab();
		btnItem.eq(index).addClass("active").siblings().removeClass("active");
	}

	function prev() {
		index--;
		if (index < 0) {
			index = num - 1;
		}
		tab();
		btnItem.eq(index).addClass("active").siblings().removeClass("active");
	}

	function autoGo() {
		timer = setInterval(function() {
			next();
		}, 5000);
	}
	autoGo();

	imgList.on("touchend", function() {
		autoGo();
	})

	function autoStop() {
		clearInterval(timer);
	}
};
/*除了微信，qq浏览器之外，还挺好的了，然后这个版本是只要移动了1px都会滚屏，下面打算做一个要超过一定数字才滚屏，否则回到原位的版本*/ 




function cccPerfectSwiper2(param) {
	var timer = null;
	var raf = null;//requestAnimationFrame
	var index = 0;

	var obj = param.obj;
	var imgList = obj.find(".img-list");
	var btnList = obj.find(".btn-list");
	var imgItem = imgList.find(".img-item");
	var btnItem = btnList.find(".btn-item");

	var perWidth = imgItem.width();//一个轮播画面的跨度
	var num = imgItem.length;

	var moveX = 0; //transform 偏移量

	imgList.on("touchstart", function(e) {

		autoStop();
		window.cancelAnimationFrame(raf);

		var oldPX = newPX = touchPX = e.originalEvent.touches[0].clientX;//上次move的点，这次move的点，touchstart时的点

		var deltaX = 0; //每次move改变量
		var allMove = 0; //touchstart 到 touchend 的总移动改变量

		$(window).off("touchmove").on("touchmove", function(e) { //应该是window而非imgList
			newPX = e.originalEvent.touches[0].clientX;
			deltaX = newPX - oldPX;
			moveX += deltaX;
			// 用于限定滑动的极限
			if (moveX > 130) {
				moveX = 130;
			} else if (moveX < -(num - 1) * perWidth - 130) {
				moveX = -(num - 1) * perWidth - 130;
			}

			imgList.css("transform", "translate3d("+moveX+"px,0,0)");
			oldPX = newPX;
			allMove = newPX - touchPX;
		});
		
		// 如果有多swiper的时候一定放进touchstart里面，不然会被别的swiper off了touchend事件
		$(window).off("touchend").on("touchend", function() {
			$(window).off("touchmove"); //一定要清除这个事件，不然在imgList外面也可以滑动；
			if (allMove < -120) {
				next();
			} else if (allMove > 120) {
				prev();
			} 
			else {//距离不够，退回原来
				tab();
			}
			allMove = 0; //要清零，不然window一直touchend，就会一直滚动
		});
	});
	
	function tab(){
		// window.cancelAnimationFrame(raf);//这样才不会还没走完就触发多个raf
		var t = 0;
		var start = moveX;
		var change = -index * perWidth - moveX;
		var maxT = 25;
		function move(){
			t++;
			moveX = change * t / maxT + start;
			imgList.css("transform", "translate3d("+moveX+"px,0,0)");
			raf = window.requestAnimationFrame(move);
			if(t>=maxT){
				window.cancelAnimationFrame(raf);
			}
		}
		raf = window.requestAnimationFrame(move);
	}

	function next() {
		index++;
		if (index > num - 1) {
			index = 0;
		}
		tab();
		btnItem.eq(index).addClass("active").siblings().removeClass("active");
	}

	function prev() {
		index--;
		if (index < 0) {
			index = num - 1;
		}
		tab();
		btnItem.eq(index).addClass("active").siblings().removeClass("active");
	}

	function autoGo() {
		timer = setInterval(function() {
			next();
		}, 5000);
	}
	autoGo();

	imgList.on("touchend", function() {
		autoGo();
	})

	function autoStop() {
		clearInterval(timer);
	}
};


/*好了，差不多可以写插件了*/ 
if(!ccc){
	var ccc = {};
}
ccc.swiper = function(param) {
	var obj = param.obj;
	var maxT = param.maxT || 25;//设置移动总帧数，帧数越少，越快，可选，默认,25帧
	var backPX = param.backPX || 0;//设置至少滑动多少距离才会滚屏，可选，默认，一移动就滚屏
	var tween = param.tween;//timing-function
	if(!tween){
		var timingFun = function(t,b,c,d){
			return c*t/d + b;
		}
	}else{
		var timingFun = tween;
	}
	

	var timer = null;
	var raf = null;//requestAnimationFrame
	var index = 0;

	var imgList = obj.find(".img-list");
	var btnList = obj.find(".btn-list");
	var imgItem = imgList.find(".img-item");
	var btnItem = btnList.find(".btn-item");

	var perWidth = imgItem.width();//一个轮播画面的跨度
	var num = imgItem.length;

	var moveX = 0; //transform 偏移量

	imgList.on("touchstart", function(e) {

		autoStop();
		window.cancelAnimationFrame(raf);

		var oldPX = newPX = touchPX = e.originalEvent.touches[0].clientX;//上次move的点，这次move的点，touchstart时的点

		var deltaX = 0; //每次move改变量
		var allMove = 0; //touchstart 到 touchend 的总移动改变量

		$(window).off("touchmove").on("touchmove", function(e) { //应该是window而非imgList
			newPX = e.originalEvent.touches[0].clientX;
			deltaX = newPX - oldPX;
			moveX += deltaX;
			// 用于限定滑动的极限
			if (moveX > 130) {
				moveX = 130;
			} else if (moveX < -(num - 1) * perWidth - 130) {
				moveX = -(num - 1) * perWidth - 130;
			}

			imgList.css("transform", "translate3d("+moveX+"px,0,0)");
			oldPX = newPX;
			allMove = newPX - touchPX;
		});
		
		// 如果有多swiper的时候一定放进touchstart里面，不然会被别的swiper off了touchend事件
		$(window).off("touchend").on("touchend", function() {
			$(window).off("touchmove"); //一定要清除这个事件，不然在imgList外面也可以滑动；
			if (allMove < -backPX) {
				next();
			} else if (allMove > backPX) {
				prev();
			} 
			else {//距离不够，退回原来
				tab();
			}
			allMove = 0; //要清零，不然window一直touchend，就会一直滚动
		});
	});



	function tab(){
		// window.cancelAnimationFrame(raf);//这样才不会还没走完就触发多个raf
		var t = 0;
		var start = moveX;
		var change = -index * perWidth - moveX;
		// var maxT = 25;
		function move(){
			t++;
			moveX = timingFun(t,start,change,maxT);
			imgList.css("transform", "translate3d("+moveX+"px,0,0)");
			raf = window.requestAnimationFrame(move);
			if(t>=maxT){
				window.cancelAnimationFrame(raf);
			}
		}
		raf = window.requestAnimationFrame(move);
	}

	function next() {
		index++;
		if (index > num - 1) {
			index = 0;
		}
		tab();
		btnItem.eq(index).addClass("active").siblings().removeClass("active");
	}

	function prev() {
		index--;
		if (index < 0) {
			index = num - 1;
		}
		tab();
		btnItem.eq(index).addClass("active").siblings().removeClass("active");
	}

	function autoGo() {
		timer = setInterval(function() {
			next();
		}, 5000);
	}
	autoGo();

	imgList.on("touchend", function() {
		autoGo();
	})

	function autoStop() {
		clearInterval(timer);
	}
};