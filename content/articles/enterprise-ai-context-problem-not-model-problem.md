---
title: "You Don't Have an AI Problem. You Have a Context Problem."
topic: Artificial Intelligence
publishedDate: "2026-03"
linkedInPostUrl: "https://www.linkedin.com/posts/richa-a-srivastava_you-dont-have-an-ai-problem-you-have-a-activity-7439025636788076544-JdSH"
summary: "Enterprise AI proof-of-concepts routinely impress in demos and collapse in production — not because the model was wrong, but because the POC was fed curated context that doesn't exist at scale. In any large enterprise with years of production technology behind it, the knowledge that matters most lives in code, configuration, and people's heads — not in documents any AI can read. Two real deployment stories and a three-phase framework for closing the context gap before your next pilot hits the production readiness wall."
---

The proof-of-concept looked great. The demo impressed the stakeholders. The model answered correctly, the automation worked, and everyone left the room convinced. Then someone asked to run it against the full production ruleset. Or test it on a scenario that wasn't in the pilot dataset. Or onboard the next country. And it fell apart.

This is the pattern I encounter most often when building AI-native and AI-hybrid solutions across large global organizations running mature, production-stable technology platforms. The POC succeeds because it was scoped to a slice of reality that fits neatly into a context window — a curated set of policy documents, a clean sample of transactions, a single product line. Production is different. Production is the full weight of an organization's institutional knowledge: years of regulatory interpretation, business decisions that never made it into documentation, logic that got coded into systems and never extracted back out.

The POC didn't fail. It succeeded at exactly what it was designed to do. The problem is that what it was designed to do had nothing to do with what production actually requires.

**That gap has a name. It's context.**

## The industry data confirms what practitioners already feel

MIT's NANDA initiative analyzed over 300 enterprise AI deployments in 2025 and found that 95% of generative AI pilots delivered no measurable business impact. The researchers didn't blame the models. They were direct about the root cause: generic AI tools stall when they move from curated pilots to live enterprise workflows because they don't have the right context, governance, and integration to operate there. The POC worked. The production environment broke it.

Forrester found that 73% of enterprise data leaders identify data quality and completeness as the primary barrier to AI success — a finding that sounds like a data engineering problem until you recognize that the missing data is often not missing from the data warehouse. It's missing from any machine-readable form at all. It's in code, in configuration, in people. Gartner predicts more than 40% of agentic AI projects will be canceled by end of 2027.

None of these analysts are saying the models aren't capable. They're all describing the same production readiness wall: the AI doesn't know enough about the specific environment it's operating in to perform reliably when the controlled conditions of a pilot no longer apply.

## What the context gap actually looks like in practice

Two deployments. Two completely different problem domains. Same wall.

The first was a claims adjudication decisioning project. Policy documents and schedules give you maybe 20–30% of the rules you need to adjudicate a claim. The rest — compliance requirements, business appetite, jurisdiction-specific interpretations built up over years — live in the heads of a handful of senior SMEs, operationalized as code and configuration in a rules platform that accumulated over time. An AI cannot reason over rules it cannot read. Without externalized context, it has no visibility into most of what it needs to decide.

The solution was a **rules catalogue** — a structured extraction of all embedded rules into a system-readable repository with enriched metadata: source, intent, regulatory rationale, and relationships to other rules. Combined with AI-generated rules from policy documents, the catalogue gave us the complete picture of everything that needed to apply to a claim. It became the enterprise context layer that should have existed all along.

The second project was in a completely different domain: an enterprise data orchestration layer that sits between multiple systems and partners. Every time we needed to onboard a new partner or consumer, the team went through a manual exercise to redefine all the data validations and transformations from scratch. The rules weren't documented. They were in the code, in configuration files, in requirements documents from three product generations ago, and — again — in people's heads.

Automating that onboarding with AI was a non-starter without first solving the context problem. So we have designed a two-phase program. Phase one was context archaeology: using a combination of static analysis and documentation parsing to extract all the validations and transformations out of code and configuration into externalized structured and unstructured data. Only after that foundation exists can phase two begin — building the semantic and LLM-driven automation on top of a context layer the AI can actually read.

## Why RAG alone doesn't solve this

The counterargument I hear most often: "Just use RAG. Connect the AI to your internal documents and it'll figure it out."

RAG retrieves what you've written. It cannot retrieve what was never captured — and in large organizations, the context that matters most was never written down at all. It's in code, in configuration, in judgment calls that got built into systems and never extracted back out.

**A 2024 TechCrunch analysis put it plainly: RAG won't solve the hallucination problem, because hallucination in enterprise contexts is often not a model confidence problem. It's a missing knowledge problem. The model doesn't know what it doesn't know, and neither does the retrieval layer.**

## The regulatory reality that makes this non-optional

For insurance technology leaders, there's a harder edge to this conversation than just AI performance. Regulators are now requiring that AI-driven decisions be explainable and auditable down to the rule level.

The NAIC's Model Bulletin on AI Systems — now adopted or adapted by 23 states plus Washington D.C. — requires insurers to maintain documentation explaining how AI models function, what data they use, and how outputs influence decisions. New York DFS Circular Letter 2024-7 requires demonstrable traceability to prevent AI from proxying for protected classes. Colorado's AI Act, effective October 2025, mandates fairness testing for algorithmic underwriting systems.

You cannot satisfy any of these requirements with rules embedded in code and configuration that only three people understand. Externalized, structured, maintained context isn't just an AI prerequisite. It's now a compliance requirement.

## What fixing context actually looks like

In both projects I described, the pattern that worked followed three phases:

1. **Context Archaeology** — Extract the implicit. Use static analysis tools, documentation parsers, and structured knowledge transfer sessions with SMEs to surface what's currently trapped in systems and people. The goal is a raw inventory: every rule, validation, transformation, and business decision that the AI will eventually need to make.

2. **Context Architecture** — Structure and enrich the inventory. Move it from raw extraction into a system-readable form — relational or document stores with metadata that captures not just what the rule is, but why it exists, where it came from, and how it relates to adjacent rules. This is the foundation the AI actually operates on.

3. **Context Maintenance** — Treat it as a living system. Rules change. Regulations update. Business appetite shifts. The context layer has to be maintained with the same rigor as any other operational system. This is where most organizations underinvest, and where context rot begins.

None of these phases are glamorous. They require sustained attention from people who understand the business deeply and from engineers who can translate that knowledge into machine-readable form. They take time. They're almost always the first thing cut when a project is under deadline pressure — because the POC looked so good without them.

That's exactly the trap. The POC looked good because it was never exposed to the full complexity of production context. When you skip the context work to get to the demo faster, you're not accelerating the project. You're borrowing time you'll pay back at production readiness, with interest.

## The question worth sitting with

By 2026, the analyst consensus is converging on a simple standard: an AI that cannot cite its sources or reference internal policy will be considered broken. Cognizant announced deployment of 1,000 dedicated context engineers in 2025. Gartner is telling CDOs that a unified context layer is now foundational infrastructure, not optional enrichment.

The organizations that will make genuine progress on AI won't be the ones with the most sophisticated models. They'll be the ones that do the hard, unglamorous work of making their institutional knowledge legible to machines first.

So before your next AI initiative kicks off, I'd ask one question: **How much of what the AI needs to know in order to decide correctly has never been written down anywhere?**

That number — not your model selection, not your cloud provider, not your vector database — is the real measure of your AI readiness.

Context is the hill. Everything else is terrain.
