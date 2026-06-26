import { Util } from "./util.js";

export default class Camera {
  constructor() {
    this.position = { x: 5, y: 0, z: 0 };
    this.rotation = { x: 0, y: 0 };
    this.projection = { near: 1, far: 100, FOV: Math.PI / 2 };
  }

  rotate(delta) {
    this.rotation.y += delta;
  }

  tilt(delta) {
    this.rotation.x += delta;
  }

  get forward() {
    const forward = Util.forwardDirection(this.rotation.y, this.rotation.x);
    return forward;
  }

  moveForward(distance) {
    const forward = this.forward;
    this.position.x += forward.x * distance;
    this.position.y += forward.y * distance;
    this.position.z += forward.z * distance;
  }
}
