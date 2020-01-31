class Snake{

  constructor(x, y, numSegs){
    this.headLoc = createVector(x, y);
    this.headVel = createVector(random(-5, 5), random(-5, 5));
    this.numSegs = numSegs;
    this.snakeTime = 2000;

    this.heads = [];
    this.tails = [];

    this.acc = createVector(0,0);

  }

  loadSegs(){
    this.heads[0] = createVector(this.headLoc.x, this.headLoc.y);
    this.tails[0] = createVector(this.heads[0].x-(headV.normalize()).mult(40).x, this.heads[0].y-(headV.normalize()).mult(40).y)
    for (let i = 1; i < this.numSegs; i++){
      this.heads[i] = createVector(this.tails[i-1].x, this.tails[i-1].y);
      this.tails[i] = createVector(this.heads[i].x-(headV.normalize()).mult(40).x, this.heads[i].y-(headV.normalize()).mult(40).y)
    }
  }

  render(){
    fill(123, 219, 160);
    ellipse(this.headLoc.x, this.headLoc.y, 18);
    for(let i = 0; i < this.heads.length-1; i++){
      strokeWeight(12);
      stroke(123, 219, 160, 70);
      line(this.heads[i].x, this.heads[i].y, this.tails[i].x, this.tails[i].y);
      strokeWeight(1);
    }
  }

  update(){
    this.snakeTime--;
    this.headVel.add(this.acc);
    this.headVel.limit(10);
    this.headLoc.add(this.headVel);
    for (let i = this.heads.length-1; i > 0; i--){
      this.heads[i] = p5.Vector.sub(this.heads[i], this.heads[i-1]);
      this.heads[i].setMag(40);
      this.heads[i] = p5.Vector.add(this.heads[i], this.heads[i-1]);
      this.tails[i-1] = this.heads[i];
    }
    this.heads[0] = createVector(this.headLoc.x, this.headLoc.y);
    this.acc = createVector(0,0);
  }

  checkEdges(){
    if(this.headLoc.x < 0 && this.headLoc.y > 300){
      this.headVel.x = -this.headVel.x;
      this.headLoc.x = 2;
    } //1

    if(this.headLoc.x < 300 && this.headLoc.y < 300){
      this.headVel.y = -this.headVel.y;
      this.headVel.x = -this.headVel.x;
      this.headVel.y += random(-2 , 2)*2;
      this.headLoc.x += 2;
      this.headLoc.y += 2;
    } //2

    if(this.headLoc.x > 300 && this.headLoc.y < 0){
      this.headVel.y = -this.headVel.y
    } //3

    if(this.headLoc.x > width){
      this.headVel.x = -this.headVel.x;
    }

    if(this.headLoc.y > height){
      this.headVel.y = -this.headVel.y;
      this.headLoc.y = height-2;
    }
  }

  checkPosition(){
    for (let i = 0; i < arrow.length; i++){
      var dist1 = this.headLoc.dist(arrow[i].loc);//attraction
      if(dist1 <= 150){
        this.acc = p5.Vector.sub(arrow[i].loc, this.headLoc);
        this.acc.normalize();
        this.acc.mult(0.225);
        if(dist1 <= 30){
          arrow.splice(i,1);
          append(this.heads, createVector(this.tails[this.tails.length-1].x, this.tails[this.tails.length-1].y))
          append(this.tails, createVector(this.heads[this.heads.length-1].x-(headV.normalize()).mult(40).x, this.heads[this.heads.length-1].y-(headV.normalize()).mult(40).y))
        }
        // this.acc = p5.Vector.sub(this.loc, attrac.loc);
        // this.acc.normalize();
        // this.acc.mult(0.225);
      }
    }
  }

  run(){
    this.render();
    this.update();
    this.checkEdges();
    this.checkPosition();
  }

}
