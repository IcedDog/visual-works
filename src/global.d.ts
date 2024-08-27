import "p5/lib/addons/p5.sound"
import p5 from "p5"
import Item from "./item"

declare global {
    const p: p5
    const m: p5
}

declare module "p5" {
    interface p5InstanceExtensions {
        beginClip(options?: { invert?: boolean }): void
        endClip(): void
        _updateWindowSize(): void
        get _preloadDone(): boolean
    }
    interface SoundFile {
        jump(time: number): void
        dispose(): void
    }
}