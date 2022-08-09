import './PipeGrid.scss';
import {
    AutoSizer,
    Grid,
    GridCellProps
} from 'react-virtualized';
import { PipeGridCell } from 'components/PipeGridCell/PipeGridCell';

import { useAppDispatch, useAppSelector } from 'store';
import { pushSolvedMap, PuzzleMap } from 'store/puzzle';
import { useEffect } from 'react';

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
    const isSolving = useAppSelector((state) => state.puzzle.isSolving);
    const solvingSpeed = useAppSelector((state) => state.puzzle.solvingSpeed);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const interval = setInterval(() => {
            if (isSolving) {
                // console.log('interval');
                dispatch(pushSolvedMap());
            }
        }, solvingSpeed);

        if (!isSolving) {
            clearTimeout(interval);
        }

        return () => {
            clearInterval(interval);
        };
    }, [isSolving, solvingSpeed]);

    // ------------
    // ------------
    // ------------

    const map = useAppSelector((state) => state.puzzle.map);
    const state = useAppSelector((state) => state.puzzle.state);
    const selectedLevel = useAppSelector((state) => state.puzzle.selectedLevel);
    const isFirstLevel = selectedLevel === 1 ? 'isFirstLevel' : '';

    const columnCount = (map: PuzzleMap) => map[0].length;
    const rowCount = (map: PuzzleMap) => map.length;
    const columnWidth = 32;
    const rowHeight = 32;
    const overscanColumnCount = 5;
    const overscanRowCount = 5;

    return (
        <div className="PipeGrid">
            <div className={ `PipeGridContent ${isFirstLevel}`}>
                { state !== 'initializing' && map
                    ? (
                        <AutoSizer>
                            { ({ width, height }) => (
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
                            )}
                        </AutoSizer>
                    )
                    : <span className="LoadingTitle">Loading...</span>
                }
            </div>
        </div>
    );
}
