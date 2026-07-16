import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { redirect } from "@tanstack/react-router";
import { createHash, timingSafeEqual } from "node:crypto";

type GateSession = { unlocked?: boolean };

function getSessionConfig() {
  const password = process.env.SESSION_SECRET;
  if (!password) {
    throw new Error("SESSION_SECRET is not set");
  }
  return {
    password,
    name: "nm-control-room",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "lax" as const,
      path: "/",
    },
  };
}

// Hash both sides to equal-length digests: timingSafeEqual throws on length
// mismatch, and the raw byte length would leak through timing.
function passwordMatches(input: string, expected: string): boolean {
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

/**
 * Server-only guard used by protected route `beforeLoad`. Throws a redirect
 * to /unlock when the session cookie is missing or not unlocked, so no
 * protected route data or component ever runs for locked visitors.
 */
export const requireControlRoomAccess = createServerFn({ method: "GET" }).handler(
  async () => {
    const session = await useSession<GateSession>(getSessionConfig());
    if (!session.data.unlocked) {
      throw redirect({ to: "/unlock" });
    }
    return { ok: true as const };
  },
);

export const unlockSite = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string }) => {
    if (
      !data ||
      typeof data.password !== "string" ||
      data.password.length === 0 ||
      data.password.length > 512
    ) {
      throw new Error("Invalid password input.");
    }
    return { password: data.password };
  })
  .handler(async ({ data }) => {
    const expected = process.env.SITE_PASSWORD;
    if (!expected) {
      // Fail closed: without a configured password nobody can unlock.
      return { ok: false as const };
    }
    if (!passwordMatches(data.password, expected)) {
      return { ok: false as const };
    }
    const session = await useSession<GateSession>(getSessionConfig());
    await session.update({ unlocked: true });
    return { ok: true as const };
  });

export const lockSite = createServerFn({ method: "POST" }).handler(async () => {
  const session = await useSession<GateSession>(getSessionConfig());
  await session.clear();
  return { ok: true as const };
});
