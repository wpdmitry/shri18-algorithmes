const {abc, roads} = require('./data');
const Suggest1 = require('./suggest1');
const Suggest2 = require('./suggest2');

const suggest1 = new Suggest1({
    maxSuggest: 10,
    roads,
});

// сперва отсортируем
suggest1.transformData();

// теперь можно и поискать
const result1 = suggest1.suggest('тверская');
console.log(result1);




// const suggest2 = new Suggest2({
//     maxSuggest: 10,
//     abc,
//     roads,
// });
//
// // Расчитаем центры кластеров
// suggest2.calculate();
//
// // теперь можно и поискать
// const result2 = suggest2.suggest('тверская');
// console.log(result2);
