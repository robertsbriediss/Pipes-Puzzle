import { resetLevel } from 'store/puzzle';
import { useAppDispatch, useAppSelector } from 'store';

import './PipePuzzleHeader.scss';

export function PipePuzzleHeader() {
    const dispatch = useAppDispatch();
    const selectedLevel = useAppSelector((state) => state.puzzle.selectedLevel);

    return (
        <div className="PipePuzzleHeader">
            <button
                className="BackButton"
                onClick={ () => dispatch(resetLevel()) }
            >
                Back
            </button>
            <span className="LevelTitle">Level { selectedLevel }</span>
        </div>
    );
}
