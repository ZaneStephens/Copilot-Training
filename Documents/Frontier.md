# The Microsoft 365 Copilot Frontier Program

## Table of Contents
- [What the Frontier Program Is](#what-the-frontier-program-is)
  - [How It Differs From General Availability](#how-it-differs-from-general-availability)
  - [Who Should Opt In](#who-should-opt-in)
  - [Eligibility and Licensing](#eligibility-and-licensing)
- [Enrolling Your Tenant](#enrolling-your-tenant)
  - [Tenant-Level Opt-In](#tenant-level-opt-in)
  - [User-Level Targeting](#user-level-targeting)
  - [Communicating With End Users](#communicating-with-end-users)
- [What's Inside Frontier Today](#whats-inside-frontier-today)
  - [Copilot CoWork](#copilot-cowork)
  - [Researcher](#researcher)
  - [Analyst](#analyst)
  - [Copilot Notebooks](#copilot-notebooks)
  - [Copilot Tuning](#copilot-tuning)
  - [Computer-Use Agents](#computer-use-agents)
- [Copilot CoWork in Depth](#copilot-cowork-in-depth)
  - [The Shift From Single-Turn Chat to Persistent Collaboration](#the-shift-from-single-turn-chat-to-persistent-collaboration)
  - [How a CoWork Workspace Is Structured](#how-a-cowork-workspace-is-structured)
  - [Bringing Agents Into a Workspace](#bringing-agents-into-a-workspace)
  - [Human-in-the-Loop Controls](#human-in-the-loop-controls)
  - [Practical Scenarios](#practical-scenarios)
  - [Governance and Audit](#governance-and-audit)
- [Governance and Risk Considerations](#governance-and-risk-considerations)
  - [Data Boundaries](#data-boundaries)
  - [Stability Expectations](#stability-expectations)
  - [Feedback Loop](#feedback-loop)
- [Recommended Rollout Pattern](#recommended-rollout-pattern)
- [Resources](#resources)

## What the Frontier Program Is

The Frontier program is the early-access track for Microsoft 365 Copilot. It is the channel Microsoft uses to put new agentic and reasoning capabilities into the hands of enterprise customers before those capabilities reach general availability across the broader tenant population. If your team has Microsoft 365 Copilot licences, opting in to Frontier is how you see new features such as Researcher, Analyst, Copilot Notebooks, Copilot Tuning, and Copilot CoWork weeks or months ahead of the standard release schedule.

Frontier is not a separate SKU and it is not a public preview in the consumer sense. Features delivered through Frontier are governed by the same Enterprise Data Protection (EDP), tenant boundary, and compliance commitments as the rest of Microsoft 365 Copilot. The trade-off is maturity: Frontier features can change without notice, may have lower SLAs during the preview window, and may be region- or language-limited at launch.

### How It Differs From General Availability

| Aspect | Frontier | General Availability |
|---|---|---|
| Audience | Tenants that opt in | All licensed users in eligible tenants |
| Stability | Behaviour and UI may change between releases | Stable, with documented release notes |
| SLA | Best-effort during preview | Standard Microsoft 365 service SLA |
| Documentation | Living docs, may lag the product | Full Microsoft Learn coverage |
| Roadmap influence | High — direct feedback channels into the product team | Standard feedback mechanisms |

### Who Should Opt In

Frontier is appropriate for organisations that:
- Have a Copilot Centre of Excellence or named champions who can absorb a faster change cadence.
- Want to influence roadmap and validate features against real workloads before broad rollout.
- Can run a defined pilot population rather than enabling new behaviour for the whole tenant.

It is less appropriate for highly regulated workloads where every new behaviour needs to clear a formal compliance review before being enabled for any user.

### Eligibility and Licensing

Frontier requires:
- A paid **Microsoft 365 Copilot** licence on the targeted users (the free Microsoft 365 Copilot Chat tier is not eligible for most Frontier features).
- A qualifying base plan: Microsoft 365 E3, E5, F1, F3, Business Standard, Business Premium, or Apps for Enterprise; Office 365 E1/E3/E5; or Education A3/A5 for faculty.
- Tenant administrator (Global Admin or Copilot Admin role) consent to enable the program.

There is no additional per-user fee for Frontier features today, but specific agents (notably Researcher and Analyst when run at scale) consume metered Copilot capacity, billed through the Copilot agent consumption meter in the Microsoft 365 admin centre.

## Enrolling Your Tenant

### Tenant-Level Opt-In

Frontier is enabled from the **Microsoft 365 admin centre → Copilot → Settings → Frontier** page. Toggling the program on does not automatically expose new features to every user — it makes them available for targeting.

After enabling, expect a short propagation window (typically under 24 hours) before new entry points appear in the Microsoft 365 Copilot app, Teams, and the web experience.

### User-Level Targeting

Microsoft strongly recommends scoping Frontier to a defined Microsoft Entra group rather than the whole tenant. The Frontier settings page lets you:

- Pick one or more Entra security groups that will see Frontier features.
- Choose per-feature gating where supported (for example, enable Researcher and Notebooks but hold Computer-Use Agents back).
- Set a default "off" posture for users outside the targeted groups.

Group-based targeting integrates with the same access patterns used for the Copilot Dashboard, so the same Entra group can usually serve both purposes.

### Communicating With End Users

Frontier features can change appearance and behaviour without notice. Set expectations with your pilot users:

- Tell them which features they are seeing and that those features may change.
- Give them a single internal channel (Teams channel, shared mailbox) to report issues.
- Make clear that Frontier output still requires the same review and verification as any AI-generated content.

## What's Inside Frontier Today

The Frontier inventory rotates as features graduate to GA or are retired. The list below reflects what is currently routed through the program at the time of writing — always confirm against the in-product Frontier page for the live set.

### Copilot CoWork

A multi-agent collaborative workspace where Copilot agents persist alongside human teammates rather than starting fresh in each chat. Covered in depth below — this is the headline Frontier capability for most enterprises today.

### Researcher

A reasoning agent designed for deep, multi-step research tasks: market analysis, competitive briefs, regulatory review, technical literature scans. Researcher plans its work, calls multiple knowledge sources (tenant data, the web, connected line-of-business systems), and returns a cited, structured report rather than a single chat response. It typically takes minutes rather than seconds to complete a task and is intended for work where breadth and grounding matter more than latency.

### Analyst

A reasoning agent oriented at structured data: spreadsheets, query results, exports from line-of-business systems. Analyst writes and runs Python in a sandboxed environment, iterates on the data, produces charts, and returns a narrative explanation alongside reproducible code. It is the right tool for "explain what is happening in this dataset and show your working" tasks rather than one-shot formula generation.

### Copilot Notebooks

Persistent, grounded notebooks that bring together a set of source materials (files, meetings, sites, links) and let Copilot reason across that bounded set. Notebooks are the evolution of Copilot Pages: rather than turning a single chat reply into an editable document, you assemble a curated knowledge set up front and then ask questions, generate audio overviews, draft sections, and share the workspace with collaborators. The grounding stays attached to the notebook, so answers are reliably scoped.

### Copilot Tuning

Low-code fine-tuning of Copilot's behaviour against your tenant's own content. Tuning lets you teach Copilot the writing style, terminology, and reasoning patterns specific to your organisation — for example, a legal team's contract language or a sales team's discovery framework — without exposing tenant data outside the Microsoft 365 boundary. Tuning is administered through Copilot Studio and the Microsoft 365 admin centre.

### Computer-Use Agents

Agents that can drive a browser or virtual desktop on a user's behalf — clicking, typing, navigating multi-step workflows in systems that don't have first-class APIs. This is the highest-risk Frontier capability and is gated behind explicit per-user enablement, narrow allowlists of target sites, and full action logging. Treat it as automation infrastructure rather than a chat feature.

## Copilot CoWork in Depth

CoWork is the feature most worth understanding before opting in to Frontier, because it is the largest behavioural change to how Copilot fits into the working day.

### The Shift From Single-Turn Chat to Persistent Collaboration

In the standard Copilot Chat experience, each conversation is a fresh transaction. The model has access to your Microsoft Graph context but no durable memory of what you and it have built together over time. CoWork inverts that: a CoWork space is a persistent room that holds context, files, agents, and an ongoing conversation history. Anyone you share the space with — human or agent — sees the same state.

The practical effect is that you stop re-explaining the project at the start of every interaction. The space already knows what the project is, who is on it, what has been decided, and what the open questions are.

### How a CoWork Workspace Is Structured

A CoWork space contains:

- **A goal or charter** — a short description of what the space exists to accomplish. Agents read this to understand scope.
- **Pinned context** — files, SharePoint sites, Loop pages, OneNote notebooks, meeting recordings, and links the space should ground answers in.
- **A timeline** — chronological log of human messages, agent actions, decisions, and artefacts produced. The timeline is the audit trail.
- **Agents on the team** — zero or more named Copilot agents that have been added to the space, each with a defined role.
- **Members** — the humans with access, with the same SharePoint-style permission model used elsewhere in Microsoft 365.
- **Artefacts** — Notebooks, drafts, datasets, and other outputs produced inside the space.

### Bringing Agents Into a Workspace

Agents are added to a CoWork space the same way you would add a colleague — by name, with a role description. Common patterns:

- **Researcher** added as the "background reading" team member that produces briefs whenever new context lands in the space.
- **Analyst** added as the "numbers person" that recomputes a model whenever the underlying spreadsheet is updated.
- **A custom Copilot Studio agent** added as a domain specialist (for example, a "policy reviewer" that flags compliance issues in any draft posted to the space).

Each agent has its own visible activity in the timeline, so you can always see which agent took which action and why.

### Human-in-the-Loop Controls

CoWork is designed with explicit gating between agent suggestion and agent action:

- Agents propose; humans confirm. By default, agents post drafts and recommendations to the timeline rather than committing changes to source-of-truth systems.
- For workflows that need autonomous action (for example, an agent that should refresh a dashboard on a schedule), the space owner explicitly grants that capability and chooses the authentication scope.
- Every agent action is reversible from the timeline, and every action is auditable.

### Practical Scenarios

- **Customer pursuit room.** Sales lead, solution architect, and a CRM-aware agent share a space. The agent keeps the account brief current, drafts follow-up emails for human review, and surfaces newly published opportunities.
- **Incident response.** A Researcher agent watches the timeline for new artefacts, an Analyst agent rebuilds the impact assessment whenever the affected-systems list changes, and human responders coordinate in the same place.
- **Cross-team product brief.** Product, design, and engineering each contribute to a single space with a Researcher agent grounded in the tenant's product documentation. The brief is the space — there is no separate "final document" to keep in sync.

### Governance and Audit

CoWork spaces inherit the labelling, retention, eDiscovery, and DLP behaviour of the underlying Microsoft 365 content. Specifically:

- Sensitivity labels propagate from pinned source content into artefacts produced in the space.
- Agent actions are written to the unified audit log, attributable to both the agent identity and the human who invoked or authorised it.
- Microsoft Purview policies apply to content shared into and produced inside the space.

For most organisations the right governance posture is: treat a CoWork space as a regulated workspace from day one, and apply the same labelling and retention rules you apply to a Teams channel or SharePoint site.

## Governance and Risk Considerations

### Data Boundaries

Frontier features run inside the same Microsoft 365 service boundary and EDP commitments as the GA Copilot experience. Tenant data is not used to train foundation models, prompts and responses are encrypted in transit and at rest, and outputs respect the requesting user's existing permissions. Web-grounded queries (where enabled) follow the same de-identification path used by Copilot Chat in Edge.

The main delta to be aware of is for Computer-Use Agents: when an agent drives a browser session against a third-party site, that site sees a logged-in user session and the data exchanged is governed by that site's terms, not Microsoft's. Treat allowlisting for computer-use agents as a security control, not a convenience setting.

### Stability Expectations

Plan for Frontier features to:
- Change UI between updates.
- Occasionally regress on specific prompt patterns as Microsoft tunes the underlying agents.
- Roll back behind a flag if Microsoft identifies a quality issue.

This is the price of being early. Pilot users should be coached to expect it, and pilot use cases should not be on the critical path for production work without a non-Copilot fallback.

### Feedback Loop

The single most useful thing a Frontier tenant can do is route real-world feedback back to Microsoft. Use the in-product feedback button on every Frontier surface — those reports are tagged to the program and read directly by the product team. Aggregate patterns ("Researcher is consistently missing our internal taxonomy when it grounds in SharePoint") are far more useful than individual bug reports.

## Recommended Rollout Pattern

A pragmatic Frontier adoption sequence for most enterprises:

1. **Enable Frontier at the tenant level**, scoped to a single Entra group containing the Copilot Centre of Excellence and named champions (typically 20–50 users).
2. **Turn on Notebooks and Researcher first.** They are the lowest-risk Frontier features and produce quick, visible wins.
3. **Add Analyst** once your champions are comfortable with Researcher. Validate that finance and operations folks find the output trustworthy before broadening.
4. **Pilot CoWork** with two or three real cross-functional projects. Don't try to retrofit existing workflows on day one — start with new projects so the space is the source of truth from inception.
5. **Evaluate Copilot Tuning** once you have six months of grounded usage data and can see where Copilot's default behaviour diverges from your house style.
6. **Hold Computer-Use Agents** until you have a defined automation use case, an allowlist, and an oversight model. Don't enable them speculatively.
7. **Promote to broader rollout** by expanding the Entra group as features graduate to GA, retiring the Frontier-specific group when a feature reaches the standard release channel.

## Resources

- Microsoft 365 admin centre → Copilot → Settings → Frontier (in-product entry point)
- [Microsoft 365 Copilot documentation hub](https://learn.microsoft.com/en-us/copilot/microsoft-365/)
- [Microsoft 365 Roadmap](https://www.microsoft.com/microsoft-365/roadmap) — filter by Copilot to see which features are in preview vs GA
- [Microsoft 365 Copilot adoption resources](https://adoption.microsoft.com/en-us/copilot/)
- Copilot Centre of Excellence templates on the Microsoft Adoption site
