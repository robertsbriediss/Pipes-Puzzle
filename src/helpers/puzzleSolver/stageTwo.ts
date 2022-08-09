import { getBorderMap } from 'helpers/puzzleSolver/getBorderMap';
import { PuzzleMap } from 'store/puzzle';

/**
 * Get rotation count by going through shape map
 * and getting how many rotations is needed from cell shape to searched shape
 *
 * '╹'  |  '╸'  |  ['╹', '╺', '╻', '╸'] => 3 rotations is needed
 */
export const getRotationCount = (cellShape: string, searchedShape: string, shapeMap: string[]) => {
    let rotationCount = 0;
    let cellIndex = -1;
    let searchIndex = -1;

    // When the same, rotation not needed
    if (cellShape === searchedShape) {
        return rotationCount;
    }

    shapeMap.find((shapeFromMap, index) => {
        // Find cell shape index
        if (cellIndex === -1 && shapeFromMap === cellShape) {
            cellIndex = index;
        }

        // Find searched shape index
        if (searchIndex === -1 && shapeFromMap === searchedShape) {
            searchIndex = index;
        }

        // If cell shape index and searched shape index is found get rotation count
        // When shape is before searched shape that means circle was made
        if (cellIndex !== -1 && searchIndex !== -1) {
            if (cellIndex > searchIndex) {
                rotationCount = (shapeMap.length - cellIndex) + searchIndex;

                return true;
            }

            rotationCount = searchIndex - cellIndex;

            return true;
        }

        return false;
    });

    return rotationCount;
};

/**
 * Solve cells by checking neighbor cells, current cell border values
 */
export const stageTwo = (
    map: PuzzleMap,
    solvedMap: PuzzleMap,
    solvedRotation: PuzzleMap<number>,
    rowCount: number,
    columnCount: number
) => {
    let solvedCellCount = 0;

    map.forEach((row, rowIndex) => row.forEach((cell, cellIndex) => {
        // Skip when cell is already solved
        if (solvedMap[rowIndex][cellIndex]) {
            return;
        }

        const lShapeMap = ['┗', '┏', '┓', '┛'];
        const lShapePatternMap = [{
            shape: '┗',
            borderPatterns: [{ 0: 1, 1: 1 }, { 1: 1, 2: 0 }, { 2: 0, 3: 0 }, { 3: 0, 0: 1 }]
        }, {
            shape: '┏',
            borderPatterns: [{ 0: 0, 1: 1 }, { 1: 1, 2: 1 }, { 2: 1, 3: 0 }, { 3: 0, 0: 0 }]
        }, {
            shape: '┓',
            borderPatterns: [{ 0: 0, 1: 0 }, { 1: 0, 2: 1 }, { 2: 1, 3: 1 }, { 3: 1, 0: 0 }]
        }, {
            shape: '┛',
            borderPatterns: [{ 0: 1, 1: 0 }, { 1: 0, 2: 0 }, { 2: 0, 3: 1 }, { 3: 1, 0: 1 }]
        }];

        const endShapeMap = ['╹', '╺', '╻', '╸'];
        const endShapePatternMap = [{
            shape: '╹',
            borderPatterns: [{ 1: 0, 2: 0, 3: 0 }, { 0: 1 }]
        }, {
            shape: '╺',
            borderPatterns: [{ 2: 0, 3: 0, 0: 0 }, { 1: 1 }]
        }, {
            shape: '╻',
            borderPatterns: [{ 0: 0, 1: 0, 3: 0 }, { 2: 1 }]
        }, {
            shape: '╸',
            borderPatterns: [{ 0: 0, 1: 0, 2: 0 }, { 3: 1 }]
        }];

        const tShapeMap = ['┣', '┳', '┫', '┻'];
        const tShapePatternMap = [{
            shape: '┣',
            borderPatterns: [
                { 3: 0 },
                { 0: 1, 1: 1, 2: 1 }
            ]
        }, {
            shape: '┳',
            borderPatterns: [
                { 0: 0 },
                { 1: 1, 2: 1, 3: 1 }
            ]
        }, {
            shape: '┫',
            borderPatterns: [
                { 1: 0 },
                { 0: 1, 2: 1, 3: 1 }
            ]
        }, {
            shape: '┻',
            borderPatterns: [
                { 2: 0 },
                { 0: 1, 1: 1, 3: 1 }
            ]
        }];

        const lineShapeMap = ['┃', '━'];
        const lineShapePatternMap = [{
            shape: '┃',
            borderPatterns: [{ 0: 1 }, { 1: 0 }, { 2: 1 }, { 3: 0 }]
        }, {
            shape: '━',
            borderPatterns: [{ 0: 0 }, { 1: 1 }, { 2: 0 }, { 3: 1 }]
        }];

        const allShapeConfigs: {
            shapeMap: string[],
            shapePatternMap: { shape: string, borderPatterns: Partial<Record<number, number>>[]
        }[] }[] = [
            { shapeMap: lineShapeMap, shapePatternMap: lineShapePatternMap },
            { shapeMap: tShapeMap, shapePatternMap: tShapePatternMap },
            { shapeMap: lShapeMap, shapePatternMap: lShapePatternMap },
            { shapeMap: endShapeMap, shapePatternMap: endShapePatternMap }
        ];

        // Go through all shape configs and rotate to correct position
        allShapeConfigs.forEach(({ shapeMap, shapePatternMap }) => {
            // Find cell shape configs
            if (shapeMap.includes(cell)) {
                shapePatternMap.find(({ borderPatterns, shape }) => (
                    // Go through all shape border patterns
                    borderPatterns.find((borderPattern) => {
                        const borderMap = getBorderMap(map, solvedMap, rowIndex, cellIndex, rowCount, columnCount);

                        // Check if all cell borders match border pattern
                        if (Object.entries(borderPattern).every(([key, value]) => borderMap[Number(key)] === value)) {
                            const rotationCount = getRotationCount(cell, shape, shapeMap);

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
                    })
                ));
            }
        });
    }));

    if (solvedCellCount) {
        stageTwo(
            map,
            solvedMap,
            solvedRotation,
            rowCount,
            columnCount
        );
    }
};
