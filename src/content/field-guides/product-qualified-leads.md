A login is evidence that someone opened the product. It is not evidence that an organisation is ready to buy.

Product-qualified leads become useful when behaviour shows that a relevant user has experienced value and encountered a commercially meaningful reason to take the next step. The signal needs to be specific to the product, the account and the buying model.

A universal activity threshold can be worse than no score at all. It sends sales toward the busiest users rather than the users with a problem sales can help resolve.

## Define value before defining qualification

Identify the workflow in which a user first experiences the promised benefit. For a collaboration product, that might involve a completed shared task rather than an invitation alone. For an analytics product, it might be a saved report used in a real review rather than simply connecting a data source.

These are illustrative activation hypotheses, not established thresholds. Test whether they precede retention or purchase in your own cohorts. A behaviour can be common among customers without being a reliable early predictor.

Amplitude describes a PQL as a user who has meaningfully engaged with the product and shows intent to convert. Its documentation also describes using behavioural cohorts with CRM scoring and workflows. That is an implementation route, not a guarantee of improved conversion. [1](https://amplitude.com/blog/pqls-hubspot-integration)

## Add account fit and a useful reason to contact

Product activity does not establish that the organisation fits your offer. Combine behavioural evidence with the account's requirements, buying capacity and delivery constraints.

Then identify the reason for sales assistance. A user reaching a collaboration limit may need a team plan. An evaluator exploring security settings may need procurement evidence. A power user on a free plan may be perfectly content and have no buying authority.

The outreach should reflect that context. "You scored highly" is not useful to the recipient. "Your team appears to be evaluating shared reporting; would access and permission requirements be helpful to review?" at least offers a relevant next step, provided the activity can be used lawfully and appropriately.

## Create a small event contract

Document the events, their definitions and identity rules. Distinguish a person from an account and a test workspace from a real customer environment. Account-level purchases can be missed if every user's activity is assessed in isolation.

| Signal family | Example | Caution |
| --- | --- | --- |
| Activation | Completed a core value workflow | Setup activity may not represent value |
| Collaboration | Several relevant users participate | Invitations alone can exaggerate adoption |
| Commercial constraint | Reaches a meaningful product limit | Some users will never need an upgrade |
| Evaluation | Reviews procurement or integration needs | Interest does not establish authority |
| Fit | Account meets delivery requirements | Inferred firmographics may be wrong |

Avoid recording sensitive content merely to improve a score. Where possible, use event metadata that describes completion without copying the customer's underlying documents or messages.

## Validate against a fair comparison

Create a cohort at the moment the proposed signal occurs. Compare later conversion and retention with a suitable non-qualified cohort, accounting for tenure, account type and acquisition route where possible.

Do not use purchase events as inputs to a rule intended to predict purchase. Do not compare long-tenured users with brand-new trials and attribute the entire difference to qualification. These choices can make a weak rule look strong.

When assessing the value of sales outreach itself, consider a controlled holdout where commercially and ethically appropriate. Product-qualified users may have converted through self-service anyway. A higher conversion rate among contacted users does not by itself establish that contact caused the improvement.

## Design the handoff around assistance

Send the salesperson a concise context packet: account fit, the relevant completed workflow, the timestamp and the reason help may be useful. Give the recipient a clear route to decline or continue self-service.

Keep sales dispositions in the product feedback loop. If qualified users repeatedly lack authority, adjust the account logic. If they need help before reaching the threshold, your signal may arrive too late.

Amplitude's HubSpot quickstart describes syncing behavioural cohorts, configuring scoring and setting workflows. Use that as a system reference while keeping the commercial definition independent of any vendor. [2](https://amplitude.com/docs/data/source-catalog/hubspot-quickstart)

> A good PQL identifies a moment where help is relevant, not merely a moment where tracking is possible.

Read [ICP Precision in Sub-1,000-Account Markets](/b2b-saas/icp-precision) for account-fit discipline. Start with one meaningful value event and one clear assistance hypothesis, then check whether the resulting conversations justify the rule.
