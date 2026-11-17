import { useSession } from "@tanstack/react-start/server";

export async function assertControlRoomSession() {
  const password = process.env['SESSION_SECRET'];
  if (!password) throw new Error("Control-room session is unavailable.");
  const session = await useSession<{ unlocked?: boolean }>({
    password, name: "nm-control-room", maxAge: 60 * 60 * 24 * 7,
    cookie: { httpOnly: true, secure: true, sameSite: "lax", path: "/" },
  });
  if (!session.data.unlocked) throw new Response("Unauthorized", { status: 401 });
}