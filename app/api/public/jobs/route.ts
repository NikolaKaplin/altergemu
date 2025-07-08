import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { jobs } from "@/lib/db/schema"
import { eq, asc } from "drizzle-orm"

export async function GET() {
  try {
    const jobsList = await db.select().from(jobs).where(eq(jobs.isActive, true)).orderBy(asc(jobs.order))

    return NextResponse.json(jobsList)
  } catch (error) {
    console.error("Error fetching jobs:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
