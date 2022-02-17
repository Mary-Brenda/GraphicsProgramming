function setup() {
    createCanvas(900, 600);
    background(0);
    angleMode(DEGREES);
    rectMode(CENTER);
}

function draw() {
    background(0);
    translate(0, height / 2);
    for (let i = 0; i < width; i+= 1) {
        noFill();
        strokeWeight(5);
        stroke(139, 76, 211);
        let amp = width / 10; // half the height of the wave.
        let period = 360; // how many seconds it should take the ball to complete one round of oscillation.
        let phase = 0; // where we start the cycle. Because we translated, 0 is center, 90 is edge.
        let freq = 0.1; // makes ball move at x hertz; how many cycles it should complete in 1 second.
        // let locX = sin(360 * frameCount/period + phase) * amp; // note: there are 60 framecounts per second.
        let locX = sin(frameCount * i * freq + phase) * amp;
        ellipse(i * 10, locX, locX, locX); // try making width and/or height locX too for variations or back to 30 for stagnance.
    }
}
