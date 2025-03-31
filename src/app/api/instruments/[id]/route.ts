import { NextResponse } from "next/server";
import db from "@/lib/db/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const instrument = await db.instrumen.findUnique({
      where: {
        instrumen_id: id,
      },
    });

    if (!instrument) {
      return NextResponse.json({ error: "Instrument not found" }, { status: 404 });
    }

    return NextResponse.json(instrument);
  } catch (error) {
    console.error("Error fetching instrument:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}