import { NextResponse } from "next/server";

// In production, this would save to / read from Supabase
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { baseProduct, ingredients, name } = body;

    if (!baseProduct || !ingredients) {
      return NextResponse.json(
        { error: "Missing base product or ingredients" },
        { status: 400 }
      );
    }

    // Placeholder: return the formula as-is
    // In production: save to supabase formulas table
    const formula = {
      id: `formula-${Date.now()}`,
      baseProduct,
      ingredients,
      name: name || "Custom Formula",
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(formula, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
