import { Util } from "./util.js";

export class Transform{
    static toLocalSpace(p, scale, rotation) {
    const sp = {
      x: p.x * scale,
      y: p.y * scale,
      z: p.z * scale,
    };
    const ry = Util.rotateY(sp, rotation.y);
    const rx = Util.rotateX(ry, rotation.x);
    const rz = Util.rotateZ(rx, rotation.z);
    p.local = rz
  }
  static toWorldSpace(p, position) {
    const world = {
      x: p.local.x + position.x,
      y: p.local.y + position.y,
      z: p.local.z + position.z,
    };
    p.world = world
  }
  static toXYSpace(p) {
    const x = p.world.x / -p.world.z / canvas.aspect;
    const y = p.world.y / -p.world.z;
    const screenX = (x + 1) * 0.5 * canvas.width;
    const screenY = (1 - y) * 0.5 * canvas.height;
    const screen = {
      x: screenX,
      y: screenY,
    };
    p.screen = screen
  }
}