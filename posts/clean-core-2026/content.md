# Why SAP API Policy v4 Quietly Made Clean Core the Most Important AI Decision of 2026

In April 2026, SAP published [API Policy v4/2026](https://help.sap.com/doc/sap-api-policy/latest/en-US/API_Policy_latest.pdf). On the surface it reads as a developer governance update. Only APIs published on the [SAP Business Accelerator Hub](https://api.sap.com/) or in product documentation can be consumed. Internal, private, and non-published APIs are explicitly off-limits. No global grace period. No carve-out for systems on Public Cloud, Private Cloud, or BTP.

It is being read as a policy update. It is also the most concrete answer SAP has given to a question every CIO is asking: what does enterprise-grade agentic AI actually look like when the abstractions hit the ground?

## A reading frame: Pull and Push

I think about the agentic AI market through a frame I call Pull and Push. It is not industry vocabulary. The closest established analogues are Ben Thompson's [aggregation theory](https://stratechery.com/2015/aggregation-theory/) and the more technical model-as-platform versus app-as-platform. Reasonable readers can map between them. The frame is a lens, not a claim of new terminology.

On the Pull side sit the model providers. Anthropic, OpenAI, Google DeepMind. Their strategy is to put the frontier model at the centre and pull apps, data, and tools inward through connectors, agents, and the [Model Context Protocol](https://modelcontextprotocol.io/). The user's home is the chat surface, the API, the agent loop.

On the Push side sit the application incumbents. SAP, Salesforce, Adobe. Their strategy is to keep the application at the centre and push frontier models into the platform as embedded copilots and domain agents. The user's home stays inside the system of record. Data gravity is the moat.

API Policy v4 is the most disciplined Push move I have seen in 2026. It does not announce a new feature. It defines what is allowed across the perimeter.

<div class="post-figure">
<iframe src="./infographic.html" loading="lazy" width="100%" height="950" title="Pull and Push: how AI platform power is splitting in 2026" style="border:none; border-radius:16px;"></iframe>
</div>

## What the policy actually says

The [policy](https://help.sap.com/doc/sap-api-policy/latest/en-US/API_Policy_latest.pdf) formalises something SAP has been signalling for two years. New developments and extensions consume only Published APIs. Non-compliant integrations are now considered at-risk, because SAP reserves the right to change or decommission internal APIs in any release cycle without notice.

Where a published API does not exist, the recommendation is to wrap the gap on BTP, request the API through the [SAP Customer Influence portal](https://influence.sap.com/), or wait. Continued use of internal APIs in a Cloud or BTP context is not a supported path forward.

This is not a surprise to anyone who has been tracking the Clean Core message since 2024. What is new is that the language has hardened. Clean Core is no longer aspirational guidance. It is contractual.

## Why the timing matters

Read in isolation, the policy is a maintenance announcement. Read against what happened on the Pull side between November 2024 and April 2026, it is something else.

In that window, the [Model Context Protocol](https://www.anthropic.com/news/model-context-protocol) moved from a single-vendor specification to the de facto standard for how AI agents connect to enterprise systems. OpenAI adopted it in early 2025. Google DeepMind followed. Microsoft and AWS shipped MCP support across their stacks. The protocol was donated to the Linux Foundation's Agentic AI Foundation in late 2025. Thousands of public MCP servers exist as of early 2026.

The practical consequence is that any agent can now knock on any door. The cost of integrating an AI workflow with a business system has collapsed. What used to take a custom connector now takes a server registration.

That is precisely why SAP's policy matters. When the cost of integration falls, the question of which integrations are sanctioned becomes the question. Policy v4 is the Push side's door policy for the agentic era.

## Clean Core in four levels

SAP has been refining the [extensibility model](https://learning.sap.com/courses/practicing-clean-core-extensibility-for-sap-s-4hana-cloud) alongside the policy work. The current framing classifies extensions across four levels.

Level A uses only released APIs and is fully upgrade-safe. It is the target for all new development. Level B uses classic APIs such as BAPIs, permitted with governance approval. Level C reaches into internal objects, carries upgrade risk, and requires a remediation plan. Level D covers direct modifications and is a retirement candidate.

Read this carefully and the AI implication is unambiguous. A customer running mostly Level A is ready for Joule agents and for Pull-side agents that connect through MCP, because the surface those agents touch is contractually stable. A customer running mostly Level C and D is not ready, regardless of how good the model is, because the agent's behaviour cannot be guaranteed across an upgrade.

Clean Core is no longer a code quality conversation. It is the prerequisite for AI to do anything reliable inside the system.

## Collaboration through governed protocols

The lazy framing for the rest of 2026 will be that Pull and Push are at war. That framing misses what is actually happening.

SAP itself ships MCP-compatible interfaces. Joule is being positioned to operate alongside, not in opposition to, agents built on the Pull side. The pattern that is emerging is not generalist orchestrators against sovereign systems. It is generalist orchestrators talking to sovereign systems through standards that both sides accept.

API Policy v4 is the Push side of that conversation. MCP is the Pull side. Read together, they describe a future in which the agent does not need to understand SAP. It needs to understand which doors are open and what governance applies on the other side. The work of designing that interface, deciding which agent owns which decision, where the audit trail lives, and how data leaves and returns, is not going away. It is the work.

## What it means in practice

For finance and operations leaders evaluating AI vendors, the first question is no longer about the model. It is whether your S/4HANA system is on a Clean Core trajectory. If it is not, the AI roadmap is constrained before the procurement conversation starts.

For SAP architects, Level A has graduated from preference to procurement criterion. Custom code assessments and remediation plans are now AI readiness plans by another name.

For startups and product teams building on top of SAP, the policy is both a constraint and a clarification. The published API surface defines the addressable problem. What that means in practice is harder than it sounds.

Getting an API published is not a shortcut. The official path runs through the [SAP Customer Influence portal](https://influence.sap.com/), where a request typically needs around fifteen votes from different SAP customers or partners to be considered. The published statistics suggest fewer than ten percent of requests reach that threshold. Even when they do, there is no commitment to delivery, and the gap from accepted request to released API can run several quarters or longer. Building a product roadmap around a future API is a slow bet.

The pragmatic options for a startup automating SAP S/4HANA with proprietary tools are roughly four.

**Map first, build second.** The [SAP Business Accelerator Hub](https://api.sap.com/) catalogues thousands of released APIs across Finance, Procurement, Supply Chain, and HR. Many capabilities that look missing already exist under unfamiliar names. The first move is a serious mapping exercise against this catalogue. It costs a week and saves quarters.

**Wrap the gap on BTP.** Where no released API covers the use case, deploy your logic as a BTP-native extension using ABAP Cloud or CAP. The wrapper consumes whatever SAP exposes and presents your product with a stable contract. This moves non-compliance out of the SAP core into a managed layer that survives upgrades. It is the architecture SAP itself recommends for this exact gap.

**Become a partner.** The [SAP PartnerEdge program](https://partneredge.sap.com/) and the SAP Integration and Certification Center give certified partners a defensible path to integrate, distribute through SAP Store, and co-sell. Partner status is also how a startup gets product management attention on missing APIs faster than the public voting queue.

**Engage co-innovation.** The SAP Customer Engagement Initiative offers a slower but genuine route into product roadmaps. Useful for startups with deep domain expertise SAP does not currently cover, where the conversation is about strategic fit rather than feature voting.

The SAP-as-platform reality has not changed. What has changed is that fighting it is now explicitly unsupported, while working with it is more clearly documented than at any point in the last decade.

The most boring decision in the room may turn out to be the most consequential one.
