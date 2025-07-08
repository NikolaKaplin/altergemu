import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { blogPosts } from "@/lib/db/schema"
import { eq, desc } from "drizzle-orm"

export async function GET() {
  try {
    const posts = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.isActive, true))
      .orderBy(desc(blogPosts.publishedAt))

    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
