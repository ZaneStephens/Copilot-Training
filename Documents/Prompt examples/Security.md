# Comprehensive List of Example Prompts for Microsoft Copilot for Security

This document provides a curated list of example prompts for Microsoft Copilot for Security, designed for SOC analysts to enhance incident response, threat hunting, and security management as of March 17, 2025. Prompts leverage Copilot’s integration with Microsoft 365 Defender, Sentinel, and third-party plugins, with capabilities like calling agents and referencing files (OneDrive/SharePoint). Each includes a **goal**, optional **context**, and **expectations**, with notes on SOC-specific limitations—test and refine for optimal results. These prompts are confirmed functional within the Copilot for Security ecosystem per Microsoft Learn, Security Blog, and Adoption Hub updates (e.g., March 2, 2025 release notes).

## Table of Contents
- [Incident Response](#incident-response)
- [Threat Hunting](#threat-hunting)
- [Script and File Analysis](#script-and-file-analysis)
- [Threat Intelligence](#threat-intelligence)
- [Calling Agents](#calling-agents)
- [File-Based Investigations](#file-based-investigations)
- [Reporting and Compliance](#reporting-and-compliance)

---

## Incident Response

### 1. Incident Summary
- **Prompt**: "Summarize incident #12345 from Microsoft Sentinel, including attack timeline, IOCs, and affected assets."
- **Use Case**: Quick incident overview for triage.
- **Note**: Requires incident ID; works in standalone or embedded Sentinel experience—links to source data.

### 2. Guided Response
- **Prompt**: "Provide step-by-step remediation steps for a phishing incident flagged in Defender XDR."
- **Use Case**: Actionable triage guidance.
- **Note**: Outputs natural language steps; ~4 SCUs in standalone mode.

### 3. Entity Extraction
- **Prompt**: "List all entities involved in incident #67890 from Defender, filtered by severity ‘High’."
- **Use Case**: Identifying critical assets/users.
- **Note**: Severity filtering enhanced in March 2025—requires Defender data access.

---

## Threat Hunting

### 4. KQL Query Generation
- **Prompt**: "Generate a KQL query to find unusual logins from IPs in Russia over the past 30 days."
- **Use Case**: Custom threat hunting.
- **Note**: Query Assistant provides logic breakdown—validate in Sentinel/Defender.

### 5. Suspicious Activity
- **Prompt**: "Analyze sign-in logs for unusual patterns in the last week and flag anomalies."
- **Use Case**: Proactive threat detection.
- **Note**: Grounded in Entra ID logs; add “show IPs” for detail.

### 6. Hunt Across Sources
- **Prompt**: "Hunt for traces of ‘Emotet’ malware across Sentinel and Defender data this month."
- **Use Case**: Multi-product threat search.
- **Note**: Requires MDTI plugin—enable in settings.

---

## Script and File Analysis

### 7. Script Breakdown
- **Prompt**: "Analyze this PowerShell script and explain its actions in natural language: [paste script]."
- **Use Case**: Reverse-engineering malware.
- **Note**: Supports PowerShell/bash; paste directly—~5 SCUs for complex scripts.

### 8. File Reputation
- **Prompt**: "Check the reputation of file hash ‘abc123’ using ReversingLabs plugin."
- **Use Case**: Triage executable threats.
- **Note**: ReversingLabs plugin required—summarize for quick triage.

### 9. Command Line Analysis
- **Prompt**: "Translate this command line into plain English: ‘net user admin P@ssw0rd /add’."
- **Use Case**: Understanding attacker actions.
- **Note**: Faster CLI parsing added March 2025—works standalone.

---

## Threat Intelligence

### 10. Threat Actor Profile
- **Prompt**: "Profile the ‘APT28’ group, including TTPs and recent activity."
- **Use Case**: Contextualizing threats.
- **Note**: Uses included MDTI workbench—add “from 2025” for recency.

### 11. IOC Lookup
- **Prompt**: "Find IOCs related to ‘Ryuk’ ransomware from Shodan and Whoisfreaks."
- **Use Case**: Expanding threat scope.
- **Note**: Plugins required—returns IPs/domains; verify externally.

### 12. Vulnerability Check
- **Prompt**: "Assess if my org is exposed to CVE-2025-1234 based on Sentinel data."
- **Use Case**: Risk assessment.
- **Note**: Grounded in org data—~1 SCU in embedded mode.

---

## Calling Agents

### 13. Sentinel Agent Query
- **Prompt**: "@SentinelAgent List incidents created this week with status ‘Active’."
- **Use Case**: Automating Sentinel tasks.
- **Note**: Requires agent setup in Copilot Studio—metered post-Feb 2025.

### 14. Identity Agent Insight
- **Prompt**: "@IdentityAgent Summarize login anomalies for user ‘jdoe’ this month."
- **Use Case**: User behavior analysis.
- **Note**: Enhanced Identity Summary feature—needs Entra access.

### 15. Custom Plugin Call
- **Prompt**: "@SilverfortAgent Analyze logs for failed MFA attempts today."
- **Use Case**: Third-party log insights.
- **Note**: Silverfort plugin required—customize KQL via prompt.

---

## File-Based Investigations

### 16. Document Summary
- **Prompt**: "Summarize /IncidentReport.docx and extract key findings."
- **Use Case**: Reviewing past incidents.
- **Note**: File in OneDrive, <24 MB—add “in bullets” for format.

### 17. Excel Analysis
- **Prompt**: "Analyze /ThreatLog.xlsx and list top 5 IPs by frequency."
- **Use Case**: Log file insights.
- **Note**: Data must be tabular—~2 SCUs for small files.

### 18. Phishing Email Review
- **Prompt**: "Analyze this email text for phishing indicators: [paste email]."
- **Use Case**: User-reported threat triage.
- **Note**: Paste directly—standalone mode optimal.

---

## Reporting and Compliance

### 19. Incident Report
- **Prompt**: "Generate a report on incident #54321 for execs, under 200 words."
- **Use Case**: Stakeholder communication.
- **Note**: Use promptbook templates—edit for tone.

### 20. Compliance Check
- **Prompt**: "Assess device compliance in Intune and list non-compliant devices."
- **Use Case**: Posture management.
- **Note**: Grounded in Intune data—~1 SCU embedded.

### 21. Usage Dashboard
- **Prompt**: "Show my team’s SCU usage for March 2025 in a table."
- **Use Case**: Monitoring Copilot consumption.
- **Note**: Enhanced dashboard feature—exportable to Excel.

---

## Tips and Limitations

- **Access**: Use standalone (securitycopilot.microsoft.com) or embedded (Defender, Sentinel); requires M365 Copilot license + Azure subscription.
- **Files**: Reference with “/filename” (OneDrive/SharePoint, <24 MB); no local support.
- **Agents**: Call with “@AgentName” (e.g., @SentinelAgent); configure via Copilot Studio—metered usage applies.
- **Plugins**: Enable Shodan, ReversingLabs, Silverfort, etc., in Adoption Hub—check org licensing.
- **SCU Usage**: ~1 SCU (embedded), ~4 SCU (standalone), ~5 SCU (complex/agent tasks)—track via dashboard.
- **Precision**: Specify IDs, dates, entities (e.g., “incident #12345”) to avoid vague outputs.
- **Limits**: No GCC/DoD support; 2000-character prompt cap; English prompts optimal.
- **Iterate**: Refine with “make it shorter” or “add details”—randomness may affect first pass.