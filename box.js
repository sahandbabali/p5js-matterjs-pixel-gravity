// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/urR596FsU68

function Box(x, y, w, h) {
  var options = {
    // inertia: Infinity,
    friction: 0.5,
    restitution: 0.1,
  };
  this.body = Bodies.rectangle(x, y, w, h, options);
  this.body.angle = 0;
  this.w = w;
  this.h = h;
  World.add(world, this.body);

  this.show = function () {
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(snap(pos.x), snap(pos.y));
    // rotate(angle);
    rectMode(CENTER);
    strokeWeight(0);
    stroke(255, 0, 0);
    fill(255, 0, 0);
    rect(0, 0, this.w, this.h);
    pop();
  };
}
