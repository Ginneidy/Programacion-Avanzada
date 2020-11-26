const dialog = document.getElementById("myDialog")
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
    fila.map(numero => Math.random() < 0.1 ? 0 : numero)
)
const setBoard = (array) => {
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

const setblocks = (array, start, end, start2, end2, n) => {
    const div = document.getElementById("block" + n);
    console.log(div)

    for (let i = start; i < end; i++) {
        for (let j = start2; j < end2; j++) {
            if (array[i][j] == 0) {
                div.innerHTML += ('<input class="editable" type="text" maxlength="1" onkeypress="return check(event,this)" id="cel[' + i + '][' + j + ']" >');

            } else {
                div.innerHTML += ('<input class="noEditable" type="text" id="cel[' + i + '][' + j + ']"placeholder =' + array[i][j] + ' " readonly = "readonly" >');
            }
        }
    }
}

const check = (e, input) => {
    tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 8) {
        return true;
    }
    patron = /[1-9]/;
    tecla_final = String.fromCharCode(tecla);
    if (patron.test(tecla_final) == true) {
        const id = input.id;
        var regex = /(\d+)/g;
        var numbers = id.match(regex);
        copy[numbers[0]][numbers[1]] = parseInt(tecla_final)
        checkBoard(copy)
    }
    return patron.test(tecla_final);
}
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const randomice = (min, max) => {
    do {
        n1 = getRandomInt(min, max)
        n2 = getRandomInt(min, max)
        n3 = getRandomInt(min, max)
    } while (n1 == n2 || n1 == n3 || n2 == n3);
    return [n1, n2, n3]
}

const createBoard = () => {

    const box1 = randomice(0, 2)
    const box2 = randomice(3, 5)
    const box3 = randomice(6, 8)

    board = [
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
    newBoard = clearNumbers(board)
    copy = [[], [], [], [], [], [], [], [], []]
    for (let i = 0; i < newBoard.length; i++) {
        for (let j = 0; j < newBoard.length; j++) {
            copy[i][j] = newBoard[i][j];
        }
    }
    console.log(newBoard)
    setBoard(newBoard)
}

const checkBoard = (array) => {
    var t = false;
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (array[i][j] == board[i][j]) {
                t = true;
            } else {
                t = false;
                break
            }
        }
        if (t == false) {
            break;
        }
    }

    if (t !== false) {
        document.getElementById("forBlur").classList.add('blurContainer');
        dialog.show();
    }
}
const restartGame = () => {
    var respuesta = confirm("¿Desea reiniciar el sudoku?")

    if (respuesta) {
        deleteInputs()
        setBoard(newBoard)
        alert("Sudoku Reiniciado");
    }
}
const deleteInputs = () => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            input = document.getElementById("cel[" + i + "][" + j + "]");
            padre = input.parentNode;
            padre.removeChild(input);
        }
    }
}
const newGame = () =>{
    var respuesta = confirm("¿Esta seguro de iniciar un nuevo juego?")
    if (respuesta) {
        location.reload()
    }
}

const finaliceGame = () =>{
    document.getElementById("forBlur").classList.remove('blurContainer');
    dialog.close()   
}
createBoard()