import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function Ball() {
  const mountRef = useRef(null); // Reference to mount the canvas

  useEffect(() => {
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Append the renderer canvas to the component container
    mountRef.current.appendChild(renderer.domElement);

    // Create a cube geometry and material
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    // Animation loop
    function animate() {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    animate();

    // Clean up the renderer and objects when the component unmounts
    return () => {
      // Proper cleanup of objects
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return <div ref={mountRef} />; // Attach the 3D canvas to this div
}

export default Ball;