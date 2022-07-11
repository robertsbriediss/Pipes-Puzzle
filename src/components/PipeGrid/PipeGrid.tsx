import './PipeGrid.scss';
import { Grid, GridCellProps } from 'react-virtualized';
import { PipeGridCell } from 'components/PipeGridCell/PipeGridCell';

import { useAppSelector } from 'store';
import { PuzzleMap } from 'store/puzzle';

const renderCell = (
    map: PuzzleMap,
    {
        key,
        style,
        columnIndex,
        rowIndex
    }: GridCellProps
) => (
    <div key={ key } style={ style }>
        <PipeGridCell
            key={ `${rowIndex}-${columnIndex}` }
            value={ map[rowIndex][columnIndex] }
            rowIndex={ rowIndex }
            columnIndex={ columnIndex }
        />
    </div>
);

export function PipeGrid() {
    const map = useAppSelector((state) => state.puzzle.map);
    const state = useAppSelector((state) => state.puzzle.state);
    const selectedLevel = useAppSelector((state) => state.puzzle.selectedLevel);

    const columnCount = (map: PuzzleMap) => map[0].length;
    const rowCount = (map: PuzzleMap) => map.length;
    const columnWidth = 32;
    const rowHeight = 32;
    const width = columnWidth * (selectedLevel === 1 ? 8 : 20);
    const height = rowHeight * (selectedLevel === 1 ? 8 : 18);
    const overscanColumnCount = 5;
    const overscanRowCount = 5;

    return (
        <div className="PipeGrid">
            <div className="PipeGridContent">
                { state !== 'initializing' && map
                    ? (
                        <Grid
                            cellRenderer={ (cellProps) => renderCell(map, cellProps) }
                            columnWidth={ columnWidth }
                            columnCount={ columnCount(map) }
                            height={ height }
                            overscanColumnCount={ overscanColumnCount }
                            overscanRowCount={ overscanRowCount }
                            rowHeight={ rowHeight }
                            rowCount={ rowCount(map) }
                            width={ width }
                        />
                    )
                    : <span className="LoadingTitle">Loading...</span>
                }
            </div>
        </div>
    );
}
