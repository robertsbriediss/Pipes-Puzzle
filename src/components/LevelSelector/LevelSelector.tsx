import { selectLevel } from 'store/puzzle';
import { useAppDispatch, useAppSelector } from 'store';

import './LevelSelector.scss';

export function LevelSelector() {
    const dispatch = useAppDispatch();
    const game = useAppSelector((state) => state.puzzle.game);
    const levelCount = 6;

    return (
        <div className="LevelSelector">
            { new Array(levelCount).fill(1).map(((_, levelIndex) => {
                const level = levelIndex + 1;
                const isCompleted = game[level]?.isCompleted;
                const isUnlocked = levelIndex === 0
                    ? true
                    : game[levelIndex]?.isCompleted;

                const isPlayable = isCompleted || isUnlocked;

                return (
                    <button
                        key={ level }
                        className={ `SingleLevel ${isPlayable ? 'isPlayable' : ''}` }
                        onClick={ () => {
                            // if (isPlayable) {
                            dispatch(selectLevel(level));
                            // }
                        } }
                    >
                        <span>Level { level }</span>
                        { isCompleted && <span className="CompletedIcon" /> }
                    </button>
                );
            })) }
        </div>
    );
}
