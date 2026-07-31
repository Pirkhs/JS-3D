import { Util } from "./util.js";
import { Face } from "./face.js";
import { Transform } from "./Transform.js";

const canvas = document.getElementById("canvas");
const view = canvas.getContext("2d");

export class Plane {
  position = { x: 0, y: 0, z: 0 };
  rotation = { x: 0, y: 0, z: 0 };
  scale = 1;
  model = [];

  constructor(sides, scale = 1) {
    this.sides = sides;
    this.scale = scale;
    this.offset = -sides / 2;
    for (let z = 0; z <= sides; z++) {
      for (let x = 0; x <= sides; x++) {
        const p = [
          (x + this.offset) * scale,
          Math.sin(z + x) * 0.9,
          (z + this.offset) * scale - 25,
        ];
        this.model.push(p);
      }
    }
  }

  projectPoints(camera) {
    const projected = [];
    for (const vertex of this.model) {
      const p = {
        x: vertex[0],
        y: vertex[1],
        z: vertex[2],
      };
      this.projectPoint(p, camera);
      projected.push(p);
    }
    return projected;
  }
  projectPoint(p, camera) {
    Transform.toLocalSpace(p, this.scale, this.rotation);
    Transform.toWorldSpace(p, this.position);
    Transform.toViewSpace(p, camera);
    Transform.toXYSpace(p);
  }

  draw(camera) {
    const projected = this.projectPoints(camera);

    const step = this.sides + 1;

    for (let z = 0; z < this.sides; z++) {
      for (let x = 0; x < this.sides; x++) {
        const sw = z * step + x;
        const se = sw + 1;
        const nw = se + this.sides;
        const ne = nw + 1;

        const p1 = projected[sw];
        const p2 = projected[se];
        const p3 = projected[ne];
        const p4 = projected[nw];
        if (
          p1.view.clipped &&
          p2.view.clipped &&
          p3.view.clipped &&
          p4.view.clipped
        ) {
          continue;
        }
        const colour = (x + z) % 2 ? "grey" : "lightgrey";
        this.fillFace(colour, p1.screen, p2.screen, p3.screen, p4.screen);
      }
    }
  }

  fillFace(colour, ...points) {
    view.fillStyle = colour;
    view.shadowColour = colour;
    view.beginPath();

    this.moveTo(points.at(-1));
    for (const p of points) {
      this.lineTo(p);
    }

    view.fill();
  }

  moveTo(p) {
    view.moveTo(p.x, p.y);
  }

  lineTo(p) {
    view.lineTo(p.x, p.y);
  }
}
