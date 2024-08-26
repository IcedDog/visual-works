let timenow = new Date().getTime()

export const preload = () => {

}

export const setup = () => {
    timenow = new Date().getTime()
}

export const draw = () => {
    p.background(25)
    p.rect(p.mouseX, p.mouseY, 100, 100)
    p.textSize(32)
    p.fill(255)
    p.text(`Time since setup: ${(new Date().getTime() - timenow) / 1000} seconds`, 10, 30)
}