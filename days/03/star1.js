import fs from 'fs';

let buffer = fs.readFileSync('./data.txt');
let dataPoints = buffer.toString().split('\n');

let oneBitCounts = [...dataPoints[0]].map(_ => 0);
dataPoints.forEach((point) => {
    [...point].forEach((char, idx) => {
        if (char === '1') {
            oneBitCounts[idx] += 1;
        }
    });
});

let gammaRate = '', epsilonRate = '';

oneBitCounts.forEach((count, idx) => {
   if (count > dataPoints.length / 2) {
       gammaRate += '1';
       epsilonRate += '0';
   } else {
       gammaRate += '0';
       epsilonRate += '1';
   }
});

console.log(parseInt(gammaRate, 2) * parseInt(epsilonRate, 2));