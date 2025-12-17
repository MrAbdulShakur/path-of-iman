import React from 'react';
import { motion } from 'framer-motion';
import { QuestionOption } from './GameContext';

const letterLabels = ['A', 'B', 'C', 'D', 'E'];

type Props = {
	option: QuestionOption;
	index: number;
	onSelect: (index: number) => void;
	disabled: boolean;
	isSelected: boolean;
	isCorrect: boolean;
	showResult: boolean;
	character: string|null;
}

export default function AnswerOption({ 
    option, 
    index, 
    onSelect, 
    disabled, 
    isSelected, 
    isCorrect, 
    showResult,
    character 
}: Props) {
    const isBrother = character === 'brother';
    
    let borderColor = 'border-gray-200';
    let bgColor = 'bg-white';
    let ringColor = '';
    
    if (showResult && isSelected) {
        if (isCorrect) {
            borderColor = 'border-emerald-400';
            bgColor = 'bg-emerald-50';
            ringColor = 'ring-2 ring-emerald-200';
        } else {
            borderColor = 'border-red-400';
            bgColor = 'bg-red-50';
            ringColor = 'ring-2 ring-red-200';
        }
    }

    const hoverStyles = !disabled 
        ? isBrother 
            ? 'hover:border-emerald-300 hover:shadow-md hover:bg-emerald-50/30' 
            : 'hover:border-amber-300 hover:shadow-md hover:bg-amber-50/30'
        : '';

    const badgeStyles = showResult && isSelected && isCorrect 
        ? 'bg-emerald-500 text-white'
        : showResult && isSelected && !isCorrect 
            ? 'bg-red-500 text-white'
            : isBrother 
                ? 'bg-emerald-100 text-emerald-700 group-hover:bg-emerald-200'
                : 'bg-amber-100 text-amber-700 group-hover:bg-amber-200';

    return (
        <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={!disabled ? { scale: 1.01, x: 5 } : {}}
            whileTap={!disabled ? { scale: 0.99 } : {}}
            onClick={() => onSelect(index)}
            disabled={disabled}
            className={`
                w-full text-left p-5 rounded-2xl border-2 ${borderColor} ${bgColor} ${ringColor}
                transition-all duration-300 group ${hoverStyles}
                ${disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}
            `}
        >
            <div className="flex items-start gap-4">
                <div className={`
                    shrink-0 w-10 h-10 rounded-full flex items-center justify-center
                    font-bold text-sm transition-all duration-300 ${badgeStyles}
                `}>
                    {letterLabels[index]}
                </div>
                
                <div className="flex-1">
                    <p className="text-gray-800 font-medium leading-relaxed text-base">
                        {option.verse}
                    </p>
                    <p className={`text-sm mt-2 font-medium ${isBrother ? 'text-emerald-600' : 'text-amber-600'}`}>
                        — {option.reference}
                    </p>
                </div>
            </div>
        </motion.button>
    );
}