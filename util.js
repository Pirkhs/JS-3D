export class Util {
  static rotateY(p, a) {
    const sin = Math.sin(a);
    const cos = Math.cos(a);
    const x = p.x * cos - p.z * sin;
    const z = p.x * sin + p.z * cos;
    return { x, y: p.y, z };
  }

  static rotateYInPlace(p, a) {
    const sin = Math.sin(a);
    const cos = Math.cos(a);
    const x = p.x * cos - p.z * sin;
    const z = p.x * sin + p.z * cos;
    p.x = x;
    p.z = z;
  }

  static rotateX(p, a) {
    const sin = Math.sin(a);
    const cos = Math.cos(a);
    const y = p.y * cos - p.z * sin;
    const z = p.y * sin + p.z * cos;
    return { x: p.x, y, z };
  }

  static rotateXInPlace(p, a) {
    const sin = Math.sin(a);
    const cos = Math.cos(a);
    const y = p.y * cos - p.z * sin;
    const z = p.y * sin + p.z * cos;
    p.y = y;
    p.z = z;
  }

  static rotateZ(p, a) {
    const sin = Math.sin(a);
    const cos = Math.cos(a);
    const x = p.x * cos - p.y * sin;
    const y = p.x * sin + p.y * cos;
    return { x, y, z: p.z };
  }

  static add(v1, v2) {
    return { x: v1.x + v2.x, y: v1.y + v2.y, z: v1.z + v2.z };
  }

  static subtract(v1, v2) {
    return { x: v1.x - v2.x, y: v1.y - v2.y, z: v1.z - v2.z };
  }

  static scale(v1, s) {
    return { x: v1.x * s, y: v1.y * s, z: v1.z * s };
  }

  static normalize(v1) {
    const length = Math.hypot(v1.x, v1.y, v1.z);
    return { x: v1.x / length, y: v1.y / length, z: v1.z / length };
  }

  static dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
  }

  static cross(v1, v2) {
    return {
      x: v1.y * v2.z - v1.z * v2.y,
      y: v1.z * v2.x - v1.x * v2.z,
      z: v1.x * v2.y - v1.y * v2.x,
    };
  }

  static clamp(value, min, max) {
    return Math.max(min, Math.min(value, max));
  }

  static centroid(...vertices) {
    const c = { x: 0, y: 0, z: 0 };
    for (const vertex of vertices) {
      c.x += vertex.x;
      c.y += vertex.y;
      c.z += vertex.z;
    }
    c.x /= vertices.length;
    c.y /= vertices.length;
    c.z /= vertices.length;
    return c;
  }

  static colourConverter = document
    .createElement("canvas")
    .getContext("2d", { willReadFrequently: true });

  static toRGBA(colour) {
    this.colourConverter.fillStyle = colour;
    this.colourConverter.fillRect(0, 0, 1, 1);
    return this.colourConverter.getImageData(0, 0, 1, 1).data;
  }

  static toColourString(colour) {
    return `rgb(${colour[0]},${colour[1]},${colour[2]})`;
  }

  static toColourStringAlpha(colour) {
    return `rgba(${colour[0]},${colour[1]},${colour[2]},${colour[3]})`;
  }

  static blendColours(colour1, colour2, t) {
    const differenceR = (colour2[0] - colour1[0]) * t;
    const differenceG = (colour2[1] - colour1[1]) * t;
    const differenceB = (colour2[2] - colour1[2]) * t;
    return [
      colour1[0] + differenceR,
      colour1[1] + differenceG,
      colour1[2] + differenceB,
    ];
  }

  static distance(p1, p2) {
    return Math.hypot(p1.x - p2.x, p1.y - p2.y, p1.z - p2.z);
  }

  static forwardDirection(azimuth, elevation) {
    const cosEl = Math.cos(elevation);

    return {
      x: cosEl * Math.sin(azimuth),
      y: Math.sin(elevation),
      z: -cosEl * Math.cos(azimuth),
    };
  }

  static rightDirection(azimuth) {
    const right = {x: 1.0, y: 0.0, z: 0.0};
    const rightVector = Util.rotateY(right, azimuth);
    return rightVector;
  }
}
