import * as constants from "./constants"
import * as data from "./data"
import * as text from "./text"
import * as components from "./components"
import * as audio from "../audio"
import { camera } from "./camera"
import { Easing, EasingLerp } from "../utils/animUtils"
import { Beat } from "../utils/timingUtils"

const beat = new Beat(120)

export const preload = () => {
    text.preload()
    data.preload()
}

export const setup = () => {
    data.setup()
}

export const draw = () => {
    p.background(EasingLerp(constants.white / 5, constants.black, beat.fromTime(audio.time()) % 1, Easing.Linear))

    camera.update()

    p.translate(constants.width / 2, constants.height / 2)
    p.translate(camera.x * camera.scale, camera.y * camera.scale)
    p.scale(camera.scale)

    p.push()
    p.textSize(24)
    p.textAlign(p.CENTER, p.CENTER)
    p.fill(constants.white)
    p.textFont(text.sansFont)
    p.text(beat.fromTime(audio.time()).toFixed(2), -camera.x, -camera.y + 50 * camera.scale + 10 * (beat.fromTime(audio.time()) % 1))
    p.pop()

    const items = data.items.filter((item) => {
        return (
            item.x > camera.minX &&
            item.x < camera.maxX &&
            item.y > camera.minY &&
            item.y < camera.maxY
        )
    })

    items.forEach((item) => components.drawKashiBox(item))
    items.forEach((item) => components.drawHeadKashiBox(item))
    items.forEach((item) => components.drawConnection(item))
    items.forEach((item) => components.drawConnectionBox(item))
    items.forEach((item) => components.drawHeadKanaBox(item))
}