import React, {
	createContext,
	useContext,
	useState,
	useCallback,
	ReactNode,
} from 'react';

/* ----------------------------------
   Types
----------------------------------- */

type Answer = {
	level: number;
	attempts: number;
	correct: boolean;
	timeSpent: number;
};

export type QuestionOption = {
		verse: string;
		reference: string;
	}

export type Question = {
	id: string;
	correctAnswerIndex: number;
	levelName: string;
	title: string;
	scenario: string;
	difficulty: 'easy' | 'medium' | 'hard';
	explanation: string;
	options: QuestionOption[];
	// add more fields as needed
};

type GameStateType = {
	currentStep: 'character' | 'name' | 'quiz' | 'scoreboard';
	character: string | null;
	playerName: string;
	playerCountry: string;
	currentLevel: number;
	totalLevels: number;
	questions: Question[];
	currentQuestion: Question | null;
	answers: Answer[];
	startTime: number | null;
	endTime: number | null;
	levelStartTime: number | null;
	isLoading: boolean;
	error: string | null;
};

type GameContextType = GameStateType & {
	selectCharacter: (character: string | null) => void;
	setPlayerName: (name: string) => void;
	setPlayerCountry: (country: string) => void;
	startJourney: () => void;
	goBack: () => void;
	setQuestions: (questions: Question[]) => void;
	setCurrentQuestion: (question: Question) => void;
	recordAnswer: (attempts: number) => void;
	nextLevel: () => void;
	resetGame: () => void;
	setLoading: (isLoading: boolean) => void;
	setError: (error: string | null) => void;
};

/* ----------------------------------
   Context
----------------------------------- */

const GameContext = createContext<GameContextType | null>(null);

export const useGame = () => {
	const context = useContext(GameContext);
	if (!context) {
		throw new Error('useGame must be used within a GameProvider');
	}
	return context;
};

/* ----------------------------------
   Provider
----------------------------------- */

export const GameProvider = ({ children }: { children: ReactNode }) => {
	const [gameState, setGameState] = useState<GameStateType>({
		currentStep: 'character',
		character: null,
		playerName: '',
		playerCountry: '',
		currentLevel: 1,
		totalLevels: +process.env.NEXT_PUBLIC_TOTAL_LEVELS!,
		questions: [],
		currentQuestion: null,
		answers: [],
		startTime: null,
		endTime: null,
		levelStartTime: null,
		isLoading: false,
		error: null,
	});

	const selectCharacter = useCallback((character: string | null) => {
		setGameState(prev => ({ ...prev, character, currentStep: 'name' }));
	}, []);

	const setPlayerName = useCallback((name: string) => {
		setGameState(prev => ({ ...prev, playerName: name }));
	}, []);

	const setPlayerCountry = useCallback((country: string) => {
		setGameState(prev => ({ ...prev, playerCountry: country }));
	}, []);

	const startJourney = useCallback(() => {
		const now = Date.now();
		setGameState(prev => ({
			...prev,
			currentStep: 'quiz',
			startTime: now,
			levelStartTime: now,
			currentLevel: 1,
			answers: [],
		}));
	}, []);

	const goBack = useCallback(() => {
		setGameState(prev => ({
			...prev,
			currentStep: 'character',
			character: null,
			playerName: '',
		}));
	}, []);

	const setQuestions = useCallback((questions: Question[]) => {
		setGameState(prev => ({
			...prev,
			questions
		}));
	}, []);

	const setCurrentQuestion = useCallback((question: Question) => {
		setGameState(prev => ({
			...prev,
			currentQuestion: question
		}));
	}, []);

	const recordAnswer = useCallback((attempts: number) => {
		setGameState(prev => {
			const timeSpent =
				Date.now() - (prev.levelStartTime ?? Date.now());

			return {
				...prev,
				answers: [
					...prev.answers,
					{
						level: prev.currentLevel,
						attempts,
						correct: true,
						timeSpent,
					},
				],
			};
		});
	}, []);

	const nextLevel = useCallback(() => {
		setGameState(prev => {
			const nextLevelNum = prev.currentLevel + 1;

			if (nextLevelNum > prev.totalLevels) {
				return {
					...prev,
					currentStep: 'scoreboard',
					endTime: Date.now(),
				};
			}

			return {
				...prev,
				currentLevel: nextLevelNum,
				currentQuestion: prev.questions[nextLevelNum - 1] ?? null,
				levelStartTime: Date.now(),
			};
		});
	}, []);

	const resetGame = useCallback(() => {
		setGameState({
			currentStep: 'character',
			character: null,
			playerName: '',
			playerCountry: '',
			currentLevel: 1,
			totalLevels: +process.env.NEXT_PUBLIC_TOTAL_LEVELS!,
			questions: [],
			currentQuestion: null,
			answers: [],
			startTime: null,
			endTime: null,
			levelStartTime: null,
			isLoading: false,
			error: null,
		});
	}, []);

	const setLoading = useCallback((isLoading: boolean) => {
		setGameState(prev => ({ ...prev, isLoading }));
	}, []);

	const setError = useCallback((error: string | null) => {
		setGameState(prev => ({ ...prev, error, isLoading: false }));
	}, []);

	return (
		<GameContext.Provider
			value={{
				...gameState,
				selectCharacter,
				setPlayerName,
				setPlayerCountry,
				startJourney,
				goBack,
				setQuestions,
				setCurrentQuestion,
				recordAnswer,
				nextLevel,
				resetGame,
				setLoading,
				setError,
			}}
		>
			{children}
		</GameContext.Provider>
	);
};
