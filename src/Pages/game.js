import React, { useState } from "react";
import api from "../apiHelper";
import { useDispatch } from "react-redux";
import Gameplay from "../Players/gameplay";
import { incrementPlayerNbPlayed } from "../Players/playerActions";
import  '../App.css';

const Game = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [score, setScore] = useState(-1);
    const dispatch = useDispatch();
    const getNewGame = () => {
        // Call /questions on the API
        api.getQuestions().then((questions) => {
            console.log(questions)
            if (questions === null) {
                // There was an error
            } else {
                setAnswers([]);
                setScore(-1);
                setQuestions(questions);
                console.log(questions);
            }
        });
    };
    const finishGame = async (answers) => {
        const score = await api.submitAnswers(answers);
        setScore(score);
        setAnswers(answers);
        console.log("Score:", score);
        dispatch(incrementPlayerNbPlayed());
    };
    return (
        <div
            style={{
                justifyContent: "flex-start",
                alignItems: "center",
                flex: 1,
                padding: 32,
            }}
        >
            <h1 className="title">
                Blind Test
            </h1>
            {answers && answers.length > 0 ? (
                <div>
                    <p style={{color: "white"}}>Votre score : {score}</p>
                    <p style={{color: "white"}}>Merci d'avoir joué</p>
                    <button className="btn-game" onClick={() => getNewGame()}>Rejouer</button>
                </div>
            ) : questions && questions.length > 0 ? (
                <Gameplay questions={questions} finishGame={finishGame} />
            ) : (
                <button className="btn-game" onClick={() => getNewGame()}>Lancer la partie</button>
            )}
        </div>
    );
};

export default Game;