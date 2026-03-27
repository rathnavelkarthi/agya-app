import { NextResponse } from "next/server";
import { generateReport, type QuizAnswers } from "@/lib/skin-engine";

export async function POST(request: Request) {
  try {
    const body: QuizAnswers = await request.json();
    const report = generateReport(body);

    // Return just the recommended and avoid lists
    return NextResponse.json({
      recommended: report.recommended,
      avoid: report.avoid,
      skinType: report.skinType,
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
