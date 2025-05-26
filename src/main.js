import * as THREE from "three";
import "./style.css";

const canvas = document.getElementById("scene");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100,
);
camera.position.set(0, 5, 15);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const ambient = new THREE.HemisphereLight(0xffffff, 0x444444, 0.8);
scene.add(ambient);
const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);

const radius = 5;
const height = 8;
const shape = new THREE.Shape();
for (let i = 0; i < 6; i++) {
  const angle = (i / 6) * Math.PI * 2;
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);
  if (i === 0) shape.moveTo(x, y);
  else shape.lineTo(x, y);
}
shape.closePath();

const prismGeo = new THREE.ExtrudeGeometry(shape, {
  depth: height,
  bevelEnabled: false,
  steps: 1,
});
prismGeo.rotateX(-Math.PI / 2);
prismGeo.translate(0, -height / 2, 0);

const prism = new THREE.Mesh(
  prismGeo,
  new THREE.MeshStandardMaterial({ color: 0x555555, wireframe: true }),
);
scene.add(prism);

const sideNormals = [];
const inRadius = radius * Math.cos(Math.PI / 6);
for (let i = 0; i < 6; i++) {
  const angle = Math.PI / 6 + (i * Math.PI) / 3;
  sideNormals.push(new THREE.Vector2(Math.cos(angle), Math.sin(angle)));
}

const ballCount = 100;
const balls = [];
const gravity = 9.81;
const bounce = 0.8;
const friction = 0.98;

for (let i = 0; i < ballCount; i++) {
  const r = 0.2 + Math.random() * 0.2;
  const geometry = new THREE.SphereGeometry(r, 16, 16);
  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(Math.random(), Math.random(), Math.random()),
  });
  const mesh = new THREE.Mesh(geometry, material);
  const pos = randomPointInsidePrism(radius, height, r);
  mesh.position.copy(pos);
  scene.add(mesh);
  balls.push({
    mesh,
    radius: r,
    velocity: new THREE.Vector3(
      (Math.random() - 0.5) * 2,
      Math.random() * 2,
      (Math.random() - 0.5) * 2,
    ),
  });
}

function randomPointInsidePrism(R, H, buffer) {
  const rIn = R * Math.cos(Math.PI / 6) - buffer;
  let x, z;
  while (true) {
    x = (Math.random() * 2 - 1) * R;
    z = (Math.random() * 2 - 1) * R;
    let inside = true;
    for (const n of sideNormals) {
      if (n.x * x + n.y * z > rIn) {
        inside = false;
        break;
      }
    }
    if (inside) break;
  }
  const y = (Math.random() - 0.5) * (H - 2 * buffer);
  return new THREE.Vector3(x, y, z);
}

const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const dt = clock.getDelta();
  prism.rotation.y += 0.2 * dt;
  for (const ball of balls) {
    const p = ball.mesh.position;
    const v = ball.velocity;
    v.y -= gravity * dt;
    p.addScaledVector(v, dt);
    if (p.y - ball.radius < -height / 2) {
      p.y = -height / 2 + ball.radius;
      v.y *= -bounce;
      v.x *= friction;
      v.z *= friction;
    }
    if (p.y + ball.radius > height / 2) {
      p.y = height / 2 - ball.radius;
      v.y *= -bounce;
      v.x *= friction;
      v.z *= friction;
    }
    for (const n of sideNormals) {
      const d = n.x * p.x + n.y * p.z;
      const limit = inRadius - ball.radius;
      if (d > limit) {
        const penetration = d - limit;
        p.x -= penetration * n.x;
        p.z -= penetration * n.y;
        const vn = v.x * n.x + v.z * n.y;
        if (vn > 0) {
          v.x -= (1 + bounce) * vn * n.x;
          v.z -= (1 + bounce) * vn * n.y;
          v.x *= friction;
          v.z *= friction;
        }
      }
    }
  }
  renderer.render(scene, camera);
}

animate();
