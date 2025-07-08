import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { services } from "@/lib/db/schema"
import { eq, asc } from "drizzle-orm"

export async function GET() {
  try {
    const servicesList = await db
      .select()
      .from(services)
      .where(eq(services.isActive, true))
      .orderBy(asc(services.order))

    return NextResponse.json(servicesList)
  } catch (error) {
    console.error("Error fetching services:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
