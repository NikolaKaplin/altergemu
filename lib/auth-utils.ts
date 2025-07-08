import { cookies } from "next/headers";
import { lucia } from "./auth";
import { cache } from "react";
import type { User, Session } from "lucia";

export const validateRequest = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId =
      (await cookies()).get(lucia.sessionCookieName)?.value ?? null;

    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);

    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        (await cookies()).set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        (await cookies()).set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
    } catch {}

    return result;
  }
);

export const requireAuth = async () => {
  const { user, session } = await validateRequest();

  if (!user || !session) {
    throw new Error("Unauthorized");
  }

  if (!user.isActive) {
    throw new Error("Account is disabled");
  }

  return { user, session };
};
