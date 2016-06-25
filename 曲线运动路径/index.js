var ccc={};
ccc.timer = null;
ccc.circle = function(param){
	//圆 的参数方程 x=a+r*cosθ y=b+r*sinθ（θ∈ [0，2π) ） (a,b) 为圆心坐标，r 为圆半径，θ 为参数
	var point = param.obj;//jq对象，必选
	var a = param.a || 0;//圆心x轴偏移，可选，默认为0;
	var b = param.b || 0;//圆心x轴偏移，可选，默认为0;
	var r = param.r //圆的半径，必选
	var speed = param.speed || 1;//运动速度，可选，默认为1;
	var beginA = param.beginA || 0;//开始弧度，可选，默认为0;
	var direct = param.direct==undefined ? true : param.direct;//逆时针，可选，默认为逆时针
	
	var angle = Math.PI+beginA;//角度 弧度  1° = π/180
	var x = y = null;
	
	function move(){
		if(direct){
			angle += speed * Math.PI/180;
		}else{
			angle -= speed * Math.PI/180;
		}
		x = a+r*Math.sin(angle);
		y = a+r*Math.cos(angle);
		point.css("transform","translate3d("+x+"px,"+y+"px,0)")
		ccc.timer = window.requestAnimationFrame(move);
	}
	ccc.timer = window.requestAnimationFrame(move);
}
ccc.stop = function(){
	window.cancelAnimationFrame(ccc.timer);
}