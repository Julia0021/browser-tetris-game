export default class GameInfo {

    constructor(gameBoard) {
        this.gameBoard = gameBoard;
        this.setPlayer();
        this.updateInfo();
    }

    setPlayer() {
        let elem = document.getElementById('playerId');
        elem.textContent = "Игрок: " + localStorage.getItem('tetris.username');
    }

    updateInfo() {
        let levelInfo = document.getElementById('levelId');
        levelInfo.textContent = "Уровень: " + this.gameBoard.level;
        let linesInfo = document.getElementById('lineId');
        linesInfo.textContent = "Линии: " + this.gameBoard.deletedLines;
        let scoreInfo = document.getElementById('scoreId');
        scoreInfo.textContent = "Очки: " + this.gameBoard.score;
    }
}