var dom = document.getElementById("clock");
var ctx = dom.getContext("2d");
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var r = width / 2;
// 以200ps为基准，当时钟变大或变小的时候时钟各部分增大或缩小的比率
var rem = width / 200;

// 画时钟外框边缘
function drawBackground() {
	// 保存画布最初的状态
	ctx.save();
	// 重新定义原点坐标到画布的中心
	ctx.translate(r, r);
	
	// 定义路径起始
	ctx.beginPath();
	// 定义线条的宽度
	ctx.lineWidth = 10 * rem;
	// 画圆
	ctx.arc(0, 0, r - ctx.lineWidth / 2, 0, 2 * Math.PI, false);
	// 绘制定义的路径
	ctx.stroke();
	
	var hourNembers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
	ctx.font = 18 * rem + "px Arial";
	// 文字水平对齐
	ctx.textAlign = "center"
	// 文字垂直对齐
	ctx.textBaseline = "middle";
	// 绘制小时数字
	hourNembers.forEach(function(number, i) {
		var rad = 2 * Math.PI / 12 * i;
		var x = Math.cos(rad) * (r - 30 * rem);
		var y = Math.sin(rad) * (r - 30 * rem);
		ctx.fillText(number, x, y);
		
	});
	
	// 绘制60个小圆点
	for(var i = 0; i < 60; i++) {
		var rad = 2 * Math.PI / 60 * i;
		var x = Math.cos(rad) * (r - 18 * rem);
		var y = Math.sin(rad) * (r - 18 * rem);
		ctx.beginPath();
		if (i % 5 == 0) {
			ctx.fillStyle = "#000"; 
		}
		else {
			ctx.fillStyle = "#ccc";
		}
		ctx.arc(x, y, 2  * rem, 0, 2 * Math.PI, false);
		ctx.fill();
	}
}

function drawHour(hour, minute) {
	ctx.save();
	ctx.beginPath();
	var hRad = 2 * Math.PI / 12 * hour;
	var mRad = 2 * Math.PI / 12 / 60 * minute;
	var rad = hRad + mRad;
	ctx.rotate(rad);
	ctx.lineWidth = 6 * rem;
	ctx.lineCap = "round";
	ctx.moveTo(0, 10 * rem);
	ctx.lineTo(0, -r/2);
	ctx.stroke();
	ctx.restore();
}

function drawMinute(minute) {
	ctx.save();
	ctx.beginPath();
	var rad = 2 * Math.PI / 60 * minute;
	ctx.rotate(rad);
	ctx.lineWidth = 3 * rem;
	ctx.lineCap = "round";
	ctx.moveTo(0, 10 * rem);
	ctx.lineTo(0, -r + 30 * rem);
	ctx.stroke();
	ctx.restore();
}

function drawSecond(second) {
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle = "#c14543";
	var rad = 2 * Math.PI / 60 * second;
	ctx.rotate(rad);
	ctx.moveTo(-2 * rem, 20 * rem);
	ctx.lineTo(2 * rem, 20 * rem);
	ctx.lineTo(1, -r + 18 * rem);
	ctx.lineTo(-1, -r + 18 * rem);
	ctx.fill();
	ctx.restore();
}

function drawDot() {
	ctx.beginPath();
	ctx.fillStyle = "#fff";
	ctx.arc(0, 0, 3 * rem, 0, 2 * Math.PI,false);
	ctx.fill();
}

function draw() {
	// 清空画布
	ctx.clearRect(0, 0, width, height); // 清空的起始区域为（0, 0）,因为函数默认已经恢复画布初始状态
	var now = new Date();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	drawBackground();
	drawHour(hour, minute);
    drawMinute(minute);
    drawSecond(second);
	drawDot();
	// 恢复drawBackground中保存的状态
	ctx.restore();
}

// 每秒钟重画时钟
setInterval(draw, 1000);
