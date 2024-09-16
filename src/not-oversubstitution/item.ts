import { Image } from "p5"
import * as data from "./data"
import * as audio from "../audio"

export type Box = {
    x1: number
    y1: number
    x2: number
    y2: number
}

export default class Item {
    kanji: string
    name: string
    components: Array<number>
    x: number
    y: number
    time: number

    selectBox: Box = { x1: 0, y1: 0, x2: 200, y2: 200 }
    wholeImage?: Image
    selectImage?: Image
    constructor(kanji: string, name: string, components: Array<number>, x: number, y: number, time: number, selectBox: Box) {
        this.kanji = kanji
        this.name = name
        this.components = components
        this.x = x
        this.y = y
        this.time = time
        this.selectBox = selectBox
    }

    loadImage(rawStr: string) {
        this.wholeImage = p.loadImage(rawStr)
    }

    loadSelectedImage(rawStr: string) {
        this.selectImage = p.loadImage(rawStr)
    }

    get left() {
        return data.items.filter((item: any) => item.x < this.x && item.y === this.y).sort((a: any, b: any) => b.x - a.x)[0]
    }

    get right() {
        return data.items.filter((item: any) => item.x > this.x && item.y === this.y).sort((a: any, b: any) => a.x - b.x)[0]
    }

    get progressOut() {
        return p.constrain(p.norm(audio.time(), this.time, Math.min(this.left?.time || Infinity, this.time + 1)), 0, 1)
    }

    get progressIn() {
        return p.constrain(p.norm(audio.time(), Math.max(this.left?.time || Infinity, this.time) - 1, this.left?.time || Infinity), 0, 1)
    }
}