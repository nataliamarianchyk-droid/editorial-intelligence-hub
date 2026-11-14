CREATE TABLE public.user_roles (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
 role text NOT NULL CHECK (role IN ('takeaways_owner')),
 UNIQUE(user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY read_own_roles ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());
ALTER TABLE public.article_ai_gateway_state ADD COLUMN error_kind text NOT NULL DEFAULT 'unknown';
ALTER TABLE public.article_ai_gateway_state ADD COLUMN revision uuid NOT NULL DEFAULT gen_random_uuid();
CREATE FUNCTION public.version_article_ai_gateway_state() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
 NEW.revision := gen_random_uuid();
 NEW.updated_at := clock_timestamp();
 RETURN NEW;
END;
$$;
CREATE TRIGGER version_article_ai_gateway_state BEFORE UPDATE ON public.article_ai_gateway_state FOR EACH ROW EXECUTE FUNCTION public.version_article_ai_gateway_state();
REVOKE ALL ON FUNCTION public.version_article_ai_gateway_state() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.version_article_ai_gateway_state() TO service_role;