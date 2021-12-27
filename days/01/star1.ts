import fs from 'fs';

let buffer = fs.readFileSync('./data.txt');
const dataPoints = buffer.toString().split('\n');

let count = 0;
let last: number | null = null;
dataPoints.map(point => parseInt(point)).forEach((point) => {
    if (last !== null && point > last) {
        count++;
    }
    last = point;
});

console.log(count)