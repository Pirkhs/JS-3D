class Key {
    static #keys = new Set(); 
    static {
        addEventListener("keydown", e => !e.repeat && this.#keys.add(e.code))
        addEventListener("keyup", e => this.#keys.delete(e.code))
    }

    static Down = key => this.#keys.has(key)
    static Once = key => this.#keys.delete(key)
}

export default class Go {
    static get RotateLeft() {return Key.Down("ArrowLeft")}
    static get RotateRight() {return Key.Down("ArrowRight")}
    static get TiltUp() {return Key.Down("ArrowUp")}
    static get TiltDown() {return Key.Down("ArrowDown")}
} 

