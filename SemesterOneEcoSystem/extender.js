// Joey Jacob
class Extender{

  constructor(x, y, dx, dy, id){
    this.loc = createVector(x, y);
    this.vel = createVector(dx, dy);
    this.acc = createVector(0, 0);
    this.clr = color(176, 215, 232);
    this.w = 10;
    this.id = id;
    this.orbiter = [];
    for (let i = 0; i < oc; i++){
      this.orbiter[i] = new Orbiter(30, 0.05, (2*PI/oc)*i, this.id, i);
    }
    }

  run(){
    this.checkEdges();
    this.update();
    this.render();
    //this.checkPosition();
    for (let i = 0; i < oc; i++){
      this.orbiter[i].run();
    }
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

  // checkPosition(){
  //   if(this.stat > -1){
  //     var dist1 = this.loc.dist(attrac.loc);//attrac
  //     var dist2 = this.loc.dist(repel.loc);//repel
  //     if(dist1 <= 85){
  //       this.acc = p5.Vector.sub(attrac.loc, this.loc);
  //       this.acc.normalize();
  //       this.acc.mult(0.5);
  //     }
  //     if(dist2 <= 85){
  //       this.acc = p5.Vector.sub(this.loc, repel.loc);
  //       this.acc.normalize();
  //       this.acc.mult(0.5);
  //     }
  //   } //end of if statement
  // } //end of checkPosition
} // end of code
