"use server"
import { generateObject } from "ai";
import { z } from 'zod';


export const generateAiQuestion = async (difficulty: string, level: string, character: string, playerName: string, playerCountry: string) => {
	const prompt = `Generate Islamic faith-based quiz question for a game where Muslims learn to apply Qur'an verses to real-life situations.

create:
1. A level name: ${level}
2. Difficulty: ${difficulty}
3. A thought-provoking title
4. A realistic modern-day scenario/dilemma (especially african and from ${playerCountry}) that a ${character === 'brother' ? 'Muslim man' : 'Muslim woman'} might face
5. Exactly ${process.env.NEXT_PUBLIC_TOTAL_POSSIBLE_ANSWERS} answer options - each with a real Qur'an verse (quoted accurately) and its reference (Surah name and verse numbers)
6. The index of the correct answer (0-${+process.env.NEXT_PUBLIC_TOTAL_POSSIBLE_ANSWERS! - 1}) - vary the correct answer position randomly
7. An explanation of why that verse best addresses the situation

Make scenarios relatable: work challenges, family issues, social pressures, moral dilemmas, health struggles, financial decisions, community conflicts, personal growth moments.

Ensure verses are accurately quoted from the Qur'an. Use well-known, meaningful verses.

Use the name '${playerName}' in the scenarios to refer to the player.
Use simple english so that everyone including kids can understand.
Use the Qur'an translation of Muhsin Khan and Taqi-ud-Din al Hilali.
Check the surah names and verse numbers for accuracy.

Return as object:
{
  "id": "string",
  "levelName": "string",
  "difficulty": "easy|medium|hard",
  "title": "string",
  "scenario": "string",
  "options": [
    {"verse": "exact Qur'an verse quote", "reference": "Surah-Name Verse:Numbers"},
    ...${+process.env.NEXT_PUBLIC_TOTAL_POSSIBLE_ANSWERS! - 1} more
  ],
  "correctAnswerIndex": 0-${+process.env.NEXT_PUBLIC_TOTAL_POSSIBLE_ANSWERS! - 1},
  "explanation": "string"
}`;


	const { object } = await generateObject({
		model: 'openai/gpt-5.2',
		schema: QuestionResponseSchema,
		prompt,
	});

	return object
}

export const generateAiQuestions = async (startIdx: number, batchDifficulties: string[], batchLevels: string[], character: string, playerName: string, playerCountry: string) => {
	const prompt = `Generate ${process.env.NEXT_PUBLIC_BATCH_SIZE} Islamic faith-based quiz questions for a game where Muslims learn to apply Qur'an verses to real-life situations.

For each question (levels ${startIdx + 1}-${startIdx + 5}), create:
1. A level name from this list in order: ${batchLevels.join(', ')}
2. Difficulty: ${batchDifficulties.join(', ')} (in order)
3. A thought-provoking title
4. A realistic modern-day scenario/dilemma (especially african and from ${playerCountry}) that a ${character === 'brother' ? 'Muslim man' : 'Muslim woman'} might face
5. Exactly ${process.env.NEXT_PUBLIC_TOTAL_POSSIBLE_ANSWERS} answer options - each with a real Qur'an verse (quoted accurately) and its reference (Surah name and verse numbers)
6. The index of the correct answer (0-${+process.env.NEXT_PUBLIC_TOTAL_POSSIBLE_ANSWERS! - 1}) - vary the correct answer position randomly
7. An explanation of why that verse best addresses the situation

Make scenarios relatable: work challenges, family issues, social pressures, moral dilemmas, health struggles, financial decisions, community conflicts, personal growth moments.

Ensure verses are accurately quoted from the Qur'an. Use well-known, meaningful verses.

Use the name '${playerName}' in the scenarios to refer to the player.
Use simple english so that everyone including kids can understand.
Use the Qur'an translation of Muhsin Khan and Taqi-ud-Din al Hilali.
Check the surah names and verse numbers for accuracy.

Return as JSON array:
[{
  "id": "string",
  "levelName": "string",
  "difficulty": "easy|medium|hard",
  "title": "string",
  "scenario": "string",
  "options": [
    {"verse": "exact Qur'an verse quote", "reference": "Surah-Name Verse:Numbers"},
    ...${+process.env.NEXT_PUBLIC_TOTAL_POSSIBLE_ANSWERS! - 1} more
  ],
  "correctAnswerIndex": 0-${+process.env.NEXT_PUBLIC_TOTAL_POSSIBLE_ANSWERS! - 1},
  "explanation": "string"
}]`;


	const { object } = await generateObject({
		model: 'openai/gpt-5.2',
		schema: QuestionsResponseSchema,
		prompt,
	});

	return object
}


const OptionSchema = z.object({
	verse: z.string(),
	reference: z.string(),
}).strict()

const QuestionSchema = z.object({
	id: z.string(),
	levelName: z.string(),
	difficulty: z.enum(["easy", "medium", "hard"]),
	title: z.string(),
	scenario: z.string(),
	options: z.array(OptionSchema),
	correctAnswerIndex: z.number(),
	explanation: z.string(),
}).strict()

const QuestionsResponseSchema = z.object({
	questions: z.array(QuestionSchema),
}).strict()

const QuestionResponseSchema = z.object({
	question: QuestionSchema,
}).strict()