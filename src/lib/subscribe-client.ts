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

type Gtag = (...args: unknown[]) => void;

function trackGA(
  event: "hubspot_form_success" | "hubspot_form_failure",
  payload: Record<string, string>,
  extra: Record<string, unknown> = {},
) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag !== "function") return;
  gtag("event", event, {
    form_name: "newsletter_subscribe",
    original_source_url: payload.pageUrl,
    utm_source: payload.utm_source,
    utm_medium: payload.utm_medium,
    utm_campaign: payload.utm_campaign,
    ...extra,
  });
}

export async function submitSubscribe(
  input: Parameters<typeof buildSubscribePayload>[0],
): Promise<{ ok: boolean; message: string }> {
  const payload = buildSubscribePayload(input);
  try {
    const res = await fetch("/api/public/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await res.json().catch(() => ({}))) as { message?: string };
    if (res.ok) {
      trackGA("hubspot_form_success", payload);
    } else {
      trackGA("hubspot_form_failure", payload, {
        status: res.status,
        error_message: data.message,
      });
    }
    return {
      ok: res.ok,
      message:
        data.message ??
        (res.ok ? "You're on the list." : "Something went wrong. Try again."),
    };
  } catch (err) {
    trackGA("hubspot_form_failure", payload, {
      status: 0,
      error_message: err instanceof Error ? err.message : "network_error",
    });
    throw err;
  }
}
