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

interface GetCellValueInterface {
    side: 'top' | 'right' | 'bottom' | 'left',
    map: PuzzleMap,
    solvedMap: PuzzleMap,
    cellRowIndex: number,
    cellCellIndex: number,
    rowCount: number,
    columnCount: number
}

/**
 * Get border value depending on solved map
 * Border value represents neighbor cell if its connected or not
 *
 * @return 1 - connection, 0 - no connection, null - unknown (can be any)
 */
const getBorderValue = ({
    side,
    map,
    solvedMap,
    cellRowIndex,
    cellCellIndex,
    rowCount,
    columnCount
}: GetCellValueInterface) => {
    const cellSearchPattern = searchPattern[side];

    // Validate if cell is grid border, then connection not possible
    if (cellSearchPattern.isBorder({
        rowIndex: cellRowIndex,
        cellIndex: cellCellIndex,
        rowCount,
        columnCount
    })) {
        return 0;
    }

    const rowIndex = cellSearchPattern.getRowIndex(cellRowIndex);
    const cellIndex = cellSearchPattern.getColumnIndex(cellCellIndex);
    const cell = solvedMap[rowIndex]?.[cellIndex];

    // Validate if cell is already solved
    if (cell === undefined || cell === '' || cell === null) {
        // Validate if cell and top cell are both end shape, then connection not possible
        if (endShape.includes(map[rowIndex]?.[cellIndex])
            && endShape.includes(map[cellRowIndex]?.[cellCellIndex])
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

/**
 * Get border values for cell
 * Border map represents neighbor cell connection, not connection, or unknown to cell
 * 1 - connection, 0 - no connection, null - unknown (can be any)
 *
 * @returnvalue [top, right, bottom, left]
*/
export const getBorderMap = (
    map: PuzzleMap,
    solvedMap: PuzzleMap,
    rowIndex: number,
    cellIndex: number,
    rowCount: number,
    columnCount: number
) => {
    const getCellValueConfigs: Omit<GetCellValueInterface, 'side'> = {
        map,
        solvedMap,
        cellRowIndex: rowIndex,
        cellCellIndex: cellIndex,
        rowCount,
        columnCount
    };

    const topValue = getBorderValue({ side: 'top', ...getCellValueConfigs });
    const rightValue = getBorderValue({ side: 'right', ...getCellValueConfigs });
    const bottomValue = getBorderValue({ side: 'bottom', ...getCellValueConfigs });
    const leftValue = getBorderValue({ side: 'left', ...getCellValueConfigs });

    return [topValue, rightValue, bottomValue, leftValue];
};
