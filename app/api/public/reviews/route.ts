import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { reviews } from "@/lib/db/schema"
import { eq, asc } from "drizzle-orm"

export async function GET() {
  try {
    const reviewsList = await db.select().from(reviews).where(eq(reviews.isActive, true)).orderBy(asc(reviews.order))

    return NextResponse.json(reviewsList)
  } catch (error) {
    console.error("Error fetching reviews:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
