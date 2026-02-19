import {TETRAMINOS, COLORS, columns} from "./constants.js";

export function createTetramino() {
    const tetraminoIndex = Math.floor(Math.random() * 7);
    const tetramino = {};
    tetramino.cells = TETRAMINOS[tetraminoIndex];
    tetramino.color = COLORS[tetraminoIndex + 1];
    tetramino.x = Math.floor((columns - tetramino.cells[0].length) / 2);
    tetramino.y = 0;
    return tetramino;
}