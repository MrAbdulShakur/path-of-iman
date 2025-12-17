import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from './GameContext';
import { RotateCcw, User } from 'lucide-react';
import { Button } from '../utils/Button';

export default function ProgressHeader() {
    const { currentLevel, totalLevels, playerName, resetGame, answers, character } = useGame();
    
    const progressPercent = Math.round((currentLevel / totalLevels) * 100);
    const isBrother = character === 'brother';

    return (
        <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40">
            <div className="max-w-4xl mx-auto px-4 py-4">
                {/* Top row */}
                <div className="flex items-center justify-between mb-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={resetGame}
                        className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                    >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Start Over
                    </Button>
                    
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full">
                        <User className={`w-4 h-4 ${isBrother ? 'text-emerald-600' : 'text-amber-600'}`} />
                        <span className="text-sm text-gray-600">
                            Playing as: <span className="font-semibold text-gray-900">{playerName}</span>
                        </span>
                    </div>
                </div>

                {/* Progress section */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-gray-700">
                            Level {currentLevel} of {totalLevels}
                        </span>
                        <span className={`font-semibold ${isBrother ? 'text-emerald-600' : 'text-amber-600'}`}>
                            {progressPercent}% Complete
                        </span>
                    </div>

                    {/* Progress bar */}
                    <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercent}%` }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className={`absolute inset-y-0 left-0 rounded-full ${isBrother ? 'bg-linear-to-r from-emerald-500 to-emerald-400' : 'bg-linear-to-r from-amber-500 to-amber-400'}`}
                        />
                    </div>

                    {/* Level circles */}
                    <div className="flex items-center justify-between gap-1 overflow-x-auto py-2 scrollbar-hide px-2">
                        {Array.from({ length: totalLevels }, (_, i) => {
                            const level = i + 1;
                            const answer = answers.find(a => a.level === level);
                            const isCurrent = level === currentLevel;
                            const isCompleted = answer !== undefined;
                            
                            let bgColor = 'bg-gray-200';
                            if (isCompleted) {
                                const stars = Math.max(1, (+process.env.NEXT_PUBLIC_TOTAL_POSSIBLE_ANSWERS! + 1) - answer.attempts);
                                if (stars >= +process.env.NEXT_PUBLIC_TOTAL_POSSIBLE_ANSWERS!) bgColor = isBrother ? 'bg-emerald-500' : 'bg-amber-500';
                                else if (stars >= +process.env.NEXT_PUBLIC_TOTAL_POSSIBLE_ANSWERS! - 1) bgColor = isBrother ? 'bg-emerald-400' : 'bg-amber-400';
                                else if (stars >= +process.env.NEXT_PUBLIC_TOTAL_POSSIBLE_ANSWERS! - 2) bgColor = 'bg-yellow-400';
                                else bgColor = 'bg-orange-400';
                            }
                            
                            let currentStyles = '';
                            if (isCurrent) {
                                currentStyles = isBrother 
                                    ? 'ring-2 ring-emerald-400 ring-offset-2 bg-emerald-100 text-emerald-700'
                                    : 'ring-2 ring-amber-400 ring-offset-2 bg-amber-100 text-amber-700';
                            }
                            
                            return (
                                <motion.div
                                    key={level}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: i * 0.02 }}
                                    className={`
                                        shrink-0 w-6 h-6 rounded-full flex items-center justify-center
                                        text-xs font-medium transition-all duration-300
                                        ${currentStyles}
                                        ${isCompleted ? `${bgColor} text-white` : 'text-gray-400'}
                                    `}
                                >
                                    {level}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}