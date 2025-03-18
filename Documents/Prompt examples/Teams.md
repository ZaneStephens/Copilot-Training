# Comprehensive List of Example Prompts for Microsoft Copilot in Teams

This document provides a curated list of example prompts for Microsoft Copilot in Teams, designed to boost productivity and collaboration as of March 17, 2025. Prompts are tailored for chats, channels, meetings, and calls, leveraging Teams’ integration with Microsoft 365 data, files (OneDrive/SharePoint), and agents. Each includes a clear **goal**, optional **context**, and **expectations**, with notes on limitations—test and refine for optimal results.

## Table of Contents
- [Chat Management](#chat-management)
- [Channel Collaboration](#channel-collaboration)
- [Meeting Assistance](#meeting-assistance)
- [Calling Agents](#calling-agents)
- [File Integration](#file-integration)
- [Content Creation and Rewriting](#content-creation-and-rewriting)
- [Planning and Scheduling](#planning-and-scheduling)

---

## Chat Management

### 1. Chat Highlights
- **Prompt**: "Show highlights from the ‘Project X’ chat over the past 7 days."
- **Use Case**: Catching up on key points.
- **Note**: Access via Copilot icon in chat; specify timeframe for precision.

### 2. Action Items
- **Prompt**: "List all open action items from my chats with John Doe this week."
- **Use Case**: Task tracking.
- **Note**: Works with primary mailbox data; vague terms may miss items.

### 3. Missed Updates
- **Prompt**: "Summarize what I missed in the ‘Sales Team’ chat since March 10."
- **Use Case**: Returning from absence.
- **Note**: Add “in bullet points” for clarity; limited to 30-day history.

---

## Channel Collaboration

### 4. Channel Summary
- **Prompt**: "Summarize the ‘Marketing’ channel posts from the past month."
- **Use Case**: Staying updated on channel activity.
- **Note**: Open Copilot in channel view; large threads may truncate—specify dates.

### 5. Decision Recap
- **Prompt**: "What decisions were made in the ‘Dev Team’ channel this week?"
- **Use Case**: Tracking outcomes.
- **Note**: Use “More prompts” for pre-built options; refine with keywords.

### 6. Thread Extraction
- **Prompt**: "Extract key points from the thread about Q2 goals in the ‘Planning’ channel."
- **Use Case**: Focused review.
- **Note**: Expand thread first; Copilot may miss nested replies.

---

## Meeting Assistance

### 7. Meeting Recap
- **Prompt**: "Recap my last meeting with Jane Smith, listing key points and action items."
- **Use Case**: Post-meeting notes.
- **Note**: Requires transcription; add “from yesterday” if multiple meetings.

### 8. Real-Time Questions
- **Prompt**: "Suggest 3 follow-up questions based on the meeting so far."
- **Use Case**: Active participation.
- **Note**: Enable Copilot during meeting; transcription must be on.

### 9. Decision Table
- **Prompt**: "Create a table of ideas discussed in today’s meeting with pros and cons."
- **Use Case**: Decision-making support.
- **Note**: Use post-meeting; shareable via Loop component.

---

## Calling Agents

### 10. IT Support Agent
- **Prompt**: "@ITAgent How do I reset my VPN access?"
- **Use Case**: Employee self-service.
- **Note**: Agent must be configured in Copilot Studio; metered billing applies.

### 11. Project Agent Task
- **Prompt**: "@ProjectAgent Add a task to Planner for ‘Design Review’ due March 25."
- **Use Case**: Workflow automation.
- **Note**: Verify agent integration; manual confirmation needed.

### 12. HR Policy Query
- **Prompt**: "@HRAgent What’s the 2025 holiday schedule?"
- **Use Case**: Quick HR answers.
- **Note**: Grounded in SharePoint data; test for org-specific accuracy.

---

## File Integration

### 13. File Summary
- **Prompt**: "Summarize /MeetingNotes.docx shared in the ‘Team Sync’ chat."
- **Use Case**: Quick file insights.
- **Note**: File must be cloud-stored, <24 MB; cite “/filename” exactly.

### 14. File-Based Agenda
- **Prompt**: "Create a meeting agenda from /Q2Plan.xlsx."
- **Use Case**: Prep from documents.
- **Note**: Data must be tabular; refine with “add timings” if needed.

### 15. Chat + File Combo
- **Prompt**: "Summarize the ‘Design Team’ chat this week and include insights from /DesignSpec.pdf."
- **Use Case**: Holistic review.
- **Note**: Upload file if not shared; large files may fail.

---

## Content Creation and Rewriting

### 16. Message Rewrite
- **Prompt**: "Rewrite this draft to be more professional: ‘Hey all, updates due by Friday!’"
- **Use Case**: Polishing communication.
- **Note**: Use compose box Copilot; adjust via “custom tone.”

### 17. Announcement Draft
- **Prompt**: "Draft a channel post announcing a team event on April 5, 2025, with a friendly tone."
- **Use Case**: Team updates.
- **Note**: Add “include RSVP link” for interactivity.

### 18. Custom Tone
- **Prompt**: "Make this message shorter, confident, and in Spanish: ‘We’ll finish the project soon.’"
- **Use Case**: Tailored messaging.
- **Note**: Use “Adjust” feature; stack changes carefully.

---

## Planning and Scheduling

### 19. Weekly Prep
- **Prompt**: "What do I have coming up this week? Organize by meeting type."
- **Use Case**: Time management.
- **Note**: Open Copilot in chat pane; follow up with “add prep tasks.”

### 20. Meeting Scheduler
- **Prompt**: "Find a 30-minute slot next week for a sync with Tom Lee and draft an invite."
- **Use Case**: Calendar coordination.
- **Note**: Limited to 2-3 attendees; send invite manually.

### 21. Brainstorm Setup
- **Prompt**: "Create a table for brainstorming Q3 goals with columns for idea, owner, and priority."
- **Use Case**: Team ideation.
- **Note**: Share as Loop component for live edits.

---

## Tips and Limitations

- **Accessing Copilot**: In chats/channels, use the Copilot icon; in meetings, enable via controls (transcription required unless “only during” setting is on).
- **File Use**: Reference with “/filename” (OneDrive/SharePoint, <24 MB); local files unsupported.
- **Agents**: Call with “@AgentName” (e.g., @ITAgent); requires Copilot Studio setup, metered post-Feb 2025.
- **Transcription**: Essential for meeting prompts—organizer controls via “Allow Copilot” settings.
- **Precision**: Specify dates, names, or channels (e.g., “from March 10”) to avoid vague outputs.
- **Iterate**: Refine with follow-ups (e.g., “Make it a table”); randomness in LLMs may vary results.
- **Limits**: No external meeting support, 2000-character prompt cap, English prompts optimal.

These prompts harness Copilot’s power in Teams—adapt them to your workflow and experiment for best results!