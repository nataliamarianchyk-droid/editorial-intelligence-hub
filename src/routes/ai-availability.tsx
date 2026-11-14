import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { RefreshCw, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { readTakeawaysAvailability, resumeTakeaways } from "@/lib/takeaways-owner.functions";
import { recoveryRemedy } from "@/lib/takeaways-recovery";
import "@lovable.dev/cloud-auth-js/styles.css";

export const Route = createFileRoute("/ai-availability")({
  head: () => ({ meta: [
    { title: "AI Availability - NM Insight" },
    { name: "description", content: "Private owner controls for NM Insight article takeaways." },
    { property: "og:title", content: "AI Availability - NM Insight" },
    { property: "og:description", content: "Private owner controls for NM Insight article takeaways." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "robots", content: "noindex, nofollow" },
  ] }),
  component: AiAvailability,
});

function AiAvailability() {
  const read = useServerFn(readTakeawaysAvailability);
  const resume = useServerFn(resumeTakeaways);
  const [signedIn, setSignedIn] = useState(false);
  const [availability, setAvailability] = useState<Awaited<ReturnType<typeof readTakeawaysAvailability>> | null>(null);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [restored, setRestored] = useState(false);

  async function refresh() {
    setBusy(true); setError(""); setRestored(false);
    try {
      const { data, error: authError } = await supabase.auth.getUser();
      if (authError && authError.name !== "AuthSessionMissingError") throw authError;
      setSignedIn(Boolean(data.user));
      setAvailability(data.user ? await read() : null);
    } catch (e) { setError(e instanceof Error ? e.message : "AI availability could not be checked."); }
    finally { setBusy(false); }
  }
  useEffect(() => {
    void refresh();
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (["SIGNED_IN", "SIGNED_OUT", "USER_UPDATED"].includes(event)) void refresh();
    });
    return () => data.subscription.unsubscribe();
  }, []);

  async function signIn(provider: "google" | "lovable") {
    setError("");
    const result = await lovable.auth.signInWithOAuth(provider, { redirect_uri: `${window.location.origin}/ai-availability` });
    if (result.error) setError(result.error.message);
    else if (!result.redirected) await refresh();
  }
  async function recover() {
    if (!availability?.owner || !availability.state || !restored) return;
    setBusy(true); setError("");
    try {
      await resume({ data: { revision: availability.state.revision, restored: true } });
      setNotice("Generation is enabled. Readers can start a fresh request; previous failed requests were not replayed.");
      await refresh();
    } catch (e) { setError(e instanceof Error ? e.message : "AI generation could not be resumed."); }
    finally { setBusy(false); }
  }

  return <main className="min-h-screen bg-background px-6 py-16 text-foreground">
    <div className="mx-auto max-w-xl">
      <a href="/" className="text-sm text-primary underline underline-offset-4">NM Insight</a>
      <h1 className="mt-8 text-3xl font-semibold">AI takeaways availability</h1>
      {busy && <p role="status" className="mt-6 text-muted-foreground">Checking availability…</p>}
      {!busy && !signedIn && <div className="mt-8 space-y-4">
        <Button className="lovable-auth-button w-full" onClick={() => void signIn("lovable")}>Continue with Lovable</Button>
        <Button variant="outline" className="google-owner-sign-in w-full" onClick={() => void signIn("google")}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"/><path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/></svg>
          Continue with Google
        </Button>
      </div>}
      {!busy && signedIn && availability && <section className="mt-8 border-y border-border py-6">
        {!availability.owner ? <p role="status">Your account has not been authorized as the takeaways owner.</p> : availability.state ? <>
          <h2 className="text-xl font-semibold">Generation paused</h2>
          <p className="mt-4">{availability.state.message}</p>
          <p className="mt-4 text-sm text-muted-foreground">{recoveryRemedy(availability.state.error_kind)}</p>
          <label className="mt-6 flex items-start gap-3 text-sm"><input type="checkbox" checked={restored} onChange={(e) => setRestored(e.target.checked)} className="mt-1 size-4 accent-primary" />I confirm the underlying billing or access problem has been resolved and AI access is restored.</label>
          <Button variant="outline" className="mt-6" disabled={!restored || busy} onClick={() => void recover()}><RefreshCw />Resume generation</Button>
        </> : <p role="status">AI generation is enabled.</p>}
      </section>}
      {error && <p role="alert" className="mt-6 text-destructive">{error}</p>}
      {notice && <p role="status" className="mt-6 text-sm">{notice}</p>}
      {signedIn && <div className="mt-6 flex gap-3"><Button variant="outline" disabled={busy} onClick={() => void refresh()}><RefreshCw />Refresh</Button><Button variant="ghost" onClick={() => void supabase.auth.signOut()}><LogOut />Sign out</Button></div>}
    </div>
  </main>;
}