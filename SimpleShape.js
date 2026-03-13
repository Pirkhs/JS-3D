import { Util } from "./util.js";

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

  toLocalSpace(p) {
    const sp = {
      x: p.x * this.scale,
      y: p.y * this.scale,
      z: p.z * this.scale,
    };
    const ry = Util.rotateY(sp, this.rotation.y);
    const rx = Util.rotateX(ry, this.rotation.x);
    const rz = Util.rotateZ(rx, this.rotation.z);
    return rz;
  }
  toWorldSpace(p) {
    return {
      x: p.x + this.position.x,
      y: p.y + this.position.y,
      z: p.z + this.position.z,
    };
  }
  projectPoint(p) {
    const x = p.x / -p.z / canvas.aspect;
    const y = p.y / -p.z;
    const screenX = (x + 1) * 0.5 * canvas.width;
    const screenY = (1 - y) * 0.5 * canvas.height;
    return {
      x: screenX,
      y: screenY,
    };
  }
  projectPoints() {
    const projected = [];
    for (const vertex of this.model) {
      const local = this.toLocalSpace({
        x: vertex[0],
        y: vertex[1],
        z: vertex[2],
      });
      const world = this.toWorldSpace(local);
      const screenPoint = this.projectPoint(world);
      projected.push(screenPoint);
    }
    return projected;
  }
  draw() {
    const projected = this.projectPoints();
    view.beginPath();
    this.line(projected[0], projected[1]);
    this.line(projected[1], projected[2]);
    this.line(projected[2], projected[3]);
    this.line(projected[3], projected[0]);

    this.line(projected[4], projected[5]);
    this.line(projected[5], projected[6]);
    this.line(projected[6], projected[7]);
    this.line(projected[7], projected[4]);

    this.line(projected[0], projected[4]);
    this.line(projected[1], projected[5]);
    this.line(projected[2], projected[6]);
    this.line(projected[3], projected[7]);

    view.stroke();
    // for (const projection of projected){
    //     this.drawPoint(projection)
    // }
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
