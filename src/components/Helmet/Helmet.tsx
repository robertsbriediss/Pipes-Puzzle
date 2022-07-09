import { Helmet as ReactHelmet, HelmetProvider } from 'react-helmet-async';

export function Helmet() {
    return (
        <HelmetProvider>
            <ReactHelmet>
                <meta charSet="utf-8" />
                <title>Pipe Puzzle</title>
            </ReactHelmet>
        </HelmetProvider>
    );
}
