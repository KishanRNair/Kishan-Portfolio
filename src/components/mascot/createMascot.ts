import * as THREE from 'three';
import { HEAD, buildHeadGeometry, buildVisorGeometry } from './geometry';
import { FaceRenderer } from './face';
import type { MascotHandle, MascotOptions, Mood } from './types';

interface Spring {
  x: number;
  v: number;
}
const spring = (): Spring => ({ x: 0, v: 0 });
const step = (s: Spring, target: number, dt: number, k: number, c: number): void => {
  s.v += (target - s.x) * k * dt;
  s.v *= Math.exp(-c * dt);
  s.x += s.v * dt;
};
const easeOut = (t: number): number => 1 - Math.pow(1 - t, 3);

interface Hand {
  group: THREE.Group;
  arm: THREE.Mesh;
  palm: THREE.Mesh;
  side: number;
  rest: THREE.Vector3;
  shoulder: THREE.Vector3;
}
interface Spark {
  mesh: THREE.Mesh;
  v: THREE.Vector3;
  life: number;
}

function glowTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  if (g) {
    const r = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    r.addColorStop(0, 'rgba(255,200,120,.9)');
    r.addColorStop(0.4, 'rgba(255,170,80,.25)');
    r.addColorStop(1, 'rgba(255,170,80,0)');
    g.fillStyle = r;
    g.fillRect(0, 0, 128, 128);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/**
 * Builds the Aurum mascot inside `container` and returns a handle.
 * Returns null when WebGL is unavailable.
 */
export function createMascot(container: HTMLElement, options: MascotOptions = {}): MascotHandle | null {
  const { pauseWhenHidden = true, maxPixelRatio = 2, scale = 1 } = options;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;touch-action:pan-y;';
  container.appendChild(canvas);

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch {
    canvas.remove();
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxPixelRatio));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);

  /* ---------- studio reflections ---------- */
  const envScene = new THREE.Scene();
  envScene.add(
    new THREE.Mesh(new THREE.BoxGeometry(40, 40, 40), new THREE.MeshBasicMaterial({ color: 0x120d09, side: THREE.BackSide })),
  );
  const panel = (w: number, h: number, col: number, k: number, p: [number, number, number]): void => {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(col).multiplyScalar(k), side: THREE.DoubleSide }),
    );
    m.position.set(...p);
    m.lookAt(0, 0, 0);
    envScene.add(m);
  };
  panel(14, 5, 0xfff3e0, 5, [-9, 8, 8]);
  panel(4, 14, 0xffd9a0, 4, [12, 1, 4]);
  panel(14, 3, 0xc9a46a, 3, [0, -10, 6]);
  panel(10, 10, 0xfff8ee, 2, [0, 13, -4]);
  panel(5, 12, 0xffb866, 3, [-12, 0, -4]);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envRT = pmrem.fromScene(envScene, 0.03);
  scene.environment = envRT.texture;

  // Lights are scaled by PI to match three's physically based light units.
  const keyLight = new THREE.DirectionalLight(0xfff0dc, 0.7 * Math.PI);
  keyLight.position.set(-4, 6, 7);
  const rimLight = new THREE.DirectionalLight(0xffb85c, 1.1 * Math.PI);
  rimLight.position.set(6, 3, -5);
  scene.add(keyLight, rimLight, new THREE.AmbientLight(0x4a3826, 0.45 * Math.PI));

  /* ---------- materials ---------- */
  const shell = new THREE.MeshPhysicalMaterial({ color: 0xf1e8d8, roughness: 0.32, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.12 });
  const gold = new THREE.MeshStandardMaterial({ color: 0xcfa96b, metalness: 1, roughness: 0.25, envMapIntensity: 1.5 });
  const dark = new THREE.MeshPhysicalMaterial({ color: 0x0c0a08, roughness: 0.25, clearcoat: 1, envMapIntensity: 1.2 });
  const sph = new THREE.SphereGeometry(1, 40, 28);
  const glowTex = glowTexture();
  const additive = (opacity = 1): THREE.SpriteMaterial =>
    new THREE.SpriteMaterial({ map: glowTex, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, opacity });

  /* ---------- character ---------- */
  const rig = new THREE.Group();
  const float = new THREE.Group();
  const headG = new THREE.Group();
  const bodyG = new THREE.Group();
  rig.add(float);
  rig.scale.setScalar(scale);
  float.add(headG, bodyG);
  scene.add(rig);

  const face = new FaceRenderer();
  const headMesh = new THREE.Mesh(buildHeadGeometry(), shell);
  headG.add(headMesh);
  const visor = new THREE.Mesh(
    buildVisorGeometry(),
    new THREE.MeshBasicMaterial({ map: face.texture, transparent: true, toneMapped: false, polygonOffset: true, polygonOffsetFactor: -2 }),
  );
  visor.position.y = -0.02;
  headG.add(visor);

  const earSpin: THREE.Group[] = [];
  const earDiscs: THREE.Mesh[] = [];
  for (const s of [-1, 1]) {
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.3, 48), gold);
    disc.rotation.z = Math.PI / 2;
    disc.position.x = s * 1.38;
    const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.03, 48), dark);
    pad.rotation.z = Math.PI / 2;
    pad.position.x = s * 1.54;
    const spin = new THREE.Group();
    spin.position.x = s * 1.56;
    const tick = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.2, 0.05), gold);
    tick.position.y = 0.15;
    const hub = new THREE.Mesh(sph, gold);
    hub.scale.setScalar(0.05);
    spin.add(tick, hub);
    headG.add(disc, pad, spin);
    earDiscs.push(disc);
    earSpin.push(spin);
  }

  const antPivot = new THREE.Group();
  antPivot.position.y = HEAD.b - 0.06;
  headG.add(antPivot);
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.04, 0.62, 12), gold);
  stem.position.y = 0.34;
  const bulbMat = new THREE.MeshStandardMaterial({ color: 0xffd9a0, emissive: 0xff9a2e, emissiveIntensity: 1.4, roughness: 0.3 });
  const bulb = new THREE.Mesh(sph, bulbMat);
  bulb.scale.setScalar(0.15);
  bulb.position.y = 0.74;
  const bulbGlow = new THREE.Sprite(additive());
  bulbGlow.position.y = 0.74;
  antPivot.add(new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.1, 24), gold), stem, bulb, bulbGlow);

  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.34, 0.4, 32), dark);
  neck.position.y = -1.12;
  const collar = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.06, 16, 48), gold);
  collar.rotation.x = Math.PI / 2;
  collar.position.y = -1.22;
  const profile = new THREE.SplineCurve(
    ([[0.001, -1.62], [0.2, -1.55], [0.42, -1.3], [0.6, -0.95], [0.62, -0.6], [0.52, -0.25], [0.42, 0], [0.001, 0]] as const).map(
      ([x, y]) => new THREE.Vector2(x, y),
    ),
  )
    .getPoints(60)
    .map((p) => new THREE.Vector2(Math.max(0.001, p.x), p.y));
  const bodyMesh = new THREE.Mesh(new THREE.LatheGeometry(profile, 64), shell);
  bodyMesh.position.y = -1.2;
  const band = new THREE.Mesh(new THREE.TorusGeometry(0.625, 0.035, 12, 64), gold);
  band.rotation.x = Math.PI / 2;
  band.position.y = -1.8;
  const core = new THREE.Group();
  core.position.set(0, -1.75, 0.59);
  core.rotation.x = -0.05;
  const coreDot = new THREE.Mesh(new THREE.CircleGeometry(0.1, 32), new THREE.MeshBasicMaterial({ color: 0xffc66e, toneMapped: false }));
  coreDot.position.z = 0.005;
  const coreGlow = new THREE.Sprite(additive());
  coreGlow.scale.setScalar(0.6);
  coreGlow.position.z = 0.05;
  core.add(new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.025, 12, 40), gold), coreDot, coreGlow);
  const thrust = new THREE.Sprite(additive());
  thrust.position.y = -2.95;
  bodyG.add(neck, collar, bodyMesh, band, core, thrust);

  const rings = [0, 1, 2].map(() => {
    const r = new THREE.Mesh(
      new THREE.TorusGeometry(0.5, 0.012, 8, 64),
      new THREE.MeshBasicMaterial({ color: 0xe8bb70, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }),
    );
    r.rotation.x = Math.PI / 2;
    bodyG.add(r);
    return r;
  });

  const hands: Hand[] = [-1, 1].map((s) => {
    const group = new THREE.Group();
    const palm = new THREE.Mesh(sph, shell);
    palm.scale.set(0.26, 0.24, 0.22);
    const cuff = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.04, 14, 32), gold);
    cuff.rotation.y = Math.PI / 2;
    cuff.position.x = -s * 0.2;
    group.add(palm, cuff);
    const rest = new THREE.Vector3(s * 1.12, -1.9, 0.2);
    const shoulder = new THREE.Vector3(s * 0.5, -1.55, 0);
    group.position.copy(rest);
    const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1, 12), dark);
    const nub = new THREE.Mesh(sph, gold);
    nub.scale.setScalar(0.1);
    nub.position.copy(shoulder);
    bodyG.add(group, arm, nub);
    return { group, arm, palm, side: s, rest, shoulder };
  });
  const _d = new THREE.Vector3();
  const _up = new THREE.Vector3(0, 1, 0);
  const updateArm = (h: Hand): void => {
    _d.subVectors(h.group.position, h.shoulder);
    const len = _d.length();
    h.arm.position.addVectors(h.group.position, h.shoulder).multiplyScalar(0.5);
    h.arm.quaternion.setFromUnitVectors(_up, _d.normalize());
    h.arm.scale.set(1, len, 1);
  };

  /* ---------- sparkles ---------- */
  const sparkGeo = new THREE.OctahedronGeometry(1, 0);
  const sparkMat = new THREE.MeshBasicMaterial({ color: 0xffe2a8, toneMapped: false });
  const sparks: Spark[] = Array.from({ length: 30 }, () => {
    const mesh = new THREE.Mesh(sparkGeo, sparkMat);
    mesh.visible = false;
    scene.add(mesh);
    return { mesh, v: new THREE.Vector3(), life: 0 };
  });
  const _w = new THREE.Vector3();
  const burst = (n: number): void => {
    headG.getWorldPosition(_w);
    for (let i = 0; i < n; i++) {
      const sp = sparks.find((s) => !s.mesh.visible);
      if (!sp) return;
      sp.mesh.position.set(_w.x + (Math.random() - 0.5) * 1.8 * scale, _w.y + (Math.random() - 0.2) * 1.2 * scale, _w.z + 0.6 * scale);
      sp.v.set((Math.random() - 0.5) * 3.2 * scale, (1.5 + Math.random() * 3) * scale, (Math.random() - 0.2) * 1.5 * scale);
      sp.life = 1;
      sp.mesh.visible = true;
    }
  };

  /* ---------- input ---------- */
  const hitTargets: THREE.Object3D[] = [headMesh, bodyMesh, ...earDiscs, ...hands.map((h) => h.palm)];
  const ptr = { x: 0, y: 0, nx: 2, ny: 2, last: performance.now() };
  const ray = new THREE.Raycaster();
  const overMascot = (): boolean => {
    if (Math.abs(ptr.nx) > 1 || Math.abs(ptr.ny) > 1) return false;
    ray.setFromCamera(new THREE.Vector2(ptr.nx, ptr.ny), camera);
    return ray.intersectObjects(hitTargets, false).length > 0;
  };
  const setPtr = (e: PointerEvent): void => {
    const r = canvas.getBoundingClientRect();
    const k = Math.min(r.width, r.height) * 0.9;
    ptr.x = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / k));
    ptr.y = Math.max(-1, Math.min(1, -(e.clientY - (r.top + r.height / 2)) / k));
    ptr.nx = ((e.clientX - r.left) / r.width) * 2 - 1;
    ptr.ny = -(((e.clientY - r.top) / r.height) * 2 - 1);
    ptr.last = performance.now();
  };

  /* ---------- state ---------- */
  const hy = spring(), hx = spring(), hz = spring(), az = spring(), ax = spring(), sq = spring(), dragS = spring();
  const look = { x: 0, y: 0 };
  let hov = 0, jumpY = 0, jumpV = 0, flip = -1, coreBoost = 0, blinkT = 2.2, blinkP = -1, sleepy = 0;
  let wave = reduce ? 0 : 1.3;
  let happyT = reduce ? 0 : 2.4;
  let wowT = 0;
  let down: { lx: number; moved: number } | null = null;

  const poke = (): void => {
    if (jumpY > 0.001) return;
    sq.v = 8;
    jumpV = reduce ? 3 : 9;
    flip = reduce ? -1 : 0;
    wave = 1;
    wowT = 0.45;
    coreBoost = 1;
    burst(reduce ? 4 : 14);
  };

  const onMove = (e: PointerEvent): void => {
    setPtr(e);
    if (down) {
      const dx = e.clientX - down.lx;
      down.lx = e.clientX;
      down.moved += Math.abs(dx);
      dragS.x += dx * 0.012;
      dragS.v = 0;
    }
  };
  const onLeave = (): void => { ptr.nx = 2; ptr.ny = 2; };
  const onDown = (e: PointerEvent): void => {
    setPtr(e);
    if (overMascot()) down = { lx: e.clientX, moved: 0 };
  };
  const onUp = (): void => {
    if (down && down.moved < 6) poke();
    down = null;
  };
  const onCancel = (): void => { down = null; };
  window.addEventListener('pointermove', onMove);
  window.addEventListener('pointerup', onUp);
  window.addEventListener('pointercancel', onCancel);
  document.addEventListener('pointerleave', onLeave);
  canvas.addEventListener('pointerdown', onDown);

  /* ---------- sizing ---------- */
  const resize = (): void => {
    const w = Math.max(1, container.clientWidth);
    const h = Math.max(1, container.clientHeight);
    const a = w / h;
    renderer.setSize(w, h, false);
    camera.aspect = a;
    const d = Math.max(11.2, 3.9 / (0.5735 * a));
    camera.position.set(0, 1.4, d);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    rig.position.y = 0.55;
  };
  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();

  /* ---------- loop ---------- */
  const clock = new THREE.Clock();
  let raf = 0;
  let disposed = false;
  let inView = true;

  const tick = (): void => {
    const dt = Math.min(clock.getDelta(), 0.05) || 0.016;
    const t = clock.elapsedTime;
    const idle = (performance.now() - ptr.last) / 1000;

    let tx = ptr.x;
    let ty = ptr.y;
    if (idle > 3.5 && !reduce) { tx = Math.sin(t * 0.5) * 0.6; ty = Math.sin(t * 0.37 + 1) * 0.25; }
    const asleep = idle > 9 && !reduce;
    if (asleep) { tx = 0; ty = -0.4; }
    sleepy += ((asleep ? 1 : 0) - sleepy) * (1 - Math.exp(-dt * 2));
    const px = look.x, py = look.y;
    const f = 1 - Math.exp(-dt * 5);
    look.x += (tx - look.x) * f;
    look.y += (ty - look.y) * f;
    const lvx = (look.x - px) / dt;
    const lvy = (look.y - py) / dt;

    const over = overMascot();
    canvas.style.cursor = down ? 'grabbing' : over ? 'pointer' : 'default';
    hov += ((over ? 1 : 0) - hov) * (1 - Math.exp(-dt * 9));

    if (jumpY > 0 || jumpV > 0) {
      jumpV -= 26 * dt;
      jumpY += jumpV * dt;
      if (jumpY <= 0) { jumpY = 0; jumpV = 0; sq.v = -6; happyT = 1.5; burst(6); }
    }
    step(sq, 0, dt, 110, 8);
    float.scale.set(1 - sq.x * 0.05, 1 + sq.x * 0.1, 1 - sq.x * 0.05);
    float.position.y = Math.sin(t * 1.5) * (reduce ? 0.03 : 0.12) * (1 - sleepy * 0.6) + jumpY;
    let spin = 0;
    if (flip >= 0) { flip += dt / 0.95; if (flip >= 1) flip = -1; else spin = easeOut(flip) * Math.PI * 2; }
    if (down) dragS.v = 0; else step(dragS, 0, dt, 26, 5);
    float.rotation.y = dragS.x + spin;

    step(hy, look.x * 0.65, dt, 70, 10);
    step(hx, -look.y * 0.4 + sleepy * 0.22, dt, 70, 10);
    step(hz, -look.x * 0.07 + hov * 0.06 * Math.sin(t * 5), dt, 60, 9);
    headG.rotation.set(hx.x, hy.x, hz.x);
    headG.position.y = sleepy * -0.06;
    bodyG.rotation.y = hy.x * 0.3;
    bodyG.rotation.z = -look.x * 0.03;

    step(az, -hy.v * 0.05 - lvx * 0.01, dt, 80, 5);
    step(ax, hx.v * 0.05 + lvy * 0.01, dt, 80, 5);
    antPivot.rotation.z = az.x + Math.sin(t * 2) * 0.04;
    antPivot.rotation.x = ax.x + Math.sin(t * 1.7) * 0.03;
    coreBoost = Math.max(0, coreBoost - dt * 1.4);
    const pulse = 1 + 0.4 * Math.sin(t * 3) + hov * 1.2 + coreBoost * 2 - sleepy * 1.1;
    bulbMat.emissiveIntensity = Math.max(0.2, pulse);
    bulbGlow.scale.setScalar(0.55 + Math.max(0, pulse) * 0.22);
    bulbGlow.material.opacity = Math.min(1, 0.4 + pulse * 0.3);
    core.scale.setScalar(1 + 0.12 * Math.sin(t * 3.2) + coreBoost * 0.5);
    coreGlow.material.opacity = Math.min(1, Math.max(0, 0.5 + coreBoost - sleepy * 0.3));

    earSpin.forEach((e, i) => { e.rotation.x += dt * (i ? 1 : -1) * (1.2 + hov * 5 + (flip >= 0 ? 8 : 0)); });

    wave = Math.max(0, wave - dt * 0.9);
    for (const h of hands) {
      const s = h.side;
      let gx = h.rest.x + s * hov * 0.12;
      let gy = h.rest.y - lvy * 0.05 + Math.sin(t * 1.5 + s) * 0.06 - jumpV * 0.03 + sleepy * 0.08;
      if (s === 1 && wave > 0) {
        const w = Math.min(1, wave * 1.5);
        gy += Math.sin(w * Math.PI) * 1.35;
        gx += 0.15 * w + Math.sin(t * 16) * 0.1 * w;
      }
      h.group.position.x += (gx - h.group.position.x) * Math.min(1, dt * 10);
      h.group.position.y += (gy - h.group.position.y) * Math.min(1, dt * 10);
      updateArm(h);
    }

    thrust.material.opacity = 0.75 + 0.15 * Math.sin(t * 14);
    thrust.scale.setScalar(2.1 + 0.15 * Math.sin(t * 11) + jumpY * 0.2);
    rings.forEach((r, i) => {
      const p = (t * 0.8 + i / 3) % 1;
      r.position.y = -2.8 - p;
      r.scale.setScalar(0.5 + p * 1.1);
      (r.material as THREE.MeshBasicMaterial).opacity = (1 - p) * 0.55;
    });

    for (const sp of sparks) {
      if (!sp.mesh.visible) continue;
      sp.life -= dt * 0.9;
      if (sp.life <= 0) { sp.mesh.visible = false; continue; }
      sp.v.y -= 4 * dt;
      sp.mesh.position.addScaledVector(sp.v, dt);
      sp.mesh.rotation.y += dt * 6;
      const sc = 0.075 * sp.life * (0.7 + 0.3 * Math.sin(t * 30 + sp.mesh.id)) * scale;
      sp.mesh.scale.set(sc, sc * 1.7, sc);
    }

    wowT = Math.max(0, wowT - dt);
    happyT = Math.max(0, happyT - dt);
    blinkT -= dt;
    if (blinkT <= 0 && blinkP < 0) blinkP = 0;
    let lid = 1;
    if (blinkP >= 0) {
      blinkP += dt / 0.16;
      lid = 1 - Math.sin(Math.min(blinkP, 1) * Math.PI) * 0.92;
      if (blinkP >= 1) { blinkP = -1; blinkT = 1.8 + Math.random() * 3.5; }
    }
    let mood: Mood = 'normal';
    if (sleepy > 0.6) mood = 'sleep';
    else if (wowT > 0 || jumpY > 0.05) mood = 'wow';
    else if (hov > 0.5 || happyT > 0) mood = 'happy';
    face.draw(look.x * (1 - sleepy), look.y * (1 - sleepy), lid * (1 - sleepy * 0.4), mood, t);

    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  };

  const start = (): void => {
    if (raf || disposed || (pauseWhenHidden && (!inView || document.hidden))) return;
    clock.getDelta();
    raf = requestAnimationFrame(tick);
  };
  const stop = (): void => {
    cancelAnimationFrame(raf);
    raf = 0;
  };
  const onVisibility = (): void => (document.hidden && pauseWhenHidden ? stop() : start());
  const io = new IntersectionObserver((entries) => {
    inView = entries.some((e) => e.isIntersecting);
    if (inView) start(); else if (pauseWhenHidden) stop();
  });
  io.observe(container);
  document.addEventListener('visibilitychange', onVisibility);
  start();

  const dispose = (): void => {
    if (disposed) return;
    disposed = true;
    stop();
    io.disconnect();
    ro.disconnect();
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    window.removeEventListener('pointercancel', onCancel);
    document.removeEventListener('pointerleave', onLeave);
    document.removeEventListener('visibilitychange', onVisibility);
    canvas.removeEventListener('pointerdown', onDown);
    scene.traverse((o) => {
      const obj = o as THREE.Mesh | THREE.Sprite;
      if ('geometry' in obj && obj.geometry) obj.geometry.dispose();
      const mats = (obj as THREE.Mesh).material;
      if (mats) (Array.isArray(mats) ? mats : [mats]).forEach((m) => m.dispose());
    });
    envScene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.geometry) m.geometry.dispose();
      if (m.material) (m.material as THREE.Material).dispose();
    });
    sph.dispose();
    face.dispose();
    glowTex.dispose();
    envRT.dispose();
    pmrem.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    canvas.remove();
  };

  return { poke, dispose };
}

