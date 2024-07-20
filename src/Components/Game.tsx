import React, { useState } from 'react';
import { BettingOptions } from './BettingOptions';
import { Result } from './Result';

enum Choice {
    ROCK = 'ROCK',
    PAPER = 'PAPER',
    SCISSORS = 'SCISSORS'
}

const Game: React.FC = () => {
    const [balance, setBalance] = useState(5000);
    const [won, setWon] = useState(0);
    const [bet, setBet] = useState<{ choice: Choice, amount: number }[]>([]);
    const [result, setResult] = useState<{ computerChoice: Choice, win: boolean, tie: boolean } | null>(null);

    const placeBet = (choice: Choice, amount: number) => {
        const existingBetIndex = bet.findIndex(b => b.choice === choice);
        if (existingBetIndex >= 0) {
            const updatedBets = bet.slice();
            updatedBets[existingBetIndex].amount += amount;
            setBet(updatedBets);
        } else {
            setBet([...bet, { choice, amount }]);
        }
        setBalance(balance - amount);
    };

    const playGame = () => {
        setWon(0);
        const choices = [Choice.ROCK, Choice.PAPER, Choice.SCISSORS];
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];

        let win = false;
        let tie = false;
        let totalWin = 0;

        for (let b of bet) {
            if (b.choice === computerChoice) {
                tie = true;
                setBalance(balance + b.amount);
            } else if (
                (b.choice === Choice.ROCK && computerChoice === Choice.SCISSORS) ||
                (b.choice === Choice.PAPER && computerChoice === Choice.ROCK) ||
                (b.choice === Choice.SCISSORS && computerChoice === Choice.PAPER)
            ) {
                win = true;
                totalWin += b.amount * (bet.length === 1 ? 14 : 3);
            }
        }

        if (win) {
            setWon(totalWin);
            setBalance(balance + totalWin);
        }

        setResult({ computerChoice, win, tie });
        setBet([]);
    };

    return (
        <div className="">
            <div className='flex justify-center items-center lg:gap-[5rem] gap-10 bg-black'>
                <div>
                    <p className='text-amber-200 font-medium'>Balance: <span className='text-white'>{balance}</span></p>
                </div>
                <div>
                    <p className='text-amber-200 font-medium'>Total Bet: <span className='text-white'>{bet.reduce((acc, b) => acc + b.amount, 0)}</span></p>
                </div>
                <div>
                    <p className='text-amber-200 font-medium'>Win: <span className='text-white'>{won}</span></p>
                </div>
            </div>
            <div className='flex flex-col justify-center gap-5 items-center pt-40'>
                {result && <Result result={result} won={won} />}
                <BettingOptions placeBet={placeBet} bet={bet} balance={balance} />
                <button
                    onClick={playGame}
                    disabled={bet.length === 0}
                    className="mt-4 px-8 py-4 bg-black border-4 border-amber-200 text-lg rounded-full text-white disabled:bg-gray-400 disabled:border-gray-400"
                >
                    Play
                </button>
            </div>
        </div>
    );
};

export default Game;
