//just a simple test texture being rendered to a
//canvas for now...

var Texture = require('gl-texture2d')
var triangle = require('a-big-triangle')
var createShader = require('gl-shader')
var xtend = require('xtend')
var Cam = require('./camera.js');

function create(opt) {
    var cam = new Cam();
    //grab a test image, rotate it upright
    var texture = require('baboon-image').transpose(1, 0, 2)

    //default options to texture size
    opt = xtend({
        width: window.innerWidth,
        height: window.innerHeight
    }, opt)
   // var canvas = document.createElement('canvas');
    //var gl = canvas.getContext("experimental-webgl");
    //get a WebGL context
    var gl = require('webgl-context')(opt);
    console.log("boo context", gl);
    //create a WebGL texture from our image
    var tex1 = Texture(gl, texture);
    var tex2 = Texture(gl, cam.video);
    //create the shader
   var shader = opt.shader(gl);

   gl.useProgram(shader.handle);
    console.log(shader);
   // var shader = createShader(gl, opt.shader);

   var u_image0Location = gl.getUniformLocation(shader.handle, "colorBuffer");
    var u_image1Location = gl.getUniformLocation(shader.handle, "u_image0");
    gl.uniform1i(u_image0Location, 0);
    gl.uniform1i(u_image1Location, 1);
    //draw the scene initially
   // render()
    
    //our little API 
    return {
        cam: cam,
        gl: gl,
        render: render,
        resize: resize
    }

    function resize(){
        gl.canvas.width = window.innerWidth;
        gl.canvas.height = window.innerHeight;
    }

    function render(mouse) {
        cam.update();
         var tex2 = Texture(gl, cam.canvas);
        
        //clear screen & setup viewport
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
        gl.clearColor(0, 0, 0, 1)
        gl.clear(gl.COLOR_BUFFER_BIT)
       // console.log("m", mouse);
        //bind the shader before changing uniforms
        shader.bind();
       // console.log(mouse);
        shader.uniforms.u_mouse = [mouse[0]/window.innerWidth, mouse[1]/window.innerHeight];
        shader.uniforms.colorBuffer = 0;
        tex1.bind(0);
       tex2.bind(1);
        triangle(gl)
    }
}

module.exports = create