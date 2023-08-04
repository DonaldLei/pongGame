//game variables
let playerX=8;playerY=300;
let ballX=400;ballY=300;
let xSpeed=3;ySpeed=3;
let xDirection=-1;yDirection=1;
let xBallSpeed, yBallSpeed
let xBallDirection = 1;
let yBallDirection = 1;
//hitbox variables
let playerTop,playerBottom,playerLeft,playerRight;
let ballTop,ballBottom,ballLeft,ballRight,ballSize;
//---------
let scoreCounter = 0;
let playerLose=false;
let AftrGmMsg="";
let gmStrt=false;


//Difficulties
let buttonEasyMode = document.getElementById("easy");
let buttonMediumMode = document.getElementById("medium");
let buttonHardMode = document.getElementById("hard");
let pongBody=document.querySelector('body');
let diffDiv=document.getElementById('difficulty-message');
pongBody.style.backgroundColor='black';
diffDiv.style.color='white';

let gameDiv=document.getElementById('game');
// gameDiv.style.border="white 3px solid";
// gameDiv.style.textde

let othrBTN=document.getElementById('other-buttons');


buttonEasyMode.onclick = function(){
    xSpeed = 4;
    ySpeed = 4;
    diffDiv.remove();
    gmStrt=true;
    othrBTN.style.visibility='visible';
}
buttonMediumMode.onclick = function(){
    xSpeed = 7;
    ySpeed = 7;
    diffDiv.remove();
    gmStrt=true;
    othrBTN.style.visibility='visible';
}
buttonHardMode.onclick = function(){
    xSpeed = 10;
    ySpeed = 10;
    diffDiv.remove();
    gmStrt=true;
    othrBTN.style.visibility='visible';
}




function setup(){
    createCanvas(800,600);
    background(0);
    noStroke();
    //yDirection=-1
    // yDirection=random(-5,5);
    ballSize=15;
    rectMode(CENTER);
}

function draw(){
        if(gmStrt==true){
        background(0);
        let yballconst=yDirection;
        //let scorekeeper=scoreCounter;
        //text(yDirection,ballX-5,ballY+30)
        
        fill(255,255,255);
        rect(playerX, playerY, 10, 75);

        // Ball Speed
        ellipse(ballX, ballY,ballSize);

        if(playerLose==false){
        // movement for player
            if (keyIsDown(DOWN_ARROW)){
                playerY+=7;
            }
            if (keyIsDown(UP_ARROW)){
                playerY -=7;
            }

        // boundaries to make sure player doesn't go out of bounds
            if (playerY>560){
                playerY-=7;
            }
            if (playerY<36){
                playerY+=7;
            }
            
        // Score

            fill(255,255,255);
            textSize(20);
            text("Score: " + scoreCounter, 370, 20);
            
            // ball movement

            ballX+=xSpeed*xDirection;
            ballY+=ySpeed*yDirection;

            //collision logic
            playerBottom=playerY+50;
            playerTop=playerY-50;
            playerLeft=playerX-15;
            playerRight=playerX+15;

            ballRight=ballX+(ballSize/2);
            ballLeft=ballX-(ballSize/2);
            ballTop=ballY-(ballSize/2);
            ballBottom=ballY+(ballSize/2);
            //ball colliding with player
            if(playerLeft>ballRight||playerRight<ballLeft||playerTop>ballBottom||playerBottom<ballTop){
            }else{
                
                //trying to fix the ball hitbox being inside player, and causing it to rebound many times in a second, sometimes just passing thru player
                if(yDirection<0 && ballRight<playerRight && keyIsDown(UP_ARROW)==true){
                    yDirection=yballconst-2;
                }
                else if(yDirection>0 && ballRight<playerRight && keyIsDown(DOWN_ARROW)==true){
                    yDirection=yballconst+2;
                }
                else if(yDirection<0 && ballRight<playerRight && keyIsDown(DOWN_ARROW)==true){
                    yDirection=yballconst*-1;
                }
                else if(yDirection>0 && ballRight<playerRight && keyIsDown(UP_ARROW)==true){
                    yDirection=yballconst*-1;
                }else{
                    if(ballRight<playerRight){ 
                        xDirection=-1;}else{
                    setTimeout(() => {
                        xDirection=1;    
                    }, 5);}}
                scoreCounter++;
                // setTimeout(() => {
                //     console.log('test')
                // }, 30000);    
            }   
            //ball colliding with wall
            if(ballTop<5||ballBottom>595)  yDirection*=-1;
            if(ballLeft>785)    xDirection*=-1;

            //game reset/player loses
            if(ballRight<playerRight/2){
                playerLose=true;
                gmStrt=false;
                textSize(100);
                AftrGmMsg="YOU LOSE";
            }
            
            
        }
    }
    text(AftrGmMsg,150,400);
}