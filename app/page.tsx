"use client"

import { useEffect, useState } from "react";
import { Logo } from "./components/Logo";
import ShaderCanvas from "./components/ShaderCanvas";
import { TouchableText } from "./components/TouchableText";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const fragmentShader = `
    uniform float iTime;
    uniform vec3 iResolution;

    #define MAX_LAYERS 6.0

    float Circle(vec2 p, float r) {
        return length(p)-r;
    }

    float Displace(vec2 p, float r) {
      return sin(r*p.x)*sin(r*p.y);
    }

    void main() {
      vec2 fragCoord = gl_FragCoord.xy;
      vec2 uv = (fragCoord-0.5 * iResolution.xy)/iResolution.y;
      uv *= 13.2;
    
      float time = iTime * 0.2;
  
      uv += vec2(sin(time), cos(time));
      vec3 col = vec3(1.0);
      for (float i = 0.0; i < MAX_LAYERS; i += 1.0) {
          col *= vec3(Circle(uv, 0.6 + i) + Displace(uv, sin(time) * (256.0 / (i+1.0))));
          uv += vec2(sin(time*i), cos(time*i));
      }
      gl_FragColor = vec4(col,1.0);
    }
  `;

  if(isClient === false) return null;

  return (
    <div className="relative">
      <Logo />

      <div className="h-screen relative z-[20] bg-gradient-to-b xl:bg-gradient-to-r from-white to-transparent flex mx-auto xl:mx-20 flex flex-col xl:justify-center w-full">
        <div className="text-center xl:text-left mt-32 xl:mt-0 flex flex-col gap-4 items-start justify-center">
          <h1 className="text-[52px] lg:text-[64px] xl:text-[96px] max-w-[640px] xl:max-w-[780px] mx-auto xl:ml-0 xl:mr-auto">
            <TouchableText text="Reintegrating Technology" />
          </h1>
          <p className="text-[18px] mb-auto text-black/40 max-w-[320px] xl:max-w-[520px] mx-auto xl:ml-0 xl:mr-auto">New technologies are disruptive and destroy contextual norms. We reject expectations and embrace the future.</p>
        </div>
      </div>

      <ShaderCanvas fragmentShader={fragmentShader} />
    </div>
  );
}
