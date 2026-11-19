ALTER TABLE public.news_items ADD COLUMN suggested_date date;
CREATE OR REPLACE FUNCTION public.ingest_news_draft(payload jsonb) RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE existing public.news_items; saved public.news_items; berlin_day date := (now() AT TIME ZONE 'Europe/Berlin')::date; used integer;
BEGIN
 PERFORM pg_advisory_xact_lock(765401);
 SELECT * INTO existing FROM public.news_items WHERE agent_draft_id = payload->>'agent_draft_id' FOR UPDATE;
 IF FOUND AND existing.status <> 'draft' THEN RETURN jsonb_build_object('code',409); END IF;
 INSERT INTO public.news_submission_days(day,submissions) VALUES(berlin_day,0) ON CONFLICT DO NOTHING;
 SELECT submissions INTO used FROM public.news_submission_days WHERE day = berlin_day FOR UPDATE;
 IF used >= 10 THEN RETURN jsonb_build_object('code',429); END IF;
 IF existing.id IS NOT NULL THEN
 UPDATE public.news_items SET slug=payload->>'slug', title=payload->>'title', dek=payload->>'dek', body_md=payload->>'body_md', category=payload->>'category', sources=payload->'sources', reviewer_notes=payload->>'reviewer_notes', suggested_date=(payload->>'suggested_date')::date, updated_at=now() WHERE id=existing.id AND status='draft' RETURNING * INTO saved;
 ELSE
 INSERT INTO public.news_items(slug,title,dek,body_md,category,sources,reviewer_notes,agent_draft_id,status,suggested_date) VALUES(payload->>'slug',payload->>'title',payload->>'dek',payload->>'body_md',payload->>'category',payload->'sources',payload->>'reviewer_notes',payload->>'agent_draft_id','draft',(payload->>'suggested_date')::date) RETURNING * INTO saved;
 END IF;
 UPDATE public.news_submission_days SET submissions=submissions+1 WHERE day=berlin_day;
 RETURN jsonb_build_object('code',200,'id',saved.id,'status','draft');
END $$;