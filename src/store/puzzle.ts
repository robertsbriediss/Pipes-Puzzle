import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import socket from 'api/socket';
import { getGameLocalStorage, setGameLocalStorage } from 'helpers/localStorage';
import { solvePuzzle } from 'helpers/puzzleSolver';

const convertMap = (map: string) => map.split('\n')
    .slice(1, -1)
    .map((row) => row.split(''));

type LevelState = 'initializing' | 'inProgress' | 'verifying' | 'solving' | 'completed'

export type PuzzleMap<T = string> = T[][];

type InitialState = {
    map: PuzzleMap | null,
    solvedMap: PuzzleMap,
    selectedLevel: number,
    state: LevelState | null,
    game: {
        [level: string]: {
            isCompleted: boolean
        }
    }
}

const initialState: InitialState = {
    map: null,
    solvedMap: [[]],
    state: null,
    selectedLevel: 0,
    game: getGameLocalStorage()
};

const puzzleSlice = createSlice({
    name: 'puzzle',
    initialState,
    reducers: {
        setMap: (state: InitialState, action: PayloadAction<string>) => {
            const convertedMap = convertMap(action.payload);

            state.map = convertedMap;
            state.state = 'inProgress';
        },

        changeLevelState: (state: InitialState, action: PayloadAction<LevelState>) => {
            const newStateOfLevel = action.payload;

            if (newStateOfLevel === 'completed') {
                const storage = getGameLocalStorage();
                const newStorage = { ...storage, [state.selectedLevel]: { isCompleted: true } };

                setGameLocalStorage(newStorage);

                state.game = newStorage;
            }

            if (newStateOfLevel === 'verifying') {
                socket.send('verify');
            }

            state.state = action.payload;
        },

        selectLevel: (state: InitialState, action: PayloadAction<number>) => {
            const nextLevel = action.payload;

            state.state = 'initializing';
            state.solvedMap = initialState.solvedMap;
            state.selectedLevel = nextLevel;

            // Added timeout to see loading state
            setTimeout(() => {
                socket.send(`new ${nextLevel}`);
                socket.send('map');
            }, 500);
        },

        resetLevel: (state: InitialState) => {
            state.map = initialState.map;
            state.selectedLevel = initialState.selectedLevel;
            state.state = initialState.state;
            state.solvedMap = initialState.solvedMap;
        },

        solveMap: (state: InitialState) => {
            const { map } = state;

            if (!map) {
                return;
            }

            solvePuzzle(map, state);
        }
    }
});

export const {
    setMap,
    changeLevelState,
    selectLevel,
    resetLevel,
    solveMap
} = puzzleSlice.actions;

export default puzzleSlice;