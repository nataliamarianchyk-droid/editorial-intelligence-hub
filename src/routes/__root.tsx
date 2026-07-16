import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { LinkedInInsightTag } from "@/components/linkedin-insight-tag";
import { ConsentBanner } from "@/components/consent-banner";

const GA_MEASUREMENT_ID = "G-62DJNGTDWT";
const GA_CONSENT_INIT = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  wait_for_update: 500
});
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });`;

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "NM Insight - Insights on B2B Performance Marketing" },
      { name: "description", content: "Editorial insights from the operational side of B2B performance marketing - acquisition, attribution, content and the systems that connect them." },
      { name: "author", content: "NM Insight" },
      { property: "og:title", content: "NM Insight - Insights on B2B Performance Marketing" },
      { property: "og:description", content: "Editorial insights from the operational side of B2B performance marketing - acquisition, attribution, content and the systems that connect them." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "NM Insight - Insights on B2B Performance Marketing" },
      { name: "twitter:description", content: "Editorial insights from the operational side of B2B performance marketing - acquisition, attribution, content and the systems that connect them." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/736086a6-97cc-4fad-924a-bca45de17a0c" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/736086a6-97cc-4fad-924a-bca45de17a0c" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "preload",
        as: "style",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap",
      },
    ],
    scripts: [
      { src: `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`, async: true },
      { children: GA_CONSENT_INIT },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": "https://insights.nm-insight.com/#website",
              url: "https://insights.nm-insight.com/",
              name: "NM Insight",
              alternateName: "NM Insight - Insights",
              description:
                "Editorial insights on B2B performance marketing - the operational side of acquisition, attribution, content and the systems that connect them.",
              inLanguage: "en",
              publisher: { "@id": "https://insights.nm-insight.com/#organization" },
            },
            {
              "@type": "Organization",
              "@id": "https://insights.nm-insight.com/#organization",
              name: "NM Insight",
              url: "https://nm-insight.com",
              description:
                "Berlin-based B2B performance marketing consultancy publishing weekly editorial insights for operators building the infrastructure between marketing and revenue.",
              sameAs: [
                "https://www.linkedin.com/company/nm-insight/",
                "https://nm-insight.com",
              ],
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <LinkedInInsightTag />
      <ConsentBanner />
    </QueryClientProvider>
  );
}
