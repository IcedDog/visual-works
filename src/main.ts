import { sketches } from "./index.ts"
import "./global.d.ts"

let overlay: HTMLButtonElement
let overlayPauseBtn: HTMLButtonElement
let overlayReloadBtn: HTMLButtonElement
let dialog: HTMLDivElement
let restartBtn: HTMLButtonElement
let closeBtn: HTMLButtonElement
let selectBtn: HTMLButtonElement[]

let currentSketch: any

window.onload = () => {
  // @ts-ignore
  new p5((p) => {
    // @ts-ignore
    window.p = p
  })
  canvasSetup(() => { }, () => { }, () => { })

  overlay = <HTMLButtonElement>document.getElementById("pause-overlay")
  dialog = <HTMLDivElement>document.getElementById("files-card")
  restartBtn = <HTMLButtonElement>document.getElementById("restart-button")
  closeBtn = <HTMLButtonElement>document.getElementById("close-button")
  overlayPauseBtn = <HTMLButtonElement>document.getElementById("pause-button")
  overlayReloadBtn = <HTMLButtonElement>document.getElementById("reload-button")

  overlay.addEventListener("mouseover", () => { if (!dialog.style.visibility) showPauseButton() })
  overlay.addEventListener("mouseout", () => { hidePauseButton() })
  restartBtn.addEventListener("click", () => { loadNewSketch(); hideDialog() })
  overlayReloadBtn.addEventListener("click", () => { loadNewSketch() })
  closeBtn.addEventListener("click", () => { hideDialog() })
  overlayPauseBtn.addEventListener("click", () => { showDialog() })

  const table = <HTMLTableElement>document.getElementById("files-table")
  selectBtn = []
  for (let i = 0; i < sketches.length; i++) {
    const row = table.insertRow()
    row.classList.add("bg-neutral")
    const cell1 = row.insertCell()
    const cell2 = row.insertCell()
    const cell3 = row.insertCell()
    cell1.innerHTML = sketches[i].name
    cell2.innerHTML = sketches[i].description
    const btn = document.createElement("button")
    btn.innerHTML = "Go"
    btn.classList.add("btn", "btn-outline", "btn-primary", "btn-xs")
    btn.addEventListener("click", () => {
      hideDialog()
      currentSketch = sketches[i]
      loadNewSketch()
    })
    cell3.appendChild(btn)
    selectBtn.push(btn)
  }

  hidePauseButton()
}

function showDialog() {
  if (p.isLooping()) p.noLoop()
  dialog.style.opacity = "1"
  dialog.style.pointerEvents = "auto"
}

function hideDialog() {
  if (!p.isLooping()) p.loop()
  dialog.style.opacity = "0"
  dialog.style.pointerEvents = "none"
}

function showPauseButton() {
  overlay.style.opacity = "1"
}

function hidePauseButton() {
  overlay.style.opacity = "0"
}

function loadNewSketch() {
  canvasSetup(
    currentSketch.object.preload,
    currentSketch.object.setup,
    currentSketch.object.draw,
    currentSketch.options || {
      "width": 1920,
      "height": 1080,
      "fps": 60,
      "size": 1,
      "pixelDensity": window.devicePixelRatio
    }
  )
}

function canvasSetup(
  preloadFunction: Function,
  setupFunction: Function,
  drawFunction: Function,
  options: any = {
    "width": 1920,
    "height": 1080,
    "fps": 60,
    "size": 1,
    "pixelDensity": window.devicePixelRatio
  }
) {
  try { document.querySelector("canvas")?.remove() } catch (e: any) {
    try { p.remove() } catch (e: any) { }
  }
  p.preload = () => { preloadFunction() }
  p.draw = () => { drawFunction() }
  p.setup = () => {
    p.createCanvas(options.width, options.height)
    p.pixelDensity(options.pixelDensity)
    p.frameRate(options.fps)
    p.pop()
    p.push()
    p.clear()
    p.resetShader()
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
  p.preload()
  p.setup()
  p.windowResized()
}