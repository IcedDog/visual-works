import * as experiments from './experiments';
import * as another from './another';

export const sketches = [
    {
        "name": "Experiments",
        "description": "Collection of experiments",
        "object": experiments
    },
    {
        "name": "Another",
        "description": "Another sketch",
        "object": another,
        "options": {
            "width": 720,
            "height": 720,
            "fps": 30,
            "size": 0.5,
            "pixelDensity": 2
        }
    }
];

export const canvasSetup = async (
    preloadFunction: Function,
    setupFunction: Function,
    drawFunction: Function,
    options: any = {
        "width": 1920,
        "height": 1080,
        "fps": 60,
        "size": 1,
        "pixelDensity": 1
    }
) => {
    try { document.querySelector("canvas")?.remove() } catch (e: any) {
        try { p.remove() } catch (e: any) { }
    }
    p.preload = () => { preloadFunction() }
    p.draw = () => { drawFunction() }
    p.setup = () => {
        p.createCanvas(options.width, options.height)
        p.pixelDensity(options.pixelDensity)
        p.frameRate(options.fps)
        setupFunction()
    }
    p.windowResized = () => {
        const canvas = document.querySelector("canvas") as HTMLCanvasElement
        canvas.style.position = "absolute"
        canvas.style.top = "50%"
        canvas.style.left = "50%"
        const scale = Math.min(window.innerWidth / options.width, window.innerHeight / options.height) * options.size
        canvas.style.transform = "translate(-50%, -50%) scale(" + scale + ")"
    }

    p.pop()
    p.push()
    p.clear()
    p.resetShader()
    p.preload()
    p.setup()
    p.windowResized()
}