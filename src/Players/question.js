import React, { useEffect, useState } from "react";
import  '../App.css';

const Question = ({ data, chooseAnswer, startTime }) => {
    const [sound, setSound] = useState();
    const makeChoice = (answerIndex) => {
        chooseAnswer({
            questionId: data.id,
            choice: data.answers[answerIndex],
            time: new Date().getTime() - startTime,
        });
    };
    const Answer = ({ answerIndex }) => (
        <a
            style={{ flex: 1, margin: 8, cursor : "pointer" }}
            onClick={() => makeChoice(answerIndex)}
        >
            {data.type === "image" ? (
                <img
                    src={data.answers[answerIndex]}
                    style={{ height: 200 }}
                />
            ) : (
                <p className="answer">{data.answers[answerIndex]}</p>
            )}
        </a>
    );

    useEffect(() => {
        return () => {
            if (sound) {
                console.log("Unloading Sound");
                sound.unloadAsync();
            }
        };
    }, [sound]);

    //Nous n'avons pas réussi à adapter la partie son dans le projet

    /*useEffect(() => {
        const playSound = async () => {
            const { sound } = await Audio.Sound.createAsync({
                uri: data.audio_url,
            });
            setSound(sound);
            await sound.playAsync();
        };
        playSound();
    }, [data.id]);*/
    return (
        <div>
            <p style={{ textAlign: "center", color: "white", fontSize : "28px", textDecoration : "underline" }}>
                {data.question}
            </p>
            <div
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Answer answerIndex={0} />
                <Answer answerIndex={1} />
            </div>
            <div
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <Answer answerIndex={2} />
                <Answer answerIndex={3} />
            </div>
        </div>
    );
};

export default Question;