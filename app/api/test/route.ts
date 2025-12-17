
import { generateAiQuestion } from "@/app/actions/generate-questions";
import { NextResponse } from "next/server";

export const GET = async () => {
	try {

		const data = await generateAiQuestion('easy', "The Opening", 'brother', 'Abdul Shakur', 'Ghana');

		return NextResponse.json({
			success: true,
			data
		}, { status: 200 });
	} catch (error) {
		console.log(error)
		return NextResponse.json(error, { status: 500 });
	}
}
