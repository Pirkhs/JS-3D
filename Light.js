import { Util } from "./util.js";
import { Transform } from "./Transform.js";

const canvas = document.getElementById("canvas");
const view = canvas.getContext("2d");

export class Light {
  constructor(x, y, z, colour) {
    this.position = { x, y, z };
    this.colour = { name: colour, rgba: Util.toRGBA(colour) };
    this.size = 1000;
  }

  projectPoint(p, camera) {
    Transform.toLocalSpace(p, 1, { x: 0, y: 0, z: 0 });
    Transform.toWorldSpace(p, this.position);
    Transform.toViewSpace(p, camera);
    Transform.toXYSpace(p);
  }

  draw(camera) {
    const p = { x: 0, y: 0, z: 0 };
    this.projectPoint(p, camera);
    const distance = 1 / Util.distance(p.world, camera.position);
    const size = this.size * distance;
    view.beginPath();
    view.fillStyle = this.colour.name;
    view.arc(p.screen.x, p.screen.y, size, 0, 2 * Math.PI);
    view.fill();
  }
}
