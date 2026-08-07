import { Util } from "./util.js";
import { Transform } from "./Transform.js";

const canvas = document.getElementById("canvas");
const view = canvas.getContext("2d");

class Particle {
    static gravity = -0.001;
    static ttl = 600;

  constructor(position, velocity, colour = "Orange") {
    this.position = {...position};
    this.velocity = velocity;
    this.colour = { name: colour, rgba: Util.toRGBA(colour) };

    this.ttl = Particle.ttl;
  }

  projectPoint(p, camera) {
    Transform.toLocalSpace(p, 1, { x: 0, y: 0, z: 0 });
    Transform.toWorldSpace(p, this.position);
    Transform.toViewSpace(p, camera);
    Transform.toXYSpace(p);
  }

  update() {
    this.velocity.y += Particle.gravity;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.position.z += this.velocity.z;

    if (this.position.y < 0) {
        this.position.y = 0;
        this.velocity.y *= -0.9;
    }
  }

  draw(camera) {
    if (this.ttl > 0) { 
        this.ttl -= 1;

    if (this.ttl < Particle.ttl / 2) {
        this.colour.rgba[3] = Math.floor(this.colour.rgba[3] * 0.99);
    }
    const colour = Util.toColourStringAlpha(this.colour.rgba);


    this.update();

    const p = { x: 0, y: 0, z: 0 };
    this.projectPoint(p, camera);
    if (p.view.clipped) return;
    //const distance = 1 / Util.distance(p.world, camera.position);
    //const size = this.size * distance;
    view.beginPath();
    view.fillStyle = colour;
    view.arc(p.screen.x, p.screen.y, 10, 0, 2 * Math.PI);
    view.fill();
  }
  }
}

export class ParticleEmiter {
    constructor(x, y, z, colour = "Orange") {
        this.position = { x, y, z };
        this.colour = { name: colour, rgba: Util.toRGBA(colour) };
        this.particles = [];
    }

    spawnParticle() {
        const range = 0.02;
        const offset = range / 2;
        const velocity = { x: (Math.random() * range) - offset, y: 0.1, z: (Math.random() * range) - offset};

        const particle = new Particle(this.position, velocity, this.colour.name);

        this.particles.push(particle);
    }

    draw(camera) {
        for (const particle of this.particles) {
            particle.draw(camera);
        }
    }
}