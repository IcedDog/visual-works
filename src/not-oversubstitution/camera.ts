import * as audio from "../audio"
import * as data from "./data"
import * as constants from "./constants"
import * as ease from "./ease"

class Camera {
    x: number
    y: number
    scale: number

    constructor() {
        this.x = 0
        this.y = 0
        this.scale = 1
    }

    get minX() {
        return (-p.width / 2 / this.scale - this.x) / constants.size - 1
    }

    get maxX() {
        return (p.width / 2 / this.scale - this.x) / constants.size + 1
    }

    get minY() {
        return (-p.height / 2 / this.scale - this.y) / constants.size - 1
    }

    get maxY() {
        return (p.height / 2 / this.scale - this.y) / constants.size + 1
    }

    update() {
        let currentItem = data.items.filter((item) => item.time <= audio.time()).reverse()[0]

        if (currentItem) {
            let prevLineItems = data.items.filter((item) => item.x === currentItem.x + 1)
            let currentLineItems = data.items.filter((item) => item.x === currentItem.x)
            let nextLineItems = data.items.filter((item) => item.x === currentItem.x - 1)

            let currentMinY = Math.min(...currentLineItems.map((item) => item.y))
            let currentMaxY = Math.max(...currentLineItems.map((item) => item.y))
            let currentCenterY = (currentMinY + currentMaxY + 1) / 2

            let prevMinY = Math.min(...prevLineItems.map((item) => item.y))
            let prevMaxY = Math.max(...prevLineItems.map((item) => item.y))
            if (prevMinY === Infinity) prevMinY = currentMinY
            if (prevMaxY === -Infinity) prevMaxY = currentMaxY
            let prevCenterY = ((prevMinY + prevMaxY + 1) / 2)

            let currentTime = currentLineItems[0].time
            let nextTime = nextLineItems[0]?.time || currentTime + 2

            let progressInOut = p.norm(audio.time(), currentTime, nextTime)
            let progressOut = p.constrain(p.norm(audio.time(), currentTime, Math.min(nextTime, currentTime + 1)), 0, 1)
            let progressIn = p.constrain(p.norm(audio.time(), Math.max(nextTime - 1, currentTime), nextTime), 0, 1)

            let currentCenterX = currentLineItems[0].x
            let nextCenterX = nextLineItems[0]?.x || currentCenterX + 2

            if (prevLineItems.length === 0) progressOut = 1

            if (nextLineItems.length === 0) progressIn = 0

            this.x = -p.lerp(currentCenterX, nextCenterX, (ease.Out(progressOut, 6) + ease.In(progressIn, 6)) / 2) * constants.size
            this.y = -p.lerp(prevCenterY, currentCenterY, ease.InOut(progressInOut, 3)) * constants.size

            let v = -10
            let w = (p.lerp(prevMinY, currentMinY, ease.InOut(progressInOut, 2)) - p.lerp(prevMaxY, currentMaxY, ease.InOut(progressInOut, 2)))
            this.scale = v / p.lerp(v, w, 0.8)
        }
    }
}

export const camera = new Camera()