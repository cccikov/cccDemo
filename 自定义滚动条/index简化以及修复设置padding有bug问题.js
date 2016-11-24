$(function() {
	var inBox = $(".inBox");
	var outBox = $(".outBox");
	var sideBar = $(".sideBar");
	var slider = $(".slider");
	var docu = $(document);

	//移动方法
	function goTopFn(top) {
		$(this).css("transform", "translate3d(0," + top + "px,0");
	}

	//获取移动多少的方法，changeTop为滚动条滑块移动的距离，animateFlag是否要动画，并调用移动方法实现最终的滚动
	function posiMove(changeTop, animateFlag) {
		//上下限
		changeTop = changeTop > 0 ? changeTop : 0;
		changeTop = changeTop < sideBar.height() - slider.height() ? changeTop : sideBar.height() - slider.height();

		//内容偏移
		var contentTop = -changeTop * rate;

		if(animateFlag){
			inBox.add(slider).addClass("animate");
		}else{
			inBox.add(slider).removeClass("animate");
		}

		goTopFn.apply(slider, [changeTop]);
		goTopFn.apply(inBox, [contentTop]);
	}

	/*
	 * 比例
	 */
	var rate = outBox[0].scrollHeight / outBox.innerHeight();
	//或者	var rate = (inBox.innerHeight()+(outBox.innerHeight()-outBox.height())/2) / outBox.innerHeight();
	console.log((inBox.innerHeight()+(outBox.innerHeight()-outBox.height())/2),outBox[0].scrollHeight)
	if(rate>1){
		sideBar.addClass("active");
	}
	$(".slider").height($(".sideBar").height() / rate);

	/*
	 * 点击
	 */
	sideBar.on("mousedown", function(e) {
		var e = e || window.event;
		var that = $(this);

		//滑块偏移
		var sliderTop = e.clientY - that.offset().top - slider.height() / 2;
		posiMove(sliderTop,true);
	});

	/*
	 * 滑动
	 */
	slider.on("mousedown", function(e) {
		var e = e || window.event;
		e.stopPropagation();
		e.preventDefault();
		var originHei = e.clientY - $(this).offset().top;

		docu.on("mousemove", function(e) {
			var e = e || window.event;

			//滑块偏移
			var sliderTop = e.clientY - sideBar.offset().top - originHei;
			posiMove(sliderTop,false);
		});

		docu.on("mouseup", function() {
			docu.off("mousemove");
		});

	});

	/*
	 * 滚动 mousewheel--chrome ie; DOMMouseScroll--firefox
	 */
	outBox.on("mousewheel DOMMouseScroll", function(e) {
		var e = e || window.event;
		e.preventDefault();
		var direction = "down";
		if (e.originalEvent.wheelDelta < 0 || e.originalEvent.detail > 0) {
			direction = "down";
		} else {
			direction = "up";
		}

		//滑块偏移
		var sliderTop = slider.position().top;
		if (direction == "down") {
			sliderTop += 10;
		} else {
			sliderTop -= 10;
		}
		posiMove(sliderTop,false);
	});
});

/*对 index未简化版.js 做一下简化以及bug的修改*/