// Joey Jacob
class Pulser{

  constructor(x, y, dx, dy, stat){
    this.loc = createVector(x, y)
    this.vel = createVector(dx, dy)
    this.acc = createVector(0, 0)
    this.clr = color(random(255), random(255), random(255));
    this.w = 10;
    this.stat = stat
    if(this.stat == -2){
      this.clr = color(0, 255, 0);
      this.w = 35;
    }
    if(this.stat == -1){
      this.clr = color(255, 0, 0);
      this.w = 35;
    }
  }
  run(){
    this.checkEdges()
    this.update()
    this.render()
  } //end of run

  checkEdges(){
    if(this.loc.x < 0 && this.loc.y > 300){
      this.vel.x = -this.vel.x;
      this.loc.x = 2;
    } //1

    if(this.loc.x < 300 && this.loc.y < 300){
      this.vel.y = -this.vel.y;
      this.vel.x = -this.vel.x;
      this.vel.y += random(-2 , 2)*2;
      this.loc.x += 2;
      this.loc.y += 2;
    } //2

    if(this.loc.x > 300 && this.loc.y < 0){
      this.vel.y = -this.vel.y
    } //3

    if(this.loc.x > width){
      this.vel.x = -this.vel.x;
    }

    if(this.loc.y > height){
      this.vel.y = -this.vel.y;
      this.loc.y = height-2;
    }
  } //end of checkEdges

  update(){
    this.vel.add(this.acc)
    this.vel.limit(8)
    this.loc.add(this.vel)
    this.acc = createVector(0,0)

    if(dir === 0){
      this.w++;
    } else if (dir === 1){
      this.w--;
    }

  } //end of update

  render(){
    fill(this.clr);
    ellipse(this.loc.x, this.loc.y, this.w, this.w);
  } //end of render
} // end of code
