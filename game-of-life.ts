
const LIVE = 1;
const DEAD = 0;

interface GameBoard {
    board: number[][];
    width: number;
    height: number;
}

export const init = (width: number, height: number, random: boolean) : GameBoard => {
    const board: number[][] = [];
    let initFunction : ()=> number;
    if (random) {
        initFunction = () => {
            return Math.floor(Math.random() * 2);
        }
    } else {
        initFunction = () => 0;
    }
    for (let i=0; i < height; i++) {
        board[i] = [];
        for (let j=0; j < width; j++) {
            board[i][j] = initFunction();
        }
    }
    return {board, width, height};
}

export const step = (game : GameBoard): GameBoard => {
    const newBoard: number[][] = [];
    const {board, width, height} = game;
    const getCell = (h, w) => {
        return board[(h + height) % height][(w + width) % width];
    }
    const applyRules = (h, w) => {
        const count = getCell(h - 1, w - 1) + getCell(h, w - 1) + getCell(h + 1, w - 1) +
            getCell(h - 1, w) + getCell(h + 1, w) +
            getCell(h - 1, w + 1) + getCell(h, w + 1) + getCell(h + 1, w + 1);
        const currentCell = board[h][w];
        if (currentCell === DEAD && count === 3) {
            return LIVE;
        } else if (currentCell === LIVE && count < 2) {
            return DEAD;
        } else if (currentCell === LIVE && (count === 2 || count === 3)) {
            return LIVE;
        } else if (currentCell === LIVE && count > 3) {
            return DEAD;
        }
        return DEAD;
    }
    for (let i=0; i < height; i++) {
        newBoard[i] = [];
        for (let j=0; j < width; j++) {
            newBoard[i][j] = applyRules(i, j);
        }
    }
    return {...game, board: newBoard};
}

