import * as constants from "./constants"
import * as data from "./data"
import * as text from "./text"
import * as components from "./components"
import { camera } from "./camera"

export const preload = () => {
    text.preload()
    data.preload()
}

export const setup = () => {
    data.setup()
}

export const draw = () => {
    p.background(constants.black)

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

    items.forEach((item) => components.drawKashiBox(item))
    items.forEach((item) => components.drawHeadKashiBox(item))
    items.forEach((item) => components.drawConnection(item))
    items.forEach((item) => components.drawConnectionBox(item))
    items.forEach((item) => components.drawHeadKanaBox(item))
}