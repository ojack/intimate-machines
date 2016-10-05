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
6: ascii
7: vag
*/
//var stepAmounts = [50, 50, 50, 50, 50, 50, 50];
var stepAmounts = [300, 400, 400, 300, 600, 2000, 600, 500];
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
      if(currStep==3 || currStep==7){
        mouseCount++;
         if(mouseCount > stepAmounts[currStep]){
          nextStep();
        }
      }
      if(follow!=null){
        follow.render(mouse);
      }
	});

    window.onmousemove = function(e){
      mouse = [e.pageX, e.pageY];
      mouseCount++;
    //  console.log(currStep);
     if(mouseCount > stepAmounts[currStep]){
      nextStep();
     }
      
    }

    function nextStep(){
      // console.log("CLIKC");
       mouseCount = 0;
      currStep++;
      if(currStep==1){
         app.setStep(currStep);
        follow = new Follow(destroyFollow, stepAmounts);
      } else if(currStep==2){
        follow.startPhysics();
         app.setStep(currStep);
      } else if(currStep==3){
        follow.startWindowShrink();
         app.setStep(currStep);
      } else if(currStep==4){
        follow.startMagnetWindow();
         app.setStep(currStep);
      } else if(currStep==5){
        follow.destroyObject();
      } else if(currStep==6){
        app.setStep(currStep);
     // } else if(currStep==7){
      //  app.setStep(currStep);
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