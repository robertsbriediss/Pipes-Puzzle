/* eslint-disable max-len */
import {
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit';
import socket from 'api/socket';
import { getGameLocalStorage, setGameLocalStorage } from 'helpers/localStorage';
import { solvePuzzlesOneStep } from 'helpers/puzzleSolver';
import { Possibility } from 'helpers/puzzleSolver/stageThree';

const convertMap = (map: string) => map.split('\n')
    .slice(1, -1)
    .map((row) => row.split(''));

type LevelState =
    'initializing'
    | 'inProgress'
    | 'verifying'
    | 'verifyingIncorrect'
    | 'solving'
    | 'completed';

export type PuzzleMap<T = string> = T[][];

export type InitialState = {
    map: PuzzleMap | null,
    solvedMap: PuzzleMap,
    selectedLevel: number,
    state: LevelState | null,
    isSolvedState: boolean,
    game: {
        [level: string]: {
            isCompleted: boolean
        }
    },

    // Solving
    isSolving: boolean,
    shape: string,
    rowIndex: number,
    columnIndex: number,
    possibilityMap: Possibility[],
    flowMap: string[],
    isLoop: boolean,
    solvingCount: number,
    solvingSpeed: number
}

const initialSolvingState = {
    isSolving: false,
    shape: '',
    rowIndex: 1,
    columnIndex: 0,
    possibilityMap: [],
    flowMap: [],
    isLoop: false,
    solvingCount: 0,
    solvingSpeed: 200
};

const initialState: InitialState = {
    map: null,
    solvedMap: [[]],
    state: null,
    isSolvedState: false,
    selectedLevel: 0,
    game: getGameLocalStorage(),

    ...initialSolvingState
};

const puzzleSlice = createSlice({
    name: 'puzzle',
    initialState,
    reducers: {
        setMap: (state: InitialState, action: PayloadAction<string>) => {
            const convertedMap = convertMap(action.payload);

            state.map = convertedMap;
            state.state = 'inProgress';

            // Solver
            const rowCount = convertedMap.length;
            const columnCount = convertedMap[0].length;
            state.solvedMap = Array.from(Array(rowCount), () => Array.from(Array(columnCount)));
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

            state.state = newStateOfLevel;
        },

        selectLevel: (state: InitialState, action: PayloadAction<number>) => {
            const nextLevel = action.payload;

            state.state = 'initializing';
            state.selectedLevel = nextLevel;
            state.solvedMap = initialState.solvedMap;
            state.isSolvedState = initialState.isSolvedState;

            // Solving initial state
            state.isSolving = initialSolvingState.isSolving;
            state.shape = initialSolvingState.shape;
            state.rowIndex = initialSolvingState.rowIndex;
            state.columnIndex = initialSolvingState.columnIndex;
            state.possibilityMap = initialSolvingState.possibilityMap;
            state.flowMap = initialSolvingState.flowMap;
            state.isLoop = initialSolvingState.isLoop;
            state.solvingCount = initialSolvingState.solvingCount;
            state.solvingSpeed = initialSolvingState.solvingSpeed;

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
            state.isSolvedState = initialState.isSolvedState;

            // Solving initial state
            state.isSolving = initialSolvingState.isSolving;
            state.shape = initialSolvingState.shape;
            state.rowIndex = initialSolvingState.rowIndex;
            state.columnIndex = initialSolvingState.columnIndex;
            state.possibilityMap = initialSolvingState.possibilityMap;
            state.flowMap = initialSolvingState.flowMap;
            state.isLoop = initialSolvingState.isLoop;
            state.solvingCount = initialSolvingState.solvingCount;
            state.solvingSpeed = initialSolvingState.solvingSpeed;
        },

        startSolving: (state: InitialState) => {
            state.isSolving = true;
            console.time('Solving');
        },

        stopSolving: (state: InitialState) => {
            state.isSolving = false;
        },

        changeSolvingSpeed: (state: InitialState, action: PayloadAction<number>) => {
            const newSolvingSpeed = action.payload;

            state.solvingSpeed = newSolvingSpeed;
        },

        pushSolvedMap: (state: InitialState) => {
            const {
                rowIndex,
                columnIndex,
                flowMap,
                possibilityMap,
                solvedMap,
                map,
                isLoop,
                shape,
            } = state;

            if (!map) {
                return;
            }

            const rowCount = map.length;
            const columnCount = map[0].length;
            const cell = shape || map[rowIndex][columnIndex];

            solvePuzzlesOneStep(
                state,
                map,
                solvedMap,
                possibilityMap,
                flowMap,
                cell,
                rowIndex,
                columnIndex,
                rowCount,
                columnCount,
                isLoop
            );
        }
    }
});

export const {
    setMap,
    changeLevelState,
    selectLevel,
    resetLevel,
    pushSolvedMap,
    startSolving,
    stopSolving,
    changeSolvingSpeed
} = puzzleSlice.actions;

export default puzzleSlice;
