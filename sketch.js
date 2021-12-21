var mainImage, main, invisibleGround;
var ninja, ninjaImage;
var helicop, helicopImage;
var obtacle1, obtacle2, obtacle3, obtacle4, obtacle5, obtacle6;
var obtacle7, obtacle8, obtacle9, obtacle10, obstacle11; 
var obstacleGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score;
var gameOverImage, restartImage, gameOver, restart;
var jumpSound , checkPointSound, dieSound;
var edges;


function preload(){
    mainImage = loadImage("mainImage.jpg");
    ninjaImage = loadImage("ninja run.gif");
    helicopImage = loadImage("helicop.gif");
    obtacle1 = loadImage("obstacle1.png");
    obtacle2 = loadImage("obstacle2.png");
    obtacle3 = loadImage("obstacle3.png");
    obtacle4 = loadImage("obstacle4.png");
    obtacle5 = loadImage("obstacle5.png");
    obtacle6 = loadImage("obstacle6.png");
    obtacle7 = loadImage("obstacle7.png");
    obtacle8 = loadImage("obstacle8.png");
    obtacle9 = loadImage("obstacle9.png");
    obtacle10 = loadImage("obstacle10.png");
    obtacle11 = loadImage("obstacle11.gif");
    gameOverImage = loadImage("gameover.png");
    restartImage = loadImage("restart.png");
    jumpSound = loadSound("jump.mp3");
    checkPointSound = loadSound("checkPoint.mp3");
    dieSound = loadSound("die.mp3");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    main = createSprite(200,180,400,20);
    main.addImage("main",mainImage);
    main.x = main.width /2;

    ninja = createSprite(53,250,20,50);
    ninja.addImage("ninja",ninjaImage);
    ninja.scale = 0.269;

    helicop = createSprite(525,90,20,50);
    helicop.addImage("helicop",helicopImage);
    helicop.scale = 0.7;

    score = 0;

    gameOver = createSprite(300,100);
    gameOver.addImage(gameOverImage);
  
    restart = createSprite(300,140);
    restart.addImage(restartImage);

    gameOver.scale = 0.5;
    restart.scale = 0.5;

    invisibleGround = createSprite(200,190,400,10);
    invisibleGround.visible = false;

    obstaclesGroup = createGroup();
 
}

function draw() {
    background = "white";
    textSize(20);
    fill("black")
    text("Score: "+ score,30,50);

    createEdgeSprites();

    if(gameState === PLAY){

        gameOver.visible = false;
        restart.visible = false;
        
        
        
        score = score + Math.round(getFrameRate()/60);
        
        if(score>0 && score%100 === 0){
           checkPointSound.play() 
        }
        
        if (main.x < 0){
            main.x = main.width/2;
        }
        
        if(keyDown("space")&& ninja.y >= 100) {
            ninja.velocityY = -12;
            jumpSound.play();
        }
        
        
        ninja.velocityY = ninja.velocityY + 0.8
      
        spawnObstacles();
        
        if(obstaclesGroup.isTouching(ninja)){

            jumpSound.play();
            gameState = END;
            dieSound.play()
          
        }
      }
       else if (gameState === END) {
          gameOver.visible = true;
          restart.visible = true;
        
          main.velocityX = 0;
          ninja.velocityY = 0
        
          obstaclesGroup.setLifetimeEach(-1);
        
          obstaclesGroup.setVelocityXEach(0);   
       }
      
      if(mousePressedOver(restart)) {
          reset();
        }

        ninja.collide(invisibleGround);

    drawSprites();
 
}

function reset(){
    gameState = PLAY;
    restart.visible = false;
    gameOver.visible = false;
    obstaclesGroup.destroyEach();
    score = 0;
}

function spawnObstacles(){
    if (frameCount % 60 === 0){
      var obstacle = createSprite(600,165,10,40);
      obstacle.velocityX = -(6 + score/100);
      
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
         case 7: obstacle.addImage(obstacle7);
                 break;
         case 8: obstacle.addImage(obstacle8);
                 break;
         case 9: obstacle.addImage(obstacle9);
                 break;
         case 10: obstacle.addImage(obstacle10);
                 break;
         case 11: obstacle.addImage(obstacle11);
                 break;
         default: break;
       }
                 
       obstacle.scale = 0.5;
       obstacle.lifetime = 300;
      
      
       obstaclesGroup.add(obstacle);
    }
   }
   