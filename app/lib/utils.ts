import { Award, Crown, Star, Target, Trophy, Zap } from "lucide-react";
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cn = (...inputs: any[]) => {
  return twMerge(clsx(inputs))
}

export const getRank = (score: number, totalQuestions: number, failedAttempts: number, timeMinutes: number) => {
	const maxScore = totalQuestions * 5;
	const scorePercent = (score / maxScore) * 100;
	const avgAttemptsPerQuestion = failedAttempts / totalQuestions;
	const speedBonus = timeMinutes < 10 ? 20 : timeMinutes < 20 ? 10 : 0;
	
	const finalScore = scorePercent + speedBonus - (avgAttemptsPerQuestion * 5);
	
	if (finalScore >= 95) return { title: "Scholar of the Qur'an", icon: Crown, color: 'text-yellow-500' };
	if (finalScore >= 85) return { title: "Guardian of Faith", icon: Award, color: 'text-purple-500' };
	if (finalScore >= 75) return { title: "Seeker of Truth", icon: Star, color: 'text-emerald-500' };
	if (finalScore >= 65) return { title: "Student of Wisdom", icon: Zap, color: 'text-blue-500' };
	if (finalScore >= 50) return { title: "Faithful Learner", icon: Target, color: 'text-orange-500' };
	return { title: "Beginning the Path", icon: Trophy, color: 'text-gray-500' };
};