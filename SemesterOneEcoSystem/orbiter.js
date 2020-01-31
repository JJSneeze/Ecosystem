// Joey Jacob
class Orbiter{

  constructor(dist, av, angle, id, stat){
    this.dist = dist;
    this.av = av; //angular velocity
    this.angle = angle;
    this.clr = color(117, 224, 180);
    this.loc = createVector(0,0);
    this.id = id
    this.stat = stat;
    this.acc = createVector(0,0);
    this.vel = createVector(0,0);
    this.attack = false;
    this.num;
    this.canAttack = true;
    this.grabbing = false;
    this.count2 = 0;
  }

  run(){
    this.update();
    this.render();
    if(this.attack === false){
      this.checkPosition();
    }
  }

  update(){
    this.angle = this.av+this.angle;
    this.vel.add(this.acc)
    this.vel.limit(5)

    if(this.attack){
      this.count2++;
      if(this.count2 < 250){
        if(typeof arrow[this.num] === 'undefined'){
          this.count2 = 250;
        } else if(this.loc.x < 310 && this.loc.y < 310){
          this.count2 = 250;
        } else {
          this.acc = p5.Vector.sub(arrow[this.num].loc, this.loc);
          this.acc.normalize();
          this.acc.mult(0.5);
          var distance = this.loc.dist(arrow[this.num].loc);
          if(distance <= 10){
            this.count2 = 250;
            arrow.splice(this.num,1);
            this.grabbing = true;
          }
        }
      } else if(this.count2 >= 250 && this.count2 <= 1000){
        this.acc = p5.Vector.sub(extend[this.id].loc, this.loc);
        this.acc.normalize();
        this.acc.mult(0.5);
        var distance = this.loc.dist(extend[this.id].loc);
        if(distance <= this.dist){
          this.count2 = 1000;
        }
      } else {
        this.acc = createVector(0,0);
        this.vel = createVector(0,0);
        this.attack = false;
        this.canAttack = true;
        this.count2 = 0;
        this.grabbing = false;
      }
    } else {
      this.loc.x = (Math.cos(this.angle)*this.dist) + extend[this.id].loc.x;
      this.loc.y = (Math.sin(this.angle)*this.dist) + extend[this.id].loc.y;
    }
    this.loc.add(this.vel)
  }

  render(){
    if(this.grabbing === true){
      fill(189, 110, 8);
      push();
      translate(this.loc.x, this.loc.y);
      rotate(this.vel.heading()-PI/2);
      quad(-5, 5, 0, -10, 5, 5, 0, 0);
      pop();
    }
    fill(this.clr);
    ellipse(this.loc.x, this.loc.y, 5);
  }

  checkPosition(){
    for (let i = 0; i < arrow.length; i++){
      var distance = this.loc.dist(arrow[i].loc);
      if(distance <= 200){
        console.log('nice')
        for (let j = 0; j < oc; j++){
          if(extend[this.id].orbiter[j].attack === true && extend[this.id].orbiter[j].stat != this.stat){
            this.canAttack = false;
          }
        }
        if(this.canAttack === true){
          this.attack = true;
          this.num = i;
        }
      }
    }
  } //end of checkPosition
} //end of orbiter
//   constructor(x, y, dx, dy, stat){
//       this.loc = createVector(x, y)
//       this.vel = createVector(dx, dy)
//       this.acc = createVector(0, 0)
//       this.clr = color(0, 255, 244);
//       this.w = 15;
//       this.angle = 0
//   }
//   run(){
//     this.checkEdges();
//     this.update();
//     this.render();
//   //  this.checkPosition();
//   } //end of run
//
//   update(){
//     this.vel.add(this.acc)
//     this.vel.limit(4)
//     this.loc.add(this.vel)
//     this.acc = createVector(0,0)
//   } //end of update
//
//   render(){
//     fill(this.clr);
//     push();
//     translate(this.loc.x, this.loc.y);
//     rotate(this.vel.heading()+PI/2);
//     quad(5, 20, 10, 5, 15, 20, 10, 15);
//     pop();
//     } //end of render
//
//   //checkPosition(){
//
// } // end of code
