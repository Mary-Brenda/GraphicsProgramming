////////////////////////////////////////////////////////////////
function setupGround(){
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true, angle: 0
  });
  World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
function drawGround(){
  push();
  fill(56, 128, 4);
  drawVertices(ground.vertices);
  pop();
}
////////////////////////////////////////////////////////////////
function setupPropeller(){
  propeller = Bodies.rectangle(150, 480, 200, 15, { 
    isStatic: true, angle: angle 
  });
  World.add(engine.world, [propeller]);
}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller(){
  push();
  fill(156, 59, 181);
  drawVertices(propeller.vertices);
  Body.setAngle(propeller, angle);
  Body.setAngularVelocity(propeller, angleSpeed);
  angle += angleSpeed;
  pop();
}
////////////////////////////////////////////////////////////////
function setupBarricade() {
  // your code here
  let posY = 100;
  for (var i = 0; i < 3; i++) {
    let block = Bodies.rectangle(width / 2 + 10, posY, 15, 120, {
      isStatic: true, angle: barricadeAngle
    });
    barricade.push(block);
    World.add(engine.world, [block]);
    posY += 180;
  }
}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawBarricade() {
  push();
  // your code here
  fill(130,0,0);
  for (var i = 0; i < barricade.length; i++) {
    drawVertices(barricade[i].vertices);
    Body.setAngle(barricade[i], barricadeAngle);
    Body.setAngularVelocity(barricade[i], barricadeAngleSpeed);
    barricadeAngle += barricadeAngleSpeed;
  }
  pop();
}
////////////////////////////////////////////////////////////////
function setupBird(){
  var bird = Bodies.circle(mouseX, mouseY, 20, {friction: 0,
      restitution: 0.95 });
  Matter.Body.setMass(bird, bird.mass*10);
  World.add(engine.world, [bird]);
  birds.push(bird);
}
////////////////////////////////////////////////////////////////
function drawBirds(){
  push();
  for (var i = 0; i < birds.length; i++) {
    fill(0, 255, 0);
    drawVertices(birds[i].vertices);
    drawBirdFeatures(birds[i].vertices[0]);
    
    if (isOffScreen(birds[i])) {
      removeFromWorld(birds[i]);
      birds.splice(i, 1);
      i--;
    }
  }
  pop();
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower(){
  //you code here
  let location = createVector(width/1.5, 140);
  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 3; j++) {
      let box = Bodies.rectangle(location.x, location.y, 80, 80);
      boxes.push(box);
      colors.push([random(50, 255), random(50, 255), random(50, 255)]);
      World.add(engine.world, [box]);
      location.x += 80;
    }
    location.x = width / 1.5;
    location.y += 80;
  }
}
////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower(){
  push();
  //your code here
  for (var i = 0; i < boxes.length; i++) {
    fill(colors[i]);
    strokeWeight(5);
    stroke(50);
    drawVertices(boxes[i].vertices);
    strokeWeight(5);
    stroke(0);
    // draw cross across each box.
    beginShape();
    vertex(boxes[i].vertices[0].x + 6, boxes[i].vertices[0].y + 10);
    vertex(boxes[i].vertices[0].x + 6, boxes[i].vertices[0].y + 6);
    vertex(boxes[i].vertices[0].x + 10, boxes[i].vertices[0].y + 6);
    vertex(boxes[i].vertices[2].x - 6, boxes[i].vertices[2].y - 10);
    vertex(boxes[i].vertices[2].x - 6, boxes[i].vertices[2].y - 6);
    vertex(boxes[i].vertices[2].x - 10, boxes[i].vertices[2].y - 6);
    endShape(CLOSE);
    beginShape();
    vertex(boxes[i].vertices[3].x + 6, boxes[i].vertices[3].y - 10);
    vertex(boxes[i].vertices[3].x + 6, boxes[i].vertices[3].y - 6);
    vertex(boxes[i].vertices[3].x + 10, boxes[i].vertices[3].y - 6);
    vertex(boxes[i].vertices[1].x - 6, boxes[i].vertices[1].y + 10);
    vertex(boxes[i].vertices[1].x - 6, boxes[i].vertices[1].y + 6);
    vertex(boxes[i].vertices[1].x - 10, boxes[i].vertices[1].y + 6);
    endShape(CLOSE);
    strokeWeight(1);
  }
  pop();
}
////////////////////////////////////////////////////////////////
function setupSlingshot(){
  slingshotBird = Bodies.circle(200, 200, 20, {
    friction: 0,
    restitution: 0.95
  });
  Matter.Body.setMass(slingshotBird, slingshotBird.mass * 10);

  slingshotConstraint = Constraint.create({
    pointA: { x: 200, y: 180 },
    bodyB: slingshotBird,
    stiffness: 0.01,
    damping: 0.0001
  });
  World.add(engine.world, [slingshotBird, slingshotConstraint]);
}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot(){
  push();
  fill(255, 0, 0);
  drawVertices(slingshotBird.vertices);
  drawBirdFeatures(slingshotBird.vertices[0]);
  
  fill(255);
  drawConstraint(slingshotConstraint);
  pop();
}

function drawBirdFeatures(pos) {
  fill(255);
  ellipse(pos.x - 10, pos.y - 10, 20);
  fill(0);
  ellipse(pos.x - 8, pos.y - 8, 10);
  fill(246, 183, 29);
  triangle(pos.x - 10, pos.y,
    pos.x - 2, pos.y - 10,
    pos.x + 15, pos.y + 4);
  triangle(pos.x - 10, pos.y,
    pos.x - 10, pos.y + 10,
    pos.x + 10, pos.y + 10);
  // strokeWeight(5);
  // stroke(50);
  fill(0);
  beginShape();
  vertex(pos.x - 30, pos.y - 5);
  vertex(pos.x - 50, pos.y - 15);
  vertex(pos.x - 40, pos.y - 5);
  vertex(pos.x - 50, pos.y - 5);
  vertex(pos.x - 40, pos.y);
  vertex(pos.x - 50, pos.y + 5);
  vertex(pos.x - 30, pos.y + 5);
  endShape();
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction(){
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}
