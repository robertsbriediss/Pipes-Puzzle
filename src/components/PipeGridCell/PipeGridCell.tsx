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
    const flowMap = useAppSelector((state) => state.puzzle.flowMap);
    const rowIndexState = useAppSelector((state) => state.puzzle.rowIndex);
    const columnIndexState = useAppSelector((state) => state.puzzle.columnIndex);
    const isSolving = useAppSelector((state) => state.puzzle.isSolving);

    const isSolved = solvedMap[rowIndex]?.[columnIndex] ? 'isSolved' : '';
    const isVerifyingIncorrectState = state === 'verifyingIncorrect' ? 'isVerifyingIncorrectState' : '';
    const isCurrent = rowIndexState === rowIndex && columnIndex === columnIndexState && isSolving;
    const isFlop = !!flowMap.find((flow) => flow === `${rowIndex},${columnIndex}`) || isCurrent;

    return (
        <button
            className={ `PipeGridCell ${isSolved} ${isVerifyingIncorrectState}`}
            data-pipe-type={ value }
            style={ { ...isFlop && { border: 'solid 2px orange' }, ...isCurrent && { backgroundColor: '#ffcc8d' } } }
            onClick={ () => {
                if (state === 'verifying') {
                    return null;
                }

                socket.send(`rotate ${columnIndex} ${rowIndex}`);
                socket.send('map');
            } }
        >
            { solvedMap[rowIndex][columnIndex] ? solvedMap[rowIndex][columnIndex] : value }
        </button>
    );
}
