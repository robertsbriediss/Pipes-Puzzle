import { InitialState as PuzzleStoreState, PuzzleMap } from 'store/puzzle';
import { getNextCell, getPossibility, Possibility } from 'helpers/puzzleSolver/stageThree';
import socket from 'api/socket';

/**
 * Goes through solvedMap and creates a multiple rotation string and sends to socket
 */
const rotateSocketMap = (map: PuzzleMap, solvedMap: PuzzleMap,) => {
    const rotationMap: Record<string, string> = {
        '╹': '╺',
        '╺': '╻',
        '╻': '╸',
        '╸': '╹',

        '━': '┃',
        '┃': '━',

        '┣': '┳',
        '┳': '┫',
        '┫': '┻',
        '┻': '┣',

        '┛': '┗',
        '┗': '┏',
        '┏': '┓',
        '┓': '┛'
    };
    const rotations: string[] = [];

    solvedMap.forEach((row, rowIndex) => row.forEach((shape, columnIndex) => {
        const previousShape = map[rowIndex][columnIndex];

        const findShape = (previousShape: string) => {
            if (previousShape === shape) {
                return;
            }

            rotations.push(`${columnIndex} ${rowIndex}\n`);

            findShape(rotationMap[previousShape]);
        };

        findShape(previousShape);
    }));

    if (rotations.length) {
        socket.send(`rotate ${rotations.join('')}`);
    }
};

/**
 * Solves puzzles one step by getting cell possible rotation and searching for next cell
 */
export const solvePuzzlesOneStep = (
    state: PuzzleStoreState,
    map: PuzzleMap,
    solvedMap: PuzzleMap,
    possibilityMap: Possibility[],
    flowMap: string[],
    cell: string,
    rowIndex: number,
    columnIndex: number,
    rowCount: number,
    columnCount: number,
    isLoop?: boolean,
) => {
    const possibility = getPossibility(
        map,
        solvedMap,
        possibilityMap,
        flowMap,
        cell,
        rowIndex,
        columnIndex,
        rowCount,
        columnCount,
        isLoop
    );

    const nextCell = getNextCell(
        solvedMap,
        flowMap,
        possibility,
        columnCount,
        rowCount
    );

    if (!nextCell) {
        // Check is puzzle solved
        const isPuzzleSolved = !!solvedMap.find(((y) => y.findIndex((x) => !x) !== -1));

        if (isPuzzleSolved) {
            const {
                shape: nextCell,
                solvedMap: previousSolvedMap,
                flowMap: previousFlowMap
            } = possibilityMap.pop() as Possibility;
            const [nextRowIndex, nextColumnIndex, nextShape] = nextCell.split(',');

            flowMap.splice(0, flowMap.length);
            previousFlowMap.forEach((flow) => {
                flowMap.push(flow);
            });

            solvedMap.splice(0, solvedMap.length);
            previousSolvedMap.forEach((solved) => {
                solvedMap.push(solved);
            });

            state.shape = nextShape;
            state.solvedMap = solvedMap;
            state.rowIndex = Number(nextRowIndex);
            state.columnIndex = Number(nextColumnIndex);
            state.flowMap = flowMap;
            state.possibilityMap = possibilityMap;
            state.isLoop = true;
            state.solvingCount += 1;

            return;
        }

        state.isSolving = false;
        console.timeEnd('Solving');

        rotateSocketMap(map, solvedMap);

        return;
    }

    const [nextRowIndex, nextColumnIndex, nextShape] = nextCell.split(',');

    state.shape = nextShape;
    state.solvedMap = solvedMap;
    state.rowIndex = Number(nextRowIndex);
    state.columnIndex = Number(nextColumnIndex);
    state.flowMap = flowMap;
    state.possibilityMap = possibilityMap;
    state.isLoop = false;
    state.solvingCount += 1;
};
