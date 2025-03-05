import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function Ball() {
  const mountRef = useRef(null);

  useEffect(() => {
    // Ensure the mountRef has only one canvas
    if (!mountRef.current || mountRef.current.hasChildNodes()) return;

    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    mountRef.current.appendChild(renderer.domElement); // Append only if it's not already there
    camera.position.z = 2;

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping =true;
    controls.dampingFactor = 0.03;

    // Create a cube
    const geometry = new THREE.IcosahedronGeometry(1.0,2);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff, 
      flatShading: true
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    
    const wireMat= new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true
    });
    const wireMesh= new THREE.Mesh(geometry,wireMat);
    wireMesh.scale.setScalar(1.001);
    cube.add(wireMesh);
    
    const hemiLight= new THREE.HemisphereLight(0x0099ff, 0xaa5500);
    scene.add(hemiLight);
    // Animation loop
    function animate(t=0) {
      requestAnimationFrame(animate);
        // cube.rotation.y = t * 0.0001;
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
      controls.update();
    }

    animate();

    // Cleanup function
    return () => {
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} />;
}

export default Ball;

// import { useEffect, useRef } from 'react';
// import * as THREE from 'three';

// function Ball() {
//   const mountRef = useRef(null); // Reference to mount the canvas

//   useEffect(() => {
//     // Create scene, camera, and renderer
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
    
//     // Append the renderer canvas to the component container
//     mountRef.current.appendChild(renderer.domElement);

//     // Create a cube geometry and material
//     const geometry = new THREE.BoxGeometry(1, 1, 1);
//     const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//     const cube = new THREE.Mesh(geometry, material);
//     scene.add(cube);

//     camera.position.z = 5;

//     // Animation loop
//     function animate() {
//       cube.rotation.x += 0.01;
//       cube.rotation.y += 0.01;

//       renderer.render(scene, camera);
//       requestAnimationFrame(animate);
//     }

//     animate();

//     // Clean up the renderer and objects when the component unmounts
//     return () => {
//       // Proper cleanup of objects
//       geometry.dispose();
//       material.dispose();
//       renderer.dispose();
//     };
//   }, []); // Empty dependency array means this effect runs once when the component mounts

//   return <div ref={mountRef} />; // Attach the 3D canvas to this div
// }

// export default Ball;