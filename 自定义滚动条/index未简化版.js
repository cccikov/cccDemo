$(function() {
	var inBox = $(".inBox");
	var outBox = $(".outBox");
	var slider = $(".slider");
	var sideBar = $(".sideBar");
	var docu = $(document);

	function goTopFn(top) {
		$(this).css("transform", "translate3d(0," + top + "px,0");
	}

	var rate = $(".inBox").height() / $(".outBox").height();
	$(".slider").height($(".sideBar").height() / rate);

	//点击
	sideBar.on("mousedown", function(e) {
		console.log("mousedown");
		var e = e || window.event;
		var that = $(this);

		//滑块偏移
		var sliderTop = e.clientY - that.offset().top - slider.height() / 2;
		sliderTop = sliderTop > 0 ? sliderTop : 0;
		sliderTop = sliderTop < sideBar.height() - slider.height() ? sliderTop : sideBar.height() - slider.height();

		//内容偏移
		var contentTop = -sliderTop * rate;

		inBox.add(slider).addClass("animate");
		goTopFn.apply(slider, [sliderTop]);
		goTopFn.apply(inBox, [contentTop])
	});

	//滑动
	slider.on("mousedown", function(e) {
		var e = e || window.event;
		e.stopPropagation();
		e.preventDefault();
		var originHei = e.clientY - $(this).offset().top;

		docu.on("mousemove", function(e) {
			var e = e || window.event;
			
			//滑块偏移
			var sliderTop = e.clientY - sideBar.offset().top - originHei;
			sliderTop = sliderTop > 0 ? sliderTop : 0;
			sliderTop = sliderTop < sideBar.height() - slider.height() ? sliderTop : sideBar.height() - slider.height();

			//内容偏移
			var contentTop = -sliderTop * rate;

			inBox.add(slider).removeClass("animate");
			goTopFn.apply(slider, [sliderTop]);
			goTopFn.apply(inBox, [contentTop])
		});

		docu.on("mouseup", function() {
			docu.off("mousemove");
		});

	});

	//滚动 mousewheel--chrome ie; DOMMouseScroll--firefox   
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
		sliderTop = sliderTop > 0 ? sliderTop : 0;
		sliderTop = sliderTop < sideBar.height() - slider.height() ? sliderTop : sideBar.height() - slider.height();

		//内容偏移
		var contentTop = -sliderTop * rate;

		inBox.add(slider).removeClass("animate");
		goTopFn.apply(slider, [sliderTop]);
		goTopFn.apply(inBox, [contentTop])
	});
});