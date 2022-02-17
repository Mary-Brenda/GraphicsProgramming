// Example is based on examples from: http://brm.io/matter-js/, https://github.com/shiffman/p5-matter
// add also Benedict Gross credit

var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
var Constraint = Matter.Constraint;
var Mouse = Matter.Mouse;
var MouseConstraint = Matter.MouseConstraint;

var engine;
var propeller;
var barricade1;
var boxes = [];
var birds = [];
var colors = [];
var barricade = [];
var ground;
var slingshotBird, slingshotConstraint;
var angle=0;
var barricadeAngle = 0;
var angleSpeed=0.03;
var barricadeAngleSpeed = 0.04;
var canvas;
var countdown;
var startButton;
var gameIntroOver = false;
var birdQuoteOver = false;
////////////////////////////////////////////////////////////
function setup() {
  canvas = createCanvas(1000, 600);

  engine = Engine.create();  // create an engine

  setupGround();

  setupPropeller();

  setupBarricade();

  setupTower();

  setupSlingshot();

  setupMouseInteraction();

  countdown = new Timer(60);
}
////////////////////////////////////////////////////////////
function draw() {
  background(68, 80, 148);

  if (!gameIntroOver && !birdQuoteOver) {
    drawGameInstructions();
  }
  else if (gameIntroOver && !birdQuoteOver) {
    drawBirdQuote();
  }
  else if (gameIntroOver && birdQuoteOver) {
    Engine.update(engine);

    drawGround();

    drawPropeller();

    drawBarricade();

    drawTower();

    drawBirds();

    drawSlingshot();

    drawCountdownTimer();

    checkIfPlayerHasWon();
  }
}
////////////////////////////////////////////////////////////
function drawGameInstructions() {
  let startHeight = 200;
  let startWidth = 80;

  // draw game title
  fill(255, 38, 86);
  textSize(35);
  textFont('Verdana');
  textStyle(BOLD);
  textAlign(CENTER);
  text("ANGRY BIRDS CLONE GAME", width / 2, startHeight - 100);

  // draw game instructions
  fill(255);
  textAlign(LEFT);
  textStyle(NORMAL);
  textSize(25);
  text("INSTRUCTIONS", startWidth, startHeight);
  text("- Press, Drag and Release the slingshot to propel the slingshot bird.", startWidth, startHeight + 50);
  text("- Use the Left and Right Arrow Keys to control the propeller.", startWidth, startHeight + 100);
  text("- Press B to create a new bird to use with the propeller.", startWidth, startHeight + 150);
  text("- Press R to reset the slingshot and the slingshot bird.", startWidth, startHeight + 200);
  text("- Move all boxes off the screen before the 60 seconds timer is up.", startWidth, startHeight + 250);

  fill(38, 200, 86);
  textAlign(CENTER);
  text("Got it? Press ENTER to continue", width / 2, startHeight + 320);
}
////////////////////////////////////////////////////////////
function drawBirdQuote() {
  fill(200, 28, 76);
  textSize(25);
  textFont('Verdana');
  textStyle(BOLD);
  textAlign(CENTER);
  text("We may lose tails. We may lose eyes.", width/2, height/2 - 100);
  text("We may even lose beaks.", width / 2, height / 2 - 50);
  text("But we do not stop until we win this war.", width / 2, height / 2);
  text("For the bird nation!!!", width / 2, height / 2 + 50);
  fill(0);
  textStyle(ITALIC);
  text("- Commander Birdy", width / 2, height / 2 + 100);
  
  fill(38, 200, 86);
  textStyle(NORMAL);
  text("Ready? Press ENTER to begin!", width / 2, 520);
}
////////////////////////////////////////////////////////////
//use arrow keys to control propeller
function keyPressed(){
  if (keyCode == LEFT_ARROW){
    angleSpeed += 0.01;
  }
  else if (keyCode == RIGHT_ARROW){
    angleSpeed -= 0.01;
  }
  else if (keyCode == ENTER) {
    if (!gameIntroOver && !birdQuoteOver) {
      gameIntroOver = true;
    }
    else if (gameIntroOver && !birdQuoteOver) {
      birdQuoteOver = true;
      
      // to fix bug that releases bird even when mouse is not released.
      removeFromWorld(slingshotBird);
      removeFromWorld(slingshotConstraint);
      setupSlingshot();

      countdown.start();
    }
  }
}
////////////////////////////////////////////////////////////
function keyTyped(){
  //if 'b' create a new bird to use with propeller
  if (key==='b'){
    setupBird();
  }

  //if 'r' reset the slingshot
  if (key==='r'){
    removeFromWorld(slingshotBird);
    removeFromWorld(slingshotConstraint);
    setupSlingshot();
  }
}

//**********************************************************************
//  HELPER FUNCTIONS - DO NOT WRITE BELOW THIS line
//**********************************************************************

//if mouse is released destroy slingshot constraint so that
//slingshot bird can fly off
function mouseReleased(){
  setTimeout(() => {
    slingshotConstraint.bodyB = null;
    slingshotConstraint.pointA = { x: 0, y: 0 };
  }, 100);
}
////////////////////////////////////////////////////////////
//tells you if a body is off-screen
function isOffScreen(body){
  var pos = body.position;
  return (pos.y > height || pos.x<0 || pos.x>width);
}
////////////////////////////////////////////////////////////
//removes a body from the physics world
function removeFromWorld(body) {
  World.remove(engine.world, body);
}
////////////////////////////////////////////////////////////
function drawVertices(vertices) {
  beginShape();
  for (var i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape(CLOSE);
}
////////////////////////////////////////////////////////////
function drawConstraint(constraint) {
  push();
  var offsetA = constraint.pointA;
  var posA = {x:0, y:0};
  if (constraint.bodyA) {
    posA = constraint.bodyA.position;
  }
  var offsetB = constraint.pointB;
  var posB = {x:0, y:0};
  if (constraint.bodyB) {
    posB = constraint.bodyB.position;
  }
  strokeWeight(5);
  stroke(255);
  line(
    posA.x + offsetA.x,
    posA.y + offsetA.y,
    posB.x + offsetB.x,
    posB.y + offsetB.y
  );
  pop();
}
////////////////////////////////////////////////////////////
// function that draws a countdown showing the time remaining.
function drawCountdownTimer() {
  let remainingTime = countdown.getTimeInSeconds();
  fill(0, 255, 0);
  textStyle(BOLD);
  textSize(35);
  textAlign(RIGHT);
  if (remainingTime <= 30) fill(255, 165, 0);
  if (remainingTime <= 15) fill(255, 0, 0);
  text(remainingTime + 's', width - 50, 50);
}
////////////////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function displayGameResult(isWon) {
  fill(255);
  textSize(80);
  textAlign(CENTER);
  if (isWon) text("YOU WON!!!", width / 2, height / 2)
  else text("GAME OVER", width / 2, height / 2)
  noLoop();
}
////////////////////////////////////////////////////////////
// function that checks if the player has won or lost.
function checkIfPlayerHasWon() {
  let countdownIsFinished = countdown.isFinished();
  let hasWon = true;
  for (var i = 0; i < boxes.length; i++) {
    if (!isOffScreen(boxes[i])) {
      hasWon = false;
      if (countdownIsFinished) displayGameResult(hasWon);
    }
  }
  if (hasWon) displayGameResult(hasWon);
}