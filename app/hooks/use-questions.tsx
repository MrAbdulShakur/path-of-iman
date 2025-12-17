import { useEffect } from 'react'
import { generateAiQuestion } from '../actions/generate-questions';
import { useGame } from '../components/game/GameContext';

const levelNames = [
	"The Opening", "Trust in Allah", "Patience in Trial", "Gratitude", "Forgiveness",
	"Honesty", "Kindness to Parents", "Charity", "Justice", "Humility",
	"Brotherhood", "Perseverance", "Repentance", "Tawakkul", "Mercy",
	"Truthfulness", "Self-Control", "Hope", "Fear of Allah", "Love for Others",
	"Good Character", "Contentment", "Sincerity", "Modesty", "Wisdom",
	"Steadfastness", "Reflection", "Dua", "Community", "The Journey Home"
];

const difficulties = ['easy', 'easy', 'easy', 'easy', 'easy',
	'medium', 'medium', 'medium', 'medium', 'medium',
	'medium', 'medium', 'medium', 'medium', 'medium',
	'hard', 'hard', 'hard', 'hard', 'hard',
	'hard', 'hard', 'hard', 'hard', 'hard',
	'hard', 'hard', 'hard', 'hard', 'hard'];


const useAiQuestions = () => {
	const { questions, setQuestions, setLoading, setCurrentQuestion, setPlayerCountry, setError, character, playerName, playerCountry, currentLevel } = useGame();

	useEffect(() => {
		(async () => {
			const res = await fetch("https://ipapi.co/json/");
			const data = await res.json();

			console.log("country data ==> ", data)

			setPlayerCountry(data.country_name)
		})()
	}, [setPlayerCountry]);

// load first question
	useEffect(() => {
		(async () => {
			if (playerName && currentLevel === 1 && questions.length === 0) {
				setLoading(true)
				try {
					const level = levelNames[currentLevel - 1];
					const difficulty = difficulties[currentLevel - 1];

					const response = await generateAiQuestion(difficulty, level, character || 'brother', playerName, playerCountry);
					console.log("first level ==> ", { response })
					if (response.question) {
						setQuestions([...questions, response.question]);
						setCurrentQuestion(response.question);
					}
				} catch (error) {
					console.error('Error generating questions:', error);
					setError('Failed to generate questions. Please try again.');
				}
				setLoading(false)
			}
		})()
	}, [character, setError, setLoading, setQuestions, playerName, playerCountry, currentLevel, questions, setCurrentQuestion]);

	// load other questions
	useEffect(() => {
		(async () => {
			if (playerName && currentLevel >= 1 && questions.length === currentLevel) {
				setLoading(true)
				try {
					const level = levelNames[currentLevel];
					const difficulty = difficulties[currentLevel];

					const response = await generateAiQuestion(difficulty, level, character || 'brother', playerName, playerCountry);
					console.log("other levels ===> ", { response })
					if (response.question) {
						setQuestions([...questions, response.question]);
					}
				} catch (error) {
					console.error('Error generating questions:', error);
					setError('Failed to generate questions. Please try again.');
				}
				setLoading(false)
			}
		})()
	}, [character, setError, setLoading, setQuestions, playerName, playerCountry, currentLevel, questions]);

	return {}
}

export default useAiQuestions