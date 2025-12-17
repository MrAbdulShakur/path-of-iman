
import ProgressHeader from './ProgressHeader';
import QuestionCard from './QuestionCard';
import LoadingScreen from './LoadingScreen';
import { useGame } from './GameContext';
import { useEffect } from 'react';



export default function QuizGame() {
	const { questions, isLoading, currentLevel, setCurrentQuestion } = useGame();

	useEffect(() => {
		(() => {
			if (questions[currentLevel - 1]?.id) {
				setCurrentQuestion(questions[currentLevel - 1]);
			}
		})()
	})

	if ((isLoading && !questions[currentLevel - 1]?.id) || questions.length === 0) {
		return <LoadingScreen />;
	}

	return (
		<div className="min-h-screen bg-linear-to-b from-[#FEFDFB] via-white to-emerald-50/30">
			<ProgressHeader />
			<QuestionCard />
		</div>
	);
}