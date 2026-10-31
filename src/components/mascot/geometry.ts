import * as THREE from 'three';

/** Half-extents and squareness of the head superellipsoid. */
export const HEAD = { a: 1.35, b: 1.05, c: 1.0, n: 3.4 } as const;

/** Smooth "squircle" head built from a sphere, with welded seam normals. */
export function buildHeadGeometry(): THREE.SphereGeometry {
  const ws = 72;
  const hs = 48;
  const g = new THREE.SphereGeometry(1, ws, hs);
  const p = g.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    const s = Math.pow(
      Math.pow(Math.abs(v.x), HEAD.n) + Math.pow(Math.abs(v.y), HEAD.n) + Math.pow(Math.abs(v.z), HEAD.n),
      1 / HEAD.n,
    );
    p.setXYZ(i, (v.x / s) * HEAD.a, (v.y / s) * HEAD.b, (v.z / s) * HEAD.c);
  }
  g.computeVertexNormals();
  const n = g.attributes.normal;
  for (let iy = 0; iy <= hs; iy++) {
    const a = iy * (ws + 1);
    const b = a + ws;
    const x = n.getX(a) + n.getX(b);
    const y = n.getY(a) + n.getY(b);
    const z = n.getZ(a) + n.getZ(b);
    const l = Math.hypot(x, y, z) || 1;
    n.setXYZ(a, x / l, y / l, z / l);
    n.setXYZ(b, x / l, y / l, z / l);
  }
  return g;
}

/** A plane bent to hug the front of the head, used for the glass visor. */
export function buildVisorGeometry(): THREE.PlaneGeometry {
  const g = new THREE.PlaneGeometry(1.95, 1.05, 48, 24);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i);
    const y = p.getY(i);
    const t = 1 - Math.pow(Math.abs(x / HEAD.a), HEAD.n) - Math.pow(Math.abs(y / HEAD.b), HEAD.n);
    p.setZ(i, HEAD.c * Math.pow(Math.max(t, 0), 1 / HEAD.n) + 0.012);
  }
  g.computeVertexNormals();
  return g;
}

