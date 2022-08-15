var PLAY = 1;
var END = 0;
var gameState = PLAY;

var girl, girl_running
var city, invisibleground, cityImage;

var heartsGroup, bear_heartImage, cat_heartImage, penguin_heartImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3;

var gameOverImg, newGameImg;

var score;
var animals;


function preload(){
  girl_running = loadImage("./girlrunning.gif");
  
  cityImage = loadImage("city.png");
  
  bear_heartImage = loadImage("./bearheart.gif");
  cat_heartImage = loadImage("./catheart.gif");
  penguin_heartImage = loadImage("./penguinheart.gif");
  
  obstacle1 = loadImage("trashcan.png");
  obstacle2 = loadImage("tree.png");
  obstacle3 = loadImage("car.png");

  gameOverImg = loadImage("gameover.png");
  newGameImg = loadImage("newgame.png");
  
}

function setup() {
  createCanvas(900,550);
  
  girl = createSprite(90,40,20,50);
  girl.addAnimation("running", girl_running);
  girl.scale = 0.5;
  
  city = createSprite(200,180,400,20);
  city.addImage("city",cityImage);
  city.x = city.width /2;

  city.depth = girl.depth;
  girl.depth = girl.depth + 1;

  gameOver = createSprite(450,185);
  gameOver.addImage(gameOverImg)
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  newGame = createSprite(450,280);
  newGame.addImage(newGameImg);
  newGame.scale = 0.5;
  newGame.visible=false;
  
  invisibleground = createSprite(0,455,900,10);
  invisibleground.visible = false;
  
  //create Obstacle and hearts Groups
  obstaclesGroup = createGroup();
  heartsGroup = createGroup();
  
  console.log("Hello" + 5);
  
  girl.setCollider("rectangle",0,0,90,320);
  girl.debug = true
  
  score = 0
  animals = 0
}

function draw() { 
  background(180);
  //displaying score
  text("Animals Saved:  "+ animals, 790,530);
  text.visible=true
  
  console.log("this is ",gameState)
  
  
  if(gameState === PLAY){
    //move the city
    city.velocityX = -(4+3*score/100);
    //scoring
    score = score + Math.round(frameCount/60);
    
    if (city.x < 300){
      city.x = city.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& girl.y >=100) {
        girl.velocityY = -18;
    }
    
    //add gravity
    girl.velocityY = girl.velocityY + 0.8
  
    //spawn the clouds
    spawnHearts();
  
    //spawn obstacles on the city
    spawnObstacles();
    
    if(heartsGroup.isTouching(girl))
    {
      animals=animals+1;
      heartsGroup.destroyEach();
    }
    
    if(obstaclesGroup.isTouching(girl)){
        gameState = END;
    }
  }
   else if (gameState === END) {
      city.velocityX = 0;
      girl.velocityY = 0;
      obstaclesGroup.setLifetimeEach(-1);
      heartsGroup.setLifetimeEach(-1);

      gameOver.visible = true;
      newGame.visible = true;
     
     obstaclesGroup.setVelocityXEach(0);
     heartsGroup.setVelocityXEach(0);
   }
  
 
  //stop girl from falling down
  girl.collide(invisibleground);

  if(mousePressedOver(newGame))
  {
    console.log("reset the game");
    gameState=PLAY;
    newGame.visible = false;
    gameOver.visible = false;
    obstaclesGroup.destroyEach();
    heartsGroup.destroyEach();
    score=0;
    animals = 0;

  }
  
  
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 80 === 0){
   var obstacle = createSprite(900,430,40,10);
   obstacle.velocityX = -(6+score/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnHearts(){
    if (frameCount % 65 === 0){
      var hearts = createSprite(900,430,10,40);
      hearts.velocityX = -(6+score/100);
      
       //generate random hearts
       var rand = Math.round(random(1,3));
       switch(rand) {
         case 1: hearts.addImage(bear_heartImage);
                 break;
         case 2: hearts.addImage(penguin_heartImage);
                 break;
         case 3: hearts.addImage(cat_heartImage);
                 break;
         default: break;
       }
      
       //assign scale and lifetime to the obstacle           
       hearts.scale = 0.3;
       hearts.lifetime = 200;
      
      //add each obstacle to the group
       heartsGroup.add(hearts);
    }
   }

