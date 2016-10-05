precision mediump float;

uniform sampler2D colorBuffer;
uniform sampler2D u_image0;
uniform vec2 u_mouse;
uniform float glitchCount;
uniform float u_time;
uniform int stage;
varying vec2 screenPosition;

//grabbing a function from npm
#pragma glslify: luma = require(glsl-luma)

#pragma glslify: ellipse = require(./ellipse)

//grabbing a function from npm
#pragma glslify: ascii = require(./ascii)

//grabing a local function
#pragma glslify: vignette = require(./vignette)


void main() {
    if(stage==0){
       vec4 cam = texture2D(colorBuffer, vec2(u_mouse.x, screenPosition.y));
        gl_FragColor.rgb = cam.rgb;
       // gl_FragColor.g = sin(u_time*0.1);
      gl_FragColor.a = 1.0;
    } else if(stage==1 || stage==3 || stage==4){
         vec2 center = (screenPosition - 0.5)*2.0;
   // 
       // float e = ellipse(center, 0.6+0.6*u_mouse.x, 0.02*u_mouse.y);
         float e = ellipse(center, 0.6, 0.02);
         vec4 cam = texture2D(colorBuffer, vec2(u_mouse.x, screenPosition.y));
        gl_FragColor.rgb = mix(cam.rgb, vec3(1.0), e);
       // gl_FragColor.g = sin(u_time*0.1);
      gl_FragColor.a = 1.0;
    } else if(stage==2){
       vec4 cam = texture2D(colorBuffer, vec2(u_mouse.x, u_mouse.y));
        gl_FragColor.rgb = cam.rgb;
        gl_FragColor.a = 1.0;
    } else if(stage == 5){
        vec2 pos = screenPosition;
       pos.x += 0.5*sin(floor(pos.y*min(u_time/100.0, 80.0))*sin(u_time*0.001))+abs(u_mouse.x-0.5); 
       pos.y += 0.2*sin(floor(pos.x*min(u_time/100.0, 80.0))*cos(u_time*0.001 + 0.4))+abs(u_mouse.y-0.5); 
       vec4 col = texture2D(u_image0, fract(pos));
       vec4 cam = texture2D(colorBuffer, fract(1.0-pos));
     // float mixRatio = 0.5;
   //  float mixI = 1.0-mixRatio;

   //  vec4 glitch2 = 2.0*abs(cam*mixRatio - glitch*mixI);
     //  float saturation = 0.8;
      gl_FragColor = 2.0*(cam - col);
    //   float average = (gl_FragColor.r + gl_FragColor.g + gl_FragColor.b) / 3.0;
     
    //  gl_FragColor.rgb += (average - gl_FragColor.rgb) * (1.0 - 1.0 / (1.001 - saturation));
      gl_FragColor.a = 1.0;
    } else if(stage == 6){
       vec2 center = (screenPosition - 0.5)*2.0;
       float e = ellipse(center, 0.9, 0.00);
       float mag = 0.3+e*u_mouse.x*10.0;
         vec2 s = vec2(screenPosition.y*mag + (1.0-mag)/2.0, 0.6+ abs(screenPosition.x-0.5));
         vec4 cam =  texture2D(colorBuffer, s);
       // float e = ellipse(center, 0.6+0.6*u_mouse.x, 0.02*u_mouse.y);
         
         float a = ascii(cam.rgb, screenPosition, (1.0+e*0.2) / 100.0);

        
       gl_FragColor.rgb = mix(cam.rgb, vec3(1.0-a), smoothstep(-1.08, -0.8, e));
   //  gl_FragColor.rgb = cam.rgb + vec3(1.0-a) * smoothstep(-0.2, 0.0, e);
      gl_FragColor.a = 1.0;
    } else {
       vec2 center = (screenPosition - 0.5)*2.0;
       float e = ellipse(center, 0.9, 0.00);
      // float mag = 0.3+e*u_mouse.x*10.0;
       float mag = 0.4+ e*abs(u_mouse.x-0.5);
         vec2 s = vec2(screenPosition.y*mag + (1.0-mag)/2.0, 0.6+ abs(screenPosition.x-0.5));
         vec4 cam =  texture2D(colorBuffer, s);
       // float e = ellipse(center, 0.6+0.6*u_mouse.x, 0.02*u_mouse.y);
         
         float a = ascii(cam.rgb, screenPosition, (1.0+e*0.2) / 100.0);

        
       gl_FragColor.rgb = mix(cam.rgb, vec3(1.0-a), smoothstep(-0.08, 0.08, e));
   //  gl_FragColor.rgb = cam.rgb + vec3(1.0-a) * smoothstep(-0.2, 0.0, e);
      gl_FragColor.a = 1.0;
    }
   
    

   //  if(glitchCount > 0.0) {
   //      /* blendy */
   //      // vec2 s = vec2(screenPosition.y/2.0 + 0.25, screenPosition.x);
   //      // vec2 p = vec2(s.x, 1.0-s.y);
   //      // vec4 texel1 = texture2D(colorBuffer, p);
   //      // vec4 texel2 = texture2D(colorBuffer, s);
   //      // cam =  2.0*abs(texel1*0.5 - texel2*0.5);
   //      float mag = 0.3+e*u_mouse.x*10.0;
   //      vec2 s = vec2(screenPosition.y*mag + (1.0-mag)/2.0, 0.6+ abs(screenPosition.x-0.5));
   //     cam =  texture2D(colorBuffer, s);

   //  } else {
       
   //       cam = texture2D(colorBuffer, vec2(u_mouse.x, screenPosition.y));
   //  }
        
   //  vec4 glitch = texture2D(u_image0, screenPosition);

   //  float mixRatio = 0.8;
   //  float mixI = 1.0-mixRatio;

   //  vec4 glitch2 = 2.0*abs(cam*mixRatio - glitch*mixI);
   //  glitch2.a = 1.0;
   //  cam.a = 1.0;
   // float a = ascii(cam.rgb, screenPosition, (1.0+e*0.2) / 100.0);
   // //  gl_FragColor.rgb = mix(cam.rgb, vec3(1.0-a), smoothstep(-0.08, 0.08, e));
   //  gl_FragColor.rgb = cam.rgb + vec3(1.0-a) * smoothstep(-0.2, 0.0, e);
   //    gl_FragColor.a = 1.0;

      
  //gl_FragColor.rgba = mix(cam, glitch2, glitchCount);
   // gl_FragColor = cam + glitch*glitch.a;
    // gl_FragColor.rgba = glitch;
   // gl_FragColor = vec4(u_mouse, 1.0, 1.0);
} 