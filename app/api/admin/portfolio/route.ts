import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { portfolioItems } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { validateRequest } from "@/lib/auth-utils";

export async function GET() {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const items = await db
      .select()
      .from(portfolioItems)
      .orderBy(desc(portfolioItems.createdAt));
    return NextResponse.json(items);
  } catch (error) {
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
    const [item] = await db.insert(portfolioItems).values(data).$returningId();
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
