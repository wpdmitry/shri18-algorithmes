const emitter2 = {
    handlers: {},
    eventNames: {},

    on(event, handler) {
        const handlerId = handler.name;

        // Отказываемся от подписки на событие с анонимной функцией-обработчика
        if (!handlerId) {
            return;
        }

        const h = this.handlers[handlerId] || (this.handlers[handlerId] = {links: 0, func: handler});
        const e = this.eventNames[event] || (this.eventNames[event] = {});

        if (!e.hasOwnProperty(handlerId)) {
            e[handlerId] = h.func;
            h.links += 1;
        }
    },

    off(event, handler) {
        const handlerId = handler.name;
        const h = this.handlers[handlerId];
        const e = this.eventNames[event];

        // Если данного события нет или нет данной функции-обработчика, то ничего не делаем
        if (!e || !e.hasOwnProperty(handlerId)) {
            return;
        }

        delete e[handlerId];
        h.links -= 1;

        // При нулевом количестве ссылок на обработчик удаляем его из handlers
        if (h.links === 0) {
            delete this.handlers[handlerId];
        }

        // Если подписок на данное событие нет, то удаляем его из eventNames
        if (Object.keys(e).length === 0) {
            delete this.eventNames[event];
        }
    },

    emit(event, ...args) {
        Object.values(this.eventNames[event])
            .forEach(func => func(...args));
    },
};

module.exports = emitter2;
