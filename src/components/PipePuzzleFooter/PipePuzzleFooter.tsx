import { changeLevelState, selectLevel, solveMap } from 'store/puzzle';
import { useAppDispatch, useAppSelector } from 'store';

import './PipePuzzleFooter.scss';
import { useState } from 'react';

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

function Actions({ changeIsSolved }: { changeIsSolved: (state: boolean) => void }) {
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
                    changeIsSolved(true);
                } }
            >
                { isSolvingState ? 'Solving...' : 'Solve' }
            </button>
        </div>
    );
}

export function PipePuzzleFooter() {
    const [isSolved, changeIsSolved] = useState(false);

    return (
        <div className="PipePuzzleFooter">
            { isSolved && (
                <div className="ColorMeaning">
                    <span className="ColorBlock"/>
                    <span>Represents solved cell</span>
                </div>
            ) }
            <Actions changeIsSolved={ changeIsSolved }/>
        </div>
    );
}
