var ground;
var trex ,trex_running;
var edges;
var invisibleGround;
var cloudHeight;
var obstacle1Image;
var obstacle2Image;
var obstacle3Image;
var obstacle4Image;
var obstacle5Image;
var obstacle6Image;
var selectObstacles;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var cloudsGroup;
var obstacleGroup;
var trexCollided;
var gameOverImage, gameOver;
var resetImage,reset;
var jumpSound;
var checkPointSound;
var dieSound;
var highScore = 0;

function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png",    "trex4.png");
  trexCollided = loadAnimation("trex_collided.png");
  ground_moving = loadImage("ground2.png");
  cloud_image = loadImage("cloud.png");
  obstacle1Image = loadImage("obstacle1.png");
  obstacle2Image = loadImage("obstacle2.png");
  obstacle3Image = loadImage("obstacle3.png");     
  obstacle4Image = loadImage("obstacle4.png");
  obstacle5Image = loadImage("obstacle5.png");
  obstacle6Image = loadImage("obstacle6.png");
  resetImage = loadImage("restart.png");
  gameOverImage = loadImage("gameOver.png");
  jumpSound = loadSound("jump.mp3");
  checkPointSound = loadSound("checkPoint.mp3");
  dieSound = loadSound("die.mp3");
  
}

function setup(){
  createCanvas(600,400)
  
  //create a trex sprite
  trex = createSprite(100,200,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("trex_collided", trexCollided);
  trex.scale = 0.7
  //trex.setCollider("rectangle", 0,0,150,trex.height );
  trex.debug = true
  
  edges = createEdgeSprites();
 
  ground = createSprite(300,300,600,40)
  ground.addImage(ground_moving)
  
  invisibleGround = createSprite(300,305,600,5)
  invisibleGround.visible=false;
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  gameOver = createSprite(300,200,20,10)
  gameOver.addImage(gameOverImage)
  gameOver.scale = 0.5;
  
  reset = createSprite(300,150,20,10)
  reset.addImage(resetImage)
  reset.scale = 0.7;
  
}

function draw(){
  background("grey")
  text("score="+score,500,50);
  text("Best="+highScore,500,65);
  text("Lakshya's Game",200,200);
  drawSprites();
  console.log(frameCount);
  if(gameState == PLAY){
    gameOver.visible = false;
    reset.visible = false; 
    score=score+Math.round(getFrameRate() / 60);
    
    if(keyDown("space") && trex.y>260){
      trex. velocityY = -10;
      jumpSound.play()
    } 
    if(score % 100 == 0 && score>0){
      checkPointSound.play() 
      ground.velocityX = ground.velocityX -1;
    }
    if(ground.x <0){
      ground.x = ground.width/2
    }
    spawnClouds();
    spawnObstacles();

    if(trex.isTouching(obstaclesGroup)){
      gameState = END; 
      trex.changeAnimation("trex_collided", trexCollided);
      dieSound.play() 
    }
  }
  else if(gameState == END){
    
  ground.velocityX = 0;  
  cloudsGroup.setVelocityXEach(0);
  obstaclesGroup.setVelocityXEach(0);
  cloudsGroup.setLifetimeEach(-1);
  obstaclesGroup.setLifetimeEach(-1);
  gameOver.visible = true;
  reset.visible = true;
  if(mousePressedOver(reset)){
  resetGame();
    
  }
    
  }
  
  trex.velocityY = trex.velocityY+ 0.5;
  trex.collide(invisibleGround); 
  

}

function resetGame(){
  
  gameState = PLAY;
  reset.visible = false
  gameOver.visible = false
  ground.velocityX = -8; 
  obstaclesGroup.destroyEach()
  cloudsGroup.destroyEach()
  trex.changeAnimation("running", trex_running)
  if(score>highScore){
  highScore = score;}
  score = 0;  
}

function spawnClouds(){
 if(frameCount % 80 == 0) {
  cloudHeight=Math.round(random(50,200))
  var clouds = createSprite(600,cloudHeight,20,10)
  clouds.addImage(cloud_image);
  clouds.velocityX = -2
  clouds.lifetime = 300;
  cloudsGroup.add(clouds) 
 }
}

function spawnObstacles(){
  if(frameCount % 100 == 0){
    var obstacles = createSprite(600,270,50,20) 
    obstacles.velocityX = -10 - score / 100
    obstacles.scale = 0.7
    obstacles.lifetime = 60;
    obstaclesGroup.add(obstacles);
    selectObstacles = Math.round(random(1,6));
    switch(selectObstacles){
      case 1:obstacles.addImage(obstacle1Image);
      break;
      
      case 2:obstacles.addImage(obstacle2Image);
      break;
      
      case 3:obstacles.addImage(obstacle3Image);
      break;
      
      case 4:obstacles.addImage(obstacle4Image);
      break;
      
      case 5:obstacles.addImage(obstacle5Image);
      break;
      
      case 6:obstacles.addImage(obstacle6Image);
      break;
      default:break;
    }
  }
}
