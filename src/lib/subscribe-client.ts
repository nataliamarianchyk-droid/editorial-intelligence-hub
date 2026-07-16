/**
 * Build the payload for /api/public/subscribe with page URL and UTM
 * parameters captured from the current browser location.
 */
export function buildSubscribePayload(input: {
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  message?: string;
}): Record<string, string> {
  const payload: Record<string, string> = { email: input.email };
  if (input.firstName) payload.firstName = input.firstName;
  if (input.lastName) payload.lastName = input.lastName;
  if (input.company) payload.company = input.company;
  if (input.message) payload.message = input.message;

  if (typeof window !== "undefined") {
    payload.pageUrl = window.location.href;
    const q = new URLSearchParams(window.location.search);
    for (const k of ["utm_source", "utm_medium", "utm_campaign"] as const) {
      const v = q.get(k);
      if (v) payload[k] = v;
    }
  }
  return payload;
}

export async function submitSubscribe(
  input: Parameters<typeof buildSubscribePayload>[0],
): Promise<{ ok: boolean; message: string }> {
  const res = await fetch("/api/public/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(buildSubscribePayload(input)),
  });
  const data = (await res.json().catch(() => ({}))) as { message?: string };
  return {
    ok: res.ok,
    message:
      data.message ??
      (res.ok ? "You're on the list." : "Something went wrong. Try again."),
  };
}
