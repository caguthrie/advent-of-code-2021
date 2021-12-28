import fs from 'fs';

let buffer = fs.readFileSync('./data.txt');
let lines = buffer.toString().split('\n');

const numbersCalled = (lines.shift() as string).split(',').map(n => parseInt(n));
lines.shift();

const boards: number[][][] = [];
let boardsWon: number[][][] = [];
let previousBoardsWon: number[][][] = [];

while (lines.length >= 5) {
    const newBoard: number[][] = [];
    newBoard.push((lines.shift() as string).split(/  */).map(n => parseInt(n)).filter(n => !isNaN(n)));
    newBoard.push((lines.shift() as string).split(/  */).map(n => parseInt(n)).filter(n => !isNaN(n)));
    newBoard.push((lines.shift() as string).split(/  */).map(n => parseInt(n)).filter(n => !isNaN(n)));
    newBoard.push((lines.shift() as string).split(/  */).map(n => parseInt(n)).filter(n => !isNaN(n)));
    newBoard.push((lines.shift() as string).split(/  */).map(n => parseInt(n)).filter(n => !isNaN(n)));
    lines.shift();
    boards.push(newBoard);
}

let numbersCalledAttempt: number[] = [];
for (let idx=0; idx<numbersCalled.length; idx++) {
    previousBoardsWon = boardsWon;
    boardsWon = [];
    numbersCalledAttempt = numbersCalled.slice(0, idx);
    for (let board of boards) {
        // check rows
        const rowWin = board.find(row => row.every(num => numbersCalledAttempt.includes(num)));

        if (rowWin) {
            boardsWon.push(board);
            continue;
        }

        // check columns
        let columnWin: boolean = true;
        for (let i=0; i<5; i++) {
            columnWin = true;
            for (let j=0; j<5; j++) {
                columnWin = columnWin && numbersCalledAttempt.includes(board[j][i]);
            }
            if (columnWin) {
                boardsWon.push(board);
                break;
            }
        }
    }
    if (boards.length === boardsWon.length) {
        break;
    }
}

const lastWinningBoard = boardsWon.find(b => !previousBoardsWon.includes(b));
if (!lastWinningBoard) {
    throw 'no solution found!';
}
let sum: number = 0;
for (let i=0; i<5; i++) {
    for (let j=0; j<5; j++) {
        if (!numbersCalledAttempt.includes(lastWinningBoard[j][i])){
            sum += lastWinningBoard[j][i];
        }
    }
}
console.log(sum * numbersCalledAttempt[numbersCalledAttempt.length - 1]);