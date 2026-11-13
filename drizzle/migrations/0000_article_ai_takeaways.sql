CREATE TABLE public.article_ai_takeaways (
  content_key text PRIMARY KEY,
  status text NOT NULL DEFAULT 'pending',
  result jsonb,
  lease_until timestamptz NOT NULL DEFAULT (now() + interval '5 minutes'),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.article_ai_takeaways TO service_role;
ALTER TABLE public.article_ai_takeaways ENABLE ROW LEVEL SECURITY;
CREATE TABLE public.article_ai_gateway_state (
  id text PRIMARY KEY,
  status_code integer NOT NULL,
  message text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.article_ai_gateway_state TO service_role;
ALTER TABLE public.article_ai_gateway_state ENABLE ROW LEVEL SECURITY;
CREATE FUNCTION public.claim_article_takeaways(p_key text) RETURNS boolean
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE claimed text;
BEGIN
 INSERT INTO public.article_ai_takeaways(content_key) VALUES(p_key)
 ON CONFLICT(content_key) DO UPDATE SET status = 'pending', lease_until = now() + interval '5 minutes', updated_at = now()
 WHERE article_ai_takeaways.status = 'failed' OR (article_ai_takeaways.status = 'pending' AND article_ai_takeaways.lease_until < now())
 RETURNING content_key INTO claimed;
 RETURN claimed IS NOT NULL;
END;
$$;
REVOKE ALL ON FUNCTION public.claim_article_takeaways(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.claim_article_takeaways(text) TO service_role;