function showRecordsTable(){
    let yourScore = document.getElementById('endText');
    yourScore.textContent = "Ваш лучший результат: " + localStorage.getItem('tetris.score');
    let scoreTable = (JSON.parse(localStorage.getItem('tetris.allScores')));
    // Преобразование объекта scoreTable в массив массивов
    scoreTable = Array.from(Object.entries(scoreTable), ([key, value]) => [key, value])
        .sort((first, second) => {
                // если результаты игроков равны, сортирует по именам (в алфавитном порядке)
                if (second[1] === first[1]) {
                    return (first[0] < second[0]) ? -1 : 1
                }
                return second[1] - first[1]
            }
        )
    let scoreTableHtml = document.querySelector('.score-table');
    for (let i = 0; i < scoreTable.length; i++) {
        let line = document.createElement(`h5`);
        line.id = `line${i}`;
        scoreTableHtml.appendChild(line);
        if (scoreTable[i] !== undefined) {
            line.textContent = (i + 1) + ". " + scoreTable[i][0] + " " + scoreTable[i][1];
        }
    }
}
