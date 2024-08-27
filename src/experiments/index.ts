let r: number, tx: number, ty: number, width: number, height: number
let angle: number = 0

export const preload = () => {

}

export const setup = () => {
    p.textAlign(p.CENTER, p.CENTER)

    width = p.width
    height = p.height
    r = p.min(width, height) * 0.3
    tx = width / 2 + p.min(width, height) * 0.9 - p.min(width, height) / 2
    ty = height / 2 + p.min(width, height) * 0.9 - p.min(width, height) / 2
}

export const draw = () => {
    p.clear();

    const x = width / 2 + p.cos(angle) * r;
    const y = height / 2 + p.sin(angle) * r;

    p.stroke(100);
    p.noFill();
    p.line(x, y, tx, y);
    p.line(x, y, x, ty);
    p.line(tx, height / 2 - r, tx, height / 2 + r);
    p.line(width / 2 - r, ty, width / 2 + r, ty);

    p.stroke(240);
    p.noFill();
    p.circle(width / 2, height / 2, r * 2);

    p.stroke(240);
    p.fill("#292a33");
    p.circle(x, y, 10);
    p.circle(tx, y, 10);
    p.circle(x, ty, 10);

    p.noStroke();
    p.fill(240);
    p.text("cosθ", width / 2 - r - 20, ty);
    p.text("sinθ", tx, height / 2 - r - 15);
    p.text(-1, width / 2 - r, ty + 15);
    p.text(1, width / 2 + r, ty + 15);
    p.text(-1, tx + 15, height / 2 - r);
    p.text(1, tx + 15, height / 2 + r);

    angle += 0.02;
}