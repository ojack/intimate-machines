var Matter = require('matter-js');
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    MouseConstraint = Matter.MouseConstraint,
    Bodies = Matter.Bodies,
    Body = Matter.Body;

var Composite = Matter.Composite;

var Physics = function(coords, canvas, ctx) {
   // module aliases

this.ctx = ctx;
// create an engine
// ...
this.engine = Engine.create();
var mouseConstraint = MouseConstraint.create(this.engine, {
    element: canvas
});

World.add(this.engine.world, mouseConstraint);
 this.engine.world.gravity.y = 0.3;

// create a renderer
// var render = Render.create({
//     element: document.body,
//     engine: engine
// });

// create two boxes and a ground
var bodies = [];
for(var i = 0; i < coords.length; i+=3){
  bodies.push(Bodies.rectangle(coords[i][0], coords[i][1], 20, 20, {restitution: 0.9, angle: -Math.PI * 0.15 }));
}
 this.floor = Bodies.rectangle(window.innerWidth/2, window.innerHeight+100, window.innerWidth, 200, { isStatic: true });
this.ceiling = Bodies.rectangle(window.innerWidth/2, -100, window.innerWidth, 200, { isStatic: true });
this.leftWall = Bodies.rectangle(-100, window.innerHeight/2, 200, window.innerHeight, { isStatic: true });
this.rightWall = Bodies.rectangle(window.innerWidth+100, window.innerHeight/2, 200, window.innerHeight, { isStatic: true });

        // var compound = Body.create({
        //     parts: [ceiling, rightWall, floor, leftWall]
        // });
//bodies.push(Bodies.rectangle(400, 610, 810, 60, { isStatic: true }));

bodies.push(this.floor);
bodies.push(this.ceiling);
bodies.push(this.leftWall);
bodies.push(this.rightWall);
//bodies.push(compound);
// add all of the bodies to the world
World.add(this.engine.world, bodies);

// run the engine
Engine.run(this.engine);
this.bodies = [];
// run the renderer
// Render.run(render);
};

Physics.prototype.resize = function(){
  
};

Physics.prototype.render = function(dir, c){
   // this.floor.x--;
    
    //console.log(dir);
    this.engine.world.gravity.y = -dir[1];
    this.engine.world.gravity.x = -dir[0];

    Body.setPosition(this.floor, { x: c[0]+c[2]/2, y: c[1]+c[3]+100});
    Body.setPosition(this.ceiling, { x: c[0]+c[2]/2, y: c[1]-100});
    Body.setPosition(this.leftWall, { x: c[0]-100, y: c[1]+c[3]/2});
    Body.setPosition(this.rightWall, { x: c[0]+c[2]+100, y: c[1]+c[3]/2});
    Engine.update(this.engine, 1000 / 60);
    
    this.bodies = Composite.allBodies(this.engine.world);



  /*this.ctx.fillStyle = '#fff';
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.ctx.beginPath();

    for (var i = 0; i < this.bodies.length; i += 1) {
        var vertices = this.bodies[i].vertices;

        this.ctx.moveTo(vertices[0].x, vertices[0].y);

        for (var j = 1; j < vertices.length; j += 1) {
            this.ctx.lineTo(vertices[j].x, vertices[j].y);
        }

        this.ctx.lineTo(vertices[0].x, vertices[0].y);
    }

    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = '#999';
    this.ctx.stroke();*/
};



module.exports = Physics;