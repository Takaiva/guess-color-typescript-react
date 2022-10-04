import React, { useEffect, useState } from 'react';
import './App.scss';

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

enum Result {
    Correct,
    Wrong
}

function App() {
    const [color, setColor] = useState("black");
    const [answers, setAnswers] = useState<string[]>([]);
    const [result, setResult] = useState<Result | undefined>(undefined);


    const generateColors = () => {
        const actualColor = getRandomColor();
        setColor(actualColor);
        setAnswers([actualColor, getRandomColor(), getRandomColor()].sort(() => 0.5 - Math.random()));
    }



    useEffect(() => {
        generateColors();
    }, []);

    function handleAnswerClicked(answer: string) {
        if (answer === color) {
            setResult(Result.Correct);
            generateColors();
        } else {
            setResult(Result.Wrong);
        }
    }

  return (
    <div className="App">
        <div>
            <div className="guess-me" style={{ background: color }}></div>
            {answers.map((answer) => (
                <button onClick={() => handleAnswerClicked(answer)}>{answer}</button>
            ))}
            {result === Result.Correct ? <div className="right">Correct answer!</div> : <div className="wrong">Wrong answer!</div>}
        </div>
    </div>
  );
}

export default App;
