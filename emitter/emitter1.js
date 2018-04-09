const emitter1 = {
    events: {},

    on(event, handler) {
        const e = this.events[event] || (this.events[event] = []);

        e.push(handler);
    },

    off(event, handler) {
        this.events[event] = this.events[event]
            .filter(h => h !== handler);
    },

    emit(event, ...args) {
        this.events[event]
            .forEach(h => h(...args));
    }
};

module.exports = emitter1;
