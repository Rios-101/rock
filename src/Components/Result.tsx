import React from 'react';

enum Choice {
    ROCK = 'ROCK',
    PAPER = 'PAPER',
    SCISSORS = 'SCISSORS'
}

interface ResultProps {
    result: { computerChoice: Choice, win: boolean, tie: boolean };
    won: number;
}

const Result: React.FC<ResultProps> = ({ result, won }) => {
    return (
        <>
            <div className="mt-4">
                <h3 className={`text-6xl font-semibold ${result.win ? 'text-green-500' : 'text-red-500'}`}>{result.computerChoice} {result.tie ? 'Tied' : 'Won'}</h3>
                <h3 className="text-3xl font-semibold text-center pt-4 text-amber-200">{result.win ? `You Win ${won}` : result.tie ? 'It\'s a Tie' : `You Lose ${won}`}</h3>
            </div>
        </>
    );
};

export { Result };
