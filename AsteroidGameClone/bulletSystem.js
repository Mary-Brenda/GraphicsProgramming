class BulletSystem {

  constructor(){
    this.bullets = [];
    this.velocity = new createVector(0, -5);
    this.diam = 10; 
  }

  run(){
      this.move();
      this.draw();
      this.edges();
  }

  fire(x, y){
    this.bullets.push(createVector(x,y));
  }

  //draws all bullets
  draw(){
    fill(255, 140, 0);
    for (var i = 0; i < this.bullets.length; i++){
      noStroke();
      fill(255, 185, 0);
      ellipse(this.bullets[i].x, this.bullets[i].y, 10, 30);
      fill(255, 255, 0);
      ellipse(this.bullets[i].x, this.bullets[i].y, 5, 40);
    }
  }

  //updates the location of all bullets
  move(){
    for (var i = 0; i < this.bullets.length; i++){
      this.bullets[i].y += this.velocity.y;
    }
  }

  //check if bullets leave the screen and remove them from the array
  edges(){
    for (var i = 0; i < this.bullets.length; i++) {
      if (this.bullets[i].x < 0 || this.bullets[i].x > width || this.bullets[i].y < 0 || this.bullets[i].y > height) {        
        this.bullets.splice(i, 1);
      }
    }
  }
}
