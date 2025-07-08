import { NextResponse } from "next/server"
import { lucia } from "@/lib/auth"
import { validateRequest } from "@/lib/auth-utils"
import { cookies } from "next/headers"

export async function POST() {
  try {
    const { session } = await validateRequest()

    if (!session) {
      return NextResponse.json({ error: "Не авторизован" }, { status: 401 })
    }

    await lucia.invalidateSession(session.id)

    const sessionCookie = lucia.createBlankSessionCookie()
    ;(await cookies()).set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ error: "Ошибка при выходе" }, { status: 500 })
  }
}
