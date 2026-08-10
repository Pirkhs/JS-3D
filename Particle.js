import { Util } from "./util.js";
import { Transform } from "./Transform.js";

const canvas = document.getElementById("canvas");
const view = canvas.getContext("2d");

class Particle {
    static gravity = -0.0005;
    static ttl = 600;

    constructor(position, velocity, colour = "Orange") {
        this.position = { ...position };
        this.velocity = velocity;
        this.colour = { name: colour, rgb: Util.toRGB(colour) };
        this.radius = 8;
        this.ttl = Particle.ttl;
        this.startFade = this.ttl / 2;
        this.alpha = 1;

        // warm colours: red, orange, yellow
        this.hue = Util.randomRange(-15, 60); // Math.random() * 60;        // 0 = red, 30 = orange, 60 = yellow
        this.saturation = 70 + Math.random() * 30; // keep it vivid, 70–100%
        this.lightness = 45 + Math.random() * 15;  // avoid too dark/washed out, 45–60%

        // cold colours: cyan, blue, teal
        // this.hue = 170 + Math.random() * 60; // 180 = cyan, 240 = blue, 300 = purple
        // this.saturation = 40 + Math.random() * 40; // keep it vivid, 70–100%
        // this.lightness = 50 + Math.random() * 35;  // avoid too dark/washed out, 45–60%
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

            if (this.ttl < this.startFade) {
                const t = this.ttl / this.startFade;
                this.alpha = t; // Util.lerp(0, 1, t);
            }
            // const colour = Util.toColourStringAlpha(this.colour.rgb, this.alpha);
            const colour = `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha})`;


            this.update();

            const p = { x: 0, y: 0, z: 0 };
            this.projectPoint(p, camera);
            if (p.view.clipped) return;
            //const distance = 1 / Util.distance(p.world, camera.position);
            //const size = this.size * distance;
            //view.beginPath();
            view.fillStyle = colour; // this.colour.rgba;
            view.fillRect(p.screen.x, p.screen.y, this.radius, this.radius);
            //view.arc(p.screen.x, p.screen.y, this.radius, 0, 2 * Math.PI);
            //view.fill();
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
        if (Math.random() < 0.5) return;
        if (this.particles.length > 1000) { 
            this.particles = this.particles.filter(p => p.ttl > 0);
        }
        
        const range = 0.02;
        const offset = range / 2;
        const speed = Util.randomRange(0.05, 0.15);
        const velocity = Util.setMagnitude({ x: (Math.random() * range) - offset, y: 0.1, z: (Math.random() * range) - offset }, speed);

        const particle = new Particle(this.position, velocity, this.colour.name);

        this.particles.push(particle);
    }

    draw(camera) {
        for (const particle of this.particles) {
            particle.draw(camera);
        }
    }
}