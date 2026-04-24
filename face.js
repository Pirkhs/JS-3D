import { Util } from "./util.js";
import { Transform } from "./Transform.js";

const canvas = document.getElementById("canvas");
const view = canvas.getContext("2d");

export class Face {
    constructor(vertices, parent) {
        this.vertices = vertices
        this.parent = parent
    }

    draw(projected) {
        const vertices = this.vertices.map(v => projected[v])
        this.drawWireFrame(vertices)
    }

    drawWireFrame(vertices) {
        const centerPoint = Util.centroid(vertices[0].world, vertices[2].world)
        const v1 = Util.subtract(vertices[1].world, vertices[0].world)
        const v2 = Util.subtract(vertices[2].world, vertices[0].world)
        const normal = Util.normalize(Util.cross(v1, v2))

        const toCamera = Util.subtract(vertices[0].world, {
            x: 0,
            y: 0,
            z: 0
        })
        // const normToCamera = Util.normalize(toCamera)
        const dp = Util.dot(normal, toCamera)

        if (dp <= 0){
            const last = vertices.at(-1)
            view.moveTo(last.screen.x, last.screen.y)
            for (const vertex of vertices) {
                view.lineTo(vertex.screen.x, vertex.screen.y)
            }


            const center = {
                world: centerPoint
            }
            Transform.toXYSpace(center)
            view.moveTo(center.screen.x, center.screen.y)
            view.arc(center.screen.x, center.screen.y, 3, 0, Math.PI * 2)

            const endPoint = Util.add(centerPoint, Util.scale(normal, 2))
            const endPointWorld = {
                world: endPoint
            }
            Transform.toXYSpace(endPointWorld)
            view.moveTo(center.screen.x, center.screen.y)
            view.lineTo(endPointWorld.screen.x, endPointWorld.screen.y)
        }
    }

    drawFace() {

    }
}
