const canvas = document.getElementById("canvas");
const view = canvas.getContext("2d");

function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}

resize();
window.addEventListener("resize", resize);

function drawPoint(p) {
    view.beginPath();
    view.arc(100, 100, 6, 0, 2*Math.PI);
    view.strokeStyle = "rgba(17, 23, 114, 1)"
    view.stroke();
}

class SimpleShape{
    position = {
        x: 0,
        y: 0,
        z: -10,
    }
    scale = 1
    model = [
        [-1, -1, -1],
        [1, -1, -1],
        [1, 1, -1],
        [-1, 1, -1],
        [-1, -1, 1],
        [1, -1, 1],
        [1, 1, 1],
        [-1, 1, 1],
    ]

    toLocalSpace(p){
        return {
            x: p.x * this.scale,
            y: p.y * this.scale,
            z: p.z * this.scale
        }
    }
    toWorldSpace(p){
        return {
            x: p.x + this.position.x,
            y: p.y + this.position.y,
            z: p.z + this.position.z
        }
    }
    projectPoint(p){
        const x = p.x / -p.z
        const y = p.y / -p.z
        const screenX = (x + 1) * (0.5) * canvas.width
        const screenY = (1 - y) * (0.5) * canvas.height
        return {
            x: screenX,
            y: screenY
        }
    }
    projectPoints(){
        const projected = []
        for (const vertex of this.model){
            const local = this.toLocalSpace({
                x: vertex[0],
                y: vertex[1],
                z: vertex[2]
            })
            const world = this.toWorldSpace(local)
            const screenPoint = this.projectPoint(world)
            projected.push(screenPoint)
        }
        for (const projection of projected){
            this.drawPoint(projection)
        }
    }
    drawPoint(p){
        view.beginPath();
        view.arc(p.x, p.y, 6, 0, 2*Math.PI);
        view.strokeStyle = "rgba(0, 0, 0, 1)"
        view.stroke();
    }
}

const shape = new SimpleShape();
const gui = new dat.GUI();
const positionFolder = gui.addFolder("position")
positionFolder.add(shape.position, "x", -10, 10, 0.01)
positionFolder.add(shape.position, "y", -10, 10, 0.01)
positionFolder.add(shape.position, "z", -100, 10, 0.01)
positionFolder.add(shape.position, "z", -100, -10, 0.01)
positionFolder.add(shape, "scale", 0.1, 10 )

function animate() {
    view.clearRect(0,0, canvas.width, canvas.height )
    shape.projectPoints()
    requestAnimationFrame(animate)
}

animate()