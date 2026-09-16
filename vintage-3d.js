import * as THREE from 'three';

const BRASS = 0xB08D57, DEEP_RED = 0x7E1220, CREAM = 0xF3E7D3, WALNUT = 0x5C3A21, FOREST = 0x3B5D42, CHARCOAL = 0x2B2924, NAVY = 0x3B4A63, IVORY = 0xEFE3CC;

function mat(color, rough = 0.55, metal = 0.15) {
  return new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: metal });
}

function buildChip() {
  const g = new THREE.Group();
  g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.09, 48), mat(DEEP_RED, 0.6, 0.1)));
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.02, 12, 48), mat(BRASS, 0.35, 0.5));
  rim.rotation.x = Math.PI / 2;
  g.add(rim);
  g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.1, 40), mat(CREAM, 0.5, 0.05)));
  const n = 12;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.1, 0.05), mat(CREAM, 0.55, 0.05));
    stripe.position.set(Math.cos(a) * 0.47, 0, Math.sin(a) * 0.47);
    stripe.rotation.y = -a;
    g.add(stripe);
  }
  return g;
}

function buildDice() {
  const g = new THREE.Group();
  const pipMat = mat(CHARCOAL, 0.5, 0.05);
  function die(x, z, ry, pipCount) {
    const d = new THREE.Group();
    d.add(new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.42, 0.42), mat(IVORY, 0.45, 0.05)));
    const layouts = {
      1: [[0, 0]],
      3: [[-0.12, -0.12], [0, 0], [0.12, 0.12]],
      5: [[-0.12, -0.12], [0.12, -0.12], [0, 0], [-0.12, 0.12], [0.12, 0.12]]
    };
    (layouts[pipCount] || layouts[1]).forEach((p) => {
      const pip = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 12), pipMat);
      pip.position.set(p[0], 0.211, p[1]);
      d.add(pip);
    });
    d.position.set(x, 0.21, z);
    d.rotation.y = ry;
    return d;
  }
  g.add(die(-0.28, 0.05, 0.35, 5));
  g.add(die(0.24, -0.12, -0.5, 3));
  return g;
}

function buildGlobe() {
  const g = new THREE.Group();
  const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.42, 40, 40), mat(0xD8C7A1, 0.6, 0.05));
  sphere.position.y = 0.55;
  g.add(sphere);
  for (let i = 0; i < 4; i++) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.006, 8, 48), mat(BRASS, 0.35, 0.5));
    ring.position.y = 0.55;
    ring.rotation.y = (i / 4) * Math.PI;
    g.add(ring);
  }
  const eq = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.008, 8, 48), mat(BRASS, 0.35, 0.5));
  eq.position.y = 0.55; eq.rotation.x = Math.PI / 2;
  g.add(eq);
  const pin = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.14, 10), mat(DEEP_RED, 0.4, 0.1));
  pin.position.set(0.3, 0.78, 0.18);
  pin.rotation.z = Math.PI;
  g.add(pin);
  const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.5, 12), mat(WALNUT, 0.6, 0.1));
  arm.position.y = 0.3; arm.rotation.z = 0.5;
  g.add(arm);
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.26, 0.08, 32), mat(WALNUT, 0.6, 0.1));
  base.position.y = 0.04;
  g.add(base);
  return g;
}

function buildBooks() {
  const g = new THREE.Group();
  const specs = [
    { w: 0.62, h: 0.09, d: 0.42, color: DEEP_RED, ry: 0.02 },
    { w: 0.56, h: 0.08, d: 0.4, color: FOREST, ry: -0.03 },
    { w: 0.5, h: 0.075, d: 0.36, color: WALNUT, ry: 0.04 },
    { w: 0.44, h: 0.07, d: 0.32, color: IVORY, ry: -0.02 }
  ];
  let y = 0;
  specs.forEach((s) => {
    const b = new THREE.Mesh(new THREE.BoxGeometry(s.w, s.h, s.d), mat(s.color, 0.6, 0.05));
    b.position.y = y + s.h / 2;
    b.rotation.y = s.ry;
    g.add(b);
    y += s.h;
  });
  const lean = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.06, 0.3), mat(BRASS, 0.5, 0.2));
  lean.position.set(0.42, y * 0.32, 0.06);
  lean.rotation.z = 1.1;
  g.add(lean);
  return g;
}

function buildCoin() {
  const g = new THREE.Group();
  g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.06, 48), mat(BRASS, 0.35, 0.55)));
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.015, 10, 48), mat(0x8C6A3E, 0.3, 0.6));
  rim.rotation.x = Math.PI / 2;
  g.add(rim);
  const emboss = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.012, 8, 40), mat(0x8C6A3E, 0.3, 0.6));
  emboss.rotation.x = Math.PI / 2; emboss.position.y = 0.031;
  g.add(emboss);
  const stamp = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.02, 32), mat(0x9C7A4E, 0.3, 0.55));
  stamp.position.y = 0.035;
  g.add(stamp);
  return g;
}

function buildPalette() {
  const g = new THREE.Group();
  const board = new THREE.Mesh(new THREE.SphereGeometry(0.46, 32, 32), mat(WALNUT, 0.65, 0.05));
  board.scale.set(1, 0.06, 0.8);
  g.add(board);
  const dabColors = [DEEP_RED, NAVY, 0xC79A3C, FOREST, IVORY, BRASS];
  dabColors.forEach((c, i) => {
    const a = (i / dabColors.length) * Math.PI * 2;
    const dab = new THREE.Mesh(new THREE.SphereGeometry(0.055, 14, 14), mat(c, 0.4, 0.05));
    dab.position.set(Math.cos(a) * 0.28, 0.05, Math.sin(a) * 0.22);
    dab.scale.y = 0.5;
    g.add(dab);
  });
  const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.55, 10), mat(WALNUT, 0.6, 0.1));
  handle.position.set(0.1, 0.08, -0.05);
  handle.rotation.z = 1.3; handle.rotation.x = 0.2;
  g.add(handle);
  const tip = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.1, 10), mat(DEEP_RED, 0.5, 0.05));
  tip.position.set(-0.16, 0.03, -0.08);
  tip.rotation.z = 1.3; tip.rotation.x = 0.2;
  g.add(tip);
  return g;
}

function buildVinyl() {
  const g = new THREE.Group();
  g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.03, 64), mat(0x18171a, 0.4, 0.1)));
  for (let i = 0; i < 6; i++) {
    const r = 0.14 + i * 0.055;
    const groove = new THREE.Mesh(new THREE.TorusGeometry(r, 0.003, 6, 64), mat(0x2a282d, 0.5, 0.1));
    groove.rotation.x = Math.PI / 2; groove.position.y = 0.016;
    g.add(groove);
  }
  const label = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.032, 32), mat(DEEP_RED, 0.55, 0.05));
  g.add(label);
  const hole = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.04, 16), mat(CHARCOAL, 0.5, 0.1));
  g.add(hole);
  return g;
}

export const BUILDERS = { chip: buildChip, dice: buildDice, globe: buildGlobe, books: buildBooks, coin: buildCoin, palette: buildPalette, vinyl: buildVinyl };

// Mounts a small, chrome-free, autorotating vintage object into `container`.
// tilt: initial X rotation; speed: radians/frame on Y.
export function mountVintage(container, key, { tilt = 0.35, speed = 0.006, cameraZ = 1.7 } = {}) {
  const w = container.clientWidth || 140, h = container.clientHeight || 140;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(w, h);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = false;
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 20);
  camera.position.set(0.9, 0.7, cameraZ);
  camera.lookAt(0, 0.15, 0);

  scene.add(new THREE.HemisphereLight(0xfff3e0, 0x2b1810, 1.1));
  const key1 = new THREE.DirectionalLight(0xfff0dd, 1.4);
  key1.position.set(2, 3, 2);
  scene.add(key1);
  const fill = new THREE.DirectionalLight(0xffe8cc, 0.5);
  fill.position.set(-2, 1, -2);
  scene.add(fill);

  const obj = BUILDERS[key]();
  obj.rotation.x = tilt;
  scene.add(obj);

  let raf;
  function animate() {
    obj.rotation.y += speed;
    renderer.render(scene, camera);
    raf = requestAnimationFrame(animate);
  }
  animate();

  const ro = new ResizeObserver(() => {
    const nw = container.clientWidth, nh = container.clientHeight;
    if (!nw || !nh) return;
    renderer.setSize(nw, nh);
    camera.aspect = nw / nh;
    camera.updateProjectionMatrix();
  });
  ro.observe(container);

  return { stop: () => { cancelAnimationFrame(raf); ro.disconnect(); renderer.dispose(); } };
}
