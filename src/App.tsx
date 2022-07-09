import { LevelSelector } from 'components/LevelSelector/LevelSelector';
import { PipePuzzle } from 'components/PipePuzzle/PipePuzzle';
import { Footer } from 'components/Footer/Footer';
import { Header } from 'components/Header/Header';
import { Notification } from 'components/Notification/Notification';
import { Helmet } from 'components/Helmet/Helmet';

import { createSocketConnection } from 'api/socket';

import { useAppDispatch, useAppSelector } from 'store';

import './App.scss';

function App() {
    const dispatch = useAppDispatch();
    createSocketConnection(dispatch);

    const selectedLevel = useAppSelector((state) => state.puzzle.selectedLevel);

    // const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDarkTheme = false;

    return (
        <div className="App" data-theme={ isDarkTheme ? 'theme-dark' : 'theme-light' }>
            <Helmet />
            <Notification />
            <Header />
            <div className="Body">
                <div className="BodyContent">
                    { selectedLevel
                        ? <PipePuzzle />
                        : <LevelSelector />
                    }
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default App;
