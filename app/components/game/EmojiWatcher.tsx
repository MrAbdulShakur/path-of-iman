import { motion, AnimatePresence } from 'framer-motion';

export default function EmojiWatcher({ showSuccess }: { showSuccess: boolean|null }) {
    return (
        <div className="fixed top-32 left-4 z-50 translate-y-1/2">
            <AnimatePresence mode="wait">
                {showSuccess ? (
                    <motion.div
                        key="success"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        className="flex flex-col items-center"
                    >
                        <div className="text-5xl mb-2">😊</div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-emerald-500 text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-lg"
                        >
                            🎉 Alhamdulillah!
                        </motion.div>
                    </motion.div>
                ) : (
                    showSuccess === false ? (
                        <motion.div
                        key="warning"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        className="flex flex-col items-center"
                    >
                        <div className="text-5xl mb-2">😰</div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-amber-500 text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-lg"
                        >
                            🔥 Subahanallah!
                        </motion.div>
                    </motion.div>
                    ) : (
                        <motion.div
                        key="watching"
                        initial={{ scale: 0 }}
                        animate={{ 
                            scale: 1,
                            y: [0, -5, 0],
                        }}
                        transition={{ 
                            scale: { duration: 0.3 },
                            y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                        }}
                        className="text-5xl"
                    >
                        🤔
                    </motion.div>
                    )
                )}
            </AnimatePresence>
        </div>
    );
}