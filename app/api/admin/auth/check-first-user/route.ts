import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { ensureTablesExist } from "@/lib/db/migrate"

export async function GET() {
  try {
    // Ensure tables exist first
    await ensureTablesExist()

    // Check if any users exist
    const userCount = await db.select().from(users).limit(1)

    return NextResponse.json({
      isFirstUser: userCount.length === 0,
    })
  } catch (error) {
    console.error("Error checking first user:", error)
    return NextResponse.json({ error: "Ошибка проверки пользователей" }, { status: 500 })
  }
}
