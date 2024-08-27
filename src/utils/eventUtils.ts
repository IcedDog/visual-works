export class EventEmitter<T extends Record<string | symbol, (...args: any[]) => void>> {
    private eventMap: Map<keyof T, Array<(...args: any[]) => void>> = new Map();

    on<K extends keyof T>(eventName: K, listener: T[K]) {
        if (!this.eventMap.has(eventName)) {
            this.eventMap.set(eventName, []);
        }
        this.eventMap.get(eventName)?.push(listener);
        return this;
    }

    emit<K extends keyof T>(eventName: K, ...args: Parameters<T[K]>) {
        const listeners = this.eventMap.get(eventName);
        if (!listeners || listeners.length === 0) return false;
        listeners.forEach((listener) => {
            listener(...args);
        });
        return true;
    }

    off<K extends keyof T>(eventName: K, listener: T[K]) {
        const listeners = this.eventMap.get(eventName);
        if (listeners && listeners.length > 0) {
            const index = listeners.indexOf(listener);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        }
        return this;
    }
}

export class EventScheduler<T extends string | number | symbol> {
    private eventMap: Map<T, Array<(...args: any[]) => void>> = new Map();

    set(on: T, listener: (...args: any[]) => void) {
        if (!this.eventMap.has(on)) {
            this.eventMap.set(on, []);
        }
        this.eventMap.get(on)?.push(listener);
        return this;
    }

    run(now: T) {
        const listeners = this.eventMap.get(now);
        if (listeners && listeners.length > 0) {
            listeners.forEach((listener) => {
                listener();
            });
        }
        return true;
    }
}