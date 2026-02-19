export function redirectToTheEnd(finalScore) {
    saveGameScore(finalScore);
    document.location.href = "./end.html";
}

function saveGameScore(finalScore) {
    let username = localStorage.getItem('tetris.username');
    let allScores = localStorage.getItem('tetris.allScores');
    let scoreTable;
    if (!allScores) {
        scoreTable = {};
    }
    else {
        scoreTable = JSON.parse(localStorage.getItem('tetris.allScores'));
    }
    // Проверяет, нужно ли добавить/обновить рекорд для последнего игрока
    if(!scoreTable[username] || Number(scoreTable[username]) < Number(finalScore)){
        scoreTable[username] = finalScore;
        localStorage.setItem('tetris.score', finalScore);
    }
    else {
        localStorage.setItem('tetris.score', scoreTable[username]);
    }
    localStorage.setItem('tetris.allScores', JSON.stringify(scoreTable));
}