"use client"

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

interface ShaderCanvasProps {
  fragmentShader: string;
}

const ShaderCanvas: React.FC<ShaderCanvasProps> = ({ fragmentShader }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: window?.innerWidth ?? 0, height: window?.innerHeight ?? 0 });

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    renderer.setSize(dimensions.width, dimensions.height);
    renderer.setPixelRatio(window?.devicePixelRatio ?? 0);

    const clock = new THREE.Clock();

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector3(dimensions.width, dimensions.height, 1) },
      iMouse: { value: new THREE.Vector4() },
    };

    const material = new THREE.ShaderMaterial({
      fragmentShader: fragmentShader,
      uniforms: uniforms,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const animate = () => {
      requestAnimationFrame(animate);
      uniforms.iTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };

    animate();

    const handleMouseMove = (event: MouseEvent) => {
      uniforms.iMouse.value.x = event.clientX;
      uniforms.iMouse.value.y = dimensions.height - event.clientY;
    };

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      uniforms.iResolution.value.set(width, height, 1);
      setDimensions({ width, height });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [fragmentShader, dimensions]);

  return (
    <canvas
      ref={canvasRef}
      className="overflow-visible fixed bottom-[-30%] xl:bottom-0 xl:right-[-40%] w-full h-full"
    />
  );
};

export default ShaderCanvas;
