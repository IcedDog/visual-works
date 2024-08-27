import type p5 from "p5"
import "p5/lib/addons/p5.sound"

let audio: p5.SoundFile

let timenow = new Date().getTime()

const playOrPause = () => {
    if (audio.isPlaying()) {
        audio.pause()
    } else {
        audio.play()
    }
}

export const preload = () => {
    audio = p.loadSound("song.ogg")
}

export const setup = () => {
    timenow = new Date().getTime()

    document.addEventListener('keydown', (e) => {
        if (e.key === ' ') {
            playOrPause()
        } else if (e.key === 'ArrowLeft') {
            audio.jump(audio.currentTime() - 2)
        } else if (e.key === 'ArrowRight') {
            audio.jump(audio.currentTime() + 2)
        }
    })
}

export const draw = () => {
    p.background(25)
    p.fill(255, 255, 0)
    p.rect(p.mouseX, p.mouseY, 100, 100)
    p.textSize(32)
    p.fill(255)
    p.textAlign(p.RIGHT)
    p.text(`Time since setup: ${(new Date().getTime() - timenow) / 1000} seconds`, 700, 300)
}