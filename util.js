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
}
