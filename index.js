import { Light } from "./Light.js";
import { SimpleShape } from "./SimpleShape.js";
import Camera from "./camera.js";
import { Scene } from "./Scene.js";
import Go from "./Go.js";
import { Plane } from "./Plane.js";

const canvas = document.getElementById("canvas");
const view = canvas.getContext("2d");

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  canvas.aspect = innerWidth / innerHeight;
  view.lineWidth = 4;
  view.lineJoin = "round";
}

resize();
window.addEventListener("resize", resize);

function drawPoint(p) {
  view.beginPath();
  view.arc(100, 100, 6, 0, 2 * Math.PI);
  view.strokeStyle = "rgba(17, 23, 114, 1)";
  view.stroke();
}

const scene = new Scene();
const plane = new Plane(25, 2);
scene.add(plane);
const camera = new Camera();
const red = new Light(4, 4, -5, "red");
const green = new Light(0, 4, -10, "green");
const shape = new SimpleShape();
scene.add(shape);
const numObjects = 20;
for (let i = 0; i < numObjects; i++) {
  const x = Math.random() * 40 - 20;
  const y = Math.random() * 40 + 5;
  const z = Math.random() * -40 - 1;
  const shape = new SimpleShape(x, y, z);
  scene.add(shape);
}

scene.addLight(red);
scene.addLight(green);

const gui = new dat.GUI();
const cubeFolder = gui.addFolder("cube");
cubeFolder.add(shape.position, "x", -10, 10, 0.01);
cubeFolder.add(shape.position, "y", -10, 10, 0.01);
cubeFolder.add(shape.position, "z", -100, 10, 0.01);
cubeFolder.add(shape, "scale", 0.1, 10);

const ligthFolder = gui.addFolder("light");
ligthFolder.add(red.position, "x", -10, 10, 0.01);
ligthFolder.add(red.position, "y", -10, 10, 0.01);
ligthFolder.add(red.position, "z", -100, 10, 0.01);

const cameraFolder = gui.addFolder("camera");
cameraFolder.add(camera.position, "x", -20, 20, 0.1);
cameraFolder.add(camera.position, "y", -20, 20, 0.1);
cameraFolder.add(camera.position, "z", -100, 100, 0.1);

function animate() {
  view.clearRect(0, 0, canvas.width, canvas.height);
  shape.rotation.z += 0.01;
  shape.rotation.y += 0.001;
  shape.rotation.x -= 0.01;
  // shape.draw(camera);
  // red.draw(camera);

  if (Go.RotateLeft) camera.rotate(-0.01);
  if (Go.RotateRight) camera.rotate(0.01);
  if (Go.TiltUp) camera.tilt(0.01);
  if (Go.TiltDown) camera.tilt(-0.01);
  if (Go.Forward) camera.moveForward(0.1);
  if (Go.Backward) camera.moveForward(-0.1);
  if (Go.Left) camera.moveStrafe(-0.1);
  if (Go.Right) camera.moveStrafe(0.1);
  if (Go.Higher) camera.elevate(0.1);
  if (Go.Lower) camera.elevate(-0.1);

  scene.draw(camera);
  requestAnimationFrame(animate);
}

animate();
