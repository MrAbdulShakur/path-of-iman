import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from './GameContext';
import AnswerOption from './AnswerOption';
import EmojiWatcher from './EmojiWatcher';
import SuccessModal from './SuccessModal';
import { BookOpen, Info } from 'lucide-react';
import { Badge } from '../utils/Badge';

const difficultyColors = {
    easy: 'bg-green-100 text-green-700',
    medium: 'bg-yellow-100 text-yellow-700',
    hard: 'bg-red-100 text-red-700',
};

export default function QuestionCard() {
    const { currentQuestion, currentLevel, totalLevels, recordAnswer, nextLevel, character } = useGame();
    const [attempts, setAttempts] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
    const [showSuccess, setShowSuccess] = useState<boolean|null>(null);
    const [showModal, setShowModal] = useState(false);
    const [animationKey, setAnimationKey] = useState(0);

    const isBrother = character === 'brother';

    useEffect(() => {
        (() => {
			setAttempts(0);
        setSelectedAnswers([]);
        setShowSuccess(null);
        setShowModal(false);
        setAnimationKey(prev => prev + 1);
		})()
    }, [currentLevel]);

    const handleAnswerSelect = (index: number) => {
        if (selectedAnswers.includes(index)) return;
        
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        setSelectedAnswers([...selectedAnswers, index]);

        if (index === currentQuestion?.correctAnswerIndex) {
            setShowSuccess(true);
            recordAnswer(newAttempts);
            setTimeout(() => {
                setShowModal(true);
            }, 800);
        }else{
            setShowSuccess(false);
        }
    };

    const handleContinue = () => {
        setShowModal(false);
        setShowSuccess(null);
        nextLevel();
    };

    if (!currentQuestion) return null;

    return (
        <div className="relative">
            <EmojiWatcher showSuccess={showSuccess} />
            
            <AnimatePresence mode="wait">
                <motion.div
                    key={animationKey}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl mx-auto px-4 py-8"
                >
                    {/* Question Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-center mb-8"
                    >
                        <div className="inline-flex items-center gap-3 mb-4">
                            <div className={`p-3 rounded-xl ${isBrother ? 'bg-emerald-100' : 'bg-amber-100'}`}>
                                <BookOpen className={`w-6 h-6 ${isBrother ? 'text-emerald-600' : 'text-amber-600'}`} />
                            </div>
                            <Badge className={difficultyColors[currentQuestion.difficulty]}>
                                {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
                            </Badge>
                        </div>
                        
                        <h2 className={`text-lg font-semibold mb-2 ${isBrother ? 'text-emerald-600' : 'text-amber-600'}`}>
                            {currentQuestion.levelName}
                        </h2>
                        
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                            {currentQuestion.title}
                        </h3>
                        
                        <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
                            {currentQuestion.scenario}
                        </p>
                    </motion.div>

                    {/* Info Box */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className={`flex items-center gap-3 p-4 rounded-xl mb-6 
                            ${isBrother ? 'bg-sky-50 border border-sky-100' : 'bg-amber-50 border border-amber-100'}`}
                    >
                        <Info className={`w-5 h-5 shrink-0 ${isBrother ? 'text-sky-600' : 'text-amber-600'}`} />
                        <p className={`text-sm ${isBrother ? 'text-sky-700' : 'text-amber-700'}`}>
                            {"Select the Qur'an verse that best addresses this situation"}
                        </p>
                    </motion.div>

                    {/* Answer Options */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-3"
                    >
                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                            Choose the best Ayah for this situation:
                        </h4>
                        
                        {currentQuestion.options.map((option, index) => (
                            <AnswerOption
                                key={index}
                                option={option}
                                index={index}
                                onSelect={handleAnswerSelect}
                                disabled={showSuccess || selectedAnswers.includes(index)}
                                isSelected={selectedAnswers.includes(index)}
                                isCorrect={index === currentQuestion.correctAnswerIndex}
                                showResult={selectedAnswers.includes(index)}
                                character={character}
                            />
                        ))}
                    </motion.div>
                </motion.div>
            </AnimatePresence>

            <SuccessModal
                isOpen={showModal}
                onContinue={handleContinue}
                attempts={attempts}
                currentLevel={currentLevel}
                totalLevels={totalLevels}
                question={currentQuestion}
                character={character}
            />
        </div>
    );
}