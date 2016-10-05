var live = require('glslify-live')
var raf = require('raf')
var Follow = require('./FollowMe.js');
raf.polyfill();
var follow;
var currStep = 0;
/*
0: mouse no trail
1: trail
2: physics
3: shrinking window
4: moving window
5: glitch
6: vag
*/
//var stepAmounts = [50, 50, 50, 50, 50, 50, 50];
var stepAmounts = [300, 500, 400, 500, 600, 400, 600];
 var mouseCount = 0;
//get a shader
var glslify = require('glslify')
var createShader = glslify({
    fragment: './shaders/blend.frag',
    vertex: './shaders/blend.vert'
})

//create our WebGL test example
var app = require('./scene')({
    shader: createShader
})

//add to DOM
require('domready')(function() {
    var gl = app.gl;

    var  destroyFollow = function(canvas){
      console.log("destroyFollow!");
      document.body.removeChild(canvas);
      app.setGlitchTexture(canvas);
      follow = null;
     // restartApp();
    }
   
    var mouse = [0.0, 0.0];
    document.body.style.margin = '0'
    document.body.appendChild(gl.canvas)
    raf(function tick() {
  		// Animation logic 
  		raf(tick);
  		app.render(mouse);
      if(follow!=null){
        follow.render(mouse);
      }
	});

    window.onmousemove = function(e){
      mouse = [e.pageX, e.pageY];
      mouseCount++;
      console.log(currStep);
     if(mouseCount > stepAmounts[currStep]){
      nextStep();
     }
      
    }

    function nextStep(){
       console.log("CLIKC");
       mouseCount = 0;
      currStep++;
      if(currStep==1){
        follow = new Follow(destroyFollow, stepAmounts);
      } else if(currStep==2){
        follow.startPhysics();
      } else if(currStep==3){
        follow.startWindowShrink();
      } else if(currStep==4){
        follow.startMagnetWindow();
      } else if(currStep==5){
        follow.destroyObject();
      } else if(currStep==6){
        app.setStep(currStep);
      } else {
        currStep = 0;
         app.setStep(currStep);
      }
    }

    window.onclick = function(){
      nextStep();
    }

    window.onresize = function(e){
      app.resize();
      if(follow!=null){
        follow.resize();
      }
      
    }

    function restartApp(){
      console.log("restarting!");
       follow = new Follow(destroyFollow, stepAmounts);
    }
})



//re-render canvas whenever shader changes
live.on('update', function(filename, id) {
    app.render()
})