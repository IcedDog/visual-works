import * as audio from '../audio'
import { Beat } from '../utils/timingUtils'


let timenow = new Date().getTime()
let beat = new Beat(120)

export const preload = () => {

}

export const setup = () => {
    timenow = new Date().getTime()
}

export const draw = () => {
    p.background(25)
    p.fill(255, 255, 0)
    p.rect(p.mouseX, p.mouseY, 100, 100)
    p.textSize(32)
    p.fill(255)
    p.textAlign(p.RIGHT)
    p.text(`Time since setup: ${(new Date().getTime() - timenow) / 1000} seconds`, 700, 300)
    p.text(`Time of audio: ${audio.time().toFixed(2)} seconds`, 700, 500)
    p.text(`press space`, 700, 700)

    p.noStroke
    p.fill(255, 255, 255, 255 * (1 - beat.fromTime(audio.time()) % 1))
    p.circle(150, 500, 200)
}