import socket from 'api/socket';
import { PuzzleMap } from 'store/puzzle';
import { solvePuzzle as solvePartialPuzzle } from 'helpers/puzzleSolver/solvePuzzle';

export const solvePuzzle = (map: PuzzleMap, state: { solvedMap: PuzzleMap }) => {
    const rowCount = map.length;
    const columnCount = map[0].length;
    const solvedMap: PuzzleMap = Array.from((Array(rowCount)), () => Array.from(Array(columnCount)));
    const solvedRotation: PuzzleMap<number> = Array.from((Array(rowCount)), () => (
        Array.from(Array(columnCount).fill(0))
    ));

    /**
     * Solve
     */
    const solveCell = (
        coordinates: { x: number, y: number },
        solvingMap: Record<string, number>,
        onSuccessCallBack?: () => void
    ): void => {
        // No need to solve cell if its already solved
        if (solvedMap[coordinates.y]?.[coordinates.x]) {
            return;
        }

        const cell = map[coordinates.y]?.[coordinates.x];

        if (!cell) {
            return;
        }

        const rotationCount = solvingMap[cell];
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
            '┓': '┛',
        };

        if (rotationCount !== undefined) {
            let value = cell;

            if (rotationCount) {
                Array.from(Array(rotationCount)).forEach(() => {
                    // socket.send(`rotate ${ coordinates.x } ${ coordinates.y }`);
                    value = rotationMap[value];
                });
            }

            if (onSuccessCallBack) {
                onSuccessCallBack();
            }

            solvedMap[coordinates.y][coordinates.x] = value;
            solvedRotation[coordinates.y][coordinates.x] = rotationCount;

            return;
        }

        solvedMap[coordinates.y][coordinates.x] = '';
    };

    map.forEach((row, rowIndex) => row.forEach((cell, cellIndex) => {
        // Left border
        if (cellIndex === 0) {
            solveCell(
                { x: 0, y: rowIndex },
                {
                    '━': 1,
                    '┃': 0,

                    '┣': 0,
                    '┳': 3,
                    '┫': 2,
                    '┻': 1
                },
                () => {
                    // Top from cell
                    solveCell(
                        { x: cellIndex, y: rowIndex - 1 },
                        {
                            '╹': 2,
                            '╺': 1,
                            '╻': 0,
                            '╸': 3,

                            '┛': 2,
                            '┗': 1,
                            '┏': 0,
                            '┓': 3,
                        }
                    );

                    // Bottom from cell
                    solveCell(
                        { x: cellIndex, y: rowIndex + 1 },
                        {
                            '╹': 0,
                            '╺': 3,
                            '╻': 2,
                            '╸': 1,

                            '┛': 1,
                            '┗': 0,
                            '┏': 3,
                            '┓': 2,
                        }
                    );
                }
            );
        }

        // Top border
        if (rowIndex === 0) {
            solveCell(
                { x: cellIndex, y: rowIndex },
                {
                    '━': 0,
                    '┃': 1,

                    '┣': 1,
                    '┳': 0,
                    '┫': 3,
                    '┻': 2
                },
                () => {
                    // Left from cell
                    solveCell(
                        { x: cellIndex - 1, y: rowIndex },
                        {
                            '╹': 1,
                            '╺': 0,
                            '╻': 3,
                            '╸': 2,

                            '┛': 2,
                            '┗': 1,
                            '┏': 0,
                            '┓': 3,
                        }
                    );

                    // Right from cell
                    solveCell(
                        { x: cellIndex + 1, y: rowIndex },
                        {
                            '╹': 3,
                            '╺': 2,
                            '╻': 1,
                            '╸': 0,

                            '┛': 3,
                            '┗': 2,
                            '┏': 1,
                            '┓': 0,
                        }
                    );
                }
            );
        }

        // Right border
        if (cellIndex + 1 === row.length) {
            solveCell(
                { x: cellIndex, y: rowIndex },
                {
                    '━': 1,
                    '┃': 0,

                    '┣': 2,
                    '┳': 1,
                    '┫': 0,
                    '┻': 3
                },
                () => {
                    // Top from cell
                    solveCell(
                        { x: cellIndex, y: rowIndex - 1 },
                        {
                            '╹': 2,
                            '╺': 1,
                            '╻': 0,
                            '╸': 3,

                            '┛': 3,
                            '┗': 2,
                            '┏': 1,
                            '┓': 0,
                        }
                    );

                    // Bottom from cell
                    solveCell(
                        { x: cellIndex, y: rowIndex + 1 },
                        {
                            '╹': 0,
                            '╺': 3,
                            '╻': 2,
                            '╸': 1,

                            '┛': 0,
                            '┗': 3,
                            '┏': 2,
                            '┓': 1,
                        }
                    );
                }
            );
        }

        // Bottom border
        if (rowIndex + 1 === map.length) {
            solveCell(
                { x: cellIndex, y: rowIndex },
                {
                    '━': 0,
                    '┃': 1,

                    '┣': 3,
                    '┳': 2,
                    '┫': 1,
                    '┻': 0
                },
                () => {
                    // Left from cell
                    solveCell(
                        { x: cellIndex - 1, y: rowIndex },
                        {
                            '╹': 1,
                            '╺': 0,
                            '╻': 3,
                            '╸': 2,

                            '┛': 1,
                            '┗': 0,
                            '┏': 3,
                            '┓': 2,
                        }
                    );

                    // Right from cell
                    solveCell(
                        { x: cellIndex + 1, y: rowIndex },
                        {
                            '╹': 3,
                            '╺': 2,
                            '╻': 1,
                            '╸': 0,

                            '┛': 0,
                            '┗': 3,
                            '┏': 2,
                            '┓': 1,
                        }
                    );
                }
            );
        }

        if (cell === '╋') {
            // All ╋ are solved always
            solveCell(
                { x: cellIndex, y: rowIndex },
                { '╋': 0 }
            );

            // Top from cell
            solveCell(
                { x: cellIndex, y: rowIndex - 1 },
                {
                    '╹': 2,
                    '╺': 1,
                    '╻': 0,
                    '╸': 3,

                    '━': 1,
                    '┃': 0
                }
            );

            // Bottom from cell
            solveCell(
                { x: cellIndex, y: rowIndex + 1 },
                {
                    '╹': 0,
                    '╺': 3,
                    '╻': 2,
                    '╸': 1,

                    '━': 1,
                    '┃': 0
                }
            );

            // Left from cell
            solveCell(
                { x: cellIndex - 1, y: rowIndex },
                {
                    '╹': 1,
                    '╺': 0,
                    '╻': 3,
                    '╸': 2,

                    '━': 0,
                    '┃': 1
                }
            );

            // Right from cell
            solveCell(
                { x: cellIndex + 1, y: rowIndex },
                {
                    '╹': 3,
                    '╺': 2,
                    '╻': 1,
                    '╸': 0,

                    '━': 0,
                    '┃': 1
                }
            );
        }
    }));

    solvePartialPuzzle(map, solvedMap, solvedRotation, rowCount, columnCount);

    const rotationMapToSend = solvedRotation.reduce((acc, row, rowIndex) => {
        row.forEach((rotationCount, cellIndex) => {
            if (rotationCount) {
                acc += Array.from(Array(rotationCount)).map(() => `${cellIndex} ${rowIndex}\n`).join('');
            }
        });

        return acc;
    }, 'rotate ');

    state.solvedMap = solvedMap;

    socket.send(rotationMapToSend);
    socket.send('map');
};
