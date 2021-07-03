var PLAY=1;
var END=0;

var gamestate = PLAY;
var mario,marioImg,bg,bgImg;
var invisibleGround;
var obstacle,obstacle1,obstacle1Img,obstacle2,obstacle2Img,obstacle3,obstacle3Img;
var obstaclesGroup;
var score;
var dieSound;
var jumpSound;
var checkPointSound;
var gameOver,gameOverImg;
var restart,restartImg;
function preload(){
   
bgImg = loadImage ("bg3-3.jpg")

marioImg = loadImage("mario.png.png");

obstacle1Img = loadImage("dino2.png");

obstacle2Img = loadImage("piranha.png");

obstacle3Img = loadImage("turtle2.png");

gameOverImg  = loadImage("gameOver.png"); 

restartImg = loadImage("restart-removebg-preview.png");

dieSound = loadSound("die.mp3") ;

jumpSound = loadSound("jump.mp3");

checkPointSound = loadSound("checkPoint.mp3");

}

function setup() {
  createCanvas(500,500);

  bg =createSprite(300,250,500,500);
  bg.addImage(bgImg);
  bg.scale =1.3;
  bg.x = bg.width/2 

  mario = createSprite(50,350,20,20);
  mario.addImage(marioImg);
  mario.scale = 0.2;
  mario.velocityX =0;
  
  invisibleGround = createSprite(50,420,900,20);
  invisibleGround.visible=false;
  
  obstaclesGroup = new Group();
  
  score = 0;
  
  gameOver = createSprite(250,200,20,20);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;

  restart = createSprite(250,250,20,20);
  restart.addImage(restartImg);
  restart.scale = 0.2;
  
  mario.debug=false;
  mario.setCollider("circle",0,0,250)
}

function draw() {
background(100);
 
  
  if(gamestate === PLAY){
 
 gameOver.visible = false;

 restart.visible = false;

 console.log(score)

  //scoring
  bg.velocityX = -(5 + 3* score/100);
 
  score = score + Math.round(getFrameRate()/60);
    
     if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
  
  if(bg.x < 0){
   bg.x = bg.width/2
  
 } 
    
    console.log(mario.y)
 if(keyDown("space")&& mario.y >=300) {
        mario.velocityY = -15;
        jumpSound.play();
        
    } 
  
   mario.velocityY = mario.velocityY + 0.8
    
  
   spawnObstacles();
    
    camera.position.x = displayWidth/2;
    
    if(obstaclesGroup.isTouching(mario)){
      gamestate = END;
      dieSound.play();
    }
  }
  
 else if(gamestate === END){
    gameOver.visible= true;
    restart.visible = true;
    bg.velocityX =0;
    score = 0;
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
   
   if(mousePressedOver(restart)){
      reset(); 
      
     }
  }
  mario.collide(invisibleGround);
  
  drawSprites();
  
  //displaying score
  textSize(20);
  fill (255);
  text("Score: "+ score, 400,50);
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(500,390,10,40);
   obstacle.velocityX = -(6+ score/100 );
   obstacle.debug=false;
   obstacle.setCollider("circle",0,0,60)
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1Img);
              break;
      case 2: obstacle.addImage(obstacle2Img);
              break;
      case 3: obstacle.addImage(obstacle3Img);
              break;
      
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.4;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
   
 }
}

function reset(){
gamestate=PLAY;
score=0;
gameOver.visible = false;
restart.visible = false;
  
obstaclesGroup.destroyEach();
    
}





