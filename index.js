import { SimpleShape } from "./SimpleShape.js";

const canvas = document.getElementById("canvas");
const view = canvas.getContext("2d");

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  canvas.aspect = innerWidth / innerHeight;
}

resize();
window.addEventListener("resize", resize);

function drawPoint(p) {
  view.beginPath();
  view.arc(100, 100, 6, 0, 2 * Math.PI);
  view.strokeStyle = "rgba(17, 23, 114, 1)";
  view.stroke();
}

const shape = new SimpleShape();
const gui = new dat.GUI();
const positionFolder = gui.addFolder("position");
positionFolder.add(shape.position, "x", -10, 10, 0.01);
positionFolder.add(shape.position, "y", -10, 10, 0.01);
positionFolder.add(shape.position, "z", -100, 10, 0.01);
positionFolder.add(shape, "scale", 0.1, 10);

function animate() {
  view.clearRect(0, 0, canvas.width, canvas.height);
  shape.rotation.z += 0.01;
  shape.rotation.y += 0.05;
  shape.rotation.x -= 0.01;
  shape.draw();
  requestAnimationFrame(animate);
}

animate();
