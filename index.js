const canvas = document.getElementById("canvas")
const view = canvas.getContext("2d")

function resize() {
    canvas.width = innerWidth
    canvas.height = innerHeight
}

resize();
window.addEventListener("resize", resize)

function drawPoint(p) {
    view.beginPath()
    view.arc(100, 100, 6, 0, 2*Math.PI);
    view.strokeStyle = "rgba(17, 23, 114, 1)"
    view.stroke()
}

class SimpleShape{
    position = {
        x: 0,
        y: 0,
        z: -10,
    }
    scale = 1
    model = [
        [-1, -1, -1],     //0 - top left back
        [1, -1, -1],     //1 - Top right back
        [1, 1, -1],     //2 - Bottom Right back
        [-1, 1, -1],   // 3 - Bottom Left back
        [-1, -1, 1],  //4 - Top left front
        [1, -1, 1],  //5 - Top Right front
        [1, 1, 1],  //6 - Bottom right front
        [-1, 1, 1],//7 - Bottom left front
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
        return projected
    }
    draw(){
        const projected  = this.projectPoints()
        view.beginPath()
        this.line(projected[0],projected[1])
        this.line(projected[1],projected[2])
        this.line(projected[2],projected[3])
        this.line(projected[3],projected[0])

        this.line(projected[4],projected[5])
        this.line(projected[5],projected[6])
        this.line(projected[6],projected[7])
        this.line(projected[7],projected[4])
        
        this.line(projected[0],projected[4])
        this.line(projected[1],projected[5])
        this.line(projected[2],projected[6])
        this.line(projected[3],projected[7])

        view.stroke()
        // for (const projection of projected){
        //     this.drawPoint(projection)
        // }

    }
    line(p1, p2){
        view.moveTo(p1.x, p1.y)
        view.lineTo(p2.x, p2.y)

    }

    drawPoint(p){
        view.beginPath()
        view.arc(p.x, p.y, 6, 0, 2*Math.PI);
        view.strokeStyle = "rgb(0, 0, 0)"
        view.stroke()
    }
}

const shape = new SimpleShape();
const gui = new dat.GUI();
const positionFolder = gui.addFolder("position")
positionFolder.add(shape.position, "x", -10, 10, 0.01)
positionFolder.add(shape.position, "y", -10, 10, 0.01)
positionFolder.add(shape.position, "z", -100, 10, 0.01)
positionFolder.add(shape, "scale", 0.1, 10 )

function animate() {
    view.clearRect(0,0, canvas.width, canvas.height )
    shape.draw()
    requestAnimationFrame(animate)
}

animate()