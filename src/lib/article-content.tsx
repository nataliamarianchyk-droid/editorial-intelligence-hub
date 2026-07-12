import type { ReactNode } from "react";

export type TocItem = { id: string; label: string };

export type ArticleContent = {
  toc: TocItem[];
  Body: () => ReactNode;
};

function PullQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="my-10 border-l-4 border-[var(--accent-cyan)] pl-6 py-2">
      <p className="font-display text-2xl md:text-3xl leading-snug text-[var(--ink-navy)]">
        {children}
      </p>
    </blockquote>
  );
}

function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="font-display text-3xl md:text-4xl mt-14 mb-5 text-[var(--ink-navy)] scroll-mt-28"
    >
      {children}
    </h2>
  );
}

function P({ children }: { children: ReactNode }) {
  return (
    <p className="font-sans text-[17px] leading-[1.85] text-[#1f2937]">{children}</p>
  );
}

/* --------------------------- Visibility article --------------------------- */

const visibilityToc: TocItem[] = [
  { id: "illusion", label: "The Illusion of Traction" },
  { id: "gaps", label: "The Four Gaps That Kill Pipeline" },
  { id: "connects", label: "What Connects Visibility to Revenue" },
  { id: "specialist", label: "Why This Matters in Specialist Markets" },
  { id: "question", label: "The Question Worth Asking" },
];

function VisibilityBody() {
  return (
    <>
      <p className="text-xl md:text-2xl leading-relaxed text-[#0f172a]">
        You launched the product. You hired someone to run LinkedIn. You set up Google Ads. You
        are active, consistent, and spending real money on marketing.
      </p>
      <p className="mt-6 text-xl md:text-2xl leading-relaxed font-medium text-[var(--ink-navy)]">
        And yet the sales team is still waiting.
      </p>
      <p className="mt-6 text-[17px] leading-[1.85] font-sans text-[#1f2937]">
        This is the most common and least discussed problem in specialist markets. Not a lack of
        effort. Not a lack of budget. A structural gap between visibility and revenue - and most
        companies do not even know it exists until the pipeline dries up.
      </p>

      <H2 id="illusion">The Illusion of Traction</H2>
      <div className="space-y-5">
        <P>
          When campaigns are running and content is being published, it feels like marketing is
          working. Impressions go up. Followers grow. The website gets traffic.
        </P>
        <P>
          But impressions do not pay salaries. Followers do not close deals. And traffic without
          attribution tells you nothing about what is actually driving interest.
        </P>
        <P>
          According to the CMO Insights Report 2025, nearly half of marketing leaders say they do
          not have sufficient access to relevant data to achieve their goals - and almost a
          quarter are not confident in the data they do have.
        </P>
      </div>

      <PullQuote>
        The problem is not the campaigns. It is the infrastructure underneath them.
      </PullQuote>

      <H2 id="gaps">The Four Gaps That Kill Pipeline</H2>
      <P>
        In specialist markets - where audiences are small, buying cycles are long, and every
        conversation matters - four structural gaps appear again and again.
      </P>

      <ol className="mt-8 space-y-6">
        {[
          [
            "Diffuse visibility",
            "Content reaches people, but not the right ones. There is no ICP filter anchoring the targeting, so reach grows but qualified enquiries do not.",
          ],
          [
            "Ad-hoc content",
            "Every post is created from scratch. There is no system, no reuse, no compounding effect. The effort is high and the output is inconsistent.",
          ],
          [
            "Missing tracking",
            "Without UTM governance, GA4 event mapping, and channel-level conversion data, budget gets allocated by gut feeling rather than evidence.",
          ],
          [
            "The gap to sales",
            "Leads come in but fall through. There is no CRM handoff, no nurture sequence, no structured process connecting marketing to a sales conversation.",
          ],
        ].map(([t, d], i) => (
          <li
            key={t}
            className="grid grid-cols-[56px_1fr] gap-5 border-t border-black/10 pt-6"
          >
            <span className="font-display text-3xl text-[var(--accent-cyan)] leading-none">
              0{i + 1}
            </span>
            <div>
              <h3 className="font-display text-xl text-[var(--ink-navy)]">{t}</h3>
              <p className="mt-2 font-sans text-[16px] leading-[1.8] text-[#374151]">{d}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-8 font-sans italic text-[16px] text-black/60">
        Any one of these gaps is damaging. All four together make growth unpredictable.
      </p>

      <H2 id="connects">What Actually Connects Visibility to Revenue</H2>
      <div className="space-y-5">
        <P>
          The answer is not more campaigns. It is a system that connects every element -
          targeting, content, tracking, and CRM - into one coherent flow.
        </P>
        <P>
          This means starting with a precise ICP definition before touching any channel. Building
          tracking infrastructure so every lead can be attributed. Setting up LinkedIn and paid
          search as coordinated parts of a single acquisition engine. And connecting that engine
          to a CRM so marketing activity lands inside a sales process, not beside it.
        </P>
      </div>

      <PullQuote>
        This is the difference between running campaigns and building pipeline.
      </PullQuote>

      <H2 id="specialist">Why This Matters More in Specialist Markets</H2>
      <div className="space-y-5">
        <P>
          In broad consumer markets, volume compensates for imprecision. A 1% conversion rate
          against millions still generates meaningful numbers.
        </P>
        <P>
          In specialist markets, that logic breaks. If your TAM is a few thousand companies,
          every touchpoint matters. Every wasted impression is a real cost. Every lead that falls
          through is a real loss.
        </P>
        <p className="font-sans text-[17px] leading-[1.85] font-medium text-[var(--ink-navy)]">
          Precision is not optional. It is the only viable strategy.
        </p>
      </div>

      <H2 id="question">The Question Worth Asking</H2>
      <div className="space-y-5">
        <P>
          If your marketing is active but your pipeline is inconsistent, the question is not "how
          do we do more?" It is "where exactly is the system breaking down?"
        </P>
        <P>
          The answer is almost always structural - not creative, not strategic, not about channel
          choice. It is about the infrastructure connecting what marketing does to what sales
          needs.
        </P>
        <p className="font-display text-2xl text-[var(--ink-navy)] mt-8 leading-snug">
          That gap is closeable. But it requires building something, not just running something.
        </p>
      </div>
    </>
  );
}

/* ----------------------- German advertising market ------------------------ */

const germanMarketToc: TocItem[] = [
  { id: "record", label: "A Record Year, On Paper" },
  { id: "concentration", label: "The Concentration Nobody Voted For" },
  { id: "kmu", label: "Big and Small Budgets Split" },
  { id: "b2b", label: "The B2B Layer: LinkedIn Quietly Wins" },
  { id: "measurable", label: "Measurable vs. Not" },
  { id: "ooh", label: "Where Creative Still Counts" },
  { id: "privacy", label: "Privacy Rewired Measurement" },
  { id: "ai", label: "AI: The Shift Not Yet Shipped" },
  { id: "implications", label: "What This Means for Budgets" },
];

function GermanMarketBody() {
  return (
    <>
      <p className="text-xl md:text-2xl leading-relaxed text-[#0f172a]">
        Germany's advertising market crossed the €50 billion threshold in 2025. At face value,
        another year of steady growth. Underneath, the composition of that spending is changing
        fast - shaped by platform dominance, privacy rules, new measurement infrastructure, and
        the first signs of AI-driven discovery.
      </p>
      <p className="mt-6 text-xl md:text-2xl leading-relaxed font-medium text-[var(--ink-navy)]">
        The question that matters is not how much budgets grow. It is why they are being
        reallocated - and what that means for anyone who owns one.
      </p>

      <H2 id="record">A Record Year, On Paper</H2>
      <div className="space-y-5">
        <P>
          The German Advertising Federation (ZAW) puts the commercial communications market at
          €50.9 billion for 2025, up 2.3%. Net advertising revenues grew 4.3% to €27.9 billion.
          For 2026, the media agency association Die Mediaagenturen forecasts net media spend of
          €31.6 billion, a plus of 3.5%.
        </P>
        <P>
          One honest note on the numbers: different sources measure different things. ZAW counts
          the broad commercial communications industry. Die Mediaagenturen counts net media spend
          after discounts. Highberg's Media Index casts the widest net - including events,
          sponsorship, and direct marketing - and arrives at over €60 billion. None of these are
          wrong. When you see wildly different "market size" figures quoted, the definitions
          differ, not the reality.
        </P>
        <P>
          What makes the growth notable is the backdrop: German GDP grew roughly 0.2% in 2025.
          Advertising normally follows the economy. When ad spend outpaces GDP by this margin, it
          is not because everyone is spending more - it is because money is moving. Some channels
          are gaining chairs, others are losing them.
        </P>
      </div>

      <H2 id="concentration">The Concentration Nobody Voted For</H2>
      <div className="space-y-5">
        <P>
          2026 marks a threshold: for the first time, more than half of every advertising euro in
          Germany flows to just three companies. Die Mediaagenturen projects Google, Amazon, and
          Meta will capture 51.6% of total German ad investment - €16.3 billion combined. In
          2022, the trio's share was around 36%. Digital's overall share of the market hits 72%
          in 2026, up from 54% four years ago.
        </P>
        <P>The split within the trio is worth knowing precisely:</P>
      </div>

      <ol className="mt-8 space-y-6">
        {[
          [
            "Google - €8.175 billion (+4.7%)",
            "Still the largest single recipient of German ad money. €1.012 billion of that goes to YouTube alone, growing 10%. Google's position rests on owning both ends of the journey: demand capture through Search and Shopping, and attention through YouTube - stitched together by cross-device measurement no local competitor can replicate.",
          ],
          [
            "Meta - €5.161 billion (+9.1%)",
            "Facebook and Instagram turn attention into demand through feed algorithms and closed-loop measurement. Every euro spent is tracked inside Meta's own ecosystem, which makes performance look provable - and keeps budgets coming back.",
          ],
          [
            "Amazon - €2.966 billion (+10%)",
            "The fastest-growing of the three, and structurally different: people on Amazon intend to buy. €2.883 billion of Amazon's German ad revenue is retail media - ads measurable down to the SKU level. Prime Video advertising adds €83.5 million, growing 15%.",
          ],
        ].map(([t, d], i) => (
          <li key={t} className="grid grid-cols-[56px_1fr] gap-5 border-t border-black/10 pt-6">
            <span className="font-display text-3xl text-[var(--accent-cyan)] leading-none">
              0{i + 1}
            </span>
            <div>
              <h3 className="font-display text-xl text-[var(--ink-navy)]">{t}</h3>
              <p className="mt-2 font-sans text-[16px] leading-[1.8] text-[#374151]">{d}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-8 space-y-5">
        <P>
          And a fourth name is closing in: TikTok is forecast to reach €598 million in German net
          ad revenue in 2026, growing 30% - faster than any of the big three.
        </P>
        <P>
          Die Mediaagenturen's own framing is blunt: this is not a cyclical swing but a
          structural rebuild of the market. The German losers are named just as clearly - linear
          TV falls 6% to €3.06 billion, newspapers lose 9%, consumer magazines 10%. The growth
          is real. It is just not landing with German media companies.
        </P>
      </div>

      <H2 id="kmu">Big Budgets and Small Budgets Are Splitting Differently</H2>
      <div className="space-y-5">
        <P>
          One of the least discussed dynamics: Germany's Mittelstand allocates money very
          differently from the total market averages - and in some ways more aggressively.
        </P>
        <P>
          According to the KMU-Werbeindex (Crossvertise), small and mid-sized companies put
          roughly half of their entire media budgets into online channels - compared to 13.5% for
          the total market as measured by Nielsen, which is still dominated by large brand
          advertisers in TV and print. In 2025, KMUs ran 10% fewer campaigns but increased total
          media investment by 17% - fewer, bigger, more focused bets. Average budget per campaign
          rose 31%.
        </P>
        <P>
          The Mittelstand's other notable overweight: out-of-home. SMEs put over 20% of their
          budgets into OOH - more than double the total market's 9-10% share. Five out of six
          German SMEs book outdoor advertising. Meanwhile print has effectively vanished from the
          SME media plan - investment collapsed by nearly 80% in a single year, to 1% of budgets.
        </P>
        <p className="font-sans text-[17px] leading-[1.85] font-medium text-[var(--ink-navy)]">
          The takeaway: the often-cited market averages describe large advertisers. The companies
          most likely to be reading this - SMEs and scale-ups - are already living in the
          digital-first, measurement-first version of this market.
        </p>
      </div>

      <H2 id="b2b">The B2B Layer: Where LinkedIn Quietly Wins</H2>
      <div className="space-y-5">
        <P>
          For B2B budgets, a separate reallocation is underway that rarely makes the market
          headlines.
        </P>
        <P>
          LinkedIn now captures 41% of paid B2B social budgets - the largest single line item in
          the B2B paid mix (Dreamdata Benchmarks 2026, based on 3.5 million customer journeys).
          The share of B2B budgets going to LinkedIn versus Google has shifted from roughly 31/69
          to 38/62 within a year.
        </P>
        <P>
          The reason is uncomfortable for anyone still comparing platforms on click prices.
          LinkedIn's average CPC in the DACH region runs around €6 - more than three times
          Meta's €1.81. And yet Dreamdata's data shows LinkedIn as the only major platform
          delivering a positive return on ad spend for B2B: 121% ROAS, against 67% for Google
          Search and 51% for Meta.
        </P>
      </div>

      <PullQuote>
        The average B2B buying journey now spans 281 days, 88 touchpoints, and 10 stakeholders.
      </PullQuote>

      <div className="space-y-5">
        <P>
          Expensive clicks that reach the actual buying committee outperform cheap clicks that do
          not. Globally, LinkedIn's ad revenue is forecast to grow from $8.2 billion in 2025 to
          $9.7 billion in 2026 - growth of over 18%, faster than the platforms it competes with
          for B2B money.
        </P>
        <P>
          For German B2B companies, the practical reading: the question is no longer whether
          LinkedIn is too expensive. It is whether your measurement can see far enough down a
          281-day journey to know what the spend produced.
        </P>
      </div>

      <H2 id="measurable">Not Paid vs. Organic - Measurable vs. Not</H2>
      <div className="space-y-5">
        <P>
          The popular claim that "paid advertising is over" does not survive contact with the
          data. Nearly every channel that can demonstrate an outcome is growing:
        </P>
      </div>

      <ul className="mt-6 space-y-3 font-sans text-[17px] leading-[1.7] text-[#1f2937] list-disc pl-6">
        <li>
          Influencer/content marketing: +16.8% forecast for 2026 - and increasingly
          professionalized, with affiliate tracking and platform analytics tying creators to
          revenue
        </li>
        <li>Retail media: +14.8%</li>
        <li>Podcast advertising: +14.3%</li>
        <li>Video/streaming: +14.1%</li>
        <li>Search: +8.6%</li>
      </ul>

      <p className="mt-6 font-sans text-[17px] leading-[1.85] text-[#1f2937]">
        Declining: print (-5.1% forecast) and linear TV. The pattern is not paid versus organic.
        It is that budgets flow to whatever can prove its contribution - and away from whatever
        cannot.
      </p>

      <H2 id="ooh">The Exception That Proves Creative Still Counts</H2>
      <div className="space-y-5">
        <P>
          One format breaks the rule, and it is worth taking seriously: out-of-home crossed 10%
          market share for the first time, reaching a record €3.56 billion in 2025. Roughly a
          quarter of the growth comes from digital screens (DOOH grew 26%), but classic
          large-format posters continue to hold ground.
        </P>
        <P>
          OOH offers rough attribution at best. It thrives anyway - because it does something
          micro-targeted channels structurally cannot: build mental availability at mass scale.
          Marketing science (Ehrenberg-Bass, the IPA effectiveness studies) has long argued that
          much of advertising works not by persuading in the moment but by ensuring a brand is
          already in the consideration set when a buying decision happens. A strong poster works
          on everyone who passes it - no login, no consent banner, no algorithm deciding who
          deserves to see it.
        </P>
        <P>
          The strategic reading: in a market obsessed with attribution, unmeasurable reach with
          strong creative has become a differentiator rather than a liability. The brands
          treating OOH as a complement to performance channels - not a competitor for the same
          KPI - are using the market's blind spot.
        </P>
      </div>

      <H2 id="privacy">Privacy Did Not Kill Measurement. It Rewired It.</H2>
      <div className="space-y-5">
        <P>
          The end of third-party cookies and strict European consent enforcement were supposed to
          break digital advertising. What actually happened: measurement moved in-house and got
          more sophisticated.
        </P>
        <P>
          In Germany, where consent opt-out rates are among the highest in Europe, the rebuild is
          furthest along. Consent Mode and GA4 fill tracking gaps with modeled conversions.
          Server-side tagging and Conversion APIs recover signal that browser-based pixels lose.
          First-party data - email lists, CRM records, purchase history - has become the core
          measurement asset rather than a nice-to-have.
        </P>
        <P>
          The competitive consequence is real: companies that invested early in first-party data
          infrastructure and consent-based measurement can still answer "which campaign drove
          that sale" - their competitors increasingly cannot. Measurement capability is now a
          market advantage in itself, not back-office plumbing.
        </P>
      </div>

      <H2 id="ai">AI: The Shift That Has Not Shipped Yet</H2>
      <div className="space-y-5">
        <P>
          Conversational AI advertising exists - ChatGPT ads are live in the US, UK, Canada,
          Japan and other markets - but not in Germany, and analysts do not expect meaningful
          German AI ad revenue before 2027. WPP projects AI-driven search could capture close to
          40% of global search ad revenue by 2031; in 2026 it is barely 2%.
        </P>
        <P>
          But one shift is already real, ahead of any ad product: visibility inside AI answers.
          When a potential customer asks an AI assistant a question, whether your company is
          cited in the answer is already a discovery channel - one with no ad slot to buy yet.
          The early discipline forming around this is Generative Engine Optimization: structured,
          authoritative content built so that AI systems use it as a source.
        </P>
        <P>
          The practical version of "AI strategy" in 2026 is unglamorous: make your expertise
          machine-readable before the ad layer arrives. Companies doing that now will find the
          eventual paid placements amplifying an existing presence rather than compensating for a
          missing one.
        </P>
      </div>

      <H2 id="implications">What This Means If You Own a Budget</H2>
      <P>Four implications, in order of urgency:</P>

      <ol className="mt-8 space-y-6">
        {[
          [
            "Measurement infrastructure is now channel strategy",
            "The dividing line in this market runs between provable and unprovable impact. GA4/GTM architecture, first-party data, and consent-proof tracking are not technical afterthoughts - they decide which channels you can even use with confidence.",
          ],
          [
            "Concentration is a dependency risk, not just a statistic",
            "Three platforms holding half the market means a policy change, algorithm shift, or price increase at any one of them hits your acquisition directly. Owned channels - email, community, your own content platform - are the hedge.",
          ],
          [
            "In B2B, journey visibility beats click price",
            "The LinkedIn numbers make the case: the most expensive clicks in the market deliver the only positive B2B ROAS. If your attribution window is shorter than your sales cycle, your data is lying to you about what works.",
          ],
          [
            "Creative is the one variable that works on both sides of the divide",
            "Measurable channels reward it with better conversion; unmeasurable ones depend on it entirely. OOH's record year is the proof that a strong idea still buys what no targeting can.",
          ],
        ].map(([t, d], i) => (
          <li key={t} className="grid grid-cols-[56px_1fr] gap-5 border-t border-black/10 pt-6">
            <span className="font-display text-3xl text-[var(--accent-cyan)] leading-none">
              0{i + 1}
            </span>
            <div>
              <h3 className="font-display text-xl text-[var(--ink-navy)]">{t}</h3>
              <p className="mt-2 font-sans text-[16px] leading-[1.8] text-[#374151]">{d}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-10 font-display text-2xl text-[var(--ink-navy)] leading-snug">
        The market is not shifting because digital won. It is shifting because measurable
        business outcomes became the currency - and every player, from the platform trio to the
        poster on the U-Bahn wall, is being repriced in it.
      </p>

      <div className="mt-14 border-t border-black/10 pt-6 text-sm text-black/55 font-sans leading-relaxed space-y-3">
        <p>
          <span className="uppercase tracking-[0.14em] text-black/45 text-xs">Sources</span>
          <br />
          ZAW Jahresbilanz; Die Mediaagenturen e.V. Werbemarktdaten 2026; Highberg Media Index;
          Nielsen AdTrend / IDOOH (OOH figures); Crossvertise KMU-Werbeindex; Dreamdata LinkedIn
          Ads Benchmarks Report 2026; WARC Media; WPP forecasts.
        </p>
        <p className="italic">
          One caveat worth stating plainly: none of the three platforms publishes country-level
          ad revenue. These figures are Die Mediaagenturen's estimates, modeled from agency
          booking data and known channel shares - the industry's standard reference, but
          projections rather than reported results. The direction and scale of the shift are not
          in dispute; the decimal points are.
        </p>
      </div>
    </>
  );
}

/* ------------------------------- Registry -------------------------------- */

export const articleContent: Record<string, ArticleContent> = {
  "visibility-is-not-pipeline": { toc: visibilityToc, Body: VisibilityBody },
  "german-advertising-market-2026": { toc: germanMarketToc, Body: GermanMarketBody },
};
