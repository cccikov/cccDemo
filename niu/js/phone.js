var page2 = document.getElementById("page2");
var page3 = document.getElementById("page3");
var page4 = document.getElementById("page4");
var page5 = document.getElementById("page5");
var page6 = document.getElementById("page6");
var page6_2 = document.getElementById("page7");
var timer5 = null;
var rand = 0;

function pageone() {
	page1.style.display = "block";
	//	bgmusic.play();
	var startBut = document.getElementById("startBut");
	startBut.addEventListener("touchstart", pagetwo, false);
}

function pagetwo() {
	page1.style.display = "none";
	page2.style.display = "block";
	var egg = document.getElementById("egg");
	var smash = document.getElementById("smash");
	var ribbon = document.getElementById("ribbon");
	var ham = document.getElementById("ham");
	smash.addEventListener("touchstart", P2click, false);
	ham.addEventListener("touchstart", P2click, false);
}
function P2click() {
	ham.setAttribute("class", "ham");
	ribbon.setAttribute("class", "ribbonremove");
	ham.addEventListener("webkitAnimationEnd", function() {
		egg.setAttribute("class", "egg");

	}, false);
	var timer = setTimeout(function() {
		//出现随机数
		rand = parseInt(Math.random()*(12)+1);
		
		pagethree();			
		bgmusic.pause();
		eggmusic.play();
		setTimeout(function (){
			bgmusic.src = "audio/bgmusic.MP3";
			bgmusic.play();
		},4000)
		//			clearInterval(playTimer);
		//			bgmusic.src = "";

		//			var timerin = setTimeout(function(){
		//				bgmusic.src = "audio/bgmusic.MP3";
		//				bgmusic.play();	
		//				playTimer = setInterval(autoPlay,14000);
		//			},4000)

		ribbon.removeAttribute("class", "ribbonremove");
		egg.removeAttribute("class", "egg");
		ham.removeAttribute("class", "ham");
	}, 2000)
}

function pagethree() {
	page2.style.display = "none";
	page3.style.display = "block";
	
	//道具出来
	console.log(rand);
	gif(jsonGif.date[rand].url,jsonGif.date[rand].len);

						
	var timer = setTimeout(function() {
		pagefour();
	}, 5500)
}

function pagefour() {
	page3.style.display = "none";
	page4.style.display = "block";
	var timer = setTimeout(function() {
		shake();
	}, 3000)
}


function shake() {
	if (window.DeviceMotionEvent) {
		window.addEventListener('devicemotion', deviceMotionHandler, false);
	}
	var shakeFlag = true; //只能摇一次

	var SHAKE_THRESHOLD = 500;
	var last_update = 0;
	var x, y, z, last_x, last_y, last_z;

	function deviceMotionHandler(eventData) {
		
		var acceleration = eventData.accelerationIncludingGravity;
		//alert(newDate().getTime());
		var curTime = new Date().getTime();

		// alert(curTime - last_update);
		if ((curTime - last_update) > 300) {

			var diffTime = curTime - last_update;
			last_update = curTime;

			x = acceleration.x;
			y = acceleration.y;
			z = acceleration.z;

			var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;

			if (speed > SHAKE_THRESHOLD && shakeFlag) {
				shakeFlag = false;
				//代码放到这里
				
				
				bgmusic.play();
				pagefive();
			}
			last_x = x;
			last_y = y;
			last_z = z;
		}
	}
}

function pagefive() {
	page4.style.display = "none";
	page5.style.display = "block";
	var loadingIn = document.getElementById("loadingIn");
	loadingIn.index = 0;
	var load5 = document.getElementById("load5");	
	clearInterval(timer5);
	timer5 = setInterval(function() {
		loadingIn.index += 2;
		if (loadingIn.index >= 375) {
			clearInterval(timer5);
			if (Math.random() > 0.5) {
				pageSix();
			} else {
				pageSix_2();
			}
			loadingIn.style.width = 0 + "px";
		}
		load5.innerHTML = "loading..." + parseInt(loadingIn.index / 375 * 76) + "%"
		loadingIn.style.width = loadingIn.index + "px";
	}, 50)
}

function pageSix() {
	page5.style.display = "none";
	page6.style.display = "block";
	var again = document.getElementById("again");
	again.addEventListener("touchstart", function() {
		page6.style.display = "none";
		pageone();
	}, false);
}

function pageSix_2() {
	page5.style.display = "none";
	page7.style.display = "block";
	var sweat = document.getElementById("sweat1");
	var word7 = document.getElementById("word_7");
	var again2 = document.getElementById("again2")
	setTimeout(function() {
		sweat.setAttribute("class", "ud");
		word7.setAttribute("class", "shake");
	}, 2000)
	again2.addEventListener("touchstart", function() {
		page6_2.style.display = "none";
		pageone();
		sweat.removeAttribute("class", "ud");
		word7.removeAttribute("class", "shake");
	}, false);
}