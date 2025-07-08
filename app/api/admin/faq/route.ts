import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { faqItems } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { validateRequest } from "@/lib/auth-utils";

export async function GET() {
  try {
    const { user } = await validateRequest();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const faqList = await db
      .select()
      .from(faqItems)
      .orderBy(desc(faqItems.order));
    return NextResponse.json(faqList);
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
    const [faqItem] = await db
      .insert(faqItems)
      .values({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .$returningId();

    return NextResponse.json(faqItem);
  } catch (error) {
    console.error("Error creating FAQ item:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
