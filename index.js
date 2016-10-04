var live = require('glslify-live')
var raf = require('raf')
var Follow = require('./FollowMe.js');
raf.polyfill();
var follow;
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
      follow = null;
      restartApp();
    }
    follow = new Follow(destroyFollow);
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
    }

    window.onresize = function(e){
      app.resize();
      follow.resize();
    }

    function restartApp(){
      console.log("restarting!");
       follow = new Follow(destroyFollow);
    }
})



//re-render canvas whenever shader changes
live.on('update', function(filename, id) {
    app.render()
})