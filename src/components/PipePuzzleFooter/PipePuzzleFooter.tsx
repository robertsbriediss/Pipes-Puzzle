import {
    changeLevelState,
    changeSolvingSpeed,
    selectLevel,
    startSolving,
    stopSolving
} from 'store/puzzle';
import { useAppDispatch, useAppSelector } from 'store';

import './PipePuzzleFooter.scss';

function ResetButton() {
    const level = useAppSelector((state) => state.puzzle.selectedLevel);
    const dispatch = useAppDispatch();

    return (
        <button
            onClick={() => dispatch(selectLevel(Number(level)))}
        >
            Reset
        </button>
    );
}

function NextLevelButton() {
    const dispatch = useAppDispatch();
    const selectedLevel = useAppSelector((state) => state.puzzle.selectedLevel);
    const nextLevel = Number(selectedLevel) + 1;

    return (
        <button
            onClick={ () => {
                dispatch(selectLevel(nextLevel));
            }}
        >
            Go to next level { nextLevel }
        </button>
    );
}

function VerifyButton() {
    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state.puzzle.state);
    const isVerifyingState = state === 'verifying';

    return (
        <button
            onClick={
                () => {
                    if (isVerifyingState) {
                        return null;
                    }

                    dispatch(changeLevelState('verifying'));
                }
            }
            className={`isPrimary ${isVerifyingState ? 'isDisabled' : ''}`}
        >
            { isVerifyingState ? 'Verifying...' : 'Submit' }
        </button>
    );
}

function Actions() {
    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state.puzzle.state);
    const isSolving = useAppSelector((state) => state.puzzle.isSolving);

    if (state === 'completed') {
        return (
            <div className="Actions isCompleted">
                <p className="CompletedLevelTitle">
                    Congratulations, level completed!
                </p>
                <NextLevelButton />
            </div>
        );
    }

    return (
        <div>
            <VerifyButton />
            <ResetButton />
            <button
                onClick={ () => {
                    if (!isSolving) {
                        dispatch(startSolving());
                    }
                } }
            >
                { isSolving ? 'Solving...' : 'Solve' }
            </button>
        </div>
    );
}

function SolverConfigs() {
    const dispatch = useAppDispatch();
    const solvingCount = useAppSelector((state) => state.puzzle.solvingCount);
    const solvingSpeed = useAppSelector((state) => state.puzzle.solvingSpeed);

    return (
        <div className="SolverConfig">
            <b>Solver Config</b>
            <div className="Count">Count: {solvingCount}</div>
            <div>
                <span>Speed </span>
                <input
                    className="SpeedInput"
                    type="number"
                    value={solvingSpeed}
                    onChange={(solvingSpeed) => dispatch(
                        changeSolvingSpeed(solvingSpeed.target.value as unknown as number)
                    )}
                />
            </div>
            <div className="Actions">
                <button onClick={ () => dispatch(startSolving()) }>
                    Start
                </button>
                <button onClick={ () => dispatch(stopSolving()) }>
                    Stop
                </button>
            </div>
        </div>
    );
}

export function PipePuzzleFooter() {
    const isSolvedState = useAppSelector((state) => state.puzzle.isSolvedState);

    return (
        <div className="PipePuzzleFooter">
            { isSolvedState && (
                <div className="ColorMeaning">
                    <span className="ColorBlock"/>
                    <span>Represents solved cell</span>
                </div>
            ) }
            <Actions />
            <SolverConfigs />
        </div>
    );
}
