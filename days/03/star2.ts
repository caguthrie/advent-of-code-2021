import fs from 'fs';

let buffer = fs.readFileSync('./data.txt');

type Bit = '0' | '1';

let dataPoints: string[] = buffer.toString().split('\n');

const findRating = (points: string[], bitPosition: number, ratingType: 'oxygen' | 'co2'): string => {
    // Base case
    if (points.length === 1) {
        return points[0];
    }

    const groups: {[K in Bit]: string[]} = {'0': [], '1': []};
    points.forEach(point => {
       groups[point[bitPosition] as Bit].push(point);
    });
    if (groups['0'].length > groups['1'].length) {
        return findRating(groups[ratingType === 'oxygen' ? '0' : '1'], bitPosition + 1, ratingType);
    } else {
        return findRating(groups[ratingType === 'oxygen' ? '1' : '0'], bitPosition + 1, ratingType);
    }
};

const oxygenGeneratorRating = findRating(dataPoints, 0, 'oxygen');
const co2ScrubberRating = findRating(dataPoints, 0, 'co2');

console.log(parseInt(oxygenGeneratorRating, 2) * parseInt(co2ScrubberRating, 2));