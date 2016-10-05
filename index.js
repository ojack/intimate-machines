var live = require('glslify-live')
var raf = require('raf')
var Follow = require('./FollowMe.js');
raf.polyfill();
var follow;
var currStep = 0;
var stepAmounts = [100, 100, 100, 200, 200];
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
     // console.log(mouseCount);
      if(currStep==0){
         if(mouseCount > stepAmounts[0]) {
           currStep++;
          follow = new Follow(destroyFollow, stepAmounts);
        }
      } else if(currStep==1){
        if(mouseCount >= stepAmounts[0]+stepAmounts[1]+stepAmounts[2]){
          console.log("shrink!!");
          follow.startWindowShrink();
          currStep++;
         }
      }
      
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