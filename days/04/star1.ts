import fs from 'fs';

let buffer = fs.readFileSync('./data.txt');
let lines = buffer.toString().split('\n');

const numbersCalled = (lines.shift() as string).split(',').map(n => parseInt(n));
lines.shift();

const boards: number[][][] = [];

while (lines.length >= 5) {
    const newBoard: number[][] = [];
    newBoard.push((lines.shift() as string).split(/  */).map(n => parseInt(n)));
    newBoard.push((lines.shift() as string).split(/  */).map(n => parseInt(n)));
    newBoard.push((lines.shift() as string).split(/  */).map(n => parseInt(n)));
    newBoard.push((lines.shift() as string).split(/  */).map(n => parseInt(n)));
    newBoard.push((lines.shift() as string).split(/  */).map(n => parseInt(n)));
    lines.shift();
    boards.push(newBoard);
}

for (let idx=0; idx<numbersCalled.length; idx++) {
    const numbersCalledAttempt = numbersCalled.slice(0, idx);
    for (let board of boards) {
        // check rows
        const rowWin = board.find(row => row.every(num => numbersCalledAttempt.includes(num)));

        // check columns
        let columnWin: boolean = true;
        for (let i=0; i<5; i++) {
            columnWin = true;
            for (let j=0; j<5; j++) {
                columnWin = columnWin && numbersCalledAttempt.includes(board[j][i]);
            }
            if (columnWin) {
                break;
            }
        }
        if (rowWin || columnWin) {
            let sum: number = 0;
            for (let i=0; i<5; i++) {
                for (let j=0; j<5; j++) {
                    if (!numbersCalledAttempt.includes(board[j][i])){
                        sum += board[j][i];
                    }
                }
            }
            // Why introduce a new variable when we can just throw?! :)
            throw sum * numbersCalledAttempt[numbersCalledAttempt.length - 1];
        }
    }
}