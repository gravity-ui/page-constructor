export class EventEmitter {
    listeners = {};

    on(event, cb) {
        if (!this.listeners[event]) {
            this.listeners[event] = new Set();
        }

        if (this.listeners[event].has(cb)) {
            throw new Error(`The listener has already added to event "${event}"`);
        }

        this.listeners[event].add(cb);
    }

    off(event, cb) {
        this.listeners[event].delete(cb);
    }

    emit(event, ...data) {
        if (!this.listeners[event]) {
            return;
        }

        this.listeners[event].forEach((cb) => cb(...data));
    }
}
