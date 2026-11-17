import { createHash, timingSafeEqual } from "node:crypto";
import { newsDraftSchema, type NewsDraft } from "./news-schema";

export function authenticateNewsIntake(request: Request, secret: string | undefined) {
  if (!secret) return new Response("Server configuration error", { status: 500 });
  const token = /^Bearer ([^\s,]+)$/.exec(request.headers.get("authorization") ?? "")?.[1];
  if (!token) return new Response("Unauthorized", { status: 401 });
  const digest = (value: string) => createHash("sha256").update(value, "utf8").digest();
  return timingSafeEqual(digest(token), digest(secret)) ? null : new Response("Unauthorized", { status: 401 });
}

type IntakeResult = { code: number; id?: string; status?: string };
export async function handleNewsIntake(request: Request, secret: string | undefined,
  save: (draft: NewsDraft & { status: "draft" }) => Promise<IntakeResult>) {
  const denied = authenticateNewsIntake(request, secret);
  if (denied) return denied;
  if (Number(request.headers.get("content-length")) > 100_000) return new Response("Request too large", { status: 413 });
  // Bound chunked bodies as well, before JSON parsing.
  const reader = request.body?.getReader();
  if (!reader) return new Response("Invalid draft", { status: 400 });
  let size = 0;
  const chunks: Uint8Array[] = [];
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 100_000) { await reader.cancel(); return new Response("Request too large", { status: 413 }); }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  let input: unknown;
  try { input = JSON.parse(new TextDecoder().decode(bytes)); } catch { return new Response("Invalid JSON", { status: 400 }); }
  const parsed = newsDraftSchema.safeParse(input);
  if (!parsed.success) return Response.json({ message: "Invalid draft", errors: parsed.error.flatten() }, { status: 400 });
  try {
    const result = await save({ ...parsed.data, status: "draft" });
    if (result.code === 409) return Response.json({ message: "This item can no longer be overwritten." }, { status: 409 });
    if (result.code === 429) return Response.json({ message: "Daily submission limit reached." }, { status: 429 });
    if (!result.id) throw new Error("No intake result");
    return Response.json({ id: result.id, status: "draft", previewPath: `/control-room?draft=${result.id}` }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "23505") {
      return Response.json({ message: "This slug is already in use." }, { status: 409 });
    }
    return Response.json({ message: "Unable to save the draft right now." }, { status: 500 });
  }
}