CREATE TABLE public.news_items (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), slug text UNIQUE NOT NULL, title text NOT NULL, dek text NOT NULL, body_md text NOT NULL,
 category text NOT NULL CHECK (category IN ('performance','analytics-tracking','growth-systems','b2b-saas','ai-marketing-operations','ecommerce')),
 sources jsonb NOT NULL CHECK (jsonb_typeof(sources) = 'array' AND jsonb_array_length(sources) BETWEEN 1 AND 6), reviewer_notes text,
 agent_draft_id text UNIQUE NOT NULL, status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','withdrawn')),
 created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(), published_at timestamptz
);
REVOKE ALL ON public.news_items FROM anon, authenticated;
GRANT ALL ON public.news_items TO service_role;
ALTER TABLE public.news_items ENABLE ROW LEVEL SECURITY;
CREATE INDEX news_published_date ON public.news_items (published_at DESC) WHERE status = 'published';
CREATE TABLE public.news_submission_days (day date PRIMARY KEY, submissions integer NOT NULL DEFAULT 0 CHECK (submissions BETWEEN 0 AND 10));
REVOKE ALL ON public.news_submission_days FROM anon, authenticated;
GRANT ALL ON public.news_submission_days TO service_role;
ALTER TABLE public.news_submission_days ENABLE ROW LEVEL SECURITY;
CREATE FUNCTION public.ingest_news_draft(payload jsonb) RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE existing public.news_items; saved public.news_items; berlin_day date := (now() AT TIME ZONE 'Europe/Berlin')::date; used integer;
BEGIN
 PERFORM pg_advisory_xact_lock(765401);
 SELECT * INTO existing FROM public.news_items WHERE agent_draft_id = payload->>'agent_draft_id' FOR UPDATE;
 IF FOUND AND existing.status <> 'draft' THEN RETURN jsonb_build_object('code',409); END IF;
 INSERT INTO public.news_submission_days(day,submissions) VALUES(berlin_day,0) ON CONFLICT DO NOTHING;
 SELECT submissions INTO used FROM public.news_submission_days WHERE day = berlin_day FOR UPDATE;
 IF used >= 10 THEN RETURN jsonb_build_object('code',429); END IF;
 IF existing.id IS NOT NULL THEN
 UPDATE public.news_items SET slug=payload->>'slug', title=payload->>'title', dek=payload->>'dek', body_md=payload->>'body_md', category=payload->>'category', sources=payload->'sources', reviewer_notes=payload->>'reviewer_notes', updated_at=now() WHERE id=existing.id AND status='draft' RETURNING * INTO saved;
 ELSE
 INSERT INTO public.news_items(slug,title,dek,body_md,category,sources,reviewer_notes,agent_draft_id,status) VALUES(payload->>'slug',payload->>'title',payload->>'dek',payload->>'body_md',payload->>'category',payload->'sources',payload->>'reviewer_notes',payload->>'agent_draft_id','draft') RETURNING * INTO saved;
 END IF;
 UPDATE public.news_submission_days SET submissions=submissions+1 WHERE day=berlin_day;
 RETURN jsonb_build_object('code',200,'id',saved.id,'status','draft');
END $$;
REVOKE ALL ON FUNCTION public.ingest_news_draft(jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.ingest_news_draft(jsonb) TO service_role;
CREATE FUNCTION public.news_slug_withdrawn(news_slug text) RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$ SELECT EXISTS(SELECT 1 FROM public.news_items WHERE slug=news_slug AND status='withdrawn'); $$;
REVOKE ALL ON FUNCTION public.news_slug_withdrawn(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.news_slug_withdrawn(text) TO service_role;