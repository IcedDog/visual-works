import * as constants from "./constants"
import * as data from "./data"
import * as components from "./components"
import * as audio from "../audio"
import { camera } from "./camera"
import { Easing, EasingLerp } from "../utils/animUtils"

export const preload = () => {
    data.preload()
}

export const setup = () => {
    data.setup()
}

export const draw = () => {
    if (audio.time() > 15) {
        p.background(EasingLerp(constants.white / 8 * 7, constants.white, (audio.time()) % 1, Easing.Linear))

        p.push()
        p.randomSeed(p.floor(audio.time()))
        for (let i = 0; i < p.random(3, 8); i++) {
            p.strokeWeight(constants.height / 18)
            p.stroke(EasingLerp(constants.white / 8 * 7, constants.white, (audio.time()) % 1, Easing.Linear))
            p.fill(EasingLerp(constants.white / 2, constants.white / 3 * 2, (audio.time()) % 1, Easing.Linear))
            p.rectMode(p.CORNER)
            if (p.random() < 0.5) {
                const y = p.random(0, 8) * constants.height / 9
                const width = p.random(1, 5) * constants.width / 9
                p.rect(0, y, constants.width, y + width)
            } else {
                const x = p.random(0, 8) * constants.height / 16
                const width = p.random(1, 5) * constants.width / 16
                p.rect(x, 0, x + width, constants.height)
            }
        }
        p.pop()
    }
    else p.background(constants.white)


    camera.update()
    p.translate(constants.width / 2, constants.height / 2)
    p.translate(camera.x * camera.scale, camera.y * camera.scale)
    p.scale(camera.scale)

    const items = data.items.filter((item) => {
        return (
            item.x > camera.minX &&
            item.x < camera.maxX &&
            item.y > camera.minY &&
            item.y < camera.maxY
        )
    })
    items.forEach((item) => components.drawBox(item))
    items.forEach((item) => components.drawHeadBox(item))
    items.forEach((item) => components.drawMovingHeadBox(item))
}