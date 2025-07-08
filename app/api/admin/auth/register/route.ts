import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { lucia } from "@/lib/auth"
import { cookies } from "next/headers"
import bcrypt from "bcryptjs"
import { generateId } from "lucia"
import { ensureTablesExist } from "@/lib/db/migrate"

export async function POST(request: NextRequest) {
  try {
    // Ensure tables exist first
    await ensureTablesExist()

    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Все поля обязательны" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Пароль должен содержать минимум 6 символов" }, { status: 400 })
    }

    // Check if any users already exist
    const existingUsers = await db.select().from(users).limit(1)

    if (existingUsers.length > 0) {
      return NextResponse.json({ error: "Администратор уже зарегистрирован" }, { status: 403 })
    }

    // Check if email is already taken (just in case)
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email.toLowerCase()),
    })

    if (existingUser) {
      return NextResponse.json({ error: "Пользователь с таким email уже существует" }, { status: 409 })
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12)

    // Create user
    const userId = generateId(15)
    await db.insert(users).values({
      id: userId,
      email: email.toLowerCase(),
      passwordHash,
      name,
      role: "admin", // First user is always admin
      isActive: true,
    })

    // Create session
    const session = await lucia.createSession(userId, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    ;(await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

    return NextResponse.json({
      success: true,
      user: {
        id: userId,
        email: email.toLowerCase(),
        name,
        role: "admin",
      },
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Внутренняя ошибка сервера" }, { status: 500 })
  }
}
