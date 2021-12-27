import fs from 'fs';

let buffer = fs.readFileSync('./data.txt');
let dataPoints = buffer.toString().split('\n');

const findRating = (points, bitPosition, ratingType) => {
    // Base case
    if (points.length === 1) {
        return points[0];
    }

    const groups = {'0': [], '1': []};
    points.forEach(point => {
       groups[point[bitPosition]].push(point);
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