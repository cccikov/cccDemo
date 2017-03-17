function getStyle(element, StyleName) {
    if (element.style[StyleName]) {
        return element.style[StyleName];
    } else {
        if (window.getComputedStyle) {
            return window.getComputedStyle(element)[StyleName]
        } else if (element.currentStyle) { //读取样式表样式
            return element.currentStyle[StyleName]
        }
    }
}

function CanvasDraw(obj, w, h) {
    if (typeof obj == "string") {
        var canvas = document.getElementById("canvas");
    } else {
        var canvas = obj;
    }
    var reg = /\d*/;
    var w = w || getStyle(canvas, "width").match(reg)[0];
    var h = h || getStyle(canvas, "height").match(reg)[0];
    canvas.width = w;
    canvas.height = h;
    var ctx = canvas.getContext('2d');
    ctx.strokeStyle = "#757575";

    var PI = Math.PI;

    CanvasDraw.prototype.init = function() {
        console.log("init");
    }
    CanvasDraw.prototype.circle = function(x, y, r, color) { //x,y,半径
        ctx.beginPath();
        this.ctx.arc(x, y, r, 0, 2 * PI, true);
        if (color) {
            ctx.strokeStyle = color;
        }
        ctx.stroke();
        ctx.closePath();
    }

    this.obj = canvas;
    this.ctx = ctx;
    this.w = canvas.width;
    this.h = canvas.height;
    this.half = this.w > this.h ? this.h / 2 : this.w / 2;

    this.init();
}
