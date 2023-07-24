
let playerX=8;playerY=350;
let ballX=400;ballY=350;
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

function setup(){
    createCanvas(800,700);
    background(0);
    noStroke();
    //yDirection=-1
    yDirection=random(-5,5);
    ballSize=15;
    rectMode(CENTER);
}



function draw(){
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
        if (playerY>660){
            playerY-=7;
        }
        if (playerY<35){
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
            setTimeout(() => {
                console.log('test')
            }, 30000);    
        }   
        //ball colliding with wall
        if(ballTop<5||ballBottom>695)  yDirection*=-1;
        if(ballLeft>785)    xDirection*=-1;

        //game reset/player loses
        if(ballRight<playerRight/2){
            playerLose=true;
            textSize(100);
            AftrGmMsg="YOU LOSE";
        }
        
        
    }
    text(AftrGmMsg,150,400);
}

