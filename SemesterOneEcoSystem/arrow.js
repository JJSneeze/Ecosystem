// Joey Jacob
class Arrow{

  constructor(x, y, dx, dy, stat){
    this.loc = createVector(x, y)
    this.vel = createVector(dx, dy)
    this.acc = createVector(0, 0)
    this.clr = color(189, 110, 8);
    this.w = 15;
    this.angle = 0
    this.spawning = false;
    this.stat = stat;
    this.attracStat;
    this.cooldown = 0;
  }
  run(){
    this.checkEdges();
    this.update();
    this.render();
    this.checkPosition();
    if (this.cooldown === 0){
      this.checkDistance();
    }
  } //end of run

  checkEdges(){
    if(this.loc.x < 0){
      this.vel.x = -this.vel.x;
      this.loc.x = 5;
    }

    if(this.loc.x > width){
      this.vel.x = -this.vel.x;
      this.loc.x = width-5
    }

    if(this.loc.y < 0){
      this.vel.y = -this.vel.y;
      this.loc.y = 5
    }

    if(this.loc.y > height){
      this.vel.y = -this.vel.y;
      this.loc.y = height-5;
    }
  } //end of checkEdges

  update(){
    if (this.cooldown > 0){
      this.cooldown--;
    }
    if(this.spawning === true){
      if(typeof arrow[this.attracStat] === 'undefined' || this.stat >= arrow.length){
        this.spawning = false;
        this.cooldown = 150;
      } else {
        var dist = this.loc.dist(arrow[this.attracStat].loc);
        if (dist <= 2){
          this.spawning = false;
          arrow[this.attracStat].spawning = false;
          this.cooldown = 150;
          arrow[this.attracStat].cooldown = 150;

          this.acc = createVector(0, 0);
          this.acc = p5.Vector.sub(this.loc, arrow[this.attracStat].loc);
          this.acc.normalize();
          this.acc.mult(50);

          for (let i = 0; i < Math.floor(random(1, 15)); i++){
            append(arrow, new Arrow(this.loc.x, this.loc.y, random(-5, 5),random(-5, 5), arrow.length-1));
            arrow[arrow.length-1].cooldown = 150;
          }
        }
        this.acc = p5.Vector.sub(arrow[this.attracStat].loc, this.loc);
        this.acc.normalize();
        this.acc.mult(0.5);
      }
    }
    this.vel.add(this.acc)
    this.vel.limit(4)
    this.loc.add(this.vel)
    this.acc = createVector(0,0)
  } //end of update

  render(){
    fill(this.clr);
    push();
    translate(this.loc.x, this.loc.y);
    rotate(this.vel.heading()+PI/2);
    quad(-5, 5, 0, -10, 5, 5, 0, 0);
    pop();
  } //end of render

  checkPosition(){
    var dist1 = this.loc.dist(attrac.loc);//attrac
    var dist2 = this.loc.dist(repel.loc);//repel
    if(dist1 <= 100){
      this.acc = p5.Vector.sub(attrac.loc, this.loc);
      this.acc.normalize();
      this.acc.mult(0.225);
      if(dist1 <= 75){
        this.acc = p5.Vector.sub(this.loc, attrac.loc);
        this.acc.normalize();
        this.acc.mult(0.225);
      }
    }
    if(dist2 <= 100){
      this.acc = p5.Vector.sub(this.loc, repel.loc);
      this.acc.normalize();
      this.acc.mult(0.4);
    }
  } //end of checkPosition

  checkDistance(){
    for (let i = 0; i < arrow.length; i++){
      var dist = this.loc.dist(arrow[i].loc)
      if (arrow[i].loc != this.loc && dist <= 100 && this.loc.x < 300 && this.loc.y < 300
        && arrow[i].loc.x < 300 && arrow[i].loc.y < 300 && arrow[i].spawning === false && this.spawning === false){
          this.spawning = true;
          arrow[i].spawning = true;
          this.attracStat = i;
          arrow[i].attracStat = this.stat;
        }
      }
    }
  } // end of code
