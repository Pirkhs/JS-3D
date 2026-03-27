import { Util } from "./util.js";

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
        const last = vertices.at(-1)
        view.moveTo(last.x, last.y)
        for (const vertex of vertices) {
            view.lineTo(vertex.x, vertex.y)
        }

        const centerPoint = Util.centroid(...vertices)
        view.moveTo(centerPoint.x, centerPoint.y)
        view.arc(centerPoint.x, centerPoint.y, 3, 0, Math.PI * 2)
    }

    drawFace() {

    }
}
