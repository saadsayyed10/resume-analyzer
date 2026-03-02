import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ active: true }, { status: 200 });
}
