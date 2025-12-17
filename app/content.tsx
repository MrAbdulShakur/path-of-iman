import CharacterSelect from "./components/game/CharacterSelect";
import { useGame } from "./components/game/GameContext";
import NameEntry from "./components/game/NameEntry";
import QuizGame from "./components/game/QuizGame";
import Scoreboard from "./components/game/Scoreboard";
import useAiQuestions from "./hooks/use-questions";


const GameContent = () => {
    const { currentStep } = useGame();
    useAiQuestions();

    switch (currentStep) {
        case 'character':
            return <CharacterSelect />;
        case 'name':
            return <NameEntry />;
        case 'quiz':
            return <QuizGame />;
        case 'scoreboard':
            return <Scoreboard />;
        default:
            return <CharacterSelect />;
    }
}

export default GameContent