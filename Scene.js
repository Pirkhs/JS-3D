
const canvas = document.getElementById("canvas");
const view = canvas.getContext("2d");

export class Scene {
  objects = [];
  lights = [];

  add(o) {
    o.scene = this;
    this.objects.push(o);
  }

  addLight(l) {
    this.lights.push(l);
    this.add(l);
  }

  draw(camera) {
    for (const o of this.objects) {
      o.draw(camera);
    }
    this.drawReticle();
  }

  drawReticle() {
    view.beginPath();
    view.arc(canvas.width / 2, canvas.height / 2, 10, 0, Math.PI * 2);
    view.stroke();

  }
}
