import { PipePuzzleHeader } from 'components/PipePuzzleHeader/PipePuzzleHeader';
import { PipeGrid } from 'components/PipeGrid/PipeGrid';
import { PipePuzzleFooter } from 'components/PipePuzzleFooter/PipePuzzleFooter';

export function PipePuzzle() {
    return (
        <>
            <PipePuzzleHeader />
            <PipeGrid />
            <PipePuzzleFooter />
        </>
    );
}
