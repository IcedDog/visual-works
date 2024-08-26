import * as experiments from './experiments/index';

export const sketches = [
    {
        "name": "Experiments",
        "description": "Collection of experiments",
        "object": experiments
    }
];

export const canvasSetup = async (
    preloadFunction: Function,
    setupFunction: Function,
    drawFunction: Function,
    width: number = 1920,
    height: number = 1080,
    fps: number = 60,
    size: number = 1,
    pixelDensity: number = 1
) => {
    try { document.querySelector("canvas")?.remove() } catch (e: any) {
        try { p.remove() } catch (e: any) { }
    }
    p.preload = () => { preloadFunction() }
    p.draw = () => { drawFunction() }
    p.setup = () => {
        p.createCanvas(width, height)
        p.pixelDensity(pixelDensity)
        p.frameRate(fps)
        setupFunction()
    }
    p.windowResized = () => {
        const canvas = document.querySelector("canvas") as HTMLCanvasElement
        canvas.style.position = "absolute"
        canvas.style.top = "50%"
        canvas.style.left = "50%"
        const scale = Math.min(window.innerWidth / width, window.innerHeight / height) * size
        canvas.style.transform = "translate(-50%, -50%) scale(" + scale + ")"
    }

    p.preload()
    p.setup()
}