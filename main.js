import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

// create the moon object
const moonTexture = new THREE.TextureLoader().load("/moon.jpg");
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
  })
);

scene.add(moon);

// create the sun object
const sunTexture = new THREE.TextureLoader().load("/sun.jpg");
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(10, 50, 50),
  new THREE.MeshStandardMaterial({
    map: sunTexture,
  })
);
sun.translateX(40);
sun.translateY(10);

scene.add(sun);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);
const asteroidTexture = new THREE.TextureLoader().load("/asteroid.jpg");

// add stars
function addAsteroid() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ map: asteroidTexture });
  const asteroid = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));
  asteroid.position.set(x, y, z);
  scene.add(asteroid);
}
Array(75).fill().forEach(addAsteroid);

const spaceTexture = new THREE.TextureLoader().load("/space.jpg");
scene.background = spaceTexture;

function animate() {
  requestAnimationFrame(animate);
  moon.rotation.x += 0.001;
  moon.rotation.y += 0.005;
  moon.rotation.z += 0.001;
  moon.translateX(0.01);

  sun.rotation.x += 0.00001;
  sun.rotation.y += 0.0005;
  sun.rotation.z += 0.00001;

  controls.update();
  renderer.render(scene, camera);
}

animate();
