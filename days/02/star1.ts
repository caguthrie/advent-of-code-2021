import fs from 'fs';

let buffer = fs.readFileSync('./data.txt');
let dataPoints = buffer.toString().split('\n');

type Direction = 'forward' | 'up' | 'down';

let x = 0, z = 0;
dataPoints.forEach((point) => {
    const [direction, magnitudeStr] = point.split(' ') as [Direction, string];
    const magnitude = parseInt(magnitudeStr);
    if (direction === 'forward') {
        x += magnitude;
    } else if (direction === 'up') {
        z -= magnitude;
    } else if (direction === 'down') {
        z += magnitude;
    } else {
        throw 'whaaattt';
    }
});

console.log(x * z);