import { motion } from 'framer-motion';
import { useGame } from './GameContext';
import { BookOpen } from 'lucide-react';
import CharacterCard from './CharacterCard';



export default function CharacterSelect() {
    const { selectCharacter } = useGame();

    return (
        <div className="min-h-screen bg-linear-to-b from-[#FEFDFB] via-white to-emerald-50/30 flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full mb-6">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-emerald-700 text-sm font-medium">Begin Your Spiritual Journey</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
                        Path of <span className="text-emerald-600">Iman</span>
                    </h1>

                    <p className="text-gray-500 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
                        {"Navigate life's challenges with the wisdom of the Holy Qur'an. Strengthen your faith, one verse at a time 😄."}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }} className="text-center mb-10">
                    <h2 className="text-xl text-slate-700 font-medium mb-2">Choose Your Character</h2>
                    <p className="text-slate-400 text-sm">Begin your journey of Iman</p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl">
                    <CharacterCard
                        title="Brother in Islam"
                        description="Walk the path of a faithful Muslim"
                        icon={({ className }) => (
                            <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="12" cy="7" r="4" />
                                <path d="M5 21v-2a7 7 0 0114 0v2" />
                                <path d="M12 3v1" />
                            </svg>
                        )}
                        isBrother={true}
                        onClick={() => selectCharacter('brother')}
                    />

                    <CharacterCard
                        title="Sister in Islam"
                        description="Walk the path of a faithful Muslimah"
                        icon={({ className }) => (
                            <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="12" cy="7" r="4" />
                                <path d="M5 21v-2a7 7 0 0114 0v2" />
                                <path d="M8 3c0 0 2 2 4 2s4-2 4-2" />
                            </svg>
                        )}
                        isBrother={false}
                        onClick={() => selectCharacter('sister')}
                    />
                </div>
            </div>

            <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="py-8 px-6 border-t border-gray-100 bg-white/50 backdrop-blur-sm"
            >
                <div className="max-w-2xl mx-auto text-center">
                    <BookOpen className="w-5 h-5 text-emerald-600 mx-auto mb-3" />
                    <p className="text-gray-600 italic text-base leading-relaxed">
                        {`"This is the Book about which there is no doubt, a guidance for those conscious of Allah."`}
                    </p>
                    <p className="text-emerald-600 text-sm mt-2 font-medium">— Al-Baqarah 2:2</p>
                </div>
            </motion.footer>
        </div>
    );
}