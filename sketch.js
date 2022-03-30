var score =0;
var gun,corona,corona1, bullet, backBoard;

var gunImg,coronaImg, bulletImg, blastImg, backBoardImg,resetImg , blastSound;

var corona1Group, corona1Group, bulletGroup;


var life =3;
var score=0;
var gameState=1

function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  coronaImg = loadImage("corona.png")
  corona1Img = loadImage("corona1.png")
  backBoardImg= loadImage("back.jpg")
  resetImg = loadImage("reset.png")

  blastSound = loadSound("blastSound.mp3")
}
function setup() {
  createCanvas(windowWidth, windowHeight);

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2

 
  
  bulletGroup = createGroup();   
  coronaGroup = createGroup();   
  corona1Group = createGroup();   
  
  heading= createElement("h1");
  scoreboard= createElement("h1");
}

function draw() {
  background("#BDA297");
  
  heading.html("Life: "+life)
  heading.style('color:red'); 
  heading.position(150,20)

  scoreboard.html("Score: "+score)
  scoreboard.style('color:red'); 
  scoreboard.position(width-200,20)

  if(gameState===1){
    gun.y=mouseY  

    if (frameCount % 80 === 0) {
      drawcorona();
    }

    if (frameCount % 100 === 0) {
      drawcorona1();
    }

    if(keyDown("space")){
      shootBullet();
      blastSound.play();
    }

    if (coronaGroup.collide(backBoard)){
      handleGameover(coronaGroup);
    }
    
    if (corona1Group.collide(backBoard)) {
      handleGameover(corona1Group);
    }
    
    if(coronaGroup.collide(bulletGroup)){
      handleBubbleCollision(coronaGroup);
    }

    if(corona1Group.collide(bulletGroup)){
      handleBubbleCollision(corona1Group);
    }

    drawSprites();
  }
    
  
}

function drawcorona(){
  corona = createSprite(windowWidth,random(20,780),40,40);
  corona.addImage(coronaImg);
  corona.scale = 0.3;
  corona.velocityX = -(8 + score/100);
  corona.lifetime = 400;
  coronaGroup.add(corona);
}
function drawcorona1(){
  corona1 = createSprite(windowWidth,random(20,780),40,40);
  corona1.addImage(corona1Img);
  corona1.scale = 0.3;
  corona1.velocityX = -8;
  corona1.lifetime = 400;
  corona1Group.add(corona1);
}

function shootBullet(){
  bullet= createSprite(150, width/2, 50,20)
  bullet.y= gun.y-20
  bullet.addImage(bulletImg)
  bullet.scale=0.12
  bullet.velocityX= 7
  bulletGroup.add(bullet)
}

function handleBubbleCollision(bubbleGroup){
    if (life > 0) {
       score=score+1;
    }

     blast= createSprite(bullet.x+60, bullet.y, 50,50);
    blast.addImage(blastImg) 
    
    blast.scale=0.3
    blast.life=20
    bulletGroup.destroyEach()
    bubbleGroup.destroyEach()
}

function handleGameover(bubbleGroup){
  
    life=life-1;
    bubbleGroup.destroyEach();
    
    

    if (life === 0) {
      gameState=2
      
      swal({
        title: `Game Over`,
        text: "Oops you lost the game....!!!",
        text: "Your Score is " + score,
        imageUrl:
          "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Reload to play"
      });
      location.reload();
    }
  
}