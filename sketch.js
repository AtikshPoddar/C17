var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var gameOverImg,restartImg


function preload(){
  //Trex Animation
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  
  //Ground Image
  groundImage = loadImage("ground2.png");
  
  //Cloud Image
  cloudImage = loadImage("cloud.png");
  
  //Obstacle Images
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  //End Images
   restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  
  //Bye Bye Rex
  DedTrex = loadImage("trex_collided.png");
}

function setup() {
  createCanvas(600, 200);
  
  //Setting animation of Trex
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("Ded", DedTrex);
  trex.scale = 0.5;
  
  //Creating ground and adding image
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  //Game Over
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  //Reset
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  //Game Over
  gameOver.scale = 0.5;
  
  //Reset
  restart.scale = 0.5;

  //Making Ground Box Invisible
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud 

  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  
  //Logging Hello5
  console.log("Hello" + 5);
  
  //Trex Collider
  trex.setCollider("circle",0,0,40);
  trex.debug = true
  
  score = 0;
}

function draw() {
  background(180);
  //displaying score
  //Score
  text("Score: "+ score, 500,50);
  
  //GameState
    console.log("this is ",gameState)

  //GameState Play
  if(gameState === PLAY){
    //Done
     gameOver.visible = false
    restart.visible = false
    //move the ground
    ground.velocityX = -4;
    //scoring
    score = score + Math.round(frameCount/60);
    //Ground
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& trex.y >= 100) {
        trex.velocityY = -13;
    }
    
    //add gravity
    trex.velocityY = trex.velocityY + 0.8
  
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    //Ending
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
  }
  //Game is done
   else if (gameState === END) {
     //Stopping ground from moving
      ground.velocityX = 0;
      //Turning on GameOver Sign
      gameOver.visible = true;
      //Turning on Restart Button
    restart.visible = true;
    //Clouds and Obstacles being stopped
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
     //Clouds and Obstacles being set to never run out of lifetime
     obstaclesGroup.setLifetimeEach(-1);
     cloudsGroup.setLifetimeEach(-1);
     //Stopping Trex from moving
     trex.velocityY=0;
     //Trex Go Bye Bye
     trex.changeAnimation("Ded", DedTrex);
   }
  
 
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   //Creating The Obstacle Sprites
   var obstacle = createSprite(400,165,10,40);
   //Setting Obstacel Velocities
   obstacle.velocityX = -4;
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  //code here to spawn the clouds
   if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -4;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //adding cloud to the group
   cloudsGroup.add(cloud);
    }
}

