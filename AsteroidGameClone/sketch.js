var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];
var asteroidsHit = 0;
var showInstructions = true;

//////////////////////////////////////////////////
function setup() {
  createCanvas(1200,800);
  spaceship = new Spaceship();
  asteroids = new AsteroidSystem();

  //location and size of earth and its atmosphere
  atmosphereLoc = new createVector(width/2, height*2.9);
  atmosphereSize = new createVector(width*3, width*3);
  earthLoc = new createVector(width/2, height*3.1);
  earthSize = new createVector(width*3, width*3);
}

//////////////////////////////////////////////////
function draw() {
  background(0);
  sky();

  spaceship.run();
  asteroids.run();

  drawEarth();
  drawScore();

  if (showInstructions) drawInstructions();
  setTimeout(() => {
    showInstructions = false;
  }, 10000);

  checkCollisions(spaceship, asteroids); // function that checks collision between various elements
}

//////////////////////////////////////////////////
// draws the user instructions
function drawInstructions(){
  fill(255);
  textSize(35);
  textAlign(CENTER);
  text("Press the Spacebar to shoot. Destroy all asteroids before they hit Earth.", width / 2, 3 / 4 * height);
  textAlign(LEFT);
}

//draws earth and atmosphere
function drawEarth(){
  noStroke();
  //draw atmosphere
  fill(0,0,255, 50);
  ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x,  atmosphereSize.y);
  //draw earth
  fill(140, 187, 222);
  ellipse(earthLoc.x, earthLoc.y, earthSize.x, earthSize.y);
}

// draws the number of asteroids that have been hit
function drawScore(){
  fill(255);
  textSize(35);
  text("Score: " + asteroidsHit, 30, 50);
}

//////////////////////////////////////////////////
//checks collisions between all types of bodies
function checkCollisions(spaceship, asteroids){
    //spaceship-2-asteroid collisions
    for (let i = 0; i < asteroids.locations.length; i++) {
      if (isInside(spaceship.location, spaceship.size, asteroids.locations[i], asteroids.diams[i])) {
        gameOver();
      }
    }

    //asteroid-2-earth collisions
    for (let i = 0; i < asteroids.locations.length; i++) {
      if (isInside(asteroids.locations[i], asteroids.diams[i], earthLoc, earthSize.y)) {
        gameOver();
      }
    }

    //spaceship-2-earth
    if (isInside(spaceship.location, spaceship.size, earthLoc, earthSize.y)) {
      gameOver();
    }

    //spaceship-2-atmosphere
    if (isInside(spaceship.location, spaceship.size, atmosphereLoc, atmosphereSize.y)) {
      spaceship.setNearEarth();
      spaceship.activateThrusters = false;
    }

    //bullet collisions
    for (let i = 0; i < spaceship.bulletSys.bullets.length; i++) {
      for (let j = 0; j < asteroids.locations.length; j++) {
        if (isInside(spaceship.bulletSys.bullets[i], spaceship.bulletSys.diam, asteroids.locations[j], asteroids.diams[j])) {
          asteroids.destroy(j);
          asteroidsHit++;
        }
      }
    }
}

//////////////////////////////////////////////////
//helper function checking if there's collision between object A and object B
function isInside(locA, sizeA, locB, sizeB){
  if (dist(locA.x, locA.y, locB.x, locB.y) < ((sizeA / 2) + (sizeB / 2))) {
    return true;
  }
  else {
    return false;
  }
}

//////////////////////////////////////////////////
function keyPressed(){
  if (keyIsPressed && keyCode === 32){ // if spacebar is pressed, fire!
    spaceship.fire();
  }
}

//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver(){
  fill(255);
  textSize(80);
  textAlign(CENTER);
  text("GAME OVER", width/2, height/2)
  noLoop();
}

//////////////////////////////////////////////////
// function that creates a star lit sky
function sky(){
  push();
  while (starLocs.length<300){
    starLocs.push(new createVector(random(width), random(height)));
  }
  fill(255);
  for (var i=0; i<starLocs.length; i++){
    rect(starLocs[i].x, starLocs[i].y,2,2);
  }

  if (random(1)<0.3) starLocs.splice(int(random(starLocs.length)),1);
  pop();
}
