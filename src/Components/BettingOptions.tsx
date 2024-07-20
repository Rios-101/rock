import React from 'react';

enum Choice {
    ROCK = 'ROCK',
    PAPER = 'PAPER',
    SCISSORS = 'SCISSORS'
}

interface BettingOptionsProps {
    placeBet: (choice: Choice, amount: number) => void;
    bet: { choice: Choice, amount: number }[];
    balance: number;
}

const BettingOptions: React.FC<BettingOptionsProps> = ({ placeBet, bet, balance }) => {
    const handleBet = (choice: Choice) => {
        if (balance >= 500) {
            placeBet(choice, 500);
        }
    };

    const isDisabled = (choice: Choice) => {
        return bet.length >= 2 && !bet.some(b => b.choice === choice);
    };

    const getBetAmount = (choice: Choice) => {
        const foundBet = bet.find(b => b.choice === choice);
        return foundBet ? foundBet.amount : 0;
    };

    return (
        <div className="p-4">
            <h2 className='text-center text-lg text-amber-200 py-4'>Pick Your Positions</h2>
            <div className="flex gap-5 items-center justify-around mb-4">
                <button
                    onClick={() => handleBet(Choice.ROCK)}
                    disabled={isDisabled(Choice.ROCK)}
                    className={`flex flex-col justify-center items-center w-[150px] h-[130px] rounded text-white ${getBetAmount(Choice.ROCK) > 0 ? 'bg-blue-900 font-bold text-blue-500' : 'bg-blue-500 text-white'} disabled:bg-blue-950 disabled:border-blue-700 disabled:border `}
                >
                    {getBetAmount(Choice.ROCK) > 0 && <div className='p-1 w-fit rounded-full text-black border-4 border-blue-700 bg-white'>{getBetAmount(Choice.ROCK)}</div>}
                    Rock
                </button>
                <button
                    onClick={() => handleBet(Choice.PAPER)}
                    disabled={isDisabled(Choice.PAPER)}
                    className={`flex flex-col justify-center items-center w-[150px] h-[130px] rounded text-white ${getBetAmount(Choice.PAPER) > 0 ? 'bg-green-900 font-bold text-green-500' : 'bg-green-500 text-white'} disabled:bg-green-950 disabled:border-green-700 disabled:border `}
                >
                    {getBetAmount(Choice.PAPER) > 0 && <div className='p-1 w-fit rounded-full text-black border-4 border-blue-700 bg-white'>{getBetAmount(Choice.PAPER)}</div>}

                    Paper
                </button>
                <button
                    onClick={() => handleBet(Choice.SCISSORS)}
                    disabled={isDisabled(Choice.SCISSORS)}
                    className={`flex flex-col justify-center items-center w-[150px] h-[130px] rounded  ${getBetAmount(Choice.SCISSORS) > 0 ? 'bg-red-900 font-bold text-red-500' : 'bg-red-500 text-white'} disabled:bg-red-950 disabled:border-red-700 disabled:border `}
                >
                    {getBetAmount(Choice.SCISSORS) > 0 && <div className='p-1 w-fit rounded-full text-black border-4 border-blue-700 bg-white'>{getBetAmount(Choice.SCISSORS)}</div>}
                    Scissors
                </button>
            </div>
        </div>
    );
};

export { BettingOptions };
