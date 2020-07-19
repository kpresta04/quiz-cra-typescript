import React, { useState } from "react";
import QuestionCard from "../src/components/QuestionCard";
import { fetchQuizQuestions, Difficulty, QuestionState } from "./API";

type AnswerObject = {
	question: string;
	answer: string;
	correct: boolean;
	correctAnswer: string;
};

function App() {
	const [loading, setLoading] = useState(false);
	const [questions, setQuestions] = useState<QuestionState[]>([]);
	const [number, setNumber] = useState(0); //question number
	const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
	const [score, setScore] = useState(0);
	const [gameOver, setGameOver] = useState(true);
	const TOTAL_QUESTIONS = 10;
	const startTrivia = async () => {
		setLoading(true);
		setGameOver(false);

		try {
			const newQuestions = await fetchQuizQuestions(
				TOTAL_QUESTIONS,
				Difficulty.EASY
			);

			setQuestions(newQuestions);
			setScore(0);
			setUserAnswers([]);
			setNumber(0);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {};
	const nextQuestion = () => {};
	return (
		<div className="App">
			<h1>React Quiz</h1>
			<button className="start" onClick={startTrivia}>
				Start
			</button>
			<p className="score ">Score: </p>
			{loading && <p>Loading Questions...</p>}
			{/* <QuestionCard
				questionNumber={number + 1}
				totalQuestions={TOTAL_QUESTIONS}
				question={questions[number].question}
				answers={questions[number].answers}
				userAnswer={userAnswers ? userAnswers[number] : undefined}
				callback={checkAnswer}
			/> */}
			<button className="next" onClick={nextQuestion}>
				Next Question
			</button>
		</div>
	);
}

export default App;
