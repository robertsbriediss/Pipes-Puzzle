import { PuzzleMap } from 'store/puzzle';

/**
 * Solve 100% sure straight away cells, like some border cells, '╋' and those cell neighbors
 */
export const stageOne = (
    map: PuzzleMap,
    solvedMap: PuzzleMap,
    solvedRotation: PuzzleMap<number>
) => {
    /**
     * Solve cell by solving map
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
            let shape = cell;

            // Find new shape depending on rotation count
            if (rotationCount) {
                Array.from(Array(rotationCount)).forEach(() => {
                    shape = rotationMap[shape];
                });
            }

            if (onSuccessCallBack) {
                onSuccessCallBack();
            }

            solvedMap[coordinates.y][coordinates.x] = shape;
            solvedRotation[coordinates.y][coordinates.x] = rotationCount;
        }
    };

    // Solve cells by checking cell shape and depending on that rotate 100% sure neighbor cell

    // Solve border cells, '╋' - always solved, and solve neighbor cells
    // Like if cell is '╋', then if on right theres line shape - '┃', then it can only be in '━' position
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
};
