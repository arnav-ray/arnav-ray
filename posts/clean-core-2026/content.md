# Why SAP API Policy v4 Quietly Made Clean Core an AI Decision

SAP published API Policy version 4 in early 2026. The document is framed as developer governance: which APIs are stable, which are deprecated, how versioning works going forward. Most SAP architects read it as a housekeeping update to something they already knew.

Read against the agentic AI shifts of the last eighteen months, it is something else.

## A new framing: Pull and Push

Before getting to the policy, it helps to have a frame for how enterprise AI actually reaches users in 2026. There are two dominant architectures.

**Pull** is agent-initiated. An AI agent -- running inside a user's tools, or orchestrated by a platform -- reaches into enterprise systems at runtime, pulling data and executing actions through standardised tool APIs. The agent decides what to retrieve and when. The enterprise system is a passive provider of capability.

**Push** is vendor-embedded. The software vendor ships AI directly into existing workflows. The system pushes AI suggestions and automations into the user's context at defined moments -- summarising a document, flagging an anomaly, drafting a reply. No external agent is involved; the AI is inside the product.

Both architectures are real and growing. Most large enterprises will end up using both. The question is which one they can actually access, and on what terms.

<div class="post-figure"><iframe src="./infographic.html" width="100%" height="720" style="border:none;border-radius:12px;" loading="lazy" title="Pull vs Push: Agentic AI Architecture"></iframe></div>

## The Pull side: MCP and why it matters

The mechanism behind the Pull architecture is the Model Context Protocol (MCP), an open standard published by Anthropic in late 2024. MCP defines how AI agents discover and invoke tools across system boundaries -- a common language for "here is a capability, here is how to call it."

Adoption has been faster than most protocol launches. By early 2026, MCP support is present across Claude, GPT-4o, Gemini, and Cursor, and a wide range of enterprise tooling vendors are shipping MCP server implementations. It is now a widely adopted standard, though the ecosystem is still maturing and not every claim of MCP compatibility means the same thing.

One nuance worth noting: Microsoft has taken a hybrid position, supporting MCP in Copilot Studio while also promoting its own agent-to-agent protocols. For customers heavily invested in the Microsoft stack, the picture is slightly more complex than a clean MCP monoculture. But for SAP customers evaluating which agents can reach their S/4HANA system, MCP is the practical interoperability layer to plan around.

The commercial implication of a standard protocol is significant. If your SAP system exposes stable, documented APIs that any MCP-compatible agent can call, then the choice of agent is yours. You can use a general-purpose model, a specialised finance agent, an internally built orchestration layer, or something that does not exist yet. The agent and the system are decoupled.

If your SAP system is heavily customised -- if its real business logic lives in bespoke ABAP that modifies standard objects, in Z-tables, in implicit enhancements -- then it cannot be reached cleanly through standard APIs. An agent calling standard endpoints will see an incomplete or misleading picture of your data. An agent trying to trigger standard processes may get unexpected results because the customisation intercepts them.

## Clean Core as the Pull prerequisite

This is where SAP's Clean Core concept becomes an AI architecture decision rather than a technical hygiene principle.

Clean Core, in SAP's framework, means keeping the SAP system close to standard: using released APIs for integrations, placing custom logic in the BTP side-by-side extension layer rather than inside the ABAP stack, and avoiding modifications to SAP's standard objects. The goal, traditionally framed, is upgrade stability -- a clean system takes SAP's quarterly innovations without expensive remediation.

The AI framing adds a new dimension. A clean system is, by definition, reachable through standard APIs. That means it can be reached by any MCP-compatible agent without custom integration work per agent-system pair. The compliance with Clean Core is simultaneously compliance with the prerequisites for Pull-side AI.

A heavily customised system is not. The customisation does not just add friction to upgrades; it creates a moat around the system that excludes external agents. The enterprise ends up locked into agents that were specifically written for their bespoke configuration -- or into no agent access at all.

One qualification: Clean Core as an AI prerequisite applies most directly to transactional SAP systems -- S/4HANA Finance, Procurement, HR. For data-heavy AI use cases operating on replicated or aggregated data (SAP Analytics Cloud, Datasphere, BW/4HANA), the coupling to Clean Core is less direct. An analytics agent working against a data warehouse can often be built without caring much about what the transactional system looks like under the hood. The policy argument in this post applies to operational AI -- agents that read from and write to live SAP processes.

## Inside the Push side: what SAP Business AI actually ships

It would be incomplete to discuss the Pull architecture without being specific about what SAP is actually delivering on the Push side, because the two are not symmetric in maturity.

Joule is SAP's embedded AI copilot. It is available across S/4HANA Cloud, Ariba, SuccessFactors, and several other SAP products. In its current form, Joule handles natural-language queries, document summarisation, and guided navigation -- the table-stakes layer of enterprise copilot functionality that most major software vendors now ship.

Joule Skills are pre-built workflow integrations: discrete AI-driven actions embedded at specific points in SAP processes. Examples include drafting supplier communications in Ariba, surfacing anomalies in financial postings, and recommending actions in HR workflows. SAP's stated direction is to expand the Skills library significantly through 2026 and 2027.

Joule Studio is the configuration layer. It allows customers and partners to build and modify Skills without writing code in the traditional sense -- a low-code surface for extending the Push AI layer. This is where SAP is trying to give customers agency within the Push architecture, rather than requiring them to wait entirely on SAP's roadmap.

SAP AI Agent Hub, announced in 2025, is the coordination layer for multi-agent workflows. It is the infrastructure for orchestrating agents -- both Joule-native and external -- across SAP processes. It is early. The Hub represents SAP's recognition that single-agent interactions are not sufficient for complex enterprise workflows, but the production deployments are limited as of early 2026.

The honest summary of the Push side: the building blocks are there, the roadmap is credible, but the Skills library is still narrow relative to the breadth of what enterprises actually do with SAP. At DSAG's 2025 annual conference, roughly 3% of SAPPHIRE-announced AI features were reported as production-ready by member organisations -- a figure that reflects not just technical gaps but the integration work required to connect AI capabilities to specific, messy enterprise configurations.

That last point matters. Push AI is not zero integration work for customers. A Joule Skill targeting a standard SAP process will work cleanly for a customer running standard SAP. For a customer with significant customisation, the Skill may not apply, may apply incorrectly, or may require manual remapping after every SAP upgrade -- the same migration tax as before, now affecting AI features rather than just technical components. Clean Core reduces this tax on the Push side too, though the coupling is softer than on the Pull side.

The structural access barrier is also worth naming directly. Joule and Joule Studio are available on SAP S/4HANA Cloud Public Edition and, with varying depth, on Private Cloud. Customers on heavily customised on-premise systems are not the primary target market for the current Joule feature set. This is not a criticism -- it reflects sensible product strategy -- but it means that the customers most likely to have accumulated technical debt are also the customers with the least immediate access to Push-side AI.

## What SAP API Policy v4 actually says

The policy makes two relevant statements. First, it restricts the APIs that third-party integrations -- including AI agents -- are permitted to use to stable, released SAP APIs. Deprecated APIs, internal APIs, and APIs subject to change without notice are out of scope for compliant integrations. Second, it makes clear that modifications to standard SAP objects are not a supported extensibility pattern going forward.

Neither of these statements is new as a principle. SAP has been saying versions of both for years. What is new is the context in which they are being said. In 2026, the question of which APIs an external agent can call is not an abstract developer concern -- it is the question of which AI systems can reach your enterprise data.

The policy, read in that context, is effectively setting the terms of AI interoperability. A system compliant with the policy is one that external agents can reach through standard, stable interfaces. A system that is not compliant -- because it relies on internal APIs, modified standard objects, or deprecated integration patterns -- is one that is harder to reach, and harder to trust even if reached.

## What this means in practice

For SAP customers, the policy makes Clean Core a procurement criterion in a way it has not been before. When evaluating whether to allow an external AI agent to access your SAP system, the question is whether your system's APIs are stable and standard enough for that access to be reliable. That question has a direct answer if you have been maintaining Clean Core compliance. It does not have a clean answer if you have not.

For architects and consultants, the implication is that technical debt assessment needs a new line item. The standard questions about upgrade risk and integration maintenance are joined by a question about AI accessibility: which capabilities of this system are reachable by an external agent, and which are invisible or unreliable because they live in customisation?

For startups and ISVs building AI products for the SAP ecosystem, the policy is a market structure signal. The customers who are most accessible -- whose systems can be reached by a standard MCP integration -- are the Clean Core customers. Targeting a heavily customised customer requires either building bespoke integration for their configuration or helping them clean up first. Both are solvable, but neither is the scalable path that the Pull architecture promises.

## The question this leaves open

The harder question -- which this post does not answer -- is what an SAP customer should actually do if they are not Clean Core compliant and want to be AI-accessible.

The remediation path is not simple. Decades of customisation were often added for good reasons, solving real business problems that the standard system did not handle. Removing or refactoring that customisation requires understanding why it was added, whether the standard system now handles the use case, and what the migration risk is. That work is not fast or cheap.

What the API Policy v4 moment changes is the business case framing. Previously, the argument for Clean Core remediation was largely about upgrade cost and future-proofing. Both are real but somewhat abstract -- hard to put in front of a CFO as an urgent priority. The AI accessibility argument is more concrete: here is a class of capability that your system cannot access because of its current state, and here is what it would take to change that.

If you are running an AI strategy review in 2026 and Clean Core has not entered the conversation, you are reviewing the wrong question.
