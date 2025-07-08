import { Lucia } from "lucia"
import { DrizzleMySQLAdapter } from "@lucia-auth/adapter-drizzle"
import { db } from "./db"
import { sessions, users } from "./db/schema"
import type { User } from "./db/schema"

const adapter = new DrizzleMySQLAdapter(db, sessions, users)

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      email: attributes.email,
      name: attributes.name,
      role: attributes.role,
      isActive: attributes.isActive,
    }
  },
})

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: Omit<User, "id">
  }
}
