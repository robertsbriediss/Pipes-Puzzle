import { getBorderMap } from 'helpers/puzzleSolver/getBorderMap';
import { PuzzleMap } from 'store/puzzle';

export type Possibility = {
    shape: string,
    solvedMap: PuzzleMap,
    flowMap: string[]
}

const shapeBorderMap: Record<string, number[]> = {
    '╹': [1, 0, 0, 0],
    '╺': [0, 1, 0, 0],
    '╻': [0, 0, 1, 0],
    '╸': [0, 0, 0, 1],

    '┛': [1, 0, 0, 1],
    '┗': [1, 1, 0, 0],
    '┏': [0, 1, 1, 0],
    '┓': [0, 0, 1, 1],

    '┣': [1, 1, 1, 0],
    '┳': [0, 1, 1, 1],
    '┫': [1, 0, 1, 1],
    '┻': [1, 1, 0, 1],

    '━': [0, 1, 0, 1],
    '┃': [1, 0, 1, 0],

    '╋': [1, 1, 1, 1]
};

const shapeGroupsMap = [
    ['╹', '╺', '╻', '╸'],
    ['┛', '┗', '┏', '┓'],
    ['┣', '┳', '┫', '┻'],
    ['━', '┃'],
    ['╋']
];

/**
 * Validates if neighbor cell have possible rotation
*/
const isNeighborInvalid = (
    map: PuzzleMap,
    solvedMap: PuzzleMap,
    rowCount: number,
    columnCount: number,
    rowIndex: number,
    columnIndex: number,
    currentShape: string,
    targetRowIndex: number,
    targetColumnIndex: number
) => {
    // Check if targeted cell is inside of grid
    if (targetRowIndex < 0 || targetColumnIndex < 0 || targetRowIndex >= rowCount || targetColumnIndex >= columnCount) {
        return false;
    }

    // Check if target cell isn't already solved
    if (!solvedMap[targetRowIndex][targetColumnIndex]) {
        const topSolvedMap = JSON.parse(JSON.stringify(solvedMap));
        topSolvedMap[rowIndex][columnIndex] = currentShape;

        const shape = map[targetRowIndex][targetColumnIndex];
        const borderMap = getBorderMap(map, topSolvedMap, targetRowIndex, targetColumnIndex, rowCount, columnCount);
        const shapeGroup = shapeGroupsMap.find((row) => row.includes(shape));

        if (!shapeGroup) {
            throw Error('Shape not found on neighbor validation!');
        }

        // Check if shape have some possible rotation
        const possibleShape = shapeGroup.filter((shape) => (
            shapeBorderMap[shape].every((border, index) => {
                if (borderMap[index] === null) {
                    return true;
                }

                if (border === borderMap[index]) {
                    return true;
                }

                return false;
            })
        ));

        if (!possibleShape.length) {
            return true;
        }
    }

    return false;
};

export const getPossibility = (
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
): Possibility => {
    const borderMap = getBorderMap(map, solvedMap, rowIndex, columnIndex, rowCount, columnCount);

    if (!isLoop) {
        const shapeGroup = shapeGroupsMap.find((row) => row.includes(cell));

        if (!shapeGroup) {
            throw Error('Shape group not found while getting possibility!');
        }

        const possibleShape = shapeGroup.filter((shape) => {
            const isShapePossible = shapeBorderMap[shape].every((border, index) => {
                if (borderMap[index] === null) {
                    return true;
                }

                if (border === borderMap[index]) {
                    return true;
                }

                return false;
            });

            if (!isShapePossible) {
                return isShapePossible;
            }

            // Check if neighbors have possible rotation
            // Top neighbor
            const isTopInvalid = isNeighborInvalid(
                map,
                solvedMap,
                rowCount,
                columnCount,
                rowIndex,
                columnIndex,
                shape,
                rowIndex - 1,
                columnIndex
            );

            if (isTopInvalid) {
                return false;
            }

            // Right neighbor
            const isRightInvalid = isNeighborInvalid(
                map,
                solvedMap,
                rowCount,
                columnCount,
                rowIndex,
                columnIndex,
                shape,
                rowIndex,
                columnIndex + 1
            );

            if (isRightInvalid) {
                return false;
            }

            // Bottom neighbor
            const isBottomInvalid = isNeighborInvalid(
                map,
                solvedMap,
                rowCount,
                columnCount,
                rowIndex,
                columnIndex,
                shape,
                rowIndex + 1,
                columnIndex
            );

            if (isBottomInvalid) {
                return false;
            }

            // Left neighbor
            const isLeftInvalid = isNeighborInvalid(
                map,
                solvedMap,
                rowCount,
                columnCount,
                rowIndex,
                columnIndex,
                shape,
                rowIndex,
                columnIndex - 1
            );

            if (isLeftInvalid) {
                return false;
            }

            return isShapePossible;
        });

        // Save to possibilityMap
        possibleShape.forEach((shape) => {
            possibilityMap.push({
                shape: `${rowIndex},${columnIndex},${shape}`,
                solvedMap: JSON.parse(JSON.stringify(solvedMap)),
                flowMap: JSON.parse(JSON.stringify(flowMap))
            });
        });

        const possibility = possibilityMap.pop() as Possibility;

        // Clear flowMap and solvedMap
        if (!possibleShape.length) {
            flowMap.splice(0, flowMap.length);
            possibility.flowMap.forEach((flow) => {
                flowMap.push(flow);
            });

            solvedMap.splice(0, solvedMap.length);
            possibility.solvedMap.forEach((solved) => {
                solvedMap.push(solved);
            });
        }

        // Save shape to solved map
        const [nextRowIndex, nextColumnIndex, nextShape] = (possibility.shape as string).split(',');
        solvedMap[Number(nextRowIndex)][Number(nextColumnIndex)] = nextShape;

        return possibility;
    }

    const possibility = {
        shape: `${rowIndex},${columnIndex},${cell}`,
        solvedMap: JSON.parse(JSON.stringify(solvedMap)),
        flowMap: JSON.parse(JSON.stringify(flowMap))
    };

    // Save shape to solved map
    solvedMap[rowIndex][columnIndex] = cell as string;

    return possibility;
};

export const getNextCell = (
    solvedMap: PuzzleMap,
    flowMap: string[],
    possibility: Possibility,
    columnCount: number,
    rowCount: number
): string | undefined => {
    const [possibilityRowIndex, possibilityColumnIndex, shape] = possibility.shape.split(',');
    const rowIndex = Number(possibilityRowIndex);
    const columnIndex = Number(possibilityColumnIndex);
    const borderMap2 = shapeBorderMap[shape];

    const isValidCell = (rowIndex: number, columnIndex: number) => (
        !solvedMap[rowIndex][columnIndex] && !flowMap.find((m) => m === `${rowIndex},${columnIndex}`)
    );

    // Top
    if (rowIndex && borderMap2[0] && isValidCell(rowIndex - 1, columnIndex)) {
        flowMap.push(`${rowIndex - 1},${columnIndex}`);
    }
    // Right
    if (columnIndex < columnCount && borderMap2[1] && isValidCell(rowIndex, columnIndex + 1)) {
        flowMap.push(`${rowIndex},${columnIndex + 1}`);
    }
    // Bottom
    if (rowIndex < rowCount && borderMap2[2] && isValidCell(rowIndex + 1, columnIndex)) {
        flowMap.push(`${rowIndex + 1},${columnIndex}`);
    }
    // Left
    if (columnIndex && borderMap2[3] && isValidCell(rowIndex, columnIndex - 1)) {
        flowMap.push(`${rowIndex},${columnIndex - 1}`);
    }

    return flowMap.shift();
};
