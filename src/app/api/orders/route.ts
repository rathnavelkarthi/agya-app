import { NextResponse } from "next/server";

// In production, this integrates with Razorpay and saves to Supabase
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, total } = body;

    if (!items || !total) {
      return NextResponse.json(
        { error: "Missing items or total" },
        { status: 400 }
      );
    }

    // Placeholder: would create Razorpay order here
    // const razorpay = new Razorpay({ key_id: ..., key_secret: ... });
    // const order = await razorpay.orders.create({ amount: total * 100, currency: "INR" });

    const order = {
      id: `order-${Date.now()}`,
      items,
      total,
      status: "pending",
      razorpay_order_id: null, // Would be filled by Razorpay
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(order, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
