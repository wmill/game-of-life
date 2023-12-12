import {init, step} from './game-of-life'

describe("step function", () => {
    test("glider", () => {
        const testData = {
            width: 8,
            height: 8,
            board: [
                [0,0,0,0,0,0,0,0],
                [0,0,1,0,0,0,0,0],
                [0,0,0,1,0,0,0,0],
                [0,1,1,1,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],
            ]
        }
        const result = step(testData);
        console.log(JSON.stringify(result.board));
    });
});