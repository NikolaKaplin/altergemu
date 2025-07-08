import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { faqItems } from "@/lib/db/schema"
import { eq, asc } from "drizzle-orm"

export async function GET() {
  try {
    const faqList = await db.select().from(faqItems).where(eq(faqItems.isActive, true)).orderBy(asc(faqItems.order))

    return NextResponse.json(faqList)
  } catch (error) {
    console.error("Error fetching FAQ:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
