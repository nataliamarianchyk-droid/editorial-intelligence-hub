Two teams can look at the same GA4 report and believe different things about it. One sees a count of observed activity. The other assumes it is a complete account of every visitor and every conversion.

Consent constraints make that difference important. Some activity is directly observed, some may be represented through modelling in eligible reporting contexts, and some remains absent. A larger number is not automatically a more complete truth, and a missing number is not automatically missing demand.

The first task is to identify what each report is actually allowed and able to represent.

## Consent state is an input, not permission by itself

Consent Mode communicates consent choices to Google tags and changes how they behave. It does not obtain consent, choose a lawful basis or make a website compliant on its own. Those responsibilities remain with the site operator and its consent implementation.

Consent Mode v2 includes advertising-related signals such as ad_user_data and ad_personalization alongside analytics_storage and ad_storage. Map each signal to the actual choices offered to visitors. Defaults and later updates must be applied in the correct order, before the relevant tags behave as though permission exists.

Google explains that consent mode adjusts tag behaviour and can support conversion modelling under its eligibility requirements. It should not be interpreted as a guarantee that all missing activity will be recovered. [1](https://support.google.com/google-ads/answer/12445060?hl=en)

## Distinguish basic and advanced behaviour

In a basic implementation, relevant tags are blocked until consent is granted. In an advanced implementation, tags can load with denied defaults and send restricted, cookieless signals according to their documented behaviour. These are different technical and legal choices; "denied" does not necessarily mean no network request in every configuration.

Choose the approach with the people responsible for privacy, then verify the actual browser behaviour. Do not infer it from the presence of a banner. Test a fresh visit, rejection, acceptance, partial choices and withdrawal. Check that returning visits preserve the right preference rather than silently resetting it.

Document what is collected in each state. A consent policy that cannot be explained to a non-technical colleague is difficult to audit and maintain.

## Separate measurement layers in the report

Google Ads conversion modelling and GA4 behavioural modelling are not interchangeable features. They have different purposes, eligibility conditions and reporting surfaces. Do not describe all analytics numbers as modelled, and do not assume that enabling consent mode automatically enables every modelling feature.

Google describes modelled online conversions as estimates of attribution for unobserved connections between interactions and conversions, rather than a determination that a purchase occurred. That distinction is useful when discussing advertising reports. [2](https://support.google.com/google-ads/answer/10081327?hl=en)

| Evidence layer | What it can support | What it cannot establish alone |
| --- | --- | --- |
| Observed analytics events | Activity captured by the implementation | A complete census of all activity |
| Eligible modelled reporting | Estimates within a documented methodology | Individual user journeys |
| CRM and transaction records | Recorded leads, orders and revenue | Which channel caused each outcome |
| Controlled experiments | Estimated incremental effects within the design | A universal answer for every future period |

Use those layers together. Reconciliation means explaining differences, not forcing every system to show an identical total.

## Diagnose a change before explaining performance

When reported conversions fall, first ask whether the measurement environment changed. A banner redesign can alter consent choices. A tag release can break event capture. A new payment flow can lose the session connection. A reporting setting can change which evidence is displayed.

Maintain an annotation log for releases, consent-policy changes and campaign changes. Compare transactions with recorded purchase events over the same dates, currencies and refund treatment. Segment discrepancies by device and acquisition path without assuming every difference has a behavioural cause.

Never respond to missing data by adding personal information to URLs or bypassing a rejected consent choice. Better coverage is not a justification for collecting data the visitor did not authorise.

## Put uncertainty in the decision memo

A useful monthly memo reports the business outcome first, the analytics signal second and the limitations third. For example: recorded qualified enquiries increased; observed organic sessions were broadly stable; a consent-banner release means the session comparison is not fully like-for-like.

Do not invent a precise uplift for the unobserved population. Explain which conclusions are robust across CRM, analytics and experiment evidence, and which depend on assumptions. That makes the report more actionable than presenting one attributed total as unquestionable fact.

For campaign naming and acquisition reconciliation, read [UTM Governance Is a Revenue System](/analytics-tracking/utm-governance). Consent-aware measurement is not the absence of analysis. It is analysis that stays honest about the population it can see.
