$(function(){
	var winW  = $(window).width();
	console.log(winW)
	var imgItem = $(".img-item").css("width",winW);
	var imgList = $(".img-list").css("width",imgItem.length*winW);

	var btnList = $(".btn-list");

	/*swiper(imgList,btnList,winW,4);*/

	/*swiper2({
		obj:imgList,
		btn:btnList,
		perWidth:winW,
		num:4
	});*/

	/*swiper3({
		obj:$("#one")
	})*/

	/*cccPerfectSwiper({
		obj:$("#one")
	})*/

	/*cccPerfectSwiper2({
		obj:$("#one")
	})*/

	ccc.swiper({
		obj:$("#one"),
		maxT:50,
		backPX:30
		// ,tween:function(t,b,c,d){
		// 	return c*t/d + b;
		// }
		,tween:Tween.Quart.easeOut
	});
	ccc.swiper({
		obj:$("#two")
	});
});

