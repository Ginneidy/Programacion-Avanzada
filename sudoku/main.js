
const initialBoard = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [4, 5, 6, 7, 8, 9, 1, 2, 3],
    [7, 8, 9, 1, 2, 3, 4, 5, 6],
    [2, 3, 4, 5, 6, 7, 8, 9, 1],
    [5, 6, 7, 8, 9, 1, 2, 3, 4],
    [8, 9, 1, 2, 3, 4, 5, 6, 7],
    [3, 4, 5, 6, 7, 8, 9, 1, 2],
    [6, 7, 8, 9, 1, 2, 3, 4, 5],
    [9, 1, 2, 3, 4, 5, 6, 7, 8],
];

const clearNumbers = (array) => array.map(fila =>
    fila.map(numero => Math.random() < 0.5 ? 0 : numero)
)

function setBoard(array) {
    let c = 0 
    setblocks(array, 0, 3, 0, 3, 1)
    setblocks(array, 0, 3, 3, 6, 2)
    setblocks(array, 0, 3, 6, 9, 3)
    setblocks(array, 3, 6, 0, 3, 4)
    setblocks(array, 3, 6, 3, 6, 5)
    setblocks(array, 3, 6, 6, 9, 6)
    setblocks(array, 6, 9, 0, 3, 7)
    setblocks(array, 6, 9, 3, 6, 8)
    setblocks(array, 6, 9, 6, 9, 9)

}
function setblocks(array, start, end, start2, end2, n) {
    const div = document.getElementById("block" + n);
    console.log(div)
    for (let i = start; i < end; i++) {
        for (let j = start2; j < end2; j++) {
            if (array[i][j] == 0) {
                div.innerHTML += ('<input type="number"  min="1" max="9" id="cel' + c + '"  >');
            } else {
                div.innerHTML += ('<input type="number" id="cel' + c + ' "placeholder =' + array[i][j] + ' " readonly = "readonly" >');
            }
            c++
        }
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomice(min, max) {
    do {
        n1 = getRandomInt(min, max)
        n2 = getRandomInt(min, max)
        n3 = getRandomInt(min, max)
    } while (n1 == n2 || n1 == n3 || n2 == n3);
    return [n1, n2, n3]
}

function createBoard() {

    const box1 = randomice(0, 2) //2,1,0
    const box2 = randomice(3, 5)
    const box3 = randomice(6, 8)

    const board = [
        initialBoard[box1[0]], 
        initialBoard[box1[1]],
        initialBoard[box1[2]],
        initialBoard[box2[0]],
        initialBoard[box2[1]],
        initialBoard[box2[2]],
        initialBoard[box3[0]],
        initialBoard[box3[1]],
        initialBoard[box3[2]],
    ]
    console.log(board)
    const newBoard = clearNumbers(board)
    console.log(newBoard)
    setBoard(newBoard)

}


createBoard()
