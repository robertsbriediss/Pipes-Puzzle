import './PipeGridCell.scss';

import socket from 'api/socket';
import { useAppSelector } from 'store';

interface PipeGridCellInterface {
    value: string
    rowIndex: number
    columnIndex: number
}

export function PipeGridCell({
    value,
    rowIndex,
    columnIndex
}: PipeGridCellInterface) {
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
