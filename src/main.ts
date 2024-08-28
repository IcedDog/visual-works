import { sketches } from "./index.ts"
import * as audio from "./audio.ts"
import "./global.d.ts"

const overlay = <HTMLButtonElement>document.getElementById("pause-overlay")
const dialog = <HTMLDivElement>document.getElementById("files-card")
const restartBtn = <HTMLButtonElement>document.getElementById("restart-button")
const closeBtn = <HTMLButtonElement>document.getElementById("close-button")
const overlayPauseBtn = <HTMLButtonElement>document.getElementById("pause-button")
const overlayReloadBtn = <HTMLButtonElement>document.getElementById("reload-button")
const cardActions = <HTMLDivElement>document.getElementById("card-actions")
const loader = <HTMLDivElement>document.getElementById("p5_loading")?.cloneNode(true)

let selectBtn: HTMLButtonElement[]
let currentSketch: any = undefined
let preloading = false
export let pausing = false

window.onload = () => {
  canvasSetup(() => { }, () => { }, () => { })

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
    row.classList.add("bg-neutral", "text-neutral-content")
    const cell1 = row.insertCell()
    const cell2 = row.insertCell()
    const cell3 = row.insertCell()
    cell1.innerHTML = sketches[i].name
    cell2.innerHTML = sketches[i].description
    const btn = document.createElement("button")
    btn.innerHTML = "Go"
    btn.classList.add("btn", "btn-outline", "btn-primary", "btn-xs")
    btn.addEventListener("click", () => {
      if (!preloading) {
        currentSketch = sketches[i]
        loadNewSketch()
      }
    })
    btn.blur()
    cell3.appendChild(btn)
    selectBtn.push(btn)
  }

  hidePauseButton()
}

function showDialog() {
  if (p.isLooping()) p.noLoop()
  audio.pause()
  pausing = true
  dialog.style.opacity = "1"
  dialog.style.pointerEvents = "auto"
}

function hideDialog() {
  if (preloading) return;
  if (!p.isLooping()) p.loop()
  audio.play()
  pausing = false
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
  audio.dispose()
  if (typeof currentSketch !== "undefined")
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
  audio.loadAudio(currentSketch.audio)
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

  try { p.remove() } catch (e) { if (typeof currentSketch !== "undefined") console.log(e) }

  // @ts-ignore
  new p5((p) => { window.p = p })

  p.preload = () => { preloadFunction() }
  p.draw = () => { drawFunction() }
  p.setup = () => {
    p.createCanvas(options.width, options.height)
    p.pixelDensity(options.pixelDensity)
    p.frameRate(options.fps)
    setupFunction()
  }
  p.windowResized = () => {
    p._updateWindowSize()
    const canvas = document.querySelector("canvas") as HTMLCanvasElement
    canvas.style.position = "absolute"
    canvas.style.top = "50%"
    canvas.style.left = "50%"
    const scale = Math.min(window.innerWidth / options.width, window.innerHeight / options.height) * options.size
    canvas.style.transform = "translate(-50%, -50%) scale(" + scale + ")"
  }

  p.preload()
  preloading = true
  tryPreload(cardActions.insertBefore(loader, restartBtn))
}

async function tryPreload(node: HTMLDivElement) {
  try {
    p.setup()
    p.windowResized()
    p.draw()
    p.noLoop()
    node.remove()
    hideDialog()
    preloading = false
  } catch (e) {
    console.log(e)
    new Promise(resolve => setTimeout(resolve, 100)).then(() => { tryPreload(node) })
  }
}
