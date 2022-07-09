import { AppDispatch } from 'store';
import { changeLevelState, setMap } from 'store/puzzle';

// Game pipes valid commands

// help       - returns valid commands
// new L      - starts new session, L=1|2|3|4|5|6
// map        - returns the current map
// rotate X Y - rotates pipes at X,Y coordinates
// rotate X1 Y1\nX2 Y2\nX3 Y3 - rotates multiple cells with one command, max 1MB per command
// verify     - verifies the current solution

const socket = new WebSocket('wss://hometask.eg1236.com/game-pipes/');

export const createSocketConnection = (reduxDispatch: AppDispatch) => {
    socket.onerror = () => {
        socket.close();
    };

    socket.onmessage = (event) => {
        if (event.data.startsWith('map:')) {
            reduxDispatch(setMap(event.data));
        }

        if (event.data.startsWith('verify:')) {
            const isCompleted = !!event.data.split('Password:')[1];

            // Added timeout to not have flick effect, because response might come too fast
            setTimeout(() => {
                reduxDispatch(changeLevelState(isCompleted ? 'completed' : 'inProgress'));
            }, 500);
        }
    };
};

export default socket;
