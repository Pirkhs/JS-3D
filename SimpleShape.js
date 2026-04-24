import { Util } from "./util.js";
import { Face } from "./face.js";
import { Transform } from "./Transform.js";

const canvas = document.getElementById("canvas");
const view = canvas.getContext("2d");

export class SimpleShape {
  position = {
    x: 0,
    y: 0,
    z: -10,
  };
  rotation = {
    x: 0,
    y: 0,
    z: 0,
  };
  scale = 1;
  model = [
    [-1, -1, -1], //0 - top left back
    [1, -1, -1], //1 - Top right back
    [1, 1, -1], //2 - Bottom Right back
    [-1, 1, -1], // 3 - Bottom Left back
    [-1, -1, 1], //4 - Top left front
    [1, -1, 1], //5 - Top Right front
    [1, 1, 1], //6 - Bottom right front
    [-1, 1, 1], //7 - Bottom left front
  ];
  faces = [
    new Face([4, 5, 6, 7], this), // front
    new Face([1, 0, 3, 2], this), // back
    new Face([5, 1, 2, 6], this), // right
    new Face([0, 4, 7, 3], this), // left
    new Face([0, 1, 5, 4], this), // top
    new Face([7, 6, 2, 3], this), // bottom
  ]
  projectPoints() {
    const projected = [];
    for (const vertex of this.model) {
      const p = {
        x: vertex[0],
        y: vertex[1],
        z: vertex[2],
      }
      this.projectPoint(p)
      projected.push(p);
    }
    return projected;
  }
  projectPoint(p){
    Transform.toLocalSpace(p, this.scale, this.rotation)
    Transform.toWorldSpace(p, this.position)
    Transform.toXYSpace(p)
  }
  draw() {
    const projected = this.projectPoints();
    view.beginPath();

    for (const face of this.faces) {
      face.draw(projected)
    }
    view.stroke();
  }
  line(p1, p2) {
    view.moveTo(p1.x, p1.y);
    view.lineTo(p2.x, p2.y);
  }

  drawPoint(p) {
    view.beginPath();
    view.arc(p.x, p.y, 6, 0, 2 * Math.PI);
    view.strokeStyle = "rgb(0, 0, 0)";
    view.stroke();
  }
}
