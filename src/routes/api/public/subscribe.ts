import { createFileRoute } from "@tanstack/react-router";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Route = createFileRoute("/api/public/subscribe")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: { email?: unknown } = {};
        try {
          body = (await request.json()) as { email?: unknown };
        } catch {
          return Response.json(
            { ok: false, message: "Invalid request." },
            { status: 400 },
          );
        }

        const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
        if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
          return Response.json(
            { ok: false, message: "Enter a valid email address." },
            { status: 400 },
          );
        }

        // Downstream provider (e.g. Mailchimp / Buttondown / Resend Audiences) is wired
        // via env once selected. Until then we log and confirm - no PII leaks, no PII stored.
        console.log(
          `[subscribe] new signup: ${email.replace(/(^.).*(@.*$)/, "$1***$2")}`,
        );

        return Response.json({
          ok: true,
          message: "You're on the list. First issue lands in your inbox soon.",
        });
      },
    },
  },
});
