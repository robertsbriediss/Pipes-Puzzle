import { getBorderValue } from 'helpers/puzzleSolver/getBorderValue';

export const solvePuzzle = (
    map: string[][],
    solvedMap: string[][],
    solvedRotation: number[][],
    rowCount: number,
    columnCount: number
) => {
    let solvedCellCount = 0;

    map.forEach((row, rowIndex) => row.forEach((cell, cellIndex) => {
        if (solvedMap[rowIndex][cellIndex]) {
            return;
        }

        const getRotationCount = (searchedShape: string, shapeMap: string[]) => {
            let rotationCount = 0;
            let currIndex = -1;
            let searchIndex = -1;

            if (cell === searchedShape) {
                return rotationCount;
            }

            shapeMap.find((shape, index) => {
                if (currIndex === -1 && cell === shape) {
                    currIndex = index;
                }

                if (searchIndex === -1 && searchedShape === shape) {
                    searchIndex = index;
                }

                if (currIndex !== -1 && searchIndex !== -1) {
                    if (currIndex > searchIndex) {
                        rotationCount = (shapeMap.length - currIndex) + searchIndex;

                        return true;
                    }

                    rotationCount = searchIndex - currIndex;

                    return true;
                }

                return false;
            });

            return rotationCount;
        };

        const borderMap = getBorderValue(map, solvedMap, rowIndex, cellIndex, rowCount, columnCount);

        const lShapeMap = ['┗', '┏', '┓', '┛'];
        const lShapePatternMap = [{
            value: '┗',
            patterns: [{ 0: 1, 1: 1 }, { 1: 1, 2: 0 }, { 2: 0, 3: 0 }, { 2: 0, 3: 0 }]
        }, {
            value: '┏',
            patterns: [{ 0: 0, 1: 1 }, { 1: 1, 2: 1 }, { 2: 1, 3: 0 }, { 3: 0, 0: 0 }]
        }, {
            value: '┓',
            patterns: [{ 0: 0, 1: 0 }, { 1: 0, 2: 1 }, { 2: 1, 3: 1 }, { 3: 1, 0: 0 }]
        }, {
            value: '┛',
            patterns: [{ 0: 1, 1: 0 }, { 1: 0, 2: 0 }, { 2: 0, 3: 1 }, { 3: 1, 0: 1 }]
        }];

        const endShapeMap = ['╹', '╺', '╻', '╸'];
        const endShapePatternMap = [{
            value: '╹',
            patterns: [{ 1: 0, 2: 0, 3: 0 }, { 0: 1 }]
        }, {
            value: '╺',
            patterns: [{ 2: 0, 3: 0, 0: 0 }, { 1: 1 }]
        }, {
            value: '╻',
            patterns: [{ 0: 0, 1: 0, 3: 0 }, { 2: 1 }]
        }, {
            value: '╸',
            patterns: [{ 0: 0, 1: 0, 2: 0 }, { 3: 1 }]
        }];

        const tShapeMap = ['┣', '┳', '┫', '┻'];
        const tShapePatternMap = [{
            value: '┣',
            patterns: [
                { 3: 0 },
                { 0: 1, 1: 1, 2: 1 }
            ]
        }, {
            value: '┳',
            patterns: [
                { 0: 0 },
                { 1: 1, 2: 1, 3: 1 }
            ]
        }, {
            value: '┫',
            patterns: [
                { 1: 0 },
                { 0: 1, 2: 1, 3: 1 }
            ]
        }, {
            value: '┻',
            patterns: [
                { 2: 0 },
                { 0: 1, 1: 1, 3: 1 }
            ]
        }];

        const lineShapeMap = ['┃', '━'];
        const lineShapePatternMap = [{
            value: '┃',
            patterns: [{ 0: 1 }, { 1: 0 }, { 2: 1 }, { 3: 0 }]
        }, {
            value: '━',
            patterns: [{ 0: 0 }, { 1: 1 }, { 2: 0 }, { 3: 1 }]
        }];

        const sMap = [
            [lineShapeMap, lineShapePatternMap],
            [tShapeMap, tShapePatternMap],
            [lShapeMap, lShapePatternMap],
            [endShapeMap, endShapePatternMap]
        ];

        sMap.forEach(([shapeMap, shapePatternMap]) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (shapeMap.includes(cell)) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                shapePatternMap.find(({ patterns, value }) => (
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    patterns.find((pattern) => {
                        if (Object.entries(pattern).every(([key, value]) => borderMap[Number(key)] === value)) {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            const rotationCount = getRotationCount(value, shapeMap);

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

                            let cellValue = cell;

                            if (rotationCount > 0) {
                                Array.from(Array(rotationCount)).forEach(() => {
                                    cellValue = rotationMap[cellValue];
                                });

                                solvedRotation[rowIndex][cellIndex] = rotationCount;
                            }

                            solvedMap[rowIndex][cellIndex] = cellValue;
                            solvedCellCount += 1;

                            return true;
                        }

                        return false;
                    })));
            }
        });
    }));

    if (solvedCellCount) {
        solvePuzzle(
            map,
            solvedMap,
            solvedRotation,
            rowCount,
            columnCount
        );
    }
};
