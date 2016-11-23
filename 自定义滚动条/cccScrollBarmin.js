$.fn.extend({
	cccScrollBar: function() {
		var outobj = $(this);
		var inobj = outobj.find(".scrollContent").eq(0);
		var barobj = outobj.find(".sideBar").eq(0);
		var sliderobj = outobj.find(".slider").eq(0);
		var docu = $(document);
		
		function goTopFn(top) {
			$(this).css("transform", "translate3d(0," + top + "px,0");
		}
		
		function posiMove(changeTop, animateFlag) {
			changeTop = changeTop >= 0 ? changeTop : 0;
			changeTop = changeTop <= barobj.height() - sliderobj.height() ? changeTop : barobj.height() - sliderobj.height();
			var contentTop = -changeTop * rate;
			if(animateFlag) {
				inobj.add(sliderobj).addClass("animate");
			} else {
				inobj.add(sliderobj).removeClass("animate");
			}
			goTopFn.apply(sliderobj, [changeTop]);
			goTopFn.apply(inobj, [contentTop]);
		}
		
		var rate = outobj[0].scrollHeight / outobj.innerHeight();
		
		console.log((inobj.innerHeight() + (outobj.innerHeight() - outobj.height()) / 2), outobj[0].scrollHeight)
		if(rate > 1) {
			barobj.addClass("active");
		}
		
		sliderobj.height(barobj.height() / rate);
		barobj.on("mousedown", function(e) {
			var e = e || window.event;
			var that = $(this);
			var sliderTop = e.clientY - that.offset().top - sliderobj.height() / 2;
			posiMove(sliderTop, true);
		});
		
		sliderobj.on("mousedown", function(e) {
			var e = e || window.event;
			e.stopPropagation();
			e.preventDefault();
			var originHei = e.clientY - $(this).offset().top;
			docu.on("mousemove", function(e) {
				var e = e || window.event;
				var sliderTop = e.clientY - barobj.offset().top - originHei;
				posiMove(sliderTop, false);
			});
			docu.on("mouseup", function() {
				docu.off("mousemove");
			});
		});
		
		outobj.on("mousewheel DOMMouseScroll", function(e) {
			var e = e || window.event;
			e.stopPropagation();
			e.preventDefault();
			var direction = "down";
			if(e.originalEvent.wheelDelta < 0 || e.originalEvent.detail > 0) {
				direction = "down";
			} else {
				direction = "up";
			}
			var sliderTop = sliderobj.position().top;
			if(direction == "down") {
				sliderTop += 10;
			} else {
				sliderTop -= 10;
			}
			posiMove(sliderTop, false);
		});
		
		return outobj;
	}
});



/*
 * 这个 是index.js去除注释
 */