# Microsoft 365 Copilot for Enterprise: End User Guide

## Table of Contents
- [About This Guide](#about-this-guide)
- [Knowing Which Copilot You're Using](#knowing-which-copilot-youre-using)
- [Getting Started with Microsoft 365 Copilot](#getting-started-with-microsoft-365-copilot)
- [Using Copilot in the Microsoft 365 Apps](#using-copilot-in-the-microsoft-365-apps)
  - [Microsoft Word](#microsoft-word)
  - [Microsoft Excel](#microsoft-excel)
  - [Microsoft PowerPoint](#microsoft-powerpoint)
  - [Microsoft Outlook](#microsoft-outlook)
  - [Microsoft Teams](#microsoft-teams)
  - [Other Microsoft 365 Apps](#other-microsoft-365-apps)
- [Copilot Chat, Notebooks, and Agents](#copilot-chat-notebooks-and-agents)
- [Reasoning Agents: Researcher and Analyst](#reasoning-agents-researcher-and-analyst)
- [Effective Prompting in an Enterprise Context](#effective-prompting-in-an-enterprise-context)
- [Key End-User Capabilities at a Glance](#key-end-user-capabilities-at-a-glance)
- [Staying Current](#staying-current)
- [Tips and Best Practices](#tips-and-best-practices)
- [Conclusion](#conclusion)

## About This Guide

This guide is for end users in organisations that have deployed **Microsoft 365 Copilot** as a paid add-on to their Microsoft 365 tenant. It assumes you are signed in with your work account, that your tenant has Copilot licences assigned to you, and that the goal is to use Copilot productively against your organisation's data — not to weigh up consumer plans.

If you came here looking for guidance on Copilot Pro, the free Microsoft Copilot at copilot.microsoft.com, or Copilot+ PCs, those are different products with different data boundaries and aren't covered here. Talk to your IT team if you're not sure which one you have.

## Knowing Which Copilot You're Using

Microsoft uses the "Copilot" name across several products. In a Microsoft 365 tenant you'll typically encounter three of them:

| Product | What it is | Data access |
|---|---|---|
| **Microsoft 365 Copilot** | Paid add-on. Embedded in Word, Excel, PowerPoint, Outlook, Teams, OneNote, Loop, and the Microsoft 365 Copilot app. | Your tenant data via Microsoft Graph, plus the web (when enabled). Full Enterprise Data Protection (EDP). |
| **Microsoft 365 Copilot Chat** | The chat-only experience available to anyone signed in with a work account in your tenant, even without a paid Copilot licence. | Web grounding only (no tenant data). EDP applies to prompts and responses. |
| **Copilot agents** | Purpose-built or custom agents that act on a slice of work — published to Microsoft 365 Copilot, Teams, or specific apps. | Whatever the agent's author scoped it to (knowledge sources, connectors, actions). |

If your team is on Microsoft 365 Copilot, you have access to all three. The rest of this guide focuses on the Microsoft 365 Copilot experience, with Copilot Chat called out where the behaviour differs.

A useful mental check: if Copilot can answer a question about *your* email, *your* meetings, or *your* SharePoint files, you're in Microsoft 365 Copilot. If it can only talk about public information, you're in Copilot Chat.

## Getting Started with Microsoft 365 Copilot

Microsoft 365 Copilot is embedded across the suite — Word, Excel, PowerPoint, Outlook, Teams, OneNote, Loop, Whiteboard, OneDrive, SharePoint, Planner, Stream, Forms, and Viva — plus the dedicated **Microsoft 365 Copilot app** (web at microsoft365.com/copilot, in Teams, and as a desktop/mobile app). The entry point looks slightly different in each surface but the behaviour is consistent: a Copilot icon opens a side panel where you can type a request, attach context, or invoke an agent.

The single most important thing to get right is the account you're signed in with. Microsoft 365 Copilot only activates against your **work account** — the organisational identity your IT team manages in Microsoft Entra ID. Signing in with a personal Microsoft account drops you into the consumer Copilot experience, which has no access to your tenant data and is governed by different terms. If you ever see "Copilot can't see your work files," check the account selector first.

Once signed in correctly, every Copilot panel works the same way: type a prompt, optionally attach files or `@`-mention agents, send. Responses are streamed back; you can rate them, copy them, save them into a Notebook, or expand them into a Page. Tenant data referenced by Copilot stays inside your tenant boundary and is never used to train Microsoft's foundation models.

## Using Copilot in the Microsoft 365 Apps

Microsoft Copilot's true power lies in its deep integration within the Microsoft 365 suite, enhancing the functionality of each application in a context-aware manner.

### Microsoft Word

Within Microsoft Word, Copilot acts as a powerful writing assistant. It can help users initiate new documents by generating initial drafts based on a simple prompt or outline. Furthermore, it excels at refining existing content by rewriting and editing text to improve clarity, tone, and conciseness. Copilot can also quickly summarise lengthy documents, extracting the key information for efficient review. Beyond basic text manipulation, Copilot in Word offers features like the ability to visualise textual data by transforming it into easily understandable tables. Users can also build upon existing prompts, iteratively refining their requests to achieve the desired output. Copilot can also draft entire documents based on various forms of input, such as a brief description or a set of key points.

Recent enhancements have further expanded Copilot's capabilities in Word. Users can now refine presentation text directly within Word for the web, ensuring consistency across document types. One-click prompts provide a quick starting point for users facing a blank page, offering suggestions to kickstart the writing process. The ability to reference up to ten different items, including files, emails, and meetings, when drafting a document allows for more comprehensive and contextually relevant content creation. Additionally, Word now features automatic confidentiality labels that adjust based on the sensitivity of referenced files, ensuring that secure information remains protected.

### Microsoft Excel

In Microsoft Excel, Copilot unlocks the full potential of data analysis. It empowers users to not only create simple spreadsheets but also to conduct advanced data analysis with ease. Copilot can assist in creating and preparing data by helping users build tailored spreadsheets based on their specific requirements. A key benefit is its ability to extract key insights and identify underlying trends within the data, enabling users to make more informed decisions. Copilot can also generate various types of charts and pivot tables to visualise data in meaningful ways. Users can ask Copilot questions about Excel functionalities, and it can provide guidance and even translate responses into different supported languages. For data manipulation, Copilot can add new columns with formulas based on user requests and even analyse columns of text to provide insightful summaries. A recent update has introduced a convenient entry point for Copilot directly within the Excel grid, making it even easier for users to access its capabilities within their workflow.

### Microsoft PowerPoint

Microsoft PowerPoint users can leverage Copilot to transform their ideas into visually compelling presentations. Acting as a storytelling partner, Copilot can convert existing written documents, such as Word files, into complete slide decks, including speaker notes and sources. Alternatively, users can initiate a new presentation from a simple prompt or a basic outline. For existing presentations, Copilot can summarise lengthy content with a single click, saving users valuable time. To enhance the visual appeal and branding of presentations, Copilot can create branded templates and suggest themes that align with the presentation's topic. It can also add relevant visual elements, such as images and timelines, to slides and even suggest and implement transitions and animations to improve the flow.

Recent updates have introduced features like the ability to refine presentation text for clarity and impact. Users can now create presentations directly from existing files and utilise the Narrative Builder feature to quickly generate well-structured presentations. Furthermore, Copilot can now create presentations with new slide types, including agenda, section, and conclusion slides, providing a more organised structure.

### Microsoft Outlook

In the realm of email communication, Microsoft Outlook users can significantly streamline their inbox management with Copilot. It can summarise lengthy email threads, allowing users to quickly grasp the main points without having to read through extensive conversations. Copilot can also assist in drafting new emails, helping users find the right tone and length for their message. For outgoing emails, Copilot can offer coaching on drafts, providing suggestions to improve the message's clarity and impact. It can also rewrite specific portions of an email to achieve the desired tone, length, and style. Organising meetings has become easier with the ability to schedule them directly from the inbox using Copilot. Users can also save and access their frequently used prompts for quick reuse. A recent redesign of the interface for Copilot's writing assistance in Outlook aims to make the experience even more intuitive and effortless.

### Microsoft Teams

Microsoft Teams facilitates collaboration and communication, and Copilot enhances these aspects through AI-powered assistance. Copilot can recap meeting conversations in real-time, organise key discussion points, and summarise the main actions agreed upon in chats, meetings, and calls. It can also answer specific questions users might have about the content of a chat, meeting, or call. Generating meeting notes is another valuable feature, allowing participants to focus on the discussion rather than manual note-taking. Copilot can even create agenda items for meetings based on previous communications like group emails or past meeting transcripts. For ongoing chats and channels, Copilot can generate summaries of conversations that have occurred, create tables to summarise specific information, and even translate texts into different languages. Recent updates indicate that Teams meeting presenters will be able to view the chat while presenting, and a new 'in post' search feature is being introduced for channels, further improving the collaboration experience.

### Other Microsoft 365 Apps

Beyond the core five, Copilot is integrated across the wider suite. **OneNote** can summarise notebooks, surface answers from across pages, and draft new content on demand. **Loop** uses Copilot for shared thinking — co-creating components, catching up on a workspace, and keeping a project's many threads synchronised. **Stream** turns transcripted videos into searchable, summarisable content: ask for the key points of a 60-minute town hall and get a paragraph and a list of action items. **Whiteboard** uses Copilot to generate, categorise, and consolidate ideas during workshops. **OneDrive** offers one-click file summaries, multi-file compare, and insight extraction. **SharePoint** sites can host Copilot agents grounded in their content, so a site becomes a queryable knowledge base. **Planner** uses Copilot to draft plans and rebalance work; **Forms** uses it to draft surveys; **Viva** surfaces it across the employee experience. Functionality varies by app and continues to expand each release wave.

To provide a clear overview of the diverse capabilities of Copilot across the Microsoft 365 suite, the following table summarises some of the key features available in each application.

**Table 2: Summary of Key Copilot Features by Application**

| Application | Key Copilot Features |
|-------------|---------------------|
| Word | Draft new documents, rewrite and edit content, summarise documents, visualise text as tables, add to existing prompts, reference external content, refine presentation text, one-click prompts, automatic confidentiality labels. |
| Excel | Analyse data, create spreadsheets, extract insights and trends, generate charts and pivot tables, answer questions about data, translate responses, add new columns with formulas, analyse text columns. |
| PowerPoint | Transform documents into presentations, summarise presentations, create branded presentations, customise slide designs, add visual elements, suggest transitions and animations, refine presentation text, create presentations from files, Narrative Builder, new slide types. |
| Outlook | Summarise email threads, draft new emails, suggest replies, coach on drafts, rewrite portions of emails, schedule meetings, save favourite prompts. |
| Teams | Recap conversations, organise discussion points, summarise actions, generate meeting notes, answer questions about meetings, create agenda items, summarise email threads, transcribe meetings. |
| OneNote | Summarise notes, generate content, provide insights. |
| Loop | Co-create with teams, get up to speed on projects, stay in sync. |
| Stream | Summarise videos, answer questions about video content, identify key discussion points. |
| Whiteboard | Generate ideas, categorise ideas, summarise ideas. |
| OneDrive | Summarise files, compare multiple files, provide insights. |
| SharePoint | Utilise AI agents for enhanced content management. |

This table serves as a quick reference for end-users to understand the breadth of Copilot's integration and the types of assistance it can offer within their familiar Microsoft 365 applications.

## Copilot Chat, Notebooks, and Agents

The **Microsoft 365 Copilot app** is the home base for Copilot outside the Office apps. Open it from teams.microsoft.com, microsoft365.com/copilot, or the desktop/mobile app, and you get a single workspace with three connected surfaces: Chat, Notebooks, and Agents.

**Chat** is the conversational interface — type a question, attach files with the `+` button or via drag-and-drop, and Copilot responds, grounding answers in your tenant data (your files, emails, meetings, and chats), the web (when enabled), and the agents you've installed. The chat sidebar keeps your conversation history; recent chats can be re-opened, pinned, or shared. The `/` command lets you scope a question to a specific person, file, meeting, or email.

**Notebooks** are persistent, grounded workspaces. Where a Chat is a transient conversation, a Notebook holds a curated set of source materials (files, sites, links, meetings) and lets Copilot reason across exactly that bounded set. Notebooks are the right tool when you want consistent, repeatable answers from a known body of content — onboarding material, a deal room, a piece of research. They're the evolution of what was previously called Copilot Pages: instead of turning a single chat reply into an editable page, you assemble the source set up front and the entire workspace becomes durable, shareable, and exportable.

**Agents** show up in two places in the Copilot app: a sidebar list of agents available to you, and inline `@`-mentions inside Chat. Some agents come from Microsoft (Researcher, Analyst — see the next section); some are built by your IT team in Copilot Studio; some come from SharePoint sites or third-party publishers in the Copilot agent store. Each agent has a defined scope, and your existing permissions still apply — an agent can only see what you can see.

## Reasoning Agents: Researcher and Analyst

Microsoft 365 Copilot includes two reasoning agents that work very differently to standard chat. They take longer to respond — minutes rather than seconds — but produce structured, cited output for problems where breadth and rigour matter more than speed. Both are part of the Frontier program for tenants that have opted in, and are gradually graduating to general availability.

**Researcher** plans a multi-step investigation, pulls from your tenant data and the web, and returns a structured brief with citations. Use it for things you'd otherwise hand to a colleague with a half-day to spare: market scans, regulatory summaries, vendor comparisons, technical literature reviews. You drive Researcher with a goal statement ("Build me a brief on competitor X's enterprise positioning over the last six months, focused on AI features") and optionally a list of source materials to weight; it does the rest.

**Analyst** is the equivalent for structured data. Hand it a spreadsheet, a query export, or a Notebook with multiple data files, and ask a question. Analyst writes Python in a sandboxed environment, runs it against the data, iterates if the first cut isn't right, and returns a written explanation alongside the chart and the reproducible code. It's the right tool for "explain what's happening in this dataset and show your working" — in particular for finance, ops, and analytics teams who'd otherwise spend the morning in Excel.

Both agents respect your permissions, log every step they take, and present their reasoning so you can audit how a conclusion was reached. They're not replacements for human judgment — they're force multipliers when the alternative is hours of manual gathering.

For a deeper look at the early-access program these agents come through, see the [Frontier &amp; CoWork](#frontier) guide.

## Effective Prompting in an Enterprise Context

To harness the full potential of Microsoft Copilot, mastering the art of effective prompting is essential. The quality and relevance of Copilot's responses are directly influenced by the clarity and precision of the prompts provided by the user. Therefore, understanding how to craft well-structured prompts is a fundamental skill for enterprise users.

An effective prompt typically incorporates four key elements: Goal, Context, Data Source, and Expectation. The Goal clearly states what the user aims to achieve with the prompt. The Context provides any necessary background information to set the scene for the task. The Data Source mentions any specific data or documents that Copilot should refer to in its response. Finally, the Expectation specifies how the user expects Copilot to respond, including the desired format or level of detail. For example, instead of a vague prompt like "Summarise this document," a more effective prompt would be: "Goal: Summarise this marketing report. Context: The report details the Q3 campaign performance. Data Source: [Link to document]. Expectation: Provide a bulleted list of the top three key findings and the overall ROI."

Users can also explore different styles of phrasing their prompts. They can ask direct questions, issue specific commands, or provide detailed context followed by a request for a particular output. Experimenting with different phrasing can often lead to more nuanced and helpful results. Furthermore, the process of interacting with Copilot is often iterative. If the initial response is not quite what the user intended, they can refine their prompt by adding more detail, adjusting the context, or clarifying their expectations. Copilot's availability of different conversation styles, such as "Balanced" for factual responses and "Creative" for more imaginative content, offers another way to influence the output based on the specific task at hand.

Providing relevant context is crucial for obtaining accurate and useful responses, especially in an enterprise setting where information is often specific and interconnected. Users can significantly improve the quality of Copilot's output by referencing specific documents, emails, or meetings that are relevant to their prompt. For instance, when drafting a project update, a user could prompt Copilot to "Summarise the key decisions from our last project meeting [link to meeting notes] and incorporate the latest progress from this status report [link to report]." Recent updates have made this even more seamless, allowing users to reference content within the same document or from other files stored in the cloud. In Word, users can now reference up to ten different items, including files, emails, and meetings, when drafting a document, enabling more comprehensive and contextually rich content creation.

To further assist users in crafting effective prompts, Microsoft provides valuable resources like the Copilot Prompt Gallery. This gallery serves as a central repository where users can discover, save, and share their favourite and most effective prompts. It offers a wide range of examples that can be readily used or adapted for various scenarios across Microsoft 365 applications, Copilot Chat, and AI agents. By exploring the prompts available in the gallery, users can gain inspiration and understand the types of requests that Copilot is capable of handling. Additionally, the Microsoft Copilot Scenario Library offers further examples and use cases, illustrating how Copilot can be applied to common enterprise tasks. These resources are invaluable for both new and experienced users, helping them to unlock the full potential of Microsoft Copilot by leveraging the collective knowledge of the user community and best practices identified by Microsoft.

## Key End-User Capabilities at a Glance

Microsoft Copilot offers a range of key features and functionalities that are particularly beneficial for enterprise end-users, significantly enhancing their productivity and streamlining their workflows.

One of the most powerful capabilities of Copilot is its ability to summarise information across various Microsoft 365 applications. This includes efficiently condensing long email threads in Outlook, extracting the core content from lengthy documents in Word, providing concise recaps of past meetings in Teams, and summarising key takeaways from extensive presentations in PowerPoint. A recent update has expanded this capability, allowing Copilot to generate summaries for even longer presentations, supporting text up to 40,000 words, which is approximately equivalent to 150 slides. These summarisation features save users valuable time by allowing them to quickly grasp the essential information without having to sift through large volumes of text or recordings.

Copilot also excels at content generation and drafting across multiple applications. Whether it's creating a first draft of a report in Word, outlining a new presentation in PowerPoint, composing an initial email in Outlook, or even generating snippets of code, Copilot can provide a solid starting point based on user prompts. In some cases, Copilot can even generate content without any pre-existing information in the document, such as writing an essay on a given topic or creating a business plan for a specified venture. This ability to rapidly generate initial content can significantly reduce the time and effort required to begin new tasks.

For tasks that require creative thinking and problem-solving, Copilot can serve as a valuable tool for idea generation and brainstorming. Particularly within collaborative environments like Microsoft Loop and Whiteboard, Copilot can assist teams in generating new ideas and refining existing ones. A useful feature in Copilot Chat allows users to turn AI-generated responses into persistent and editable pages, providing a dedicated space for teams to further develop and build upon the initial ideas generated by Copilot.

Furthermore, Microsoft Copilot introduces the concept of AI agents to optimise workflows. These intelligent systems extend Copilot's capabilities by enabling it to perform specific, repeatable actions through access to various tools and knowledge sources. Unlike general AI assistance, AI agents focus on automating and repeating particular jobs, thereby increasing efficiency. Examples of these agents include SharePoint agents, which can assist with content management tasks within SharePoint. Additionally, users have the ability to build their own custom AI agents using Microsoft Copilot Studio, allowing them to tailor AI assistance to their specific needs and workflows. Recent updates have further enhanced the functionality of AI agents, including the ability to create agents with access to specific public websites and to invoke these agents within Copilot Chat, Word, and PowerPoint using simple @mentions. This integration of AI agents signifies a move towards more proactive and automated AI assistance within the enterprise environment.

## Staying Current

Microsoft 365 Copilot ships changes constantly. The official channels worth bookmarking:

- **Microsoft 365 Roadmap** — the canonical source for what's in preview, in rollout, or generally available. Filter by Copilot.
- **Microsoft 365 Blog** — feature announcements with context.
- **Microsoft Learn → Copilot** — documentation, training paths, and the prompt gallery.
- **Latest updates for Microsoft 365 Copilot** (support.microsoft.com) — a digestible monthly summary.

If your team is on the Frontier program, you'll see new features ahead of these channels. Even so, the roadmap is still the right reference for "is this generally available or still in preview" questions.

The shape of Copilot has changed meaningfully over 2025 and into 2026, with three themes worth knowing about as a user:

- **Reasoning agents (Researcher and Analyst)** moved from preview into broader availability through the Frontier program. They handle the "I need a thorough, cited brief, not a quick chat reply" jobs.
- **Notebooks replaced Pages** as the primary persistent workspace, with grounding pinned up front rather than promoted from a one-off chat reply. If your team still talks about Pages, the concept is the same — just grown up.
- **The agent ecosystem matured.** The Copilot agent store, `@`-mentions across Word/PowerPoint/Excel/Chat, SharePoint agents on individual sites, and tenant-built Copilot Studio agents are routine. Most enterprise teams should have a few internal agents in place; if yours doesn't, that's worth raising with your Copilot Centre of Excellence.

See the [Frontier &amp; CoWork](#frontier) guide for the early-access program these features come through.

## Tips and Best Practices

A handful of habits that consistently separate users who get a lot out of Copilot from users who give up after a week:

**Start small, then layer.** Don't try to perfect the prompt on the first attempt. Send the simple version, see what comes back, then add the missing context. Most "Copilot doesn't do this well" complaints disappear with one iteration.

**Be explicit about scope.** Tell Copilot which file, which meeting, which date range, which audience. The `/` command in Chat lets you tag specific items; the `+` button lets you attach them. Vague prompts produce vague output.

**Use the right surface.** Quick task in the document you're already in → use the in-app Copilot. Spans multiple files or apps → use the Microsoft 365 Copilot app. Repeatable, grounded work over a known set of sources → build a Notebook. Long, deep, cited research → call Researcher. Data analysis with reproducible code → call Analyst.

**Treat output as a draft, not a deliverable.** Especially for anything customer-facing, financial, or compliance-related, every Copilot output needs a human check. The model can be confidently wrong about specifics, even when it has access to the source.

**Use the prompt gallery.** Microsoft's prompt gallery, plus any prompts your own team has shared internally, save you reinventing prompts that already work.

**Give feedback.** The thumbs-up/thumbs-down on every response feeds back into the platform. For Frontier features, that feedback also goes directly to the product team.

## Conclusion

Microsoft 365 Copilot has shifted from "AI in the sidebar" to a genuine collaborator that lives across the suite, grounds in your tenant's content, and increasingly works as a team of agents alongside you. The two skills that compound the most for end users are **prompting clearly** and **picking the right surface for the job** — quick chat for a five-minute task, Notebooks for grounded recurring work, Researcher for depth, Analyst for data. Everything else is muscle memory you'll build over a few weeks.

Stay close to the [Microsoft 365 Roadmap](https://www.microsoft.com/microsoft-365/roadmap?filters=Copilot), the [Frontier &amp; CoWork](#frontier) guide if your team has opted in, and your own organisation's prompt library. The product changes faster than any document — including this one — can keep up with.