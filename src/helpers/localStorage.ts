interface PuzzleLocalStorage {
    [level: string]: {
        isCompleted: boolean
    }
}

export const getGameLocalStorage = (): PuzzleLocalStorage => (
    JSON.parse(String(localStorage.getItem('game'))) || []
);

export const setGameLocalStorage = (puzzle: PuzzleLocalStorage): void => {
    localStorage.setItem('game', JSON.stringify(puzzle));
};
