import './PipeGrid.scss';

import { useAppSelector } from 'store';
import { PipeGridCell } from 'components/PipeGridCell/PipeGridCell';

export function PipeGrid() {
    const map = useAppSelector((state) => state.puzzle.map);
    const state = useAppSelector((state) => state.puzzle.state);

    const renderGridRow = (row: string[], rowIndex: number) => (
        <div
            key={ rowIndex }
            className="PipeGridRow"
        >
            { row.map((value, columnIndex) => (
                <PipeGridCell
                    key={ `${rowIndex}-${columnIndex}` }
                    value={ value } rowIndex={ rowIndex } columnIndex={ columnIndex }
                />
            )) }
        </div>
    );

    return (
        <div className="PipeGrid">
            <div className="PipeGridContent">
                { state !== 'initializing' && map
                    ? map.map(((row, rowIndex) => renderGridRow(row, rowIndex)))
                    : <span className="LoadingTitle">Loading...</span>
                }
            </div>
        </div>
    );
}
