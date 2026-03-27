export class Util {
  static rotateY(p, a) {
    const sin = Math.sin(a);
    const cos = Math.cos(a);
    const x = p.x * cos - p.z * sin;
    const z = p.x * sin + p.z * cos;
    return { x, y: p.y, z };
  }

  static rotateX(p, a) {
    const sin = Math.sin(a);
    const cos = Math.cos(a);
    const y = p.y * cos - p.z * sin;
    const z = p.y * sin + p.z * cos;
    return { x: p.x, y, z };
  }

  static rotateZ(p, a) {
    const sin = Math.sin(a);
    const cos = Math.cos(a);
    const x = p.x * cos - p.y * sin;
    const y = p.x * sin + p.y * cos;
    return { x, y, z: p.z };
  }

  static add(v1, v2) {
    return { x: v1.x + v2.x, y: v1.y + v2.y, z: v1.z + v2.z }
  }

  static subtract(v1, v2) {
    return { x: v1.x - v2.x, y: v1.y - v2.y, z: v1.z - v2.z }
  }

  static scale(v1, s) {
    return { x: v1.x * s, y: v1.y * s, z: v1.z * s }
  }

  static normalize(v1) {
    const length = Math.hypot(v1.x, v1.y, v1.z)
    return { x: v1.x / length, y: v1.y / length, z: v1.z / length }
  }

  static dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z
  }

  static cross(v1, v2) {
    return {
      x: v1.y * v2.z - v1.z * v2.y,
      y: v1.z * v2.x - v1.x * v2.z,
      z: v1.x * v2.y - v1.y * v2.x,
    }
  }

  static centroid(...vertices) {
    const c = { x: 0, y: 0, z: 0 }
    for (const vertex of vertices) {
      c.x += vertex.x
      c.y += vertex.y
      c.z += vertex.z
    }
    c.x /= vertices.length
    c.y /= vertices.length
    c.z /= vertices.length
    return c
  }
}
