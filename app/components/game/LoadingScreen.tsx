import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

export default function LoadingScreen() {
    return (
        <div className="min-h-screen bg-linear-to-b from-[#FEFDFB] via-white to-emerald-50/30 flex flex-col items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
            >
                <motion.div
                    animate={{ 
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="inline-flex p-6 rounded-full bg-emerald-100 mb-8"
                >
                    <BookOpen className="w-12 h-12 text-emerald-600" />
                </motion.div>

                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    Preparing Your Journey
                </h2>
                
                <p className="text-gray-500 mb-4">
                    {"Gathering wisdom from the Qur'an..."}
                </p>

                <div className="flex justify-center gap-2">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            animate={{ 
                                y: [0, -10, 0],
                                opacity: [0.3, 1, 0.3]
                            }}
                            transition={{ 
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.2
                            }}
                            className="w-3 h-3 bg-emerald-500 rounded-full"
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    );
}