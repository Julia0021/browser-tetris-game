import {
    COLORS, columns, heightGameBoard, heightNextTetramino,
    cellSizeNextTetramino, rows, widthGameBoard, widthNextTetramino
} from "./constants.js";

export default class Visualization {
    constructor(ctxGameBoard, ctxNextTetramino) {
        this.ctxGameBoard = ctxGameBoard;
        this.ctxNextTetramino = ctxNextTetramino;

        this.widthCellGameBoard = (widthGameBoard) / columns;
        this.heightCellGameboard = (heightGameBoard) / rows;
    }

    draw(state) {
        this.clearGameBoard();
        this.clearNextTetramino();
        this.drawGameBoard(state);
        this.drawNextTetramino(state);
    }

    clearGameBoard() {
        this.ctxGameBoard.clearRect(0, 0, widthGameBoard, heightGameBoard);
    }

    clearNextTetramino() {
        this.ctxNextTetramino.clearRect(0, 0, widthNextTetramino, heightNextTetramino);
    }

    drawGameBoard( { gameBoard }) {
        for (let y = 0; y < rows; y++) {
            const row = gameBoard[y];
            for (let x = 0; x < columns; x++) {
                const cell = row[x];
                this.drawCell(
                    x * this.heightCellGameboard,
                    y * this.widthCellGameBoard,
                    this.widthCellGameBoard,
                    this.heightCellGameboard,
                    COLORS[cell],
                    this.ctxGameBoard
                );
            }
        }
    }

    drawNextTetramino( {nextTetramino} ) {
        for (let y = 0; y < nextTetramino.cells.length; y++) {
            for (let x = 0; x < nextTetramino.cells[y].length; x++) {
                const cell = nextTetramino.cells[y][x];
                if (cell) {
                    this.drawCell(
                        x * cellSizeNextTetramino,
                        y * cellSizeNextTetramino,
                        cellSizeNextTetramino,
                        cellSizeNextTetramino,
                        nextTetramino.color,
                        this.ctxNextTetramino
                    );
                }
            }
        }
    }

    drawCell(x, y, width, height, color, ctx) {
        ctx.fillStyle = color;
        ctx.lineWidth = 2;
        ctx.fillRect(x, y, width, height);
        ctx.strokeRect(x, y, width, height);    // Рисует обводку вокруг клетки
    }
}