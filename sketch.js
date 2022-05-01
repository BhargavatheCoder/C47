var alien1,alien1_img
,alien2,alien2_img
,alien3,alien3_img
,alien4,alien4_img
,gameover,background_img,platform
,shooter,shooter_img
,alienGroup,alien,bullet,bulletGroup

var lives = 3
var gameState = PLAY;
var PLAY = 1;
var END = 0;

function preload()
{
	alien1_img = loadImage("assets/alien1.png")
	alien2_img = loadImage("assets/alien2.png")
	alien3_img = loadImage("assets/alien3.png")
	alien4_img = loadImage("assets/alien4.png")
	gameover = loadImage("assets/GameOver.jpg")
	shooter_img = loadImage("assets/Shooter.png")
	background_img = loadImage("assets/Background.jpg")
}

function setup() {
	createCanvas(windowWidth,windowHeight);

	platform = createSprite(width/2,height/3-50)
    platform.addImage(background_img);
	platform.scale = 1.6

	/*alien1 = createSprite(400,400,10,10);
	alien1.addImage(alien1_img);
    alien1.scale = 0.8;

	alien2 = createSprite(300,400,10,10);
	alien2.addImage(alien2_img);
    alien2.scale = 0.8;

	alien3 = createSprite(200,400,10,10);
	alien3.addImage(alien3_img);
    alien3.scale = 0.8;

	alien4 = createSprite(100,400,10,10);
	alien4.addImage(alien4_img);
    alien4.scale = 0.8;*/

	shooter = createSprite(400,200,10,10);
	shooter.addImage(shooter_img);
	shooter.scale = 0.2;

	alienGroup = new Group();
    bulletGroup =  new Group();




	//engine = Engine.create();
	//world = engine.world;

	//Create the Bodies Here.
    

	//Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(0);
  fill("black")
  textSize(20);
  text("Lives:" + lives,50,50);
  if(gameState===PLAY)
  {
	spawn();
	movement();
	if(keyDown("space"))
	{
	 bulletspawn();
	}

	if(alienGroup.collide(bulletGroup))
    {
    alienGroup.destroyEach();
    }

    if(alienGroup.isTouching(shooter))
    {
    lives= lives-1
    }

	if(lives===0)
	{
		gameState === END;
	}
  }
  else if(gameState === END)
  {

  }
  drawSprites();
 
}

function movement()
{

	if(keyDown("D"))
    {
	shooter.x = shooter.x+5
    }

	if(keyDown("A"))
	{
		shooter.x-=5
	}

	if(shooter.y<height-300)
	{
    shooter.velocityY+=1
	}
	else{
		shooter.velocityY=0;
		if(keyDown("W"))
        {
		shooter.velocityY-=20
	    }

    }
}
function spawn()
{
	if (frameCount % 80 === 0){
		var alien = createSprite(1000,height-300,10,40);
		alien.velocityX=-5
		alien.depth = shooter.depth;
		 //generate random obstacles
		 var rand = Math.round(random(1,4));
		 switch(rand) {
		   case 1: alien.addImage(alien1_img);
				   break;
		   case 2: alien.addImage(alien2_img);
				   break;
		   case 3: alien.addImage(alien3_img);
				   break;
		   case 4: alien.addImage(alien4_img);
				   break;
		   default: break;
		            
                   }
		alienGroup.add(alien);
		alien.lifetime = 300
}
}

function bulletspawn()
{
    bullet=createSprite(150,width/2,5,5);
	bullet.x=shooter.x+5;
	bullet.shapeColor="black";
	bullet.velocityX=10;
	bulletGroup.add(bullet);
}

function gameover()
{
	swal(
		 { title: `Game Over!!!`,
		 imageUrl: "GameOver.jpg",
		 imageSize: "160x160",
		 text: "Thanks for playing, your score was: " + score + "!!", 
		 confirmButtonText: "Play Again" 
		}, 
		function (isConfirm) { 
			if (isConfirm)
			 {
				  location.reload(); 
			 } 
			}
	 );
	
}