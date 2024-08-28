import p5 from 'p5'
import "p5/lib/addons/p5.sound"
import { pausing } from './main'

export let audio: p5.SoundFile | undefined = undefined

export function loadAudio(path: string | undefined | null) {
    if (typeof path === 'undefined' || path === null) return
    audio = p.loadSound(path)
}

export const time = () => { if (typeof audio !== 'undefined') return audio.currentTime(); else return 0 }

document.addEventListener('keydown', (e) => {
    if (typeof audio !== 'undefined' && !pausing)
        if (e.key === ' ') {
            playOrPause()
        } else if (e.key === 'ArrowLeft') {
            audio.jump(audio.currentTime() - 2)
        } else if (e.key === 'ArrowRight') {
            audio.jump(audio.currentTime() + 2)
        }
})
// TODO: 後でもっとコントロールを追加する

const playOrPause = () => {
    if (typeof audio !== 'undefined')
        if (audio.isPlaying()) {
            audio.pause()
        } else {
            audio.play()
        }
}

export function stop() {
    if (typeof audio !== 'undefined') audio.stop()
}

export function play() {
    if (typeof audio !== 'undefined') audio.play()
}

export function pause() {
    if (typeof audio !== 'undefined') audio.pause()
}

export function dispose() {
    audio = undefined
}