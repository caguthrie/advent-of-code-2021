import fs from 'fs';

let buffer = fs.readFileSync('./data.txt');
let lines = buffer.toString().split('\n');
const map: number[][] = [];
lines.forEach(line => {
    const [p1, p2] = line.split(' -> ');
    const [x1, y1] = p1.split(',').map(p => parseInt(p));
    const [x2, y2] = p2.split(',').map(p => parseInt(p));

    if (x1 === x2) {
        const sortedY1 = y1 > y2 ? y2 : y1;
        const sortedY2 = y1 > y2 ? y1 : y2;
        if (!map[x1]) {
            map[x1] = [];
        }
        for (let i = sortedY1; i<=sortedY2; i++){
            if (map[x1][i]) {
                map[x1][i]++
            } else {
                map[x1][i] = 1;
            }
        }
    } else if (y1 === y2) {
        const sortedX1 = x1 > x2 ? x2 : x1;
        const sortedX2 = x1 > x2 ? x1 : x2;
        for (let i = sortedX1; i<=sortedX2; i++){
            if (!map[i]) {
                map[i] = [];
            }
            if (map[i][y1]) {
                map[i][y1]++
            } else {
                map[i][y1] = 1;
            }
        }
    } else {
        // TODO do something with diagonals
    }
})

let count = 0;
for( let i=0; i<map.length; i++) {
    if (map[i]) {
        for( let j=0; j<map[i].length; j++) {
            if (map[i][j] > 1) {
                count++;
            }
        }
    }
}
console.log(count);