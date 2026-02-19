import GameBoard from "./gameBoard.js";
import Visualization from "./visualization.js";
import Control from "./control.js";


const canvasNextTetramino = document.getElementById('nextTetramino');
const ctxNextTetramino = canvasNextTetramino.getContext('2d');

const canvasGameBoard = document.getElementById('gameBoard');
const ctxGameBoard = canvasGameBoard.getContext('2d');

const gameBoard = new GameBoard();
const visual = new Visualization(ctxGameBoard, ctxNextTetramino);
new Control(gameBoard, visual);