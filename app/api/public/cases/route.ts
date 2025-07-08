import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { cases } from "@/lib/db/schema"
import { eq, asc } from "drizzle-orm"

export async function GET() {
  try {
    const casesList = await db.select().from(cases).where(eq(cases.isActive, true)).orderBy(asc(cases.order))

    return NextResponse.json(casesList)
  } catch (error) {
    console.error("Error fetching cases:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
