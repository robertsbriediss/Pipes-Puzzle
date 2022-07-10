import socket from 'api/socket';
import { PuzzleMap } from 'store/puzzle';
import { stageTwo } from 'helpers/puzzleSolver/stageTwo';
import { stageOne } from 'helpers/puzzleSolver/stageOne';

const getSocketRotate = (solvedRotation: PuzzleMap<number>): string => (
    solvedRotation.reduce((acc, row, rowIndex) => {
        row.forEach((rotationCount, cellIndex) => {
            if (rotationCount) {
                acc += Array.from(Array(rotationCount)).map(() => `${cellIndex} ${rowIndex}\n`).join('');
            }
        });

        return acc;
    }, 'rotate ')
);

export const solvePuzzle = (map: PuzzleMap, state: { solvedMap: PuzzleMap }) => {
    const rowCount = map.length;
    const columnCount = map[0].length;
    const solvedMap: PuzzleMap = Array.from((Array(rowCount)), () => Array.from(Array(columnCount)));
    const solvedRotation: PuzzleMap<number> = Array.from((Array(rowCount)), () => (
        Array.from(Array(columnCount).fill(0))
    ));

    stageOne(map, solvedMap, solvedRotation);
    stageTwo(map, solvedMap, solvedRotation, rowCount, columnCount);

    state.solvedMap = solvedMap;

    socket.send(getSocketRotate(solvedRotation));
    socket.send('map');
};
