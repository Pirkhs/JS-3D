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
  }
}
