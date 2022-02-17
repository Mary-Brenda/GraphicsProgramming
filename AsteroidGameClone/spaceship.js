class Spaceship {

  constructor(){
    this.velocity = new createVector(0, 0);
    this.location = new createVector(width/2, height/2);
    this.acceleration = new createVector(0, 0);
    this.maxVelocity = 5;
    this.bulletSys = new BulletSystem();
    this.size = 50;
    this.activateThrusters = true;
  }

  run(){
    this.bulletSys.run();
    this.draw();
    this.move();
    this.edges();
    this.interaction();
  }

  draw(){
    var outerFlameValue = random(this.size / 1.8, (this.size / 2) + 20);
    var innerFlameValue = random(this.size / 1.8, (this.size / 2) + 15);
    
    if (this.activateThrusters) {
      // LEFT JET THRUSTER FLAMES
      noStroke();
      fill(255, 185, 0);
      ellipse(this.location.x - this.size / 3, this.location.y + outerFlameValue, 10, 30);
      fill(255, 255, 0);
      ellipse(this.location.x - this.size / 3, this.location.y + innerFlameValue, 5, 40);

      // RIGHT JET THRUSTER FLAMES
      noStroke();
      fill(255, 185, 0);
      ellipse(this.location.x + this.size / 3, this.location.y + outerFlameValue, 10, 30);
      fill(255, 255, 0);
      ellipse(this.location.x + this.size / 3, this.location.y + innerFlameValue, 5, 40);
    }

    // LEFT AND RIGHT JET THRUSTERS
    fill(255, 0, 0);
    arc(this.location.x, this.location.y + this.size/2, 50, 40, PI, 0, CHORD);

    // SPACESHIP BODY
    fill(30, 144, 255);
    ellipse(this.location.x, this.location.y, 30, 80);
    
    // SPACESHIP WINDOWS
    fill(255);
    ellipse(this.location.x, this.location.y - 12, 15, 15);
    ellipse(this.location.x, this.location.y + 8, 15, 15);
  }

  move(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxVelocity);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(f){
    this.acceleration.add(f);
  }

  interaction(){
      if (keyIsDown(LEFT_ARROW)){
        this.applyForce(createVector(-0.1, 0));
      }
      if (keyIsDown(RIGHT_ARROW)){
        this.applyForce(createVector(0.1, 0));
      }
      if (keyIsDown(UP_ARROW)){
        this.applyForce(createVector(0, -0.1));
        this.activateThrusters = true;
      }
      if (keyIsDown(DOWN_ARROW)){
        this.applyForce(createVector(0, 0.1));
      }
  }

  fire(){
    this.bulletSys.fire(this.location.x, this.location.y);
  }

  edges(){
    if (this.location.x<0) this.location.x=width;
    else if (this.location.x>width) this.location.x = 0;
    else if (this.location.y<0) this.location.y = height;
    else if (this.location.y>height) this.location.y = 0;
  }

  setNearEarth(){
    // gravity/downwards-pointing vector pulls the spaceship towards the earth.
    var downwardsPointing = new createVector(0, 0.05);
    this.applyForce(downwardsPointing);
    
    // creates friction 30 times smaller than the spaceship's velocity.
    var friction = this.velocity.copy();
    friction.div(30);
    // friction points and is applied in the opposite direction to the spaceship's velocity.
    friction.mult(-1);
    friction.normalize();
    this.applyForce(friction);
  }
}
