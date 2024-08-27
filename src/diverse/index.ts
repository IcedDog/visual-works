class RectPos {
    x: number
    y: number
    w: number
    h: number
    place: boolean[]

    constructor(x: number, y: number, w: number, h: number) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.place = [false, false, false, false]
    }
}

let rectPos = new Array<RectPos>();
let seeder = Math.random() * 1000;
const probablity = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

function divideRect(x: number, y: number, w: number, h: number, num: number) {
    if (num > 6) {
        rectPos.push(new RectPos(x, y, w, h));
        return;
    }

    if (p.random() < probablity[3] && num > 1) {
        rectPos.push(new RectPos(x, y, w, h));
        return;
    }
    else {
        divideRect(x, y, w / 2, h / 2, num + 1);
        divideRect(x + w / 2, y, w / 2, h / 2, num + 1);
        divideRect(x, y + h / 2, w / 2, h / 2, num + 1);
        divideRect(x + w / 2, y + h / 2, w / 2, h / 2, num + 1);
    }
}

export const preload = () => {

}

export const setup = () => {
    p.randomSeed(seeder);
    seeder = Math.random() * 1000
    rectPos = []
    divideRect((p.width - p.height) / 2, 0, p.height, p.height, 0)
}

export const draw = () => {
    p.clear()
    p.randomSeed(seeder);
    rectPos.forEach(pos => {
        const type = p.random([exclaim, CCC, aperture, diverse, square])
        p.push()
        if (p.random() < 0.1) {
            if (p.random() < 0.2) {
                p.fill(255)
                p.noStroke()
                p.rectMode(p.CENTER)
                p.rect(pos.x + pos.w / 2, pos.y + pos.h / 2, pos.w * 0.95, pos.h * 0.95)

                p.erase()
                type(pos)
                p.noErase()
            }
            else {
                type(pos)
            }
        }
        p.pop()
    })
}

function exclaim(r: RectPos) {
    p.noFill()
    p.stroke(255)
    p.strokeWeight(r.w / 10)
    p.circle(r.x + r.w / 2, r.y + r.h / 2, r.w * 0.8)

    p.noStroke()
    p.fill(255)
    p.beginShape()
    p.vertex(r.x + r.w / 2 - r.w * 0.07, r.y + r.h / 2 - r.h * 0.25)
    p.vertex(r.x + r.w / 2 + r.w * 0.07, r.y + r.h / 2 - r.h * 0.25)
    p.vertex(r.x + r.w / 2 + r.w * 0.05, r.y + r.h / 2 + r.h * 0.1)
    p.vertex(r.x + r.w / 2 - r.w * 0.05, r.y + r.h / 2 + r.h * 0.1)
    p.endShape(p.CLOSE)

    p.rectMode(p.CENTER)
    p.rect(r.x + r.w / 2, r.y + r.h / 2 + r.h * 0.2, r.w * 0.11, r.w * 0.11)
}

function CCC(r: RectPos) {
    p.noFill()
    p.stroke(255)
    p.strokeWeight(r.w / 30)
    p.ellipse(r.x + r.w / 2, r.y + r.h / 2, r.w * 0.8, r.h * 0.6)

    let x1 = r.w / 5.5
    let x2 = r.w / 20
    p.push()
    {
        p.beginClip()
        p.fill(255)
        p.noStroke()
        p.rectMode(p.CENTER)
        p.rect(r.x + r.w / 2 - x1 - x2, r.y + r.h / 2, x1, r.h * 0.6)
        p.endClip()

        p.noFill()
        p.stroke(255)
        p.strokeWeight(r.w / 20)
        p.ellipse(r.x + r.w / 2 - x1 + r.w * 0.15 - x2, r.y + r.h / 2, r.w * 0.4, r.h * 0.35)
    } p.pop()

    p.push()
    {
        p.beginClip()
        p.fill(255)
        p.noStroke()
        p.rectMode(p.CENTER)
        p.rect(r.x + r.w / 2 - x2, r.y + r.h / 2, x1, r.h * 0.6)
        p.endClip()

        p.noFill()
        p.stroke(255)
        p.strokeWeight(r.w / 20)
        p.ellipse(r.x + r.w / 2 + r.w * 0.15 - x2, r.y + r.h / 2, r.w * 0.4, r.h * 0.35)
    } p.pop()

    p.push()
    {
        p.beginClip()
        p.fill(255)
        p.noStroke()
        p.rectMode(p.CENTER)
        p.rect(r.x + r.w / 2 + x1 - x2, r.y + r.h / 2, x1, r.h * 0.6)
        p.endClip()

        p.noFill()
        p.stroke(255)
        p.strokeWeight(r.w / 20)
        p.ellipse(r.x + r.w / 2 + x1 + r.w * 0.15 - x2, r.y + r.h / 2, r.w * 0.4, r.h * 0.35)
    } p.pop()
}
function aperture(r: RectPos) {
    p.noStroke()
    p.fill(255)
    p.circle(r.x + r.w / 2, r.y + r.h / 2, r.w * 0.8)

    p.erase()
    p.noStroke()
    p.fill(255)
    p.circle(r.x + r.w / 2, r.y + r.h / 2, r.w * 0.3)

    p.noFill()
    p.strokeWeight(r.w / 40)
    p.stroke(255)
    const num = 6
    for (let i = 0; i < num; i += 1) {
        p.line(
            r.x + r.w / 2 + r.w * 0.14 * p.cos(p.radians(360 / num * (i - 1))),
            r.y + r.h / 2 + r.w * 0.14 * p.sin(p.radians(360 / num * (i - 1))),
            r.x + r.w / 2 + r.w * 0.40 * p.cos(p.radians(360 / num * i)),
            r.y + r.h / 2 + r.h * 0.41 * p.sin(p.radians(360 / num * i))
        )
    }
    p.noErase()
}
function diverse(r: RectPos) {
    p.noFill()
    p.strokeWeight(r.w / 15)
    p.stroke(255)
    p.strokeCap(p.ROUND)
    const num = 8
    for (let i = 0; i < num; i += 1) {
        p.line(
            r.x + r.w / 2 + r.w * 0.14 * p.cos(p.radians(360 / num * (i - 0.5) - 360 / num * 0.25)),
            r.y + r.h / 2 + r.w * 0.14 * p.sin(p.radians(360 / num * (i - 0.5) - 360 / num * 0.25)),
            r.x + r.w / 2 + r.w * 0.41 * p.cos(p.radians(360 / num * i - 360 / num * 0.25)),
            r.y + r.h / 2 + r.h * 0.41 * p.sin(p.radians(360 / num * i - 360 / num * 0.25))
        )
    }
}
function square(r: RectPos) {
    p.noFill()
    p.stroke(255)
    p.strokeWeight(r.w / 50)
    p.rectMode(p.CENTER)
    p.rect(r.x + r.w / 2, r.y + r.h / 2, r.w * 0.8, r.h * 0.8)
    p.line(r.x + r.w / 2 - r.w * 0.4, r.y + r.h / 2 - r.h * 0.4, r.x + r.w / 2 + r.w * 0.4, r.y + r.h / 2 + r.h * 0.4)
    p.line(r.x + r.w / 2 - r.w * 0.4, r.y + r.h / 2 + r.h * 0.4, r.x + r.w / 2 + r.w * 0.4, r.y + r.h / 2 - r.h * 0.4)
}