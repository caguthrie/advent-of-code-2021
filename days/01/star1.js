import fs from 'fs';

let buffer = fs.readFileSync('./data.txt');
const dataPoints = buffer.toString().split('\n');

let count = 0;
let last = null;
dataPoints.map(point => parseInt(point)).forEach((point, idx) => {
    if (last !== null && point > last) {
        count++;
    }
    last = point;
});

console.log(count)