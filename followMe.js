var Physics = require('./Physics.js');
var Windows = require('./Windows.js');

var FollowMe = function(destroy) {

  this.offset = 0;
   this.points = [];
    this.cursor = new Image(32, 32);
    this.cursor.src = './images/mouse-cursor-invert.png';
    this.destroy = destroy;
    this.canvas = document.createElement('canvas');
   this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.style.position = "fixed";
    this.canvas.style.top = '0px';
    this.canvas.style.left = '0px';
    document.body.appendChild(this.canvas);
    //canvas = document.getElementById('canvas'),
    this.ctx = this.canvas.getContext('2d');
   
   // this.physics = new Physics(this.ctx);
};

FollowMe.prototype.resize = function(){
  this.canvas.width = window.innerWidth;
  this.canvas.height = window.innerHeight;
  if('win' in this) this.win.resize;
};

FollowMe.prototype.render = function(mouse){
    if(this.points.length >= 600){
      if(!('physics' in this)){
        console.log("no phys");
        this.physics = new Physics(this.points, this.canvas, this.ctx);
       this.win = new Windows();
      } else {
        if(this.offset >= window.innerWidth/2 -100){
          console.log("DESTROY");
          document.body.removeChild(this.canvas);
          this.destroy(this.win.canvas);
        } else {
          var dir = [mouse[0]-window.innerWidth/2, mouse[1]-window.innerHeight/2];
      
      var len = Math.sqrt(dir[0]*dir[0] + dir[1]*dir[1]);
      dir[0]/=len;
      dir[1]/=len;
          // console.log("phys", this.physics);
           this.win.render(dir, this.offset);
        this.physics.render(dir, this.win.offsetCoords);
       
        this.offset+=0.3;
      // console.log(this.physics.bodies);
        var bodies = this.physics.bodies;
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        for (var i = 0; i < bodies.length; i += 1) {
         var vertices = bodies[i].vertices;

          this.ctx.drawImage(this.cursor, vertices[0].x, vertices[0].y, 20, 20);

      }
      } 

    
    }
    } else {
     // this.ctx.drawImage(this.browser, 100, 100);
      this.points.push(mouse);
      this.ctx.drawImage(this.cursor, mouse[0], mouse[1], 20, 20);
    }

};



module.exports = FollowMe;