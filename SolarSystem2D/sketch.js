let speed;
let sun;
let earth;
let moon;
let asteroid;

function setup() {
    createCanvas(900, 700);
    sun = new CelestialObj();
    earth = new CelestialObj();
    moon = new CelestialObj();
    asteroid = new CelestialObj();
}

function draw() {
    background(68, 80, 148);
    speed = frameCount;

    push();
    translate(width/2, height/2);
    rotate(radians(speed/3));
    sun.draw(color(253, 184, 19), 200); // SUN

        push();
        rotate(radians(-speed / 3 + speed));
        translate(300, -height/2 + 300);
        rotate(radians(speed));
        earth.draw(color(40, 122, 184), 80); // EARTH

            push();
            rotate(radians((-speed / 3 - speed) - speed * 2));
            translate(100, -height/2 + 300 + 100);
            moon.draw(color(246, 241, 213), 30); // MOON

                push();
                rotate(radians(((-speed / 3 - speed) - speed * 2) + speed));
                translate(20, 20);
                asteroid.draw(color(193, 154, 107), 20); // ASTEROID
                pop();

            pop();
            
        pop();

    pop();
}

class CelestialObj {
    constructor() {
        strokeWeight(5);
        stroke(0);
    }

    draw(color, size) {
        fill(color);
        ellipse(0, 0, size, size);
        line(0, 0, size / 2, 0);
    }
}