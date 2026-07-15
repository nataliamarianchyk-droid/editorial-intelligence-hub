import type { ReactNode } from "react";
import crmPipelineDies from "@/assets/insights/crm/pipeline-dies.png.asset.json";
import crmStructuralFailures from "@/assets/insights/crm/structural-failures.png.asset.json";
import crmOperationalFlow from "@/assets/insights/crm/operational-flow.png.asset.json";
import crmLeadScoring from "@/assets/insights/crm/lead-scoring.png.asset.json";
import crmFeedbackLoop from "@/assets/insights/crm/feedback-loop.png.asset.json";
import crmExecutiveScoreboard from "@/assets/insights/crm/executive-scoreboard.png.asset.json";

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

/* ---------------------------- CRM article -------------------------------- */

const crmToc: TocItem[] = [
  { id: "cost", label: "The Cost, Honestly Stated" },
  { id: "handoff", label: "Where the Handoff Dies" },
  { id: "failures", label: "Four Structural Failures" },
  { id: "walkthrough", label: "A Real-Case Walkthrough" },
  { id: "tier", label: "The Tier Verdict" },
  { id: "ai", label: "The AI Layer" },
  { id: "kpis", label: "Five Numbers a CRO Should Watch" },
  { id: "reframe", label: "The Reframe" },
  { id: "playbook", label: "Operator's Playbook" },
];

function Infographic({
  src,
  width,
  height,
  alt,
  caption,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}) {
  return (
    <figure className="my-12 -mx-2 md:-mx-6 lg:-mx-10">
      <img
        src={src}
        width={width}
        height={height}
        alt={alt}
        loading="lazy"
        className="w-full h-auto rounded-sm block"
      />
      <figcaption className="mt-4 text-sm text-black/60 font-sans italic text-center">
        {caption}
      </figcaption>
    </figure>
  );
}

function CrmBody() {
  return (
    <>
      <p className="text-xl md:text-2xl leading-relaxed text-[#0f172a]">
        Ask a board whether sales and marketing are aligned and most will say yes. Ask the people
        running the handoffs and you get a different answer.
      </p>
      <p className="mt-6 text-[17px] leading-[1.85] font-sans text-[#1f2937]">
        In Forrester's 2024 Priorities Survey, 82% of C-level B2B executives said their product,
        sales and marketing teams were aligned, with 41% calling them "highly aligned." In
        Forrester's separate Q2 2024 Sales and Marketing Alignment Survey, 65% of sales and
        marketing professionals said the leaders of those two functions were not aligned at all.
        Leadership is describing an intention; the front line is describing the daily experience
        of leads that get rejected or quietly ignored.
      </p>
      <p className="mt-6 text-[17px] leading-[1.85] font-sans text-[#1f2937]">
        The instinct is to treat this as a relationship problem - an offsite, shared OKRs, more
        empathy. That instinct is wrong. Alignment is a definitions-and-plumbing problem, and the
        plumbing lives in one place: the CRM. The most consequential marketing tool a company
        owns is not its email platform, its ad account or its content engine. It is the system
        that decides what happens in the ninety seconds after a form is submitted.
      </p>

      <Infographic
        src={crmPipelineDies.url}
        width={1600}
        height={1008}
        alt="Funnel showing where B2B pipeline leaks — most attrition happens at the marketing-to-sales handoff, where average response time is 47 hours."
        caption="The biggest leak isn't at the top. It's the handoff."
      />

      <H2 id="cost">The Cost, Honestly Stated</H2>
      <div className="space-y-5">
        <P>
          The number that dominates this topic is the "$1 trillion lost annually to
          misalignment." Treat it as folklore. It was popularised through an HBR contributor
          column (Kelsey Raymond, December 2021) with no recoverable primary source, and it
          circulates as a vendor aggregate rather than a finding. The defensible figure is IDC's
          long-standing estimate: B2B companies' inability to align sales and marketing teams
          around the right processes and technologies has cost them upwards of 10% or more in
          revenue per year - or $100 million for a billion-dollar company. That is per-company,
          actionable, and has been the analyst benchmark for over a decade.
        </P>
        <P>
          Two more numbers deserve a health warning. The claim that aligned companies generate
          "208% more revenue from marketing" traces to a Wheelhouse Advisors infographic
          popularised by MarketingProfs around 2010, with no recoverable methodology - folklore.
          And the widely repeated "73% of marketing leads are never contacted by sales" is
          directional at best; it traces through Channel Futures to CMIT Solutions and is derived
          from an assumed ~27% contact rate rather than a clean study.
        </P>
        <P>
          What survives scrutiny is more useful anyway. SiriusDecisions (now Forrester) found
          that B2B organizations with tightly aligned sales and marketing operations achieved 24%
          faster three-year revenue growth and 27% faster three-year profit growth. That is the
          honest business case: not a headline-grabbing multiple, but a durable compounding
          advantage.
        </P>
      </div>

      <H2 id="handoff">Why the Handoff Is Where Pipeline Dies</H2>
      <div className="space-y-5">
        <P>
          Buyers changed. Gartner's 2017 Digital B2B Buyer Survey (n=750) found that the average
          buyer spends only 17% of total purchase time meeting with potential suppliers; split
          across three or four vendors, any one supplier gets roughly 5-6% of the buyer's
          attention - a figure Gartner has restated through 2024. If you get that little time,
          the moment you do get is decisive. Squander the handoff and you have squandered the
          deal.
        </P>
        <P>
          Meanwhile sellers are starved of selling time. Salesforce's State of Sales, 5th Edition
          - a survey of 7,775 sales professionals across 38 countries - found that reps spend
          just 28% of their week actually selling, with the majority of their time consumed by
          deal management and data entry. The newer 7th Edition (2026, 4,050 reps across 22
          countries) still shows selling occupying a minority of the week at roughly 40%. A rep
          with a third of their week to sell cannot afford to chase leads that were never
          qualified.
        </P>
      </div>

      <PullQuote>
        Contacting a lead within five minutes rather than thirty makes firms 21 times more likely
        to qualify it.
      </PullQuote>

      <div className="space-y-5">
        <P>
          The foundational evidence is the MIT/InsideSales Lead Response Management Study
          (Dr James Oldroyd, 2007), which analysed more than 100,000 dial attempts across 15,000+
          leads at six companies. The follow-up HBR study, "The Short Life of Online Sales
          Leads" (Oldroyd, McElheran and Elkington, March 2011; 2,241 US companies), found the
          average firm took 42 hours to respond, only 37% responded within an hour, 24% took more
          than 24 hours, and 23% never responded at all.
        </P>
        <P>
          Fifteen years on, almost nothing has improved. Optifai's 2025-2026 benchmark of 939 B2B
          companies found an average response time of 47 hours, with only 23% of companies
          responding within five minutes and 42% taking more than a day. The close-rate gradient
          tracks the delay almost linearly: leads contacted in under five minutes closed at 32%,
          versus 12% after 24 hours - a 2.6x swing with no change to the offer, the rep or the
          pitch.
        </P>
        <P>
          The bottleneck has a name. First Page Sage's analysis of client data from 2019-2025
          puts the cross-industry median MQL-to-SQL conversion rate at roughly 13%, ranging from
          about 11% in fintech to about 26% in HVAC and insurance. B2B SaaS specifically averages
          18-22%, with top performers at 25-35%. The MQL→SQL step is where marketing's leads
          either become real pipeline or quietly die - and it is the single highest-ROI place to
          intervene.
        </P>
      </div>

      <H2 id="failures">The Four Structural Failures</H2>
      <P>None of these is a culture problem. Each is a missing or broken object in the CRM.</P>

      <Infographic
        src={crmStructuralFailures.url}
        width={1600}
        height={1200}
        alt="2x2 grid of the four structural failures in marketing-to-sales handoff: no shared lead definition, no automated routing, no context transfer, no feedback loop."
        caption="None of these is a culture problem."
      />

      <ol className="mt-8 space-y-6">
        {[
          [
            "No shared definition of a lead",
            "Marketing ships MQLs against a threshold sales never agreed to. Sales rejects them. Both are being honest; they are measuring different things. This corrupts the MQL→SQL rate before anyone touches it.",
          ],
          [
            "No automated routing",
            "A qualified lead sits in a queue because assignment is manual, or happens at the next weekly meeting. Against a five-minute window, a two-day handoff is a rounding error away from never.",
          ],
          [
            "No context transfer",
            "The rep receives a name and an email, not the pages viewed, the content downloaded or the form answers. So the rep re-discovers what marketing already knew, burning the 5-6% of buyer time they were granted.",
          ],
          [
            "No feedback loop",
            "Sales rejects leads into a void. Marketing never learns which sources produce revenue, so it optimises for volume - more of exactly the leads sales rejects. The loop is severed at the rejection node.",
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

      <p className="mt-8 font-sans text-[17px] leading-[1.85] text-[#1f2937]">
        Add a slow-acting accelerant: B2B contact data decays fast. Dun &amp; Bradstreet's
        benchmark puts the rate at roughly 2.1% per month, compounding to about 22.5% a year
        (other estimates run to 30%) - so even a good lead becomes a bad record if it sits.
      </p>

      <H2 id="walkthrough">What the Fix Actually Looks Like: A Real-Case Walkthrough</H2>
      <div className="space-y-5">
        <P>
          Consider Nordwerk GmbH - an illustrative, fictional composite: a Berlin-based B2B SaaS
          company of about 25 people, with a four-person sales team selling a mid-ticket annual
          subscription (roughly €12,000 a year) to mid-market buyers across Germany, Austria and
          Switzerland. Nordwerk runs on HubSpot's free CRM. Marketing hits its MQL target every
          month. Sales complains, every month, that the leads are junk. The average time from
          form-fill to first sales touch is about two days.
        </P>
        <p className="font-display text-xl text-[var(--ink-navy)]">Before</p>
        <P>
          A prospect - a procurement lead at a mid-market manufacturer - downloads Nordwerk's
          pricing guide at 09:14 on a Tuesday. HubSpot Free captures the contact. Nothing routes
          it; owner assignment is manual. It surfaces at the Thursday pipeline meeting, is
          eyeballed, and assigned to a rep who emails on Friday afternoon - about 47 hours later,
          exactly the industry average and exactly the wrong side of every speed-to-lead curve.
          The rep sees a name and an email, not the three pricing-page visits. Marketing counted
          the download as an MQL; sales silently drops it as "not ready," with no reason
          recorded. Marketing's dashboard shows MQL target met. The pipeline shows nothing. Both
          teams are correct, and the company loses the deal.
        </P>
        <p className="font-display text-xl text-[var(--ink-navy)] pt-4">After - built tier by tier</p>
      </div>

      <Infographic
        src={crmOperationalFlow.url}
        width={1600}
        height={1008}
        alt="Nine-step operational flow from form-fill to forecast: lifecycle stages, MQL definition, automated transitions, owner rotation, SLA timer, follow-up task, Slack notification, mandatory rejection reasons, weekly MQL to SQL report."
        caption="Nine steps between a form-fill and a forecast."
      />

      <ol className="mt-8 space-y-6">
        {[
          [
            "Document the lifecycle stages",
            "In HubSpot: Settings → Data Management → Objects → Contacts → Lifecycle Stage. The eight defaults are Subscriber, Lead, MQL, SQL, Opportunity, Customer, Evangelist and Other. This costs nothing on Free. What Nordwerk does here is not technical - it is the treaty: marketing and sales jointly write down what each stage means and who owns the transition into it.",
          ],
          [
            "Define MQL jointly, and score it",
            "Manual model: pricing-page visit +25, demo request +40, Director-level title or above +20, ICP fit +30, student or free email domain -50. Threshold: 80. First hard wall: lead scoring is not available on HubSpot Free or Starter - it requires Marketing Hub or Sales Hub Professional. Predictive scoring is Enterprise-only.",
          ],
          [
            "Automate the lifecycle transition",
            "Lead → MQL and MQL → SQL transitions do not happen on their own - they require a workflow. Second wall: multi-step workflows require Professional. The engine of the whole system is a paid feature.",
          ],
          [
            "Rotate to owner",
            "Automation → Workflows → Create workflow (contact-based). Trigger on lead score ≥ 80 or lifecycle stage = MQL, then rotate the record to a sales owner. Round-robin owner rotation still requires Sales (or Service) Hub Professional or Enterprise, and each assignee must hold a paid seat.",
          ],
          [
            "Start the SLA timer",
            "The moment the contact becomes an MQL, the stopwatch starts. HubSpot auto-generates \"Date entered [stage]\" timestamps; time-in-stage calculated properties are Professional. The target is written into the treaty: first touch within one hour, tracked, visible, owned.",
          ],
          [
            "Create the follow-up task",
            "A task is created automatically on the assigned rep's queue with the lead's page-view history, form answers and score attached. The rep opens the record already knowing why marketing sent it.",
          ],
          [
            "Notify Slack/email",
            "An internal notification fires so the SLA clock is not silent. Response time is a system property, not a hope.",
          ],
          [
            "Mandatory rejection reasons",
            "Settings → Properties → Conditional logic → Create logic. When a rep disqualifies a lead, they must say why. Conditional property logic that enforces a required field is a Professional+ feature. This single node is what re-connects the severed feedback loop.",
          ],
          [
            "Weekly MQL→SQL reporting",
            "Reporting → Reports → Funnels → Contacts, with stages Lead → MQL → SQL → Opportunity → Customer. Both teams work from one number, watching the MQL→SQL rate that used to be an argument.",
          ],
        ].map(([t, d], i) => (
          <li key={t} className="grid grid-cols-[56px_1fr] gap-5 border-t border-black/10 pt-6">
            <span className="font-display text-3xl text-[var(--accent-cyan)] leading-none">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="font-display text-xl text-[var(--ink-navy)]">{t}</h3>
              <p className="mt-2 font-sans text-[16px] leading-[1.8] text-[#374151]">{d}</p>
            </div>
          </li>
        ))}
      </ol>

      <Infographic
        src={crmLeadScoring.url}
        width={1600}
        height={1104}
        alt="Lead scoring model: pricing-page visit +25, demo request +40, Director+ title +20, ICP fit +30, student or free email domain -50. MQL threshold at 80 points."
        caption="A demo request plus a free Gmail address is not a lead."
      />

      <div className="mt-8 space-y-5">
        <P>
          Offline conversions back to the ad platforms. Marketing → Ads → Create event lets
          Nordwerk fire a conversion to Google Ads and LinkedIn when a contact reaches MQL, SQL
          or Customer - teaching the bidding algorithms to optimise for revenue-shaped events,
          not form-fills. Two operational notes matter. LinkedIn's Conversions API only credits
          conversions within 90 days of the ad click. And because Nordwerk's buyers are in the
          EEA, Google Consent Mode v2 has been mandatory since March 2024: personalised
          advertising and Customer Match uploads require the ad_user_data and ad_personalization
          consent signals to be granted, or the data cannot be used.
        </P>
      </div>

      <Infographic
        src={crmFeedbackLoop.url}
        width={1600}
        height={1008}
        alt="Two circular diagrams comparing a severed feedback loop, where sales rejections return no reason to marketing, with a closed loop, where mandatory rejection reasons flow back to marketing."
        caption="Marketing can only learn from rejections it can see."
      />

      <H2 id="tier">The Tier Verdict</H2>
      <div className="space-y-5">
        <P>
          Nordwerk's honest conclusion: HubSpot Free cannot run this system. Free gives you the
          lifecycle-stage vocabulary and the ability to create properties - the paperwork of
          alignment - but none of the automation, scoring, rotation, conditional-required fields
          or custom funnel reporting that make it real. Starter removes branding and adds light
          automation but still lacks all of the above. The system described here requires
          Professional (in 2026, Sales Hub Professional lists at roughly $100 per seat per month,
          and Marketing Hub Professional at roughly $890 per month including three seats, plus a
          one-time onboarding fee) - which for a 25-person DACH SaaS is a rational, and arguably
          overdue, purchase. Predictive scoring and custom objects sit up at Enterprise;
          Nordwerk does not need them yet.
        </P>
        <P>
          Grounded in the benchmarks above - not in any real client result - Nordwerk's plausible
          trajectory is: response time falling from ~47 hours toward under one hour; MQL→SQL
          climbing from the low teens toward the mid-20s% typical of well-run B2B SaaS; and, for
          the first time, a defensible answer to "which marketing spend produced revenue?"
        </P>
        <P>
          The cleanest publicly documented example is Advanced, a large UK business-software
          group, which (in an Adobe/Marketo customer story) consolidated a fragmented stack onto
          a defined lead-lifecycle model with funnel stages and nurture streams. The reported
          result: the conversion rate from SAL to SQL soared from 38% to 62%, with Marketo live
          within three months, 13 business units streamlined into one aligned function, and
          combined annual savings of £2 million.
        </P>
      </div>

      <H2 id="ai">The AI Layer</H2>
      <div className="space-y-5">
        <P>
          AI is genuinely arriving in these workflows. Microsoft and LinkedIn's 2024 Work Trend
          Index (an Edelman survey of 31,000 knowledge workers across 31 markets) found that 75%
          of knowledge workers use AI at work today, and 46% of users started using it less than
          six months ago. In the CRM, tools such as Salesforce's Einstein Conversation Insights
          already summarise calls, surface next steps and log sentiment straight onto the record;
          HubSpot's Breeze offers comparable moves.
        </P>
        <P>
          What AI does well here is real: it summarises calls, updates CRM fields, extracts
          buying signals from conversations and drafts follow-ups. What it cannot do is design
          your lifecycle, define your MQL, write your SLA or build your routing. Those are
          decisions, not tasks. Point AI at a company that has made those decisions and it
          compounds a good system. Point it at Nordwerk's "before" state and it will route junk
          faster and summarise calls that should never have happened.
        </P>
      </div>

      <PullQuote>AI accelerates good systems. It also accelerates broken ones.</PullQuote>

      <H2 id="kpis">The Five Numbers a CRO Should Watch</H2>

      <Infographic
        src={crmExecutiveScoreboard.url}
        width={1600}
        height={1008}
        alt="Executive scoreboard dashboard of five CRO metrics: MQL to SQL rate, lead response time, SQL acceptance rate, pipeline velocity, and closed-won from marketing-sourced leads."
        caption="Four of these are worthless without the fifth."
      />

      <ol className="mt-8 space-y-6">
        {[
          [
            "MQL→SQL conversion rate",
            "The master diagnostic. ~13% is the blended baseline; 25%+ is strong for B2B SaaS.",
          ],
          [
            "Lead response time vs SLA",
            "Median and % within the one-hour target. Under five minutes is elite; 47 hours is the unacceptable industry default.",
          ],
          [
            "SQL acceptance rate",
            "The share of MQLs sales accepts. Below ~70% means the MQL definition is broken, not the leads.",
          ],
          [
            "Pipeline velocity",
            "Are qualified leads moving, or ageing into the ~22-30%-a-year data decay?",
          ],
          [
            "Closed-won from marketing-sourced leads",
            "The only number that ends the \"which team drove revenue\" argument. The first four are worthless without this one.",
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

      <H2 id="reframe">The Reframe</H2>
      <div className="space-y-5">
        <P>
          Stop treating the CRM as a contact database with a sales tab. It is the operating
          system of the revenue engine - the place where the marketing-to-sales treaty is written
          in configuration rather than good intentions. Alignment is not a feeling the two teams
          achieve at an offsite. It is a set of objects: a shared lifecycle, a jointly-owned MQL
          definition, an automated route, an SLA timer, mandatory rejection reasons, a closed
          feedback loop and offline conversions flowing back to the ad platforms. Build those,
          and "alignment" stops being an aspiration and becomes a property you can query.
        </P>
      </div>

      <PullQuote>Your CRM is the real marketing tool. Everything else just fills it.</PullQuote>

      <H2 id="playbook">Operator's Playbook — 30-minute CRM Audit</H2>
      <ul className="mt-6 space-y-3 font-sans text-[17px] leading-[1.7] text-[#1f2937]">
        {[
          "Are lifecycle stages documented?",
          "Is MQL defined jointly by Marketing and Sales?",
          "Does every MQL receive an owner automatically?",
          "Is there an SLA timer?",
          "Are rejection reasons mandatory?",
          "Are offline conversions sent back to Google Ads and LinkedIn?",
          "Is MQL → SQL tracked weekly?",
          "Is marketing measured on revenue, not just leads?",
        ].map((q) => (
          <li key={q} className="flex gap-3">
            <span
              aria-hidden
              className="mt-1 inline-block h-4 w-4 border border-[var(--ink-navy)]/40 shrink-0"
            />
            <span>{q}</span>
          </li>
        ))}
      </ul>
      <p className="mt-6 font-sans text-[15px] italic text-black/65">
        Estimated completion time: 30 minutes. If more than two boxes remain unchecked, your CRM
        is functioning primarily as a contact database rather than a revenue system.
      </p>

      <div className="mt-14 border-t border-black/10 pt-6 text-sm text-black/55 font-sans leading-relaxed space-y-3">
        <p>
          <span className="uppercase tracking-[0.14em] text-black/45 text-xs">Sources</span>
          <br />
          Forrester 2024 Priorities Survey and Q2 2024 Sales &amp; Marketing Alignment Survey;
          IDC misalignment cost estimate; SiriusDecisions/Forrester three-year growth study;
          Gartner 2017 Digital B2B Buyer Survey (restated 2024); Salesforce State of Sales 5th
          and 7th Editions; Oldroyd et al. Lead Response Management Study (MIT/InsideSales,
          2007); Oldroyd, McElheran &amp; Elkington, "The Short Life of Online Sales Leads" (HBR,
          March 2011); Optifai Lead Response Time Benchmark (939 B2B companies, Q2 2025-Q1 2026);
          First Page Sage MQL-to-SQL conversion by industry (2019-2025); Dun &amp; Bradstreet B2B
          contact data decay; Microsoft &amp; LinkedIn 2024 Work Trend Index; Salesforce Einstein
          Conversation Insights docs; Google Consent Mode v2 (mandatory March 2024); HubSpot
          Knowledge Base (lifecycle stages, lead scoring, workflows, owner rotation, properties
          and conditional logic, funnel reports, ad conversion events, 2026 pricing);
          Adobe/Marketo "Advanced" customer story; SuperOffice alignment case (framed with
          caveat).
        </p>
        <p className="italic">
          Flagged as folklore/directional: "$1 trillion" (HBR contributor column, Dec 2021, no
          primary source); "208% more revenue" (Wheelhouse Advisors / MarketingProfs c.2010);
          "73% never contacted" (Channel Futures / CMIT, directional).
        </p>
      </div>
    </>
  );
}

/* ------------------------------- Registry -------------------------------- */

export const articleContent: Record<string, ArticleContent> = {
  "visibility-is-not-pipeline": { toc: visibilityToc, Body: VisibilityBody },
  "german-advertising-market-2026": { toc: germanMarketToc, Body: GermanMarketBody },
  "your-crm-is-the-real-marketing-tool": { toc: crmToc, Body: CrmBody },
};

