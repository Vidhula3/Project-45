var END=0;
var PLAY=1;
var gameState="PLAY";

var street,streetImg;
var player,playerImg;
var theif,theif_running;
var powerCoins,powerCoinsImg,coinsSound;
var score=0;
var powerCoinsG;
var obstacles,obstaclesImg;
var obstaclesG;
var gameOver,gameOverImg,restart,restartImg;
var bgSound;

function preload(){
streetImg=loadImage("bg.jpg");
playerImg=loadImage("player.png")
theif_running=loadAnimation("theif1.png","theif2.png","theif3.png","theif4.png")
powerCoinsImg=loadImage("powerCoins.png")
coinsSound=loadSound("coins.mp3")
obstaclesImg=loadImage("obstacle.png")
gameOverImg=loadImage("gameover.png")
restartImg=loadImage("restart.png")
bgSound=loadSound("background.mp3")
}

function setup() {
  createCanvas(800,400);

  street=createSprite(250,100);
  street.addImage("street",streetImg);
  street.scale=0.6;
  street.velocityX=-1.6;

  player=createSprite(100,260,20,20);
  player.addImage("player",playerImg);
  player.scale=0.7

  theif=createSprite(760,260,20,20);
  theif.addAnimation("theif",theif_running);
  theif.scale=0.5;

  gameOver=createSprite(390,150);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.5;
  gameOver.visible=false;

  restart=createSprite(390,330);
  restart.addImage(restartImg);
  restart.scale=0.2;
  restart.visible=false;

  powerCoinsG = new Group();
  obstaclesG = new Group();
 
//gameover condition and game over getting 15 coins
// adding obstacles
//after limited score player can catch the theif
}

function draw() {
  background(streetImg); 
  
  if(street.x<300){
    street.x=width/2;
  }

  if(keyDown(UP_ARROW)){
    player.y=player.y-2;
  }

  if(keyDown(DOWN_ARROW)){
    player.y=player.y+2;
  }

  if(player.y<=215){
   player.y=260;
  }

  showPowerCoins();
  spawnObstacles();

  if(gameState==="PLAY"){
createEdgeSprites();
  
  if(powerCoinsG.isTouching(player)){
    powerCoinsG.destroyEach();
   score=score+1;
   coinsSound.play();
    }

    if(obstaclesG.isTouching(player)){
      obstaclesG.destroyEach();
      gameState= END;
      }

      //bgSound.play();
      
    }
      else if (gameState === END) {
        gameOver.visible = true;
        restart.visible=true;
        street.velocityX=0;
        powerCoinsG.destroyEach();
        theif.visible=false;
        
        if(mousePressedOver(restart)) {
          reset();
        }
      }

      drawSprites();
    //add text for score
    textSize(20)
    text("Score: "+ score, 500,50);
   console.log(gameState)
  }

    function showPowerCoins(){
      if(frameCount%200===0){
  var powerCoins=createSprite(350,260,10,10);
  powerCoins.addImage("powerCoins",powerCoinsImg);
  powerCoins.scale=0.01;
  powerCoins.y=Math.round(random(250,350));
  powerCoins.velocityX=-2;
  powerCoinsG.add(powerCoins);
  powerCoinsG.lifetime=100;
   }
}

function spawnObstacles(){
  if(frameCount%200===0){
    var obstacles=createSprite(650,260,10,10);
    obstacles.addImage("obstacles",obstaclesImg);
    obstacles.scale=0.06;
    obstacles.x=Math.round(random(250,550));
    obstacles.y=Math.round(random(250,350));
    obstacles.velocityX=-2;
    obstaclesG.add(obstacles);
    obstaclesG.lifetime=100;
  }
}

function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  theif.visible=true;
  street.velocityX=-1.6;
  powerCoinsG.destroyEach();
  obstaclesG.destroyEach();


  score=0;
}

