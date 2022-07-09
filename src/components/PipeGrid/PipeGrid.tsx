import './PipeGrid.scss';

import socket from 'api/socket';
import { useAppSelector } from 'store';

function PipeGridCell({ value, rowIndex, columnIndex }: { value: string, rowIndex: number, columnIndex: number }) {
    const state = useAppSelector((state) => state.puzzle.state);
    const solvedMap = useAppSelector((state) => state.puzzle.solvedMap);
    const isSolved = !!solvedMap[rowIndex]?.[columnIndex];

    return (
        <button
            className={ `PipeGridCell ${isSolved ? 'isSolved' : ''}` }
            data-pipe-type={ value }
            onClick={ () => {
                if (state === 'verifying') {
                    return null;
                }

                socket.send(`rotate ${columnIndex} ${rowIndex}`);
                socket.send('map');
            } }
        >
            { value }
        </button>
    );
}

export function PipeGrid() {
    const map = useAppSelector((state) => state.puzzle.map);
    const state = useAppSelector((state) => state.puzzle.state);

    const renderGrid = (row: string[], rowIndex: number) => (
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
                    ? map.map(((row, rowIndex) => renderGrid(row, rowIndex)))
                    : <span className="LoadingTitle">Loading...</span>
                }
            </div>
        </div>
    );
}
