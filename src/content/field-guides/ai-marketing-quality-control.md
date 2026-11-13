A marketing automation can fail while every technical step succeeds. The workflow runs, the response is valid and the message reaches its destination. The claim is still wrong.

This is the gap between execution and quality. A model can produce fluent copy with an unsupported statistic, apply an outdated offer or mistake a customer's question for an instruction to expose information. None of those failures necessarily creates a system error.

Quality control needs its own layer, with explicit acceptance criteria and a clear decision about who can release the work.

## Classify outputs by consequence

Not every task needs the same review. An internal brainstorming list is different from a pricing statement, a customer email or a claim about a regulated product.

Group outputs by exposure and potential harm. Consider factual sensitivity, personal data, commercial commitments and whether the action can be reversed. Use this assessment to decide which checks are automatic, which need specialist review and which actions should not be automated.

NIST's Generative AI Profile is a voluntary risk-management resource for designing, developing and evaluating generative AI systems. It is not a marketing certification, but it provides a useful framework for making these risks explicit. [1](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence)

## Require evidence for factual claims

Give the workflow a source pack with an owner and review date. Ask it to identify which source supports each factual claim, but verify the citation itself. A plausible URL or a correct publication title does not prove that the source says what the output claims.

Separate sourced facts, editorial recommendations and hypothetical examples in the final material. A worked example should say it is illustrative; a recommendation should not be presented as a vendor requirement or a proven industry benchmark.

If evidence is missing, the allowed response should be omission, uncertainty or escalation. The model should not be rewarded for filling every field with a confident guess.

## Use deterministic checks where they fit

Some failures are better caught with rules than with another model. Validate required fields, permitted destinations, currency formats, approved product names and prohibited personal-data patterns before release.

These checks do not prove accuracy. They reduce avoidable errors and reserve human attention for judgement. A second model reviewing the first can help identify issues, but correlated errors mean it is not an independent guarantee.

| Check | Useful for | Remaining limitation |
| --- | --- | --- |
| Required-field validation | Missing or malformed output | Valid fields can contain false claims |
| Approved-source comparison | Unauthorised facts or offers | Sources can be stale or misinterpreted |
| Privacy screening | Obvious sensitive content | Context-dependent exposure needs judgement |
| Human review | Commercial meaning and release decisions | Reviewers need time, context and authority |
| Post-release monitoring | Discovering escaped defects | Harm may already have occurred |

## Give reviewers a real decision

A reviewer should see the requested task, source material, candidate output and identified uncertainties together. Asking someone to approve a polished paragraph without its evidence encourages superficial checking.

Assign named responsibility for high-consequence work. Define what approval means and what the reviewer can reject. Human oversight becomes symbolic when the workflow sends automatically unless someone interrupts it immediately.

NIST's human-AI interaction guidance emphasises clearly differentiated roles and responsibilities. Build those roles into the release process rather than simply adding a "human in the loop" label. [2](https://airc.nist.gov/airmf-resources/airmf/appendices/app-c-ai-risk-management-and-human-ai-interaction/)

## Test the unpleasant cases

An evaluation set should include outdated prices, conflicting briefs, missing attachments, ambiguous requests and external content that tries to issue instructions. Test whether the system stays within its task and permissions.

Keep expected outcomes concrete. For an unsupported claim, the correct behaviour might be to flag the missing evidence and stop publication. For a contradictory offer, it might be to request the approved version rather than selecting whichever appears last.

Repeat these checks after material changes to prompts, models, tools and sources. Passing yesterday's tests does not establish today's reliability if the workflow has changed.

## Learn from defects without hiding them

Record escaped errors by type, cause, exposure and corrective action. Separate a source problem from a retrieval problem, an instruction problem and a review problem. Otherwise every incident becomes "the AI got it wrong" and no part of the system improves.

Keep rollback and correction paths ready. A mistaken customer message may need a human follow-up; an incorrect public claim may need removal and a documented correction.

Read [Designing an Internal AI Marketing Stack](/ai-marketing-operations/internal-ai-marketing-stack) for the surrounding architecture. Quality control is not an extra prompt at the end. It is the release discipline that decides when generated work becomes business communication.
