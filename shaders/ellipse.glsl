
float rlength( vec2 v )
{
    //return length(v);
    
    v = abs( v );
    if( v.x > v.y ) return v.x * sqrt( 1.0 + (v.y/v.x)*(v.y/v.x) );
    else            return v.y * sqrt( 1.0 + (v.x/v.y)*(v.x/v.y) );
}

float GetRoot( float r0, float z0, float z1, float g )
{
    float n0 = r0*z0;
    float s0 = z1 - 1.0;
    float s1 = (g<0.0) ? 0.0 : rlength( vec2(n0, z1) ) - 1.0;
    float s = 0.0;
    for( int i=0; i<64; i++ )
    {
        s = 0.5*(s0+s1);
        //if( s==s0 || s==s1 ) break;
        vec2 ratio = vec2( n0 / (s + r0), z1 / (s + 1.0 ) );
        g = dot(ratio,ratio) - 1.0;
        //if( g>0.0 ) { s0=s; } else  if( g<0.0 ) { s1=s; } else break;
        if( g>0.0 ) s0=s; else s1=s;
    }
    return s;
}

float sdEllipse( vec2 p, vec2 e )
{
    p = abs( p );
    
    float dis = 0.0;

  
            vec2 z = p / e;
            float g = dot(z,z) - 1.0;
           
            {
                float r0 = (e.x/e.y)*(e.x/e.y);
                float sbar = GetRoot( r0, z.x, z.y, g );
                vec2 r = p * vec2( r0/(sbar+r0), 1.0/(sbar+1.0) );
                dis = length( p - r ) * sign( p.y - r.y );
            }
    return dis ;

}


float ellipse(vec2 uv, float w, float h) {
    
    uv = vec2(uv.y, uv.x);
   
	float d = sdEllipse( uv, vec2(0.3,0.3) + vec2(w,h)  );
   /* vec3 col = vec3(1.0) - sign(d)*vec3(0.1,0.4,0.7);
	col *= 1.0 - exp(-2.0*abs(d));
	col *= 0.8 + 0.2*cos(120.0*d);
	col = mix( col, vec3(1.0), 1.0-smoothstep(0.0,0.02,abs(d)) );*/
	
    //return smoothstep(-0.01, 0.01, d);
	return d;
}

#pragma glslify: export(ellipse)