import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useGame } from './GameContext';
import { 
    Trophy, Clock, Target, AlertTriangle, Star, 
    RotateCcw
} from 'lucide-react';
import { getRank } from '@/app/lib/utils';


export default function Scoreboard() {
    const { answers, totalLevels, startTime, endTime, resetGame, playerName, character } = useGame();
    // const audioRef = useRef(null);
    
    const isBrother = character === 'brother';
    
    const totalTime = useMemo(() => {
  if (!startTime || !endTime) return 0;
  return endTime - startTime;
}, [startTime, endTime]);

    const minutes = Math.floor(totalTime / 60000);
    const seconds = Math.floor((totalTime % 60000) / 1000);
    
    const totalScore = answers.reduce((sum, a) => sum + Math.max(1, (+process.env.NEXT_PUBLIC_TOTAL_POSSIBLE_ANSWERS!+1) - a.attempts), 0);
    const maxScore = totalLevels * +process.env.NEXT_PUBLIC_TOTAL_POSSIBLE_ANSWERS!;
    const failedAttempts = answers.reduce((sum, a) => sum + (a.attempts - 1), 0);
    
    const rank = getRank(totalScore, totalLevels, failedAttempts, minutes);
    const RankIcon = rank.icon;

    useEffect(() => {
        // Play completion sound
        const playSound = async () => {
            try {
                const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3');
                audio.volume = 0.5;
                await audio.play();
            } catch {
                console.log('Audio autoplay prevented');
            }
        };
        playSound();
    }, []);

    const stats = [
        {
            icon: Target,
            label: 'Questions Answered',
            value: answers.length,
            bgColor: 'bg-emerald-100',
            iconColor: 'text-emerald-600',
        },
        {
            icon: Clock,
            label: 'Time Taken',
            value: `${minutes}m ${seconds}s`,
            bgColor: 'bg-blue-100',
            iconColor: 'text-blue-600',
        },
        {
            icon: AlertTriangle,
            label: 'Failed Attempts',
            value: failedAttempts,
            bgColor: 'bg-orange-100',
            iconColor: 'text-orange-600',
        },
        {
            icon: Star,
            label: 'Total Score',
            value: `${totalScore}/${maxScore}`,
            bgColor: 'bg-yellow-100',
            iconColor: 'text-yellow-600',
        },
    ];

    
    return (
        <div className="min-h-screen bg-linear-to-b from-[#FEFDFB] via-white to-emerald-50/30 py-12 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto"
            >
                {/* Header */}
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                        className={`inline-flex p-6 rounded-full mb-6 ${isBrother ? 'bg-linear-to-br from-emerald-100 to-emerald-200' : 'bg-linear-to-br from-amber-100 to-amber-200'}`}
                    >
                        <Trophy className={`w-16 h-16 ${isBrother ? 'text-emerald-600' : 'text-amber-600'}`} />
                    </motion.div>
                    
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl font-bold text-gray-900 mb-2"
                    >
                        Journey Complete!
                    </motion.h1>
                    
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-gray-500 text-lg"
                    >
                        {`Masha'Allah, ${playerName}! You've completed all ${totalLevels} levels.`}
                    </motion.p>
                </div>

                {/* Rank Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className={`rounded-3xl p-8 text-white text-center mb-8 shadow-xl ${isBrother ? 'bg-linear-to-br from-emerald-500 to-emerald-600' : 'bg-linear-to-br from-amber-500 to-amber-600'}`}
                >
                    <div className="flex justify-center mb-4">
                        <div className="p-4 bg-white/20 rounded-full">
                            <RankIcon className="w-12 h-12" />
                        </div>
                    </div>
                    <p className="text-white/80 mb-2">Your Rank</p>
                    <h2 className="text-3xl font-bold">{rank.title}</h2>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                        >
                            <div className={`inline-flex p-3 rounded-xl ${stat.bgColor} mb-4`}>
                                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                            </div>
                            <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                            <p className="text-gray-500 text-sm">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Stars breakdown */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8"
                >
                    <h3 className="font-semibold text-gray-900 mb-4">Performance Breakdown</h3>
                    <div className="space-y-3">
                        {Array.from({ length: +process.env.NEXT_PUBLIC_TOTAL_POSSIBLE_ANSWERS! }, (_, i) => (+process.env.NEXT_PUBLIC_TOTAL_POSSIBLE_ANSWERS!) - i).map((starCount) => {
                            const count = answers.filter(a => Math.max(1, (+process.env.NEXT_PUBLIC_TOTAL_POSSIBLE_ANSWERS!+1) - a.attempts) === starCount).length;

                            return (
                                <div key={starCount} className="flex items-center gap-3">
                                    <div className="flex gap-0.5">
                                        {Array.from({ length: +process.env.NEXT_PUBLIC_TOTAL_POSSIBLE_ANSWERS! }, (_, i) => {
                                            return (
                                            <Star 
                                                key={i}
                                                className={`w-4 h-4 ${i < starCount ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`}
                                            />
                                        )
                                        })}
                                    </div>
                                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div 
                                            className={`h-full rounded-full transition-all duration-500 ${isBrother ? 'bg-emerald-400' : 'bg-amber-400'}`}
                                            style={{ width: `${(count / totalLevels) * 100}%` }}
                                        />
                                    </div>
                                    <span className="text-sm text-gray-600 w-8 text-right">{count}</span>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Play Again Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                >
                    <button
                        onClick={resetGame}
                        className={`w-full h-14 flex items-center justify-center rounded-xl text-white font-medium text-lg 
                            hover:shadow-xl transition-all duration-300
                            ${isBrother 
                                ? 'bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-200' 
                                : 'bg-amber-600 hover:bg-amber-700 shadow-lg shadow-amber-200'}`}
                    >
                        <RotateCcw className="w-5 h-5 mr-2" />
                        Start New Journey
                    </button>
                </motion.div>

                {/* Footer verse */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                    className="text-center text-gray-500 italic mt-8 text-sm"
                >
                    {`"So remember Me; I will remember you." — Al-Baqarah 2:152`}
                </motion.p>
            </motion.div>
        </div>
    );
}