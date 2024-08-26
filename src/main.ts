import "./global.d.ts"
import { canvasSetup, sketches } from "./index.ts"
import { preload } from './experiments/index';

let pauseBtn: HTMLButtonElement
let dialog: HTMLDivElement
let restartBtn: HTMLButtonElement
let closeBtn: HTMLButtonElement
let selectBtn: HTMLButtonElement[]

window.onload = () => {
  // @ts-ignore
  new p5((p) => {
    // @ts-ignore
    window.p = p
  })
  canvasSetup(() => { }, () => { }, () => { })

  pauseBtn = <HTMLButtonElement>document.getElementById("pause-overlay-button")
  dialog = <HTMLDivElement>document.getElementById("files-card")
  restartBtn = <HTMLButtonElement>document.getElementById("restart-button")
  closeBtn = <HTMLButtonElement>document.getElementById("close-button")

  pauseBtn.addEventListener("mouseover", () => { if (!dialog.style.visibility) showPauseButton() })
  pauseBtn.addEventListener("mouseout", () => { hidePauseButton() })
  restartBtn.addEventListener("click", () => { hideDialog(); p.preload(); p.setup(); })
  closeBtn.addEventListener("click", () => { hideDialog() })
  pauseBtn.addEventListener("click", () => { showDialog() })

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
      canvasSetup(sketches[i].object.preload, sketches[i].object.setup, sketches[i].object.draw)
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
  pauseBtn.style.opacity = "1"
}

function hidePauseButton() {
  pauseBtn.style.opacity = "0"
}