import GameInfo from "./gameInfo.js";

export default class Control {
    constructor(gameBoard, visual) {
        this.gameBoard = gameBoard;
        this.gameBoard.observe(this);
        this.visual = visual;
        this.info = new GameInfo(gameBoard);
        this.intervalId = this.startInterval();

        document.addEventListener('keydown', this.controlKeyDown.bind(this));
        this.visual.draw(gameBoard.getGameBoardState());
    }

    startInterval() {
        return setInterval(() => {
            this.gameBoard.placeTetraminoDown();
            this.updateAllGame();
            }, Math.max(1000 - (this.gameBoard.level - 1) * 250, 150))
    }

    updateInterval() {
        clearInterval(this.intervalId);
        this.startInterval();
    }

    updateAllGame() {
        this.visual.draw(this.gameBoard.getGameBoardState());
        this.info.updateInfo();
    }

    controlKeyDown(press) {
        switch (press.keyCode) {
            case 32:
                this.gameBoard.placeTetraminoDown();
                this.updateAllGame();
                break;
            case 37:
                this.gameBoard.placeTetraminoLeft();
                this.updateAllGame();
                break;
            case 38:
                this.gameBoard.rotateTetramino();
                this.updateAllGame();
                break;
            case 39:
                this.gameBoard.placeTetraminoRight();
                this.updateAllGame();
                break;
            case 40:
                this.gameBoard.placeTetraminoDown();
                this.updateAllGame();
                break;
        }
    }
}