import {columns, rows, scoreOfDeletedLines} from "./constants.js";
import {redirectToTheEnd} from "./endGame.js";
import {createTetramino} from "./tetramino.js";

export default class GameBoard {
    gameBoard = Array.from({length: rows}, () => Array(columns).fill(0));
    currentTetramino = createTetramino();
    nextTetramino = createTetramino();
    deletedLines = 0;
    score = 0;
    level = 1;
    endGame = false;
    observer = null;

    getGameBoardState() {
        if (!this.endGame){
            // Создаётся глубокая копия игрового поля
            // (используется для построения состояния игрового поля 
            //  с добавленным текущим тетрамино)
            const gameBoardBuffer = structuredClone(this.gameBoard);
            const {y: yCoord, x: xCoord, cells} = this.currentTetramino;
            for (let y = 0; y < cells.length; y++) {
                for (let x = 0; x < cells[y].length; x++) {
                    if (cells[y][x]) {
                        // Добавляется тетрамино 
                        gameBoardBuffer[yCoord + y][xCoord + x] = cells[y][x];
                    }
                }
            }
            return {
                gameBoard: gameBoardBuffer,
                endGame: this.endGame,
                score: this.score,
                nextTetramino: this.nextTetramino,
                currentTetramino: this.currentTetramino
            }
        }
        else {
            redirectToTheEnd(this.score);
        }
    }

    placeTetraminoLeft() {
        this.currentTetramino.x--;
        if (this.hasCrash()) {
            this.currentTetramino.x++;
        }
    }

    placeTetraminoRight() {
        this.currentTetramino.x++;
        if(this.hasCrash()) {
            this.currentTetramino.x--;
        }
    }

    // Поворот тетрамино на 90 градусов по часовой стрелке
    rotateTetramino() {
        let originalCells = this.currentTetramino.cells; 
        // Для каждого элемента первой строки создаётся новый массив,...
        this.currentTetramino.cells = originalCells[0].map((value, index) =>
            // ...состоящий из перевёрнутого столбца с тем же индексом.
            originalCells.map(row => row[index]).reverse());
        if (this.hasCrash()) {
            this.currentTetramino.cells = originalCells;
        }
    }

    placeTetraminoDown() {
        if (this.endGame) {
            return;
        }
        this.currentTetramino.y++;
        if(this.hasCrash()) {
            this.currentTetramino.y--;
            this.fixTetramino(); // Фиксирует тетрамино на поле (добавляет в this.gameBoard)
            const deletedLinesCount = this.deleteLines();
            this.updateScore(deletedLinesCount);
            this.updateTetraminos(); // Создаёт новое тетрамино
        }
        if (this.hasCrash()) {
            this.endGame = true;
        }
    }


    hasCrash() {
        const {x: xCoord, y: yCoord, cells } = this.currentTetramino;
        for (let y = 0; y < cells.length; y++) {
            for (let x = 0; x < cells[y].length; x++) {
                if (
                    cells[y][x] &&
                    (   // Проверка на выход тетрамино за границы поля 
                        // или столкновение с другими блоками
                        (
                            this.gameBoard[yCoord + y] === undefined ||
                            this.gameBoard[yCoord + y][xCoord + x] === undefined
                        ) || this.gameBoard[yCoord + y][xCoord + x]
                    )
                ) {
                    return true;
                }
            }
        }
        return false;
    }

    // Фиксирует тетрамино на поле (добавляет в this.gameBoard)
    fixTetramino() {
        const {x: xCoord, y: yCoord, cells } = this.currentTetramino;
        for (let y = 0; y < cells.length; y++) {
            for (let x = 0; x < cells[y].length; x++) {
                if (cells[y][x]) {
                    this.gameBoard[yCoord + y][xCoord + x] = cells[y][x];
                }
            }
        }
    }

    updateTetraminos() {
        this.currentTetramino = this.nextTetramino;
        this.nextTetramino = createTetramino();
    }

    deleteLines() {
        let totallyFilledLines = [];
        for (let y = rows - 1; y >= 0; y--) {
            let fillCellsCount = 0;
            for (let x = 0; x < columns; x++) {
                if (this.gameBoard[y][x]) {
                    fillCellsCount += 1;
                }
            }
            if (fillCellsCount === 0){
                break;
            }
            else if (fillCellsCount === columns) {
                totallyFilledLines.unshift(y);
            }
        }
        for (let index of totallyFilledLines) {
            this.gameBoard.splice(index,1);    // Удаление строки
            this.gameBoard.unshift(new Array(columns).fill(0));
        }
        return totallyFilledLines.length
    }

    updateScore(deletedLinesCount) {
        if (deletedLinesCount) {
            this.deletedLines += deletedLinesCount;
            switch (deletedLinesCount) {
                case 1:
                    this.score += scoreOfDeletedLines;
                    break;
                case 2:
                    this.score += scoreOfDeletedLines * 3;
                    break;
                case 3:
                    this.score += scoreOfDeletedLines * 5;
                    break;
                case 4:
                    this.score += scoreOfDeletedLines * 8;
                    break;
            }
            const newLevel = Math.floor(this.score / 400) + 1;
            if (newLevel > this.level) {
                this.level = newLevel;
                this.updateInterval();
            }
        }
    }

    observe(obj){
        this.observer = obj;
    }
    updateInterval() {
        this.observer.updateInterval();
    }
}