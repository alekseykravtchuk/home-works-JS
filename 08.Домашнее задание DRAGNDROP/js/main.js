'use strict';

(function () {
    let ratSrc = "https://tell-different.com/cache/preview/5efcad8bb33a98799167188aa66bfa19.png";
    let container = document.getElementById('container');
    container.addEventListener('click', mouseClickAction, false);
    container.addEventListener('mousedown', mouseDownAction, false);
    let zIndex = 0;
    function mouseClickAction(EO) {
        let clickedElem = EO.target;
    
        if(clickedElem.value == 'Добавить') {
            let addIMG = () => {
                let img = document.createElement('img');
                img.src = ratSrc;
                img.style.position = 'absolute';
                img.style.cssText += 'width: 100px; height: 100px';
                img.style.left = Math.floor(Math.random()*700)+"px";
                let minTop = parseInt(img.style.left) > 210 ? 0 : 25;
                img.style.top = minTop + Math.floor(Math.random()*(500 - minTop))+"px";
                img.style.cursor = 'pointer';
                container.appendChild(img);
            };
            addIMG();
        } 
        else if (clickedElem.value == 'Очистить') {
            let images = container.querySelectorAll('img');
            for (let img of images) {
                container.removeChild(img);
            }
        }
    }
    
    function mouseDownAction(EO) {
        let capturedItem = EO.target;
        
        if(capturedItem.tagName == 'IMG') {
            let currentIMG = capturedItem;
            currentIMG.style.cursor = 'move';
            currentIMG.style.zIndex = zIndex++;
            let shiftY = event.clientY - currentIMG.getBoundingClientRect().top + container.offsetTop;
            let shiftX = event.clientX - currentIMG.getBoundingClientRect().left + container.offsetLeft;
            
            moveAt(event.pageX, event.pageY);
            
            container.addEventListener('mousemove', mouseMoveAction, false);
            
            function moveAt(pageX, pageY) {
                let leftPosition = pageX - shiftX;
                let topPosition = pageY - shiftY;
                if (leftPosition < 0) {leftPosition = 0;}
                else if (leftPosition > 700) {leftPosition = 700;}
                if (topPosition < 0) {topPosition = 0;}
                else if (topPosition > 500) {topPosition = 500;}
                currentIMG.style.left = leftPosition + 'px';
                currentIMG.style.top = topPosition + 'px';
            }
            
            function mouseMoveAction(EO){
                moveAt(EO.pageX, EO.pageY);
            }
            
            container.addEventListener('mouseup', mouseUpAction, false);
            document.body.addEventListener('mouseup', mouseUpAction, false);
            
            function mouseUpAction() {
                container.removeEventListener('mousemove', mouseMoveAction);
                container.onmouseup = null;
                currentIMG.style.cursor = 'pointer';
            };
            
            currentIMG.ondragstart = function() {
                return false;
            };
        }
    }
    container.oncontextmenu = function() {
        return false;
    };
})();