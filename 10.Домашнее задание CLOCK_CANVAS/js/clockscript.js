'use strict';
(function() {
    let clock = document.getElementById('clock');
    let ctx = clock.getContext('2d');
    let centerX = clock.width/2;
    let centerY = clock.height/2;
    let radius = centerX < centerY ? centerX*0.95 : centerY*0.95;
  
	/*отрисовка циферблата*/
    function drawClock() {
		ctx.fillStyle = 'rgba(255, 210, 20, 0.9)';
		ctx.strokeStyle = 'rgb(100, 100, 100)';
		ctx.lineWidth = radius/25;
		ctx.beginPath();
		ctx.arc(centerX,centerY,radius,0,Math.PI*2,true);
		ctx.stroke();
		ctx.fill();
		let angle = 0;	//угол поворота метки
		let shift = radius/15; 	//отступ метки от края циферблата
		ctx.fillStyle = 'black';
		for(let i = 0; i < 12; i++) {
			let markX = centerX + (radius - shift)*Math.sin(angle);
			let markY = centerY + (radius - shift)*Math.cos(angle);
			ctx.beginPath();
			ctx.arc(markX,markY,radius/20,0,Math.PI*2,true);
			ctx.fill();
			angle += 30*Math.PI/180;
		}
	}
			
	/*отрисовка стрелок*/
	function displayAnalogTime(d) {
		let tSec = (6*d.getSeconds()-90)*Math.PI/180;  //Определяем угол для секунд
		let tMin = (6*(d.getMinutes() + (1/60)*d.getSeconds())-90)*Math.PI/180; //Определяем угол для минут
		let tHour = (30*(d.getHours() + (1/60)*d.getMinutes())-90)*Math.PI/180;  //Определяем угол для часов
		ctx.lineCap = 'round';
		let secShift = radius/4;
		let minShift = radius/9;
		let hourShift = radius/2.3;
		
		/*секундная стрелка*/
		ctx.strokeStyle = 'red';
		ctx.lineWidth = radius/50;
		ctx.beginPath();
		ctx.moveTo(centerX, centerY);
		let secTipX = centerX + (radius - secShift)*Math.cos(tSec);
		let secTipY = centerY + (radius - secShift)*Math.sin(tSec);
		ctx.lineTo(secTipX, secTipY);
		ctx.stroke();
		
		/*минутная стрелка*/
		ctx.strokeStyle = 'rgba(10,10,10,0.9)';
		ctx.lineWidth = radius/25;
		ctx.beginPath();
		ctx.moveTo(centerX, centerY);
		let minTipX = centerX + (radius - minShift)*Math.cos(tMin);
		let minTipY = centerY + (radius - minShift)*Math.sin(tMin);
		ctx.lineTo(minTipX, minTipY);
		ctx.stroke();
				
		/*часовая стрелка*/
		ctx.strokeStyle = 'rgba(10,10,10,0.9)';
		ctx.lineWidth = radius/15;
		ctx.beginPath();
		ctx.moveTo(centerX, centerY);
		let hourTipX = centerX + (radius - hourShift)*Math.cos(tHour);
		let hourTipY = centerY + (radius - hourShift)*Math.sin(tHour);
		ctx.lineTo(hourTipX, hourTipY);
		ctx.stroke();
	}
			
	setInterval(function(){
		var d = new Date();
		ctx.clearRect(0,0,clock.width,clock.height);
		drawClock(d);
		displayAnalogTime(d);
	}, 1000);
}())