class Key {
  static #keys = new Set();
  static {
    addEventListener("keydown", (e) => !e.repeat && this.#keys.add(e.code));
    addEventListener("keyup", (e) => this.#keys.delete(e.code));
  }

  static Down = (key) => this.#keys.has(key);
  static Once = (key) => this.#keys.delete(key);
}

export default class Go {
  static get RotateLeft() {
    return Key.Down("ArrowLeft");
  }
  static get RotateRight() {
    return Key.Down("ArrowRight");
  }
  static get TiltUp() {
    return Key.Down("ArrowUp");
  }
  static get TiltDown() {
    return Key.Down("ArrowDown");
  }
  static get Forward() {
    return Key.Down("KeyW");
  }
  static get Backward() {
    return Key.Down("KeyS");
  }
  static get Left() {
    return Key.Down("KeyA");
  }
  static get Right() {
    return Key.Down("KeyD");
  }
  static get Higher() {
    return Key.Down("KeyE");
  }
  static get Lower() {
    return Key.Down("KeyC");
  }
  static get SpawnParticle() {
    return Key.Once("Space")
  }
}
