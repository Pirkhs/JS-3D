import { Util } from "./util.js";

const canvas = document.getElementById("canvas");
const view = canvas.getContext("2d");

export default class Camera {
  static Instance = null;
  static {
    canvas.addEventListener("click", (e) => {
      if (document.pointerLockElement === canvas) {
        document.exitPointerLock();
      } else {
        canvas.requestPointerLock();
      }
    }); 
  }

  constructor() {
    Camera.Instance = this;
    this.position = { x: 5, y: 0, z: 0 };
    this.rotation = { x: 0, y: 0 };
    this.projection = { near: 1, far: 100, FOV: Math.PI / 2 };

    document.addEventListener("pointerlockchange", (e) => {
      if (document.pointerLockElement === canvas) {
        canvas.addEventListener("mousemove", Camera.update);
      } else {
        canvas.removeEventListener("mousemove", Camera.update);
      }
    });
  }

  static update(e) {
    const sensitivity = 0.001;
    Camera.Instance.rotate(e.movementX * sensitivity);
    Camera.Instance.tilt(-e.movementY * sensitivity);
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
