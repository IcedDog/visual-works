import * as constants from "./constants"
import * as ease from "./ease"
import * as audio from "../audio"
import Item, { Box } from "./item"

const animation = (item: Item) => {
    p.translate(item.x * constants.size, item.y * constants.size)
    p.translate(constants.size / 2, constants.size / 2)
}
const animationScale = (item: Item) => {
    animationBasicScale(item)
    p.scale(p.lerp(0, 1, ease.Out(item.progressOut, 8)))
}
const animationBasicScale = (item: Item) => {
    animation(item)
    if (audio.time() > 14 && item.x > -9) p.scale(p.lerp(0, 1, ease.Out(p.constrain((14.5 - audio.time()) * 2, 0, 1), 8)))
    else if (audio.time() > 22) p.scale(p.lerp(0, 1, ease.Out(p.constrain((22.5 - audio.time()) * 2, 0, 1), 8)))
}

export const drawBox = (item: Item) => {
    if (item.progressIn < 0) return

    const ratio = constants.ratio ** 2

    p.push()
    {
        animationScale(item)
        p.push()
        {
            p.rectMode(p.CENTER)
            p.fill(constants.white)
            p.rect(0, 0, constants.size * ratio, constants.size * ratio, 3)
        }
        p.pop()

        drawText(item, ratio)

        p.push()
        {
            p.scale(ratio)
            p.stroke(constants.black)
            p.strokeWeight(3)
            p.strokeCap(p.SQUARE)
            for (var j = 0; j < 4; j++) {
                p.rotate(p.HALF_PI)
                p.line(-constants.size / 2, 0, -constants.size / 2 + 2, 0)
            }
        }
        p.pop()

        p.push()
        {
            p.drawingContext.setLineDash([1, 2])
            p.drawingContext.lineDashOffset = -audio.time() * 12
            p.rectMode(p.CENTER)
            p.noFill()
            p.stroke(constants.black)
            p.strokeWeight(1)
            p.rect(0, 0, constants.size * ratio, constants.size * ratio, 3)
            p.drawingContext.setLineDash([])
            p.drawingContext.lineDashOffset = 0
        }
        p.pop()

        p.push()
        {
            p.rectMode(p.CENTER)
            p.beginClip({ invert: true })
            p.rect(0, 0, constants.size, constants.size / 2)
            p.rect(0, 0, constants.size / 2, constants.size)
            p.endClip()
            p.noFill()
            p.stroke(constants.black)
            p.strokeWeight(3)
            p.rect(0, 0, constants.size * ratio, constants.size * ratio, 3)
        }
        p.pop()
    }
    p.pop()
}

const drawText = (item: Item, ratio: number = 1) => {
    p.push()
    p.beginClip()
    p.rectMode(p.CENTER)
    p.rect(0, 0, constants.size * ratio, constants.size * ratio, 12)
    p.endClip()
    p.image(item.wholeImage!, -constants.size * ratio / 2, -constants.size * ratio / 2, constants.size * ratio, constants.size * ratio)
    p.pop()
}

const lerpBox = (thisBox: Box, nextBox: Box, t: number): Box => {
    return {
        x1: p.lerp(thisBox.x1, nextBox.x1, t),
        y1: p.lerp(thisBox.y1, nextBox.y1, t),
        x2: p.lerp(thisBox.x2, nextBox.x2, t),
        y2: p.lerp(thisBox.y2, nextBox.y2, t),
    }
}

const resizeAndCenterBox = (box: Box, nowSize: number, originalSize: number): Box => {
    const center = originalSize / 2
    return {
        x1: (box.x1 - center) * (nowSize / originalSize),
        y1: (box.y1 - center) * (nowSize / originalSize),
        x2: (box.x2 - center) * (nowSize / originalSize),
        y2: (box.y2 - center) * (nowSize / originalSize)
    }
}

export const drawHeadBox = (item: Item) => {
    if (audio.time() < item.time) return
    const ratio = constants.ratio ** 2

    p.push()
    {
        animationScale(item)

        p.drawingContext.setLineDash([1, 2])
        p.drawingContext.lineDashOffset = -audio.time() * 12
        p.rectMode(p.CORNERS)
        p.noFill()
        p.stroke(constants.white / 2)
        p.strokeWeight(1)
        const centeredBox = resizeAndCenterBox(item.selectBox, constants.size, constants.originalSize)
        p.rect(centeredBox.x1 * ratio, centeredBox.y1 * ratio, centeredBox.x2 * ratio, centeredBox.y2 * ratio)
        p.drawingContext.setLineDash([])
        p.drawingContext.lineDashOffset = 0

        const smallLength = 5
        p.noStroke()
        p.fill(constants.white / 2)
        p.rectMode(p.CENTER)
        p.rect(centeredBox.x1 * ratio, centeredBox.y1 * ratio, smallLength, smallLength)
        p.rect(centeredBox.x2 * ratio, centeredBox.y2 * ratio, smallLength, smallLength)
        p.rect(centeredBox.x1 * ratio, centeredBox.y2 * ratio, smallLength, smallLength)
        p.rect(centeredBox.x2 * ratio, centeredBox.y1 * ratio, smallLength, smallLength)
    }
    p.pop()
}

export const drawMovingHeadBox = (item: Item) => {
    if (audio.time() < item.time) return
    if (1 == item.progressOut && 1 == item.progressIn && item.left) return
    const ratio = constants.ratio ** 2


    p.push()
    {
        let centeredBox: Box = resizeAndCenterBox(item.selectBox, constants.size, constants.originalSize)

        if (!item.right) { animationScale(item) }
        else { animationBasicScale(item) }

        if (item.right) {
            const distance = item.x - item.right.x
            p.translate(p.lerp(-constants.size * distance, 0, ease.Out(item.progressOut, 8)), 0)
            centeredBox = lerpBox(
                resizeAndCenterBox(item.right.selectBox, constants.size, constants.originalSize),
                resizeAndCenterBox(item.selectBox, constants.size, constants.originalSize),
                ease.Out(item.progressOut, 8)
            )
        }

        p.drawingContext.setLineDash([1, 2])
        p.drawingContext.lineDashOffset = -audio.time() * 12
        p.rectMode(p.CORNERS)
        p.noFill()
        p.stroke(constants.deepRed)
        p.strokeWeight(1)

        p.rect(centeredBox.x1 * ratio, centeredBox.y1 * ratio, centeredBox.x2 * ratio, centeredBox.y2 * ratio)
        p.drawingContext.setLineDash([])
        p.drawingContext.lineDashOffset = 0

        p.image(item.selectImage!, centeredBox.x1 * ratio, centeredBox.y1 * ratio, (centeredBox.x2 - centeredBox.x1) * ratio, (centeredBox.y2 - centeredBox.y1) * ratio, item.selectBox.x1, item.selectBox.y1, item.selectBox.x2 - item.selectBox.x1, item.selectBox.y2 - item.selectBox.y1)

        const smallLength = 5
        p.noStroke()
        p.fill(constants.deepRed)
        p.rectMode(p.CENTER)
        p.rect(centeredBox.x1 * ratio, centeredBox.y1 * ratio, smallLength, smallLength)
        p.rect(centeredBox.x2 * ratio, centeredBox.y2 * ratio, smallLength, smallLength)
        p.rect(centeredBox.x1 * ratio, centeredBox.y2 * ratio, smallLength, smallLength)
        p.rect(centeredBox.x2 * ratio, centeredBox.y1 * ratio, smallLength, smallLength)
    }
    p.pop()
}