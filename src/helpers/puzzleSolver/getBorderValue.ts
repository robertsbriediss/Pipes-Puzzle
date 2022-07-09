/* eslint-disable no-nested-ternary */
import { PuzzleMap } from 'store/puzzle';

const endShape = ['╹', '╺', '╻', '╸'];

type IsBorder = { rowIndex: number, cellIndex: number, columnCount: number, rowCount: number }

const searchPattern = {
    top: {
        isBorder: ({ rowIndex }: IsBorder) => rowIndex === 0,
        getRowIndex: (rowIndex: number) => rowIndex - 1,
        getColumnIndex: (column: number) => column,
        connectionShapes: ['╻', '┏', '┓', '┃', '┳', '┣', '┫', '╋']
    },
    right: {
        isBorder: ({ cellIndex, columnCount }: IsBorder) => cellIndex + 1 === columnCount,
        getRowIndex: (rowIndex: number) => rowIndex,
        getColumnIndex: (column: number) => column + 1,
        connectionShapes: ['╸', '┛', '┓', '━', '┳', '┫', '┻', '╋']
    },
    bottom: {
        isBorder: ({ rowIndex, rowCount }: IsBorder) => rowIndex + 1 === rowCount,
        getRowIndex: (rowIndex: number) => rowIndex + 1,
        getColumnIndex: (column: number) => column,
        connectionShapes: ['╹', '┛', '┗', '┃', '┻', '┣', '┫', '╋']
    },
    left: {
        isBorder: ({ cellIndex }: IsBorder) => cellIndex === 0,
        getRowIndex: (rowIndex: number) => rowIndex,
        getColumnIndex: (column: number) => column - 1,
        connectionShapes: ['╺', '┗', '┏', '━', '┻', '┳', '┣', '╋']
    }
};

const getCellValue = (
    side: 'top' | 'right' | 'bottom' | 'left',
    map: PuzzleMap,
    solvedMap: PuzzleMap,
    currentRowIndex: number,
    currentCellIndex: number,
    rowCount: number,
    columnCount: number
) => {
    const cellSearchPattern = searchPattern[side];

    if (cellSearchPattern.isBorder({
        rowIndex: currentRowIndex,
        cellIndex: currentCellIndex,
        rowCount,
        columnCount
    })) {
        return 0;
    }

    const rowIndex = cellSearchPattern.getRowIndex(currentRowIndex);
    const cellIndex = cellSearchPattern.getColumnIndex(currentCellIndex);
    const cell = solvedMap[rowIndex]?.[cellIndex];

    // Validate if cell is already solved
    if (cell === undefined || cell === '' || cell === null) {
        // Validate if cell and top cell are both end shape then theres no connection possible
        if (endShape.includes(map[rowIndex]?.[cellIndex])
            && endShape.includes(map[currentRowIndex]?.[currentCellIndex])
        ) {
            return 0;
        }

        return null;
    }

    // Validate if top cell is connected to cell
    if (cellSearchPattern.connectionShapes.includes(cell)) {
        return 1;
    }

    return 0;
};

// Find border values for specific cell, 0 - no connection, 1 - connection should be
export const getBorderValue = (
    map: PuzzleMap,
    solvedMap: PuzzleMap,
    rowIndex: number,
    cellIndex: number,
    rowCount: number,
    columnCount: number
) => {
    // const top = solvedMap[rowIndex - 1]?.[cellIndex];
    // const right = solvedMap[rowIndex]?.[cellIndex + 1];
    // const bottom = solvedMap[rowIndex + 1]?.[cellIndex];
    // const left = solvedMap[rowIndex]?.[cellIndex - 1];

    // 1. Validate if cell is outside of grid and if so return 0
    const topValue = getCellValue('top', map, solvedMap, rowIndex, cellIndex, rowCount, columnCount);
    // const topValue = rowIndex === 0
    //     ? 0
    //     : top === undefined || top === '' || top === null
    //         // 3.1. If cell and top cell are both end shape, there will be no connection
    //         ? endShape.includes(map[rowIndex - 1]?.[cellIndex]) && endShape.includes(map[rowIndex]?.[cellIndex])
    //             ? 0
    //             : null
    //         // 3.2. Search for connection shape
    //         : ['╻', '┏', '┓', '┃', '┳', '┣', '┫', '╋'].includes(top) ? 1 : 0;

    const rightValue = getCellValue('right', map, solvedMap, rowIndex, cellIndex, rowCount, columnCount);
    // const rightValue = cellIndex + 1 === columnCount
    //     ? 0
    //     : right === undefined || right === '' || right === null
    //         // ? map[rowIndex]?.[cellIndex + 1]
    //         ? endShape.includes(map[rowIndex]?.[cellIndex + 1]) && endShape.includes(map[rowIndex]?.[cellIndex])
    //             ? 0
    //             : null
    //             // : null
    //         : ['╸', '┛', '┓', '━', '┳', '┫', '┻', '╋'].includes(right) ? 1 : 0;

    const bottomValue = getCellValue('bottom', map, solvedMap, rowIndex, cellIndex, rowCount, columnCount);
    // const bottomValue = rowIndex + 1 === rowCount
    //     ? 0
    //     : bottom === undefined || bottom === '' || right === null
    //         // ? map[rowIndex + 1]?.[cellIndex]
    //         ? endShape.includes(map[rowIndex + 1]?.[cellIndex]) && endShape.includes(map[rowIndex]?.[cellIndex])
    //             ? 0
    //             : null
    //             // : null
    //         : ['╹', '┛', '┗', '┃', '┻', '┣', '┫', '╋'].includes(bottom) ? 1 : 0;

    const leftValue = getCellValue('left', map, solvedMap, rowIndex, cellIndex, rowCount, columnCount);
    // const leftValue = cellIndex === 0
    //     ? 0
    //     : left === undefined || left === '' || right === null
    //         // ? map[rowIndex]?.[cellIndex - 1]
    //         ? endShape.includes(map[rowIndex]?.[cellIndex - 1]) && endShape.includes(map[rowIndex]?.[cellIndex])
    //             ? 0
    //             : null
    //             // : null
    //         : ['╺', '┗', '┏', '━', '┻', '┳', '┣', '╋'].includes(left) ? 1 : 0;

    return [topValue, rightValue, bottomValue, leftValue];
};
