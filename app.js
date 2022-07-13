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
var grid = 1;

var engine;
var world;
var boxes = [];
var obstacles = [];

var wallleft;
var wallright;
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

  obs1 = Bodies.rectangle(width / 2, height / 2, width / 2, 10, options);

  Body.rotate(obs1, 0.261799);
  wallleft = Bodies.rectangle(0, height / 2, 10, height, options);
  wallright = Bodies.rectangle(width, height / 2, 10, height, options);

  World.add(world, [ground, obs1, wallleft, wallright]);
}

function mouseDragged() {
  const [r, g, b] = get(mouseX, mouseY); // get colors
  console.log(r, g, b);

  if (keyIsDown(17)) {
    obstacles.push(new Obs(mouseX, mouseY, 1, 1));
    if (r == 255 && g != 255 && b != 255) {
      obstacles.push(new Obs(mouseX, mouseY, 1, 1));
    }
  }
  if (keyIsDown(18)) {
    if (r == 255 && g != 0) {
      boxes.push(new Box(mouseX, mouseY, 1, 1));
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
  push();
  translate(obs1.position.x, obs1.position.y);
  rotate(0.261799);
  rect(0, 0, width / 2, 10);

  fill(255);

  pop();

  textSize(20);
  fill(0);
  text(gravitystate, 10, 20);
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
