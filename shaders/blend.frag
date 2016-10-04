precision mediump float;

uniform sampler2D colorBuffer;
uniform sampler2D u_image0;
uniform vec2 u_mouse;
varying vec2 screenPosition;

//grabbing a function from npm
#pragma glslify: luma = require(glsl-luma)

//grabing a local function
#pragma glslify: vignette = require(./vignette)

void main() {
    vec4 color = texture2D(colorBuffer, screenPosition);

    //grayscale color
    vec3 gray = vec3(luma(color.rgb));

    //threshold red
    float t = smoothstep(0.8, 0.5, color.r);
    color.rgb = mix(color.rgb, gray, t);

    //apply vignette
    float len = vignette(screenPosition, 0.2, 0.65);
    color.rgb = mix(color.rgb, color.rgb*0.85, len);

    gl_FragColor.rgba = texture2D(u_image0, vec2(u_mouse.x, screenPosition.y));
    gl_FragColor.a = 1.0;

   // gl_FragColor = vec4(u_mouse, 1.0, 1.0);
} 