//  Your Name
// 	Date or version number
//  This is a comment
//  The setup function function is called once when your program begins
var arrow = [];
var extend = [];
var ec = 2; //extender count
var oc = 5; //orbiter count
var ac = 20; //arrow count
var attrac;
var repel;
var dir = 0;
var count = 0;
var count3 = 0;
var spawning = true;
var headV;
var snake = [];

function setup() {
  var cnv = createCanvas(1920, 1028);
  cnv.position((windowWidth-width)/2, 30);
  background(84, 84, 84);

  attrac = new Pulser(random(0, width), random(0, height), random(-8, 8),random(-8, 8), -2);
  repel = new Pulser(random(0, width), random(0, height), random(-8, 8),random(-8, 8), -1);

  while (attrac.loc.x <= 300 && attrac.loc.y <= 300){
      attrac = new Pulser(random(0, width), random(0, height), random(-8, 8),random(-8, 8), -2);
    }
    while (repel.loc.x <= 300 && repel.loc.y <= 300){
      repel = new Pulser(random(0, width), random(0, height), random(-8, 8),random(-8, 8), -1);
    }

  for (let i = 0; i < ac; i++){
    arrow[i] = new Arrow(random(0, width), random(0, height), random(-3, 3),random(-3, 3), i);
  }

  for (let i = 0; i < ec; i++){
    extend[i] = new Extender(random(0, width), random(0, height), random(-2, 2),random(-2, 2), i);
    while (extend[i].loc.x <= 300 && extend[i].loc.y <= 300){
      extend[i] = new Extender(random(0, width), random(0, height), random(-2, 2),random(-2, 2), i);
    }
  }

  for(let i = 0; i < 2; i++){
    snake[i] = new Snake(random(0, width), random(0, height));
      while (snake[i].headLoc.x <= 300 && snake[i].headLoc.y <= 300){
        snake[i] = new Snake(random(0, width), random(0, height), 2)
      }
    headV = createVector(snake[i].headVel.x, snake[i].headVel.y);
    snake[i].loadSegs();
  }
}
//  The draw function is called @ 30 fps
function draw() {
  background(84, 84, 84, 70);

  fill(177, 227, 127);
  rect(0, 0, 300, 300);

  for (let i = 0; i < arrow.length; i++){
    arrow[i].run();
  }

  attrac.run();
  repel.run();

  for (let i = 0; i < arrow.length; i++){
    arrow[i].run();
    arrow[i].stat = i;
  }
  for (let i = 0; i < ec; i++){
    extend[i].run();
    if(dir === 0){
      count++;
    } else if(dir === 1){
      count--;
    }

    if(count === 20){
      dir = 1;
    } else if(count === 0){
      dir = 0;
    }
  }
for(let i = 0; i < snake.length; i++){
  headV = createVector(snake[i].headVel.x, snake[i].headVel.y);
  snake[i].run();
  if(snake[i].heads.length >= 16){
    var snakeLoc1 = createVector(snake[i].headLoc.x, snake[i].headLoc.y);
    var snakeLoc2 = createVector(snake[i].heads[8].x, snake[i].heads[8].y);
    snake[i] = new Snake(snakeLoc1.x, snakeLoc1.y, 2);
    append(snake, new Snake(snakeLoc2.x, snakeLoc2.y, 2));
    headV = createVector(snake[i].headVel.x, snake[i].headVel.y);
    snake[i].loadSegs();
    snake[snake.length-1].loadSegs();
  }
}
for (let i = 0; i < snake.length; i++){
  if (snake[i].snakeTime === 0){
    snake.splice(i, 1);
  }
}

if (arrow.length <= 6){
  for (let i = 0; i < 10; i++){
    append(arrow, new Arrow(random(100, 150), random(100, 150), random(-5, 5),random(-5, 5), arrow.length-1));
  }
}


}
