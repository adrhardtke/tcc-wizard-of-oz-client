import { useEffect, useRef, type JSX } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface AvatarViewerProps {
  modelPath?: string; // path to .glb file, relative to public/ or external URL
}

export function AvatarViewer({
  modelPath = "/avatar3.glb",
}: AvatarViewerProps): JSX.Element {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Setup scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x101828);

    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight
    );
    camera.position.set(0, 1.5, 7);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1, 0);
    controls.enableDamping = true;
    controls.update();

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(2, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Floor
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(5, 5),
      new THREE.MeshStandardMaterial({ color: 0x101828 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // Load model
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        model.position.y = 0;
        scene.add(model);

        const mixer = new THREE.AnimationMixer(model);
        const clips = gltf.animations;
        // console.log(
        //   "Available animation clips:",
        //   clips.map((c) => c.name)
        // );
        const idleClip = THREE.AnimationClip.findByName(
          clips,
          "Armature|mixamo.com|Layer0"
        );
        if (!idleClip) {
          console.warn('No animation named "waving" found in glb.');
          return;
        }
        const idleAction = mixer.clipAction(idleClip);
        idleAction.play();

        const clock = new THREE.Clock();
        function animate() {
          requestAnimationFrame(animate);
          const delta = clock.getDelta();
          mixer?.update(delta);
          controls.update();
          renderer.render(scene, camera);
        }
        animate();
      },
      undefined,
      (err) => {
        console.error("Error loading GLB model:", err);
      }
    );

    // Resize handler
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeChild(renderer.domElement);
    };
  }, [modelPath]);

  return <div ref={mountRef} className="w-full h-full" />;
}
