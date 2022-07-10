import { changeLevelState, selectLevel, solveMap } from 'store/puzzle';
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

    const isSolvingState = state === 'solving';

    return (
        <div>
            <VerifyButton />
            <ResetButton />
            <button
                onClick={ () => {
                    dispatch(solveMap());
                } }
            >
                { isSolvingState ? 'Solving...' : 'Solve' }
            </button>
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
        </div>
    );
}
