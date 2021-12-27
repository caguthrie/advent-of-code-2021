import fs from 'fs';

let buffer = fs.readFileSync('./data.txt');
let dataPoints = buffer.toString().split('\n').map(point => parseInt(point));

let count = 0;
let last: number | null = null;
dataPoints.forEach((point, idx) => {
    let sum = point;
    if (dataPoints[idx + 1]) {
        sum += dataPoints[idx + 1];
    }
    if (dataPoints[idx + 2]) {
        sum += dataPoints[idx + 2];
    }
    if (last !== null && sum > last) {
        count++;
    }
    last = sum;
});

console.log(count)