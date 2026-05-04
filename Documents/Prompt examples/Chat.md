# Comprehensive List of Example Prompts for Microsoft Copilot Chat

This document provides a curated list of example prompts for Microsoft Copilot Chat, tailored to its **Work** (enterprise) and **Web** modes as of March 17, 2025. Prompts leverage Copilot Chat’s ability to call agents, reference files, and enhance productivity, with clear **goals**, optional **context**, and **expectations**. Copilot Chat requires a Microsoft 365 license for Work mode and cloud connectivity—test and refine prompts due to potential variability (e.g., agent access, file limits).

## Table of Contents
- [Work Mode Prompts](#work-mode-prompts)
   - [Drafting and Content Creation](#drafting-and-content-creation)
   - [Summarizing and Catching Up](#summarizing-and-catching-up)
   - [Calling Agents](#calling-agents)
   - [File-Based Tasks](#file-based-tasks)
- [Web Mode Prompts](#web-mode-prompts)
   - [Research and Summaries](#research-and-summaries)
   - [Content Generation](#content-generation)
   - [General Assistance](#general-assistance)
- [Tips and Limitations](#tips-and-limitations)

---

## Work Mode Prompts

Work mode grounds Copilot Chat in your Microsoft 365 data (emails, documents, chats, meetings) and supports calling agents and file references.

### Drafting and Content Creation

#### 1. Email Draft with File Reference
- **Prompt**: "Draft an email to my team summarizing key points from /Q1Report.docx and assign action items."
- **Use Case**: Team communication with document grounding.
- **Note**: File must be in OneDrive, <24 MB; specify recipients manually.

#### 2. Meeting Agenda
- **Prompt**: "Create a meeting agenda based on emails from Jane Doe this week about project updates."
- **Use Case**: Pre-meeting prep.
- **Note**: Ensure emails are in primary mailbox; vague results possible—refine with dates.

#### 3. Status Update
- **Prompt**: "Write a 200-word status update for my manager using Teams chats from the ‘Project X’ channel this month."
- **Use Case**: Reporting progress.
- **Note**: Specify channel name exactly; large chat volumes may truncate output.

### Summarizing and Catching Up

#### 4. Email Thread Summary
- **Prompt**: "Summarize all emails from Tom Lee in the last 7 days into 3 bullet points."
- **Use Case**: Quick catch-up.
- **Note**: Works in primary mailbox; encrypted emails unsupported.

#### 5. Meeting Recap
- **Prompt**: "Recap my last Teams meeting with Sarah Jones, listing key decisions and action items."
- **Use Case**: Post-meeting notes.
- **Note**: Requires meeting transcript; add “from yesterday” if multiple meetings.

#### 6. Chat Highlights
- **Prompt**: "Highlight key points from the ‘Sales Team’ Teams chat over the past 30 days."
- **Use Case**: Reviewing discussions.
- **Note**: Use precise timeframe; responses may prioritize recent messages.

### Calling Agents

#### 7. CRM Agent Query
- **Prompt**: "@CRMAgent What’s the status of account #4567?"
- **Use Case**: Accessing CRM data via agent.
- **Note**: Agent must be enabled via Copilot Studio; metering applies—check billing.

#### 8. HR Agent Lookup
- **Prompt**: "@HRAgent Find vacation policy details for 2025."
- **Use Case**: Employee self-service.
- **Note**: Agent needs SharePoint grounding; test for accuracy.

#### 9. Project Agent Task
- **Prompt**: "@ProjectManager Create a task in Planner for ‘Website Update’ due April 1, 2025."
- **Use Case**: Task automation.
- **Note**: Agent must integrate with Planner; verify task creation.

### File-Based Tasks

#### 10. File Analysis
- **Prompt**: "Analyze /SalesData.xlsx and list top 3 regions by revenue."
- **Use Case**: Data insights from Excel.
- **Note**: Data must be in a table (Ctrl+T); large files may fail.

#### 11. Document Edit
- **Prompt**: "Rewrite the intro of /Proposal.docx to be more persuasive."
- **Use Case**: Document refinement.
- **Note**: Select text or page first; output appears in chat—paste manually.

#### 12. PDF Summary
- **Prompt**: "Summarize key points from /Contract.pdf in 150 words."
- **Use Case**: Quick file review.
- **Note**: Upload file directly if not in OneDrive; limited to text-based PDFs.

---

## Web Mode Prompts

Web mode grounds Copilot Chat in web data via Bing search, ideal for research and general tasks—no enterprise data access.

### Research and Summaries

#### 13. Industry Trends
- **Prompt**: "Summarize recent trends in renewable energy from the past year."
- **Use Case**: Market research.
- **Note**: Cites web sources; verify with “show citations” for credibility.

#### 14. Product Comparison
- **Prompt**: "Compare features of the top 3 project management tools online."
- **Use Case**: Decision support.
- **Note**: Results may vary—specify tools (e.g., “Trello, Asana”) for focus.

#### 15. News Recap
- **Prompt**: "Give me a 100-word recap of tech news from March 2025."
- **Use Case**: Staying informed.
- **Note**: Adjust timeframe as needed; web grounding ensures freshness.

### Content Generation

#### 16. Blog Post Idea
- **Prompt**: "Generate a 300-word blog post outline on AI in education."
- **Use Case**: Content brainstorming.
- **Note**: No file grounding—purely web-based; refine tone if needed.

#### 17. Social Media Post
- **Prompt**: "Write a LinkedIn post about remote work benefits, under 150 words."
- **Use Case**: Marketing content.
- **Note**: Add “engaging tone” for better engagement.

#### 18. Image Description
- **Prompt**: "Describe an AI-generated image of a futuristic city for a presentation."
- **Use Case**: Visual content prep (image generation coming mid-March 2025 on mobile).
- **Note**: Confirm “generate image?” if intent is unclear; feature rollout pending.

### General Assistance

#### 19. Skill Learning
- **Prompt**: "Teach me the basics of Python loops in 200 words."
- **Use Case**: Quick learning.
- **Note**: Web-sourced; ask “add examples” for clarity.

#### 20. Travel Planning
- **Prompt**: "Plan a 3-day itinerary for Seattle based on top attractions."
- **Use Case**: Personal productivity.
- **Note**: Web-based; refine with “budget-friendly” if needed.

#### 21. Fact Check
- **Prompt**: "Is it true that electric cars outsold gas cars in 2024?"
- **Use Case**: Verification.
- **Note**: Cites Bing results; cross-check for accuracy.

---

## Tips and Limitations

- **Work Mode**:
  - **File Access**: Use “/filename” for OneDrive/SharePoint files (<24 MB); local files unsupported.
  - **Agents**: Enable via Copilot Studio; @mention agents (e.g., @CRMAgent) for specific tasks—metered usage applies post-Feb 2025.
  - **Data Scope**: Limited to primary mailbox and Graph-indexed data; no archive mailbox support.
  - **Security**: Enterprise Data Protection (EDP) ensures prompts/responses stay within tenant.

- **Web Mode**:
  - **Grounding**: Relies on Bing search—no access to M365 data unless files are uploaded.
  - **Image Generation**: Rolling out mid-March 2025 on mobile; limits apply during peak usage.
  - **Accuracy**: Web data may lag or vary—verify critical info.

- **General Tips**:
  - **Prompt Clarity**: Be specific (e.g., dates, names) to avoid vague outputs.
  - **Iterate**: Follow up (e.g., “Make it shorter”) to refine results.
  - **Feedback**: Use thumbs-up/down to improve Copilot’s learning.
  - **Limits**: 2000-character prompt cap; file uploads capped at reasonable sizes—split large tasks.

These prompts showcase Copilot Chat’s versatility across Work and Web modes—experiment and adjust to fit your needs!