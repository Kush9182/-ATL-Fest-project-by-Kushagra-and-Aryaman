var oceanBackground,FishImage,Bottle,Polythene,Acid;
var Background,fish;
var edge1,edge2,edge3,edge4;
var score=0;
var INTRO=0;
var PLAY=1;
var END=2;
var gamestate=INTRO;

function preload(){

  oceanBackground=loadImage("ocean.jpg");  
  
  FishImage=loadImage("Fish.png");
  
  Bottle=loadImage("garbage bottle.png");
  
  Polythene=loadImage("garbage polythene.png");
  
  Acid=loadImage("garbage acid drum.png");}

function setup(){
  createCanvas(600,400);
  
  Background=createSprite(400,200,600,400);
  Background.addImage(oceanBackground);
  Background.scale=1.5;
  Background.velocityX=-3;
  
  fish=createSprite(100,200,10,10);
  fish.addImage(FishImage);
  fish.scale=0.25;
  fish.setCollider("rectangle",0,0,280,180)
   
  edge1=createSprite(-1,200,3,400);
  edge2=createSprite(601,200,3,400);
  edge3=createSprite(300,-1,600,3);
  edge4=createSprite(300,401,600,3);
  
  edge1.visible=false;
  edge2.visible=false;
  edge3.visible=false;
  edge4.visible=false;
  
  garbage=createGroup();}

function draw(){
  background("white");
  
  if(gamestate===INTRO){
    fish.visible=0;
    Background.visible=0;
    
    if(keyDown("p")){
      gamestate=PLAY;
    }
    
    fill("black")
    textSize(20);
    text("You,as a clownfish have decided to swim a circle around the",width-570,100);
    text("Earth. But there is a problem. There is a lot of garbage ",width-550,140);
    text("floating in your way. Navigate your way through the garbage",width-570,180);
    text("and complete the mission.",200,220);
    text("Press 'p' to start your journey",180,300);
  }
  if(gamestate===PLAY){
    Background.visible=1;
    fish.visible=1;
    
    fill("black");
    score=score+Math.round(frameRate()/60);
      
    fish.velocityX=0;
    fish.velocityY=0;
                      
    fish.collide(edge1);
    fish.collide(edge2);
    fish.collide(edge3);
    fish.collide(edge4);

    garbage1();
    garbage2();
    garbage3();  
  
    if(Background.x<150){
      Background.x=300;}

    if (keyDown("left")) {
      fish.velocityX=-6;
      fish.velocityY=0;}

    if (keyDown("right")) {
      fish.velocityX=6;
      fish.velocityY=0;}

    if (keyDown("down")) {
      fish.velocityX=0;
      fish.velocityY=6;}

    if (keyDown("up")) {
      fish.velocityX=0;
      fish.velocityY=-6;}

    if (keyDown("left")&&keyDown("up")) {
      fish.velocityX=-6;
      fish.velocityY=-6;}

    if (keyDown("left")&&keyDown("down")) {
      fish.velocityX=-6;
      fish.velocityY=6;}

    if (keyDown("right")&&keyDown("up")) {
      fish.velocityX=6;
      fish.velocityY=-6;}

    if (keyDown("right")&&keyDown("down")) {
      fish.velocityX=6;
      fish.velocityY=6;} 
    
    if(fish.isTouching(garbage)){
      gamestate=END;
    }
  }
  
  if(gamestate===END){
    
    background("black");
    
    fish.visible=0;
    Background.visible=0;
    garbage.destroyEach();
    
    fill("yellow");
    textSize(40);
    text("Uh-Oh.... You Died",130,170);
    
    textSize(20);
    text("want to try again? if yes, then press 'r'",130,230)
    
    if(keyDown("r")){
      gamestate=PLAY;
      fish.visible=1;
      fish.x=100;
      fish.y=200;
      Background.visible=1;
      score=0;}}
  
  drawSprites();
  
  textSize(20);
  text("score = "+score,10,30);}



function garbage1(){
  if(frameCount%50===0){
    var bottle=createSprite(605,random(20,380),10,10)
    bottle.addImage(Bottle);
    bottle.velocityX=-6;
    bottle.scale=0.17;
    bottle.lifetime=110;
    garbage.add(bottle)
    bottle.setCollider("rectangle",0,0,380,380)}}



function garbage2(){
  if(frameCount%70===0){
    var polythene=createSprite(605,random(20,380),10,10)
    polythene.addImage(Polythene);
    polythene.velocityX=-6;
    polythene.scale=0.17;
    polythene.lifetime=110;
    garbage.add(polythene)
    polythene.setCollider("rectangle",0,0,380,380)}}



function garbage3(){
  if(frameCount%90===0){
    var acid=createSprite(605,random(20,380),10,10)
    acid.addImage(Acid);
    acid.velocityX=-6;
    acid.scale=0.5;
    acid.lifetime=110;
    garbage.add(acid)
    acid.setCollider("rectangle",0,0,130,130)}}
