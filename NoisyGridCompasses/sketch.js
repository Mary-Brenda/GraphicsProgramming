var stepSize = 20;

function setup() {
  createCanvas(500, 700);
  angleMode(DEGREES);
}
///////////////////////////////////////////////////////////////////////
function draw() {
  background(125);

  colorGrid();
  compassGrid();

  drawInstructions();
}
///////////////////////////////////////////////////////////////////////
function drawInstructions(){
  fill(0);
  textSize(25);
  textAlign(CENTER);
  text("Move the mouse across the canvas above to distort compass direction and grid colours", 0, 520, 500);
  text("For natural changes over time, the farther away the mouse's location is from the right, the faster the changes and vice versa.", 0, 590, 500);
  textAlign(LEFT);
}

function colorGrid(){
  fill(255);
  stroke(0);
  for (var x = 0; x < stepSize * 25; x += stepSize) {
    for (var y = 0; y < stepSize * 25; y += stepSize) {
      var n = noise(x / 50, y / 50, frameCount / (50 + mouseX)); // smaller mouseX, faster color changes
      let from = color(10, 0, 3);
      let to = color(160, 33, 160);
      let c = lerpColor(from, to, n);
      fill(c)
      rect(x, y, stepSize, stepSize);
    }
  }
}
///////////////////////////////////////////////////////////////////////
function compassGrid(){
  for (var x = 0; x < stepSize * 25; x += stepSize) {
    for (var y = 0; y < stepSize * 25; y += stepSize) {
      let n = noise(x / 400, y / 400, frameCount / (100 + mouseX)); // smaller mouseX, faster compass rotations
      let angle = map(n, 0, 1, 0, 720);
      let length = map(n, 0, 1, 0, 3);
      let lineLength = -stepSize * length;
      let from = color(255, 0, 0);
      let to = color(0, 200, 0);
      let c = lerpColor(from, to, n);
      
      push();
      fill(c);
      stroke(c);
      strokeWeight(2);
      translate(x + (stepSize / 2), y + (stepSize / 2));
      rotate(angle);
      line(0, 0, 0, lineLength);
      triangle(-3, lineLength + 8, 0, lineLength, 3, lineLength + 8); // arrowhead for compass
      pop();
    }
  }
}
