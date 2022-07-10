import { getEnv } from 'helpers/env';
import { AppDispatch } from 'store';
import { changeLevelState, setMap } from 'store/puzzle';

// Game pipes valid commands

// help       - returns valid commands
// new L      - starts new session, L=1|2|3|4|5|6
// map        - returns the current map
// rotate X Y - rotates pipes at X,Y coordinates
// rotate X1 Y1\nX2 Y2\nX3 Y3 - rotates multiple cells with one command, max 1MB per command
// verify     - verifies the current solution

const socket = new WebSocket(getEnv('REACT_APP_WEBSOCKET_ENDPOINT'));

export const createSocketConnection = (reduxDispatch: AppDispatch) => {
    socket.onerror = () => {
        socket.close();
    };

    socket.onmessage = (event) => {
        const responseType = event.data.split(':')[0];

        if (responseType === 'map') {
            reduxDispatch(setMap(event.data));

            return;
        }

        if (responseType === 'verify') {
            const isCompleted = !!event.data.split('Password:')[1];

            // Added timeout to not have flick effect, because response might come too fast
            setTimeout(() => {
                if (isCompleted) {
                    reduxDispatch(changeLevelState('completed'));

                    return;
                }

                reduxDispatch(changeLevelState('verifyingIncorrect'));

                // Remove verifying incorrect state after 700ms
                setTimeout(() => {
                    reduxDispatch(changeLevelState('inProgress'));
                }, 700);
            }, 500);
        }
    };
};

export default socket;
