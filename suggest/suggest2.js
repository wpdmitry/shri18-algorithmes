class Suggest2 {
    constructor({maxSuggest, abc, roads}) {
        this.maxSuggest = maxSuggest;
        this.abc = abc;
        this.roads = roads;

        this.dim = Object.keys(this.abc).length;
        this.numberClusters = Math.floor(this.roads.length / this.maxSuggest) + 1;
        this.roadsVect = null;

        this.vectorize();
        this.initLabels();
        this.initCoordsCenters();
    }

    vectorize() {
        this.roadsVect = this.roads
            .map(road => road.toLowerCase().replace(/[^а-я]/, '').replace(' ', ''))
            .map(road => {
                const vect = this.createVector(0);

                for (let i = 0; i < road.length; i++) {
                    const indexLetter = this.abc[road[i]];

                    vect[indexLetter] += 1;
                }

                return vect;
            });
    }

    initLabels() {
        this.labels = this.createVector(-1);
    }

    initCoordsCenters() {
        this.coordsCenters = [];

        for (let i = 0; i < this.numberClusters; i++) {
            const res = [];

            for(let k = 0; k < this.dim; k++) {
                const r1 = Math.floor(Math.random() * this.roadsVect.length);
                const r2 = Math.floor(Math.random() * this.roadsVect.length);
                const r3 = Math.floor(Math.random() * this.roadsVect.length);

                res.push((this.roadsVect[r1][k] + this.roadsVect[r2][k] + this.roadsVect[r3][k]) / 3);
            }


             this.coordsCenters[i] = res.slice();
        }
    }

    calculateLabels() {
        this.roadsVect.forEach((road, indexRoad) => {
            let dist = Infinity;

            this.coordsCenters.forEach((coord, indexCenter) => {
                let sum = 0;

                for (let k = 0; k < coord.length; k++) {
                    sum += Math.abs(coord[k] - road[k]);
                }

                if (sum < dist) {
                    dist = sum;
                    this.labels[indexRoad] = indexCenter;
                }
            });
        });
    }

    calculateCenters() {
        this.coordsCenters = this.coordsCenters.map((coord, indexCenter) => {
            let center = this.createVector(0);
            let count = 0;

            this.labels.forEach((_, indexLabel) => {
                if (indexLabel === indexCenter) {
                    for (let k = 0; k < this.dim; k++) {
                        center[k] += this.roadsVect[indexLabel][k];
                        count += 1;
                    }
                }
            });

            for (let k = 0; k < this.dim; k++) {
                center[k] /= count;
            }

            return center.slice();
        })
    }

    createVector(value) {
        const res = [];

        for (let i = 0; i < this.dim; i++) {
            res[i] = value;
        }

        return res.slice();
    }

    calculate() {
        for (let i = 0; i < 10; i++) {
            this.calculateLabels();
            this.calculateCenters();
        }
    }

    getCenters() {
        return this.coordsCenters;
    }

    suggest(_input) {
        const input = _input.toLowerCase().replace(/[^а-я]/, '').replace(' ', '');
        const vect = this.createVector(0);

        for (let i = 0; i < input.length; i++) {
            const indexLetter = this.abc[input[i]];

            vect[indexLetter] += 1;
        }

        let dist = Infinity;
        let index;

        this.getCenters().forEach((coords, indexCenter) => {
            let sum = 0;

            for (let i = 0; i < this.dim; i++) {
                sum += Math.abs(coords[i] - vect[i]);
            }

            if (sum < dist) {
                dist = sum;
                index = indexCenter;
            }
        });

        const choosenVect = this.roadsVect
            .filter((road, indexRoad) => this.labels[indexRoad] === index);

        const dists = choosenVect
            .map((cv, index) => {
                let sum = 0;

                for (let i = 0; i < this.dim; i++) {
                    sum += Math.abs(cv[i] - vect[i]);
                }

                return {
                    dist: sum,
                    label: this.labels[index],
                }
            })
            .sort(({dist: d1}, {dist: d2}) => {
                return d2 - d1;
            });

        return dists.map(({label}) => this.roads[label]).slice(0, 10);
    }
}

module.exports = Suggest2;

