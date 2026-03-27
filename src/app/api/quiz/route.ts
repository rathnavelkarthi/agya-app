import { NextResponse } from "next/server";
import { generateReport, type QuizAnswers } from "@/lib/skin-engine";

export async function POST(request: Request) {
  try {
    const body: QuizAnswers = await request.json();

    // Validate required fields
    if (!body.skinType || !body.concerns || !body.sensitivity || !body.lifestyle) {
      return NextResponse.json(
        { error: "Missing required quiz fields" },
        { status: 400 }
      );
    }

    // Generate the skin report using the engine
    const report = generateReport(body);

    return NextResponse.json(report);
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
