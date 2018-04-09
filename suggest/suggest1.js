class Suggest1 {
    constructor({maxSuggest, roads}) {
        this.maxSuggest = maxSuggest;
        this.roads = roads;
    }

    // Сортирует улицы по алфавиту
    transformData() {
        this.roads = this.roads
            .map(road => {
                const newRoad = road.toLowerCase().replace(/\s/g, '');

                return {
                    old: road,
                    new: newRoad,
                }
            })
            .sort(({new: r1}, {new: r2}) => {
                for (let i = 0; i < r1.length; i++) {
                    if (r1[i] < r2[i]) {
                        return -1;
                    } else if (r1[i] > r2[i]) {
                        return 1;
                    }
                }

                return 0;
            });
    }

    suggest(_input) {
        if (_input.length === 0) {
            return [];
        }

        const input = _input.toLowerCase().replace(/\s/g, '');
        const inputLength = input.length;
        const listSuggest = [];
        let k = 0;

        let left = 0;
        let right = this.roads.length - 1;
        let middle;

        // бинарный поиск с дополнительным условием останова
        while (left <= right && k < inputLength) {
            middle = Math.floor(0.5 * (left + right));
            const road = this.roads[middle].new;

            if (input[k] < road[k]) {
                right = middle - 1;
                k = 0;
            } else if (input[k] > road[k]) {
                left = middle + 1;
                k = 0;
            } else {
                k += 1;
            }
        }

        // Возвращаем пустой массив, если не удалось ничего найти
        if (k !== inputLength) {
            return [];
        }

        // Если что-то нашли, добавляем это в listSuggest
        listSuggest.push(this.roads[middle].old);


        // Далее идут два цикла поиска вверх и вниз от текущего найденного элемента,
        // т.к. остальные не найденные элементы где-то рядом
        k = middle - 1;
        while(k >= 0 && listSuggest.length < this.maxSuggest) {
            if (this.roads[k].new.indexOf(input) !== -1) {
                listSuggest.push(this.roads[k].old);
                k -= 1;
            } else {
                break;
            }
        }

        k = middle + 1;
        while(k < this.roads.length && listSuggest.length < this.maxSuggest) {
            if (this.roads[k].new.indexOf(input) !== -1) {
                listSuggest.push(this.roads[k].old);
                k += 1;
            } else {
                break;
            }
        }

        return listSuggest;
    }
}

module.exports = Suggest1;
