const emitter1 = require('./emitter1');
const emitter2 = require('./emitter2');


const handler = (x) => {
    console.log('x: ', x);
};

const handler2 = (x) => {
    console.log('x2: ', x);
};

// emitter 1
console.log('########## emitter1 ##########\n');

emitter1.on('event', handler);
emitter1.on('event', handler2);
emitter1.on('event2', handler2);
console.log(emitter1.events);

emitter1.emit('event', 1);

emitter1.off('event', handler);
emitter1.off('event', handler2);
emitter1.off('event2', handler2);
console.log(emitter1.events, emitter1.events);


// emitter 2
console.log('\n########## emitter2 ##########\n');

emitter2.on('event', handler);
emitter2.on('event', handler2);
emitter2.on('event2', handler2);
console.log(emitter2.handlers, emitter2.eventNames);

emitter2.emit('event', 1);

emitter2.off('event', handler);
emitter2.off('event', handler2);
emitter2.off('event2', handler2);
console.log(emitter2.handlers, emitter2.eventNames);
