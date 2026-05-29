import { Util } from "./util.js";
import { Transform } from "./Transform.js";
import Camera from "./camera.js";

const canvas = document.getElementById("canvas");
const view = canvas.getContext("2d");

export class Face {
  constructor(vertices, parent) {
    this.vertices = vertices;
    this.parent = parent;
  }

  draw(projected, camera) {
    const vertices = this.vertices.map((v) => projected[v]);
    // this.drawWireFrame(vertices, camera);
    this.drawFace(vertices, camera);
  }

  drawWireFrame(vertices, camera) {
    const centerPoint = Util.centroid(vertices[0].world, vertices[2].world);
    const v1 = Util.subtract(vertices[1].world, vertices[0].world);
    const v2 = Util.subtract(vertices[2].world, vertices[0].world);
    const normal = Util.normalize(Util.cross(v1, v2));

    const toCamera = Util.subtract(vertices[0].world, camera.position);
    // const normToCamera = Util.normalize(toCamera)
    const dp = Util.dot(normal, toCamera);

    if (dp <= 0) {
      view.beginPath();
      const last = vertices.at(-1);
      view.moveTo(last.screen.x, last.screen.y);
      for (const vertex of vertices) {
        view.lineTo(vertex.screen.x, vertex.screen.y);
      }

      const center = {
        world: centerPoint,
      };
      Transform.toViewSpace(center, camera);
      Transform.toXYSpace(center);
      view.moveTo(center.screen.x, center.screen.y);
      view.arc(center.screen.x, center.screen.y, 3, 0, Math.PI * 2);

      const endPoint = Util.add(centerPoint, Util.scale(normal, 1));
      const endPointWorld = {
        world: endPoint,
      };
      Transform.toViewSpace(endPointWorld, camera);
      Transform.toXYSpace(endPointWorld);
      view.moveTo(center.screen.x, center.screen.y);
      view.lineTo(endPointWorld.screen.x, endPointWorld.screen.y);
      view.stroke();
    }
  }

  drawFace(vertices, camera) {
    const centerPoint = Util.centroid(vertices[0].world, vertices[2].world);
    const v1 = Util.subtract(vertices[1].world, vertices[0].world);
    const v2 = Util.subtract(vertices[2].world, vertices[0].world);
    const normal = Util.normalize(Util.cross(v1, v2));
    let baseColor = [64, 64, 64];

    for (const light of this.parent.scene.lights) {
      const toLight = Util.normalize(Util.subtract(light.position, centerPoint));

      let brightness = Util.dot(normal, toLight);
      brightness = Util.clamp(brightness, 0.1, 1);

      const lightColor = light.colour.rgba;

      baseColor = Util.blendColours(baseColor, lightColor, brightness);
    }

    const toCamera = Util.subtract(vertices[0].world, camera.position);
    // const normToCamera = Util.normalize(toCamera)
    const dp = Util.dot(normal, toCamera);

    if (dp <= 0) {
      view.beginPath();
      view.fillStyle = Util.toColourString(baseColor);
      //view.strokeStyle = "lime";
      //view.lineWidth = 1;
      const last = vertices.at(-1);
      view.moveTo(last.screen.x, last.screen.y);
      for (const vertex of vertices) {
        view.lineTo(vertex.screen.x, vertex.screen.y);
      }
      view.fill();
      //view.stroke();
    }
  }
}
