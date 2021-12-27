import fs from 'fs';

let buffer = fs.readFileSync('./data.txt');
let dataPoints = buffer.toString().split('\n');

let x = 0, z = 0, aim = 0;
dataPoints.forEach((point) => {
    const [direction, magnitudeStr] = point.split(' ');
    const magnitude = parseInt(magnitudeStr);
    if (direction === 'forward') {
        x += magnitude;
        z += aim * magnitude;
    } else if (direction === 'up') {
        aim -= magnitude;
    } else if (direction === 'down') {
        aim += magnitude;
    } else {
        throw 'whaaattt';
    }
});

console.log(x * z);