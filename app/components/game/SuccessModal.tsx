import { motion, AnimatePresence } from 'framer-motion';
import { Star, Sparkles, Lightbulb, ArrowRight } from 'lucide-react';
import { Question } from './GameContext';

type Props = {
	isOpen: boolean;
	onContinue: () => void;
	attempts: number;
	currentLevel: number;
	totalLevels: number;
	question: Question;
	character: string|null;
}

export default function SuccessModal({ 
    isOpen, 
    onContinue, 
    attempts, 
    currentLevel, 
    totalLevels,
    question,
    character 
}: Props) {
    if (!isOpen || !question) return null;

    const stars = Math.max(1, (+process.env.NEXT_PUBLIC_TOTAL_POSSIBLE_ANSWERS!+1) - attempts);
    const nextLevelName = currentLevel < totalLevels 
        ? `Level ${currentLevel + 1}` 
        : 'See Results';
    const isBrother = character === 'brother';
    const correctAnswer = question.options[question.correctAnswerIndex];

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                onClick={onContinue}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    transition={{ type: "spring", damping: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-x-hidden overflow-y-scroll max-h-screen"
                >
                    {/* Header */}
                    <div className={`p-6 text-center text-white ${isBrother ? 'bg-linear-to-br from-emerald-500 to-emerald-600' : 'bg-linear-to-br from-amber-500 to-amber-600'}`}>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="inline-flex p-4 bg-white/20 rounded-full mb-4"
                        >
                            <Sparkles className="w-8 h-8" />
                        </motion.div>
                        
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-3xl font-bold mb-2"
                        >
                            Well Done!
                        </motion.h2>
                        
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-white/90"
                        >
                            {question.levelName} Complete
                        </motion.p>

                        {/* Stars */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex justify-center gap-1 mt-4"
                        >
                            {Array.from({ length: +process.env.NEXT_PUBLIC_TOTAL_POSSIBLE_ANSWERS! }, (_, i) => i+1).map((star) => (
                                <motion.div
                                    key={star}
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: 0.5 + star * 0.1, type: "spring" }}
                                >
                                    <Star 
                                        className={`w-8 h-8 ${star <= stars ? 'text-yellow-300 fill-yellow-300' : 'text-white/30'}`}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        {/* Correct Answer */}
                        <div className="bg-gray-50 rounded-2xl p-4">
                            <p className="text-sm text-gray-500 mb-2 font-medium">The correct answer was:</p>
                            <p className="text-gray-800 font-medium italic">
                                {correctAnswer.verse}
                            </p>
                            <p className={`text-sm mt-2 font-medium ${isBrother ? 'text-emerald-600' : 'text-amber-600'}`}>
                                — {correctAnswer.reference}
                            </p>
                        </div>

                        <div className="border-t border-gray-100" />

                        {/* Explanation */}
                        <div>
                            <div className="flex items-center gap-2 text-amber-600 mb-3">
                                <Lightbulb className="w-5 h-5" />
                                <span className="font-semibold">Why this verse?</span>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                                {question.explanation}
                            </p>
                        </div>

                        {/* Continue Button */}
                        <button
                            onClick={onContinue}
                            className={`flex justify-center items-center w-full h-14 rounded-xl text-white font-medium text-lg 
                                hover:shadow-xl transition-all duration-300
                                ${isBrother 
                                    ? 'bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-200' 
                                    : 'bg-amber-600 hover:bg-amber-700 shadow-lg shadow-amber-200'}`}
                        >
                            Continue to {nextLevelName}
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}