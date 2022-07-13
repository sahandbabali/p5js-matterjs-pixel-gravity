// trying to add obstcles similar to droping bodies
// size 100 * 100

// press CTRL to draw obstacles
// press ALT to draw paricles

// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/urR596FsU68

// module aliases
var Engine = Matter.Engine,
  // Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies;
var grid = 2;

var engine;
var world;
var boxes = [];
var obstacles = [];

var wallleft;
var wallright;
var walltop;

var ground;
var Body = Matter.Body;

var gravitystate = "✣";

var obs1;

function setup() {
  var canvas1 = createCanvas(100, 100);
  canvas1.parent("canvasbox");
  rectMode(CENTER);
  angleMode(RADIANS);
  engine = Engine.create();
  engine.gravity.x = 0;
  engine.gravity.y = 0;
  world = engine.world;
  //Engine.run(engine);
  var options = {
    isStatic: true,
  };
  ground = Bodies.rectangle(width / 2, height, width, 10, options);

  wallleft = Bodies.rectangle(0, height / 2, 10, height, options);
  wallright = Bodies.rectangle(width, height / 2, 10, height, options);
  walltop = Bodies.rectangle(width / 2, 0, width, 10, options);

  World.add(world, [ground, wallleft, wallright, walltop]);
}

function mouseDragged() {
  const [r, g, b] = get(mouseX, mouseY); // get colors
  console.log(r, g, b);

  if (keyIsDown(17)) {
    obstacles.push(new Obs(mouseX, mouseY, 4, 4));
    if (r == 255 && g != 255 && b != 255) {
      obstacles.push(new Obs(mouseX, mouseY, 10, 10));
    }
  }
  if (keyIsDown(18)) {
    if (r == 255 && g != 0) {
      boxes.push(new Box(mouseX, mouseY, 2, 2));
    }
  }
}

function draw() {
  background(255);
  Engine.update(engine);
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].show();
  }
  for (var i = 0; i < obstacles.length; i++) {
    obstacles[i].show();
  }
  noStroke(255);
  fill(170);

  rect(ground.position.x, ground.position.y, width, 10);

  rect(wallleft.position.x, wallleft.position.y, 10, height);
  rect(wallright.position.x, wallright.position.y, 10, height);
  rect(walltop.position.x, walltop.position.y, width, 10);

  textSize(20);
  fill(0);
  text(gravitystate, 10, 25);
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    gravitystate = "↓";
    engine.gravity.x = 0;
    engine.gravity.y = 1;
  } else if (keyCode === UP_ARROW) {
    gravitystate = "↑";
    engine.gravity.x = 0;
    engine.gravity.y = -1;
  } else if (keyCode === LEFT_ARROW) {
    gravitystate = "←";
    engine.gravity.x = -1;
    engine.gravity.y = 0;
  } else if (keyCode === RIGHT_ARROW) {
    gravitystate = "→";
    engine.gravity.x = 1;
    engine.gravity.y = 0;
  } else if (keyCode === 96) {
    gravitystate = "✣";
    engine.gravity.x = 0;
    engine.gravity.y = 0;
  }
}

function snap(p) {
  // subtract offset (to center lines)
  // divide by grid to get row/column
  // round to snap to the closest one
  var cell = Math.round((p - grid / 2) / grid);
  // multiply back to grid scale
  // add offset to center
  return cell * grid;
}
