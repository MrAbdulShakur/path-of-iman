import React, { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from './GameContext';
import { ArrowLeft, Sparkles, User } from 'lucide-react';
import { Input } from '../utils/Input';
import { Button } from '../utils/Button';

export default function NameEntry() {
	const { character, playerName, setPlayerName, startJourney, goBack } = useGame();
	const [name, setName] = useState(playerName);
	const [isFocused, setIsFocused] = useState(false);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (name.trim()) {
			setPlayerName(name.trim());
			startJourney();
		}
	};

	const characterLabel = character === 'brother' ? 'Brother' : 'Sister';
	const isBrother = character === 'brother';

	return (
		<div className="min-h-screen bg-linear-to-b from-[#FEFDFB] via-white to-emerald-50/30 flex flex-col items-center justify-center px-6 py-12">
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5 }}
				className="w-full max-w-md"
			>
				<div className="text-center mb-10">
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
						className={`inline-flex p-5 rounded-full mb-6 ${isBrother ? 'bg-emerald-50' : 'bg-amber-50'}`}
					>
						<User className={`w-10 h-10 ${isBrother ? 'text-emerald-600' : 'text-amber-600'}`} />
					</motion.div>

					<motion.h1
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
						className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
					>
						Welcome, {characterLabel}
					</motion.h1>

					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.4 }}
						className="text-gray-500 text-lg"
					>
						What shall we call you on this journey?
					</motion.p>
				</div>

				<motion.form
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5 }}
					onSubmit={handleSubmit}
					className="space-y-6"
				>
					<div className="relative">
						<div className={`absolute inset-0 rounded-2xl blur-xl transition-opacity duration-300 
                            ${isFocused ? 'opacity-100' : 'opacity-0'}
                            ${isBrother ? 'bg-emerald-200/50' : 'bg-amber-200/50'}`} />
						<Input
							type="text"
							placeholder="Enter your name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							onFocus={() => setIsFocused(true)}
							onBlur={() => setIsFocused(false)}
							className={`relative w-full h-14 px-6 text-lg rounded-xl border-2 
                                border-gray-200 bg-white shadow-sm transition-all duration-300
                                ${isBrother ? 'focus:border-emerald-400 focus:ring-emerald-100' : 'focus:border-amber-400 focus:ring-amber-100'}`}
						/>
					</div>

					<div className="flex gap-4">
						<Button
							type="button"
							variant="outline"
							onClick={goBack}
							className="flex-1 h-14 rounded-xl border-2 border-gray-200 
                                hover:bg-gray-50 transition-all duration-300"
						>
							<ArrowLeft className="w-5 h-5 mr-2" />
							Back
						</Button>

						<Button
							type="submit"
							disabled={!name.trim()}
							className={`flex-1 h-14 rounded-xl text-white font-medium
                                transition-all duration-300 disabled:opacity-50 disabled:shadow-none
                                ${isBrother
									? 'bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300'
									: 'bg-amber-600 hover:bg-amber-700 shadow-lg shadow-amber-200 hover:shadow-xl hover:shadow-amber-300'}`}
						>
							<Sparkles className="w-5 h-5 mr-2" />
							Begin Journey
						</Button>
					</div>
				</motion.form>

				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.7 }}
					className="text-center text-gray-400 text-sm mt-8"
				>
					{`${process.env.NEXT_PUBLIC_TOTAL_LEVELS} levels of spiritual growth await you`}
				</motion.p>
			</motion.div>
		</div>
	);
}