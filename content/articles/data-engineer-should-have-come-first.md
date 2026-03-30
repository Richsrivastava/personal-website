---
title: "The Data Engineer Should Have Come First"
topic: Leadership
publishedDate: "2026-03"
linkedInPostUrl: "https://www.linkedin.com/posts/richa-a-srivastava_dataengineering-enterpriseai-aistrategy-activity-7440217286231212034-ruI8/"
summary: "When enterprise leaders build AI teams, they almost always hire data scientists first. That sequencing mistake — hiring for insight before hiring for infrastructure — is why so many AI initiatives stall between POC and production. Building an AI-ready organization requires a deliberate hiring order, and the data engineer comes first."
---

Let me tell you about a hiring decision I've seen go wrong — and made myself.

An executive approves an AI budget. The team writes a job description. The job description is for a data scientist — because "data scientist" sounds like AI. It signals seriousness. It gets the board excited.

The data scientist joins. They're good. They open the data.

And then they spend six months cleaning it.

---

## The role everyone skips

The data has to be in a usable form before the scientist arrives. Piped. Cleaned. Validated. Joined. Accessible. That is not data science work. That is data engineering work. And in most enterprise AI initiatives I've seen — including ones I've been part of — the data engineer either doesn't exist yet, or got hired third.

Hiring a data scientist before a data engineer is like opening a restaurant, hiring a Michelin-star chef, and then revealing that the kitchen has no gas lines and no delivery schedule.

They can plan menus. They cannot cook.

The data confirms what practitioners already feel. Informatica's CDO Insights survey found that 43% of data leaders cite data quality and readiness as their top obstacle to AI success — above model accuracy, above computing costs, above talent shortages. They have plenty of data scientists. They don't have data that's ready to be worked on. McKinsey's 2025 research found that organizations seeing real returns from AI were twice as likely to have invested in data workflow redesign before model selection.

The teams that ship hired for infrastructure first. The teams that stall hired for insight first and hoped it would sort itself out.

---

## What it costs you

The data scientist does what good people do in a broken environment: they adapt.

They wrangle. They patch gaps manually. They build workarounds that will never survive contact with a production pipeline. Sixty to seventy percent of their time goes to work that should have been done before they arrived.

We were building a platform to automate data transformations between enterprise systems using ontology-based semantic mapping and LLMs. Genuinely interesting problem. I had a data scientist and an AI engineer on the team.

What I didn't have was a data engineer. And I didn't feel the gap immediately — the early work of scoping the problem and designing the AI solution looked fine.

It stopped looking fine when we tried to build the foundation the models actually needed to operate on. The transformation logic we wanted to automate didn't live in one place. It lived in many. UI validation rules. Middle-layer transformation logic. Complex code-as-configuration — business decisions embedded in scripts and config files that had never been externalized into anything a model could read. Getting all of that into a unified Cosmos DB structure, properly typed, properly linked, deduplicated down to something as basic as consistent spelling — queryable in the way the semantic mapping layer would require — that was weeks of unglamorous, detailed work. Work that neither the data scientist nor the AI engineer was set up to own.

That work is where we are now — our full-stack engineers picking up the data engineering work because we couldn't wait for a dedicated hire. Still building the foundation, before the semantic mapping and LLM automation can begin. The fun part is still ahead. The sequencing mistake is behind us, and it cost time we didn't have to lose.

I should have seen it coming. I didn't.

---

## The counterargument worth taking seriously

Modern LLMs can ingest unstructured data directly — documents, emails, PDFs — so why build pipelines at all? For document-centric use cases, there's real truth to that. Feeding raw content to an LLM is often the right call and it removes months of schema design work.

But it still requires someone to decide which documents, from which systems, updated how frequently, with what hallucination guardrails and audit trails. That's not a scientist decision. That's an infrastructure decision. Someone has to own it.

The category of enterprise knowledge that lives in code, in configuration, in system behavior — not in any document — is invisible to any ingestion approach. That problem wasn't a document extraction problem. The logic had never been written down anywhere. No LLM pipeline would have surfaced it.

You can't engineer context from data you haven't engineered.

---

## Who to hire, and in what order

Data engineer first. Data scientist second. ML or AI engineer third. That order isn't a preference — it's the difference between shipping and presenting. Winning programs earmark 50–70% of the timeline and budget for data readiness before AI work begins. That feels wrong under deadline pressure. It's also the ratio that produces results.

The role has genuinely changed. The foundational skills still matter — pipelines, data quality, warehouse architecture. But in that same project, we didn't need someone who could build a clean relational schema. We needed someone who could look at UI validation logic, middle-layer transformation rules, and code-as-configuration scattered across systems — and design a unified structure that a semantic mapping layer could reason over. Not ETL thinking. Architecture thinking, applied to data that was never meant to be data.

The signal to look for in a job description isn't just pipeline experience. It's whether the candidate has thought about how data will be consumed by a model — not just by a BI dashboard. Those are different consumers with different requirements, and the engineers who understand both are the ones worth hiring first.

This is not a popular first hire. Nobody gets excited presenting a data engineering roadmap to a steering committee. The visible work — the models, the automation, the AI — comes later, after months of infrastructure investment that produces nothing demoable. Choosing to sequence it correctly anyway is the kind of decision that separates leaders who build things that last from those who build things that impress.

Before your next AI headcount conversation, ask yourself: **Do we have the infrastructure to support what we're about to hire for?**

If the honest answer is no — you know what to do first.

---
