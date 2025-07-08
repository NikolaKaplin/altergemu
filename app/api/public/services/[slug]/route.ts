import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { services } from "@/lib/db/schema"
import { eq, and } from "drizzle-orm"

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const [service] = await db
      .select()
      .from(services)
      .where(and(eq(services.slug, params.slug), eq(services.isActive, true)))

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 })
    }

    return NextResponse.json(service)
  } catch (error) {
    console.error("Error fetching service:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
