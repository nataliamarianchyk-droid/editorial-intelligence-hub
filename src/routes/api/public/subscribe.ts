import { createFileRoute } from "@tanstack/react-router";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const GATEWAY_URL = "https://connector-gateway.lovable.dev/hubspot";

type Body = {
  email?: unknown;
  firstName?: unknown;
  lastName?: unknown;
  company?: unknown;
  message?: unknown;
  pageUrl?: unknown;
  utm_source?: unknown;
  utm_medium?: unknown;
  utm_campaign?: unknown;
};

function str(v: unknown, max = 500): string | undefined {
  if (typeof v !== "string") return undefined;
  const t = v.trim();
  if (!t) return undefined;
  return t.slice(0, max);
}

async function upsertHubSpotContact(properties: Record<string, string>) {
  const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
  const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;
  if (!LOVABLE_API_KEY || !HUBSPOT_API_KEY) {
    throw new Error("HubSpot connector not configured");
  }

  const headers = {
    Authorization: `Bearer ${LOVABLE_API_KEY}`,
    "X-Connection-Api-Key": HUBSPOT_API_KEY,
    "Content-Type": "application/json",
  };

  const doUpsert = async (props: Record<string, string>) => {
    return fetch(`${GATEWAY_URL}/crm/v3/objects/contacts/batch/upsert`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        inputs: [{ idProperty: "email", id: props.email, properties: props }],
      }),
    });
  };

  let res = await doUpsert(properties);

  // If a custom property (utm_*, original_source_url, message) does not
  // exist in the HubSpot portal, HubSpot 400s. Retry with core fields only.
  if (res.status === 400) {
    const errBody = await res.clone().text();
    if (/PROPERTY_DOESNT_EXIST|Property .* does not exist/i.test(errBody)) {
      const core: Record<string, string> = {};
      for (const k of ["email", "firstname", "lastname", "company"]) {
        if (properties[k]) core[k] = properties[k];
      }
      res = await doUpsert(core);
    }
  }

  if (!res.ok) {
    const body = await res.text();
    console.error(`[hubspot] upsert failed [${res.status}]: ${body}`);
    throw new Error(`HubSpot upsert failed [${res.status}]`);
  }
}

export const Route = createFileRoute("/api/public/subscribe")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: Body = {};
        try {
          body = (await request.json()) as Body;
        } catch {
          return Response.json(
            { ok: false, message: "Invalid request." },
            { status: 400 },
          );
        }

        const email =
          typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
        if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
          return Response.json(
            { ok: false, message: "Enter a valid email address." },
            { status: 400 },
          );
        }

        const properties: Record<string, string> = { email };
        const firstname = str(body.firstName, 100);
        const lastname = str(body.lastName, 100);
        const company = str(body.company, 200);
        const message = str(body.message, 2000);
        const pageUrl = str(body.pageUrl, 500);
        const utm_source = str(body.utm_source, 200);
        const utm_medium = str(body.utm_medium, 200);
        const utm_campaign = str(body.utm_campaign, 200);

        if (firstname) properties.firstname = firstname;
        if (lastname) properties.lastname = lastname;
        if (company) properties.company = company;
        if (message) properties.message = message;
        if (pageUrl) properties.original_source_url = pageUrl;
        if (utm_source) properties.utm_source = utm_source;
        if (utm_medium) properties.utm_medium = utm_medium;
        if (utm_campaign) properties.utm_campaign = utm_campaign;

        try {
          await upsertHubSpotContact(properties);
        } catch (err) {
          console.error("[subscribe] hubspot error", err);
          return Response.json(
            {
              ok: false,
              message:
                "We couldn't save your details right now. Please try again.",
            },
            { status: 502 },
          );
        }

        return Response.json({
          ok: true,
          message: "You're on the list. First issue lands in your inbox soon.",
        });
      },
    },
  },
});
