// JavaScript Snake Game
// Author Harsh Modi

var xv, yv, gs, tc, ax, ay, px, py;
xv = yv = 0;
gs=tc=20;
ax=ay=15;
px=py=10;
var trail =[];
var tail=3;
var leftDirection = false;
var rightDirection = false;
var upDirection = false;
var downDirection = false;
var speed = 120;


function init(){
    canv = document.getElementById("myCanvas");
    ctx = canv.getContext("2d");
    document.addEventListener("keydown",keyPush);
    document.addEventListener("touchstart", touchStartHandler, false);
    document.addEventListener("touchend", touchEndHandler, false);
    setInterval(game, speed);

}


function game(){
    px+=xv;
    py+=yv;
    if(px<0){
        px = tc - 1;
    }
    if(px>tc-1){
        px=0;
    }
    if(py<0){
        py = tc - 1;
    }
    if(py>tc-1){
        py=0;
    }
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canv.width,canv.height);

    ctx.fillStyle="lime";
    for(var i=0;i<trail.length;i++){
        ctx.fillRect(trail[i].x *gs , trail[i].y * gs, gs-2,gs-2);
        if(trail[i].x ==px && trail[i].y==py){
            tail =3 ;
        }
    }
    trail.push({x:px,y:py});
    while(trail.length > tail){
        trail.shift();
    }
    if(ax ==px && ay==py){
        tail++;
        speed-=2;
        ax = Math.floor(Math.random()*tc);
        ay = Math.floor(Math.random()*tc);

        while(isSnake(ax,ay)){
            ax = Math.floor(Math.random()*tc);
            ay = Math.floor(Math.random()*tc);
        }


    }
    ctx.fillStyle = "red";
    ctx.fillRect(ax*gs,ay*gs,gs-2,gs-2);

}

function isSnake(ax,ay){
    for(var i=0;i<trail.length;i++){
        if(trail[i].x == ax && trail[i].y == ay){
            return true;
        }
        
    }
    return false;
}


function keyPush(evt){ 
    switch(evt.keyCode){
        case 37:
            if (!rightDirection){
                xv=-1;yv=0;
                leftDirection=true;
                upDirection=false;
                downDirection=false;
                
            }
            break;
        case 38:
            if (!downDirection){
                xv=0;yv=-1;
                upDirection=true;
                leftDirection=false;
                rightDirection=false;
            }
            break;
        case 39:
            if (!leftDirection){
                xv=1;yv=0;
                rightDirection=true;
                upDirection=false;
                downDirection=false;
            }
            break;
        case 40:
            if (!upDirection){
                xv=0;yv=1;
                downDirection=true;
                leftDirection=false;
                rightDirection=false;
            }

    
    }

}

var touchesInAction = {};

function touchStartHandler(event) {
    var touches = event.changedTouches;

    for(var j = 0; j < touches.length; j++) {

         /* store touch info on touchstart */
         touchesInAction[ "$" + touches[j].identifier ] = {

            identifier : touches[j].identifier,
            pageX : touches[j].pageX,
            pageY : touches[j].pageY
         };
    }
}

function touchEndHandler(event) {
    var touches = event.changedTouches;

    for(var j = 0; j < touches.length; j++) {

        /* access stored touch info on touchend */
        var theTouchInfo = touchesInAction[ "$" + touches[j].identifier ];
        theTouchInfo.dx = touches[j].pageX - theTouchInfo.pageX;  /* x-distance moved since touchstart */
        theTouchInfo.dy = touches[j].pageY - theTouchInfo.pageY;  /* y-distance moved since touchstart */

        console.alert(theTouchInfo.dx + " ----" + theTouchInfo.dy);
        
        if ( theTouchInfo.dx >= theTouchInfo.dy)
        {
            if ( theTouchInfo.dx > 0){
                if (!leftDirection){
                    console.alert("Swiped right");
                    xv=1;yv=0;
                    rightDirection=true;
                    upDirection=false;
                    downDirection=false;
                }
            }
            else{
                if (!rightDirection){
                    console.alert("Swiped left");
                    xv=1;yv=0;
                    leftDirection=true;
                    upDirection=false;
                    downDirection=false;
                }
            }

        }
        else
        {
            if ( theTouchInfo.dy > 0){
                if (!downDirection){
                    console.alert("Swiped up");
                    xv=1;yv=0;
                    upDirection=true;
                    leftDirection=false;
                    rightDirection=false;
                }
            }
            else{
                if (!upDirection){
                    console.alert("Swiped down");
                    xv=0;yv=1;
                    downDirection=true;
                    leftDirection=false;
                    rightDirection=false;
                }
            }
        }
    }

    /* determine what gesture was performed, based on dx and dy (tap, swipe, one or two fingers etc. */

}
