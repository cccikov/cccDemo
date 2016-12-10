function ScrollBar(ele,x){
	this.name = "一个ScrollBar的实例";
	this.init(ele,x);
}
ScrollBar.prototype = {
	constructor:ScrollBar,
	init:function(ele,x){
        var hasX = (typeof x== "boolean" && x==true)||x=="true";//是否需要x轴
		/*获取对象*/
		var that = ele.css({"position":"relative","overflow":"hidden"});
		var scrollWrap = that;//包含着滚动条的块
		var scrollCtx = that.find(".scrollCtx").eq(0);//滚动主体
        // y轴的
		if(scrollWrap.find(".slideBarY").size()>0){
			var slideBarY = scrollWrap.find(".slideBarY");//为了重新建滚动，比如内容改变的时候
		}else{
			var slideBarY = $('<div class="slideBarY"><div class="sliderY"></div></div>');
			slideBarY.appendTo(scrollWrap);
		}
		var sliderY = slideBarY.find(".sliderY");
        if(hasX){
            // x轴的
            if(scrollWrap.find(".slideBarX").size()>0){
                var slideBarX = scrollWrap.find(".slideBarX");//为了重新建滚动，比如内容改变的时候
            }else{
                var slideBarX = $('<div class="slideBarX"><div class="sliderX"></div></div>');
                slideBarX.appendTo(scrollWrap);
            }
            var sliderX = slideBarX.find(".sliderX");
        }



		var docu = $(document);
		/*获取比例*/
		var rateY = scrollWrap[0].scrollHeight / scrollWrap.innerHeight();//或者 var rateY = (scrollCtx.innerHeight()+(scrollWrap.innerHeight()-scrollWrap.height())/2) / scrollWrap.innerHeight();
        var rateX = scrollWrap[0].scrollWidth / scrollWrap.innerWidth();
        console.log(rateX);

        /*获取实际可滚动长度*/
        var slideBarYHeight = hasX ? slideBarY.height() - slideBarX.height() : slideBarY.height();

        /*将这些变量存入对象的属性里面,以便其他实例方法使用*/
        this.option = {
            "hasX":hasX,
            "scrollWrap":scrollWrap,
            "scrollCtx":scrollCtx,
            "slideBarY":slideBarY,
            "sliderY":sliderY,
            "slideBarYHeight":slideBarYHeight,
        }
        this.rateY = rateY;

        /*以下开始进行事件操作*/
        if (rateY > 1) {
            slideBarY.addClass("active");
            sliderY.height(slideBarYHeight / rateY);
        }
        if(hasX){
            var slideBarXWidth = slideBarX.width() - slideBarY.width();
            this.option.slideBarX = slideBarX;
            this.option.sliderX = sliderX;
            this.option.slideBarXWidth = slideBarXWidth;
            this.rateX = rateX ;
            if (rateX > 1) {
                slideBarX.addClass("active");
                sliderX.width(slideBarX.width() / rateX);
            }
        }


        /*
         * 点击
         */
        var self = this;//将实例对象用self存储起来,为了防止与事件里面的this冲突
        slideBarY.off("mousedown").on("mousedown", function(e) {
            var e = e || window.event;
            var that = $(this);

            //滑块偏移
            var sliderTop = e.clientY - that.offset().top - sliderY.height() / 2;
            var sliderLeft = !hasX ? 0 : sliderX.position().left;
            self.posiMove(sliderLeft,sliderTop, true);
        });
        var self = this;//将实例对象用self存储起来,为了防止与事件里面的this冲突
        slideBarX.off("mousedown").on("mousedown", function(e) {
            var e = e || window.event;
            var that = $(this);

            //滑块偏移
            var sliderLeft = e.clientX - that.offset().left - sliderX.width() / 2;
            var sliderTop = sliderY.position().top;
            self.posiMove(sliderLeft,sliderTop, true);
        });


        /*
         * 滑动
         */
        sliderY.off("mousedown").on("mousedown", function(e) {
            var e = e || window.event;
            e.stopPropagation();
            e.preventDefault();
            var originHei = e.clientY - $(this).offset().top;

            docu.on("mousemove", function(e) {
                var e = e || window.event;

                //滑块偏移
                var sliderTop = e.clientY - slideBarY.offset().top - originHei;
                var sliderLeft = !hasX ? 0 : sliderX.position().left;
                self.posiMove(sliderLeft,sliderTop, false);
            });

            docu.off("mouseup").on("mouseup", function() {
                docu.off("mousemove");
            });

        });
        sliderX.off("mousedown").on("mousedown", function(e) {
            var e = e || window.event;
            e.stopPropagation();
            e.preventDefault();
            var originWid = e.clientX - $(this).offset().left;

            docu.on("mousemove", function(e) {
                var e = e || window.event;

                //滑块偏移
                var sliderLeft = e.clientX - slideBarX.offset().left - originWid;
                var sliderTop = sliderY.position().top;
                self.posiMove(sliderLeft,sliderTop, false);
            });

            docu.off("mouseup").on("mouseup", function() {
                docu.off("mousemove");
            });

        });

        /*
         * 滚动 mousewheel--chrome ie; DOMMouseScroll--firefox
         */
        scrollWrap.off("mousewheel").off("DOMMouseScroll").on("mousewheel DOMMouseScroll", function(e) {
            var e = e || window.event;
            e.stopPropagation();
            e.preventDefault();
            var direction = "down";
            if (e.originalEvent.wheelDelta < 0 || e.originalEvent.detail > 0) {
                direction = "down";
            } else {
                direction = "up";
            }

            //滑块偏移
            var sliderTop = sliderY.position().top;
            var sliderLeft = !hasX ? 0 : sliderX.position().left;
            if (direction == "down") {
                sliderTop += 10;
            } else {
                sliderTop -= 10;
            }
            self.posiMove(sliderLeft,sliderTop, false);
        });

	},
	goFn:function(ele,top,left){//移动方法
        ele.css("transform", "translate("+left+"px," + top + "px");//不用3d是为了兼容ie9;
	},
	posiMove:function(changeLeft,changeTop, animateFlag){//获取移动多少的方法，changeTop为滚动条滑块移动的距离，animateFlag是否要动画，并调用移动方法实现最终的滚动
        var hasX = this.option.hasX;
        var scrollWrap = this.option.scrollWrap;
		var scrollCtx = this.option.scrollCtx;
		var slideBarY = this.option.slideBarY;
		var sliderY = this.option.sliderY;
		var rateY = this.rateY;
        var sliderX = this.option.sliderX;
        var rateX = this.rateX;
        var slideBarYHeight = this.option.slideBarYHeight;
        var slideBarXWidth = this.option.slideBarXWidth;
		//上下限
		changeTop = changeTop >= 0 ? changeTop : 0;
		changeTop = changeTop <= slideBarYHeight - sliderY.height() ? changeTop : slideBarYHeight - sliderY.height();

		//内容偏移
		var contentTop = -changeTop * rateY * scrollWrap.innerHeight() / slideBarYHeight;//解释在下面，这其实是一个bug，只是一个巧合导致没有发现
        /*
         *  我们假设 块之间高度的比值为lenRate（这里为rateY），内容显示区域高度为ctxh，实际高度为ctxH
         *                                      滚动滑块高度为barh，滚动条高度为barH
         *                                      内容移动距离为ctxmove，滑块移动距离为barmove
         *  则：
         *      lenRate = ctxH/ctxh = barH/barh , 所以 barh = barH/lenRate （实际代码 sliderY.height(slideBarYHeight / rateY);） ctxH = ctxh*lenRate
         *      假设移动比率（就是移动的距离占总长度的比值）moveRate
         *      moveRate = barmove/barH = ctxmove/ctxH;  ctxmove = ctxH*barmove/barH  = ctxh*lenRate/barH*barmove = barmove * lenRate * ctxh/barH (实际代码  -changeTop * rateY * scrollWrap.innerHeight() / slideBarYHeight;)
         *  之前没有考虑到ctxh/barH是因为以前ctxh = barH的，而且现在由于有横向滚动条，所以ctxh ≠ barH，所以出现bug
         */
        if(hasX){
            //上下限
            changeLeft = changeLeft >= 0 ? changeLeft : 0;
            changeLeft = changeLeft <= slideBarXWidth - sliderX.width() ? changeLeft : slideBarXWidth - sliderX.width();

            //内容偏移
            var contentLeft = -changeLeft * this.rateX * scrollWrap.innerWidth() / slideBarXWidth;
        }

        if (animateFlag) {
            scrollCtx.add().addClass("animate");
            if(hasX){
                sliderY.addClass("animate");
            }
        } else {
            scrollCtx.add(sliderY).removeClass("animate");
            if(hasX){
                sliderX.addClass("animate");
            }
        }


        this.goFn(sliderY,changeTop,0);
        if(hasX){
            this.goFn(sliderX,0,changeLeft);
        }
		this.goFn(scrollCtx,contentTop,contentLeft);
	}
}
