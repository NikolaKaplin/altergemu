import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cases } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { validateRequest } from "@/lib/auth-utils";

export async function GET() {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const casesList = await db
      .select()
      .from(cases)
      .orderBy(desc(cases.createdAt));
    return NextResponse.json(casesList);
  } catch (error) {
    console.error("Error fetching cases:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const [caseItem] = await db
      .insert(cases)
      .values({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .$returningId();

    return NextResponse.json(caseItem);
  } catch (error) {
    console.error("Error creating case:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
