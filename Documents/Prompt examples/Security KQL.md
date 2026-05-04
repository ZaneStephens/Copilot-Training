# KQL Query Templates for Microsoft Copilot for Security

This comprehensive guide provides KQL (Kusto Query Language) query templates specifically optimized for use with Microsoft Copilot for Security. These templates serve as both direct query examples and as inspiration for natural language prompts when interacting with Copilot. Each template includes detailed explanations, potential variations, and guidance on how to leverage Copilot for Security to enhance your threat hunting and incident response capabilities.

## Table of Contents
- [Introduction to KQL with Copilot for Security](#introduction-to-kql-with-copilot-for-security)
- [Detect Unusual Sign-Ins](#detect-unusual-sign-ins)
- [Find Suspicious Process Execution](#find-suspicious-process-execution)
- [Track File Downloads by User](#track-file-downloads-by-user)
- [Identify High-Volume Alerts](#identify-high-volume-alerts)
- [Hunt for Known IOCs](#hunt-for-known-iocs)
- [Monitor Privilege Escalation](#monitor-privilege-escalation)
- [Advanced KQL Techniques](#advanced-kql-techniques)
- [Using KQL Templates with Copilot](#using-kql-templates-with-copilot)
- [Troubleshooting and Optimization](#troubleshooting-and-optimization)

---

## Introduction to KQL with Copilot for Security

Microsoft Copilot for Security offers a revolutionary way to work with KQL by allowing you to generate complex queries using natural language prompts. While you can directly execute the KQL templates provided in this guide, they also serve as excellent reference points for crafting effective prompts for Copilot.

When working with Copilot for Security:
- You can describe the security scenario you want to investigate in plain language
- Copilot will generate appropriate KQL queries based on your description
- You can refine these queries through iterative prompting
- You can learn KQL syntax by examining Copilot's generated queries

The templates in this guide are validated against Microsoft Sentinel and Microsoft Defender and are aligned with security operations best practices.

---

## Detect Unusual Sign-Ins

### Template Overview
This query helps identify potential account compromise by detecting anomalous login patterns based on geography, frequency, or other unusual characteristics.

### KQL Template
```kql
SigninLogs
| where TimeGenerated > ago(7d)
| where ResultType == 0 // Successful logins
| summarize LoginCount = count(), 
    IPs = make_set(IPAddress), 
    Cities = make_set(City), 
    CountryCount = dcount(CountryOrRegion) 
    by UserPrincipalName, UserDisplayName
| where LoginCount > 10 or array_length(IPs) > 3 or CountryCount > 1
| order by CountryCount desc, LoginCount desc
```

### Use Cases
- Detecting potentially compromised accounts
- Identifying account sharing among multiple users
- Discovering unusual access patterns that might indicate credential theft

### Variations
- **Focus on after-hours logins**:
  ```kql
  SigninLogs
  | where TimeGenerated > ago(7d)
  | where ResultType == 0
  | extend hour = datetime_part("hour", TimeGenerated)
  | where hour < 6 or hour > 18
  | summarize off_hours_count=count() by UserPrincipalName
  | where off_hours_count > 5
  ```

- **Track impossible travel scenarios**:
  ```kql
  SigninLogs
  | where TimeGenerated > ago(1d)
  | where ResultType == 0
  | order by UserPrincipalName asc, TimeGenerated asc
  | serialize
  | extend PrevCountry = strcat(prev(CountryOrRegion, 1), "", prev(UserPrincipalName, 1))
  | extend CurrentCountry = strcat(CountryOrRegion, "", UserPrincipalName)
  | extend PrevTime = prev(TimeGenerated, 1)
  | where PrevCountry != CurrentCountry and prev(UserPrincipalName, 1) == UserPrincipalName
  | extend TimeDelta = datetime_diff('minute', TimeGenerated, PrevTime)
  | where TimeDelta < 180 // Travel between countries in less than 3 hours
  | project UserPrincipalName, PrevTime, TimeGenerated, TimeDelta, prev(CountryOrRegion, 1), CountryOrRegion
  ```

### Copilot Prompts
- "Find users logging in from multiple countries in the past week"
- "Identify accounts with excessive login attempts across different IP addresses"
- "Show me potential impossible travel scenarios in our sign-in logs"
- "Generate a query that detects unusual after-hours authentication patterns"

---

## Find Suspicious Process Execution

### Template Overview
This query detects potentially malicious activity by identifying unusual process execution patterns, particularly focusing on command-line interfaces that might be abused for attacks.

### KQL Template
```kql
DeviceProcessEvents
| where TimeGenerated > ago(1d)
| where ProcessCommandLine contains "powershell" or 
        ProcessCommandLine contains "cmd" or
        ProcessCommandLine contains "wscript" or
        ProcessCommandLine contains "cscript"
| where ProcessCommandLine contains "-enc" or 
        ProcessCommandLine contains "bypass" or
        ProcessCommandLine contains "hidden" or
        ProcessCommandLine contains "downloadstring" or
        ProcessCommandLine contains "iex"
| extend CommandLength = strlen(ProcessCommandLine)
| where CommandLength > 100
| project TimeGenerated, DeviceName, AccountName, ProcessCommandLine, InitiatingProcessFileName, CommandLength
| order by CommandLength desc
```

### Use Cases
- Detecting fileless malware execution
- Identifying PowerShell-based attacks
- Discovering living-off-the-land techniques
- Spotting obfuscated command execution

### Variations
- **Focus on encoded commands**:
  ```kql
  DeviceProcessEvents
  | where TimeGenerated > ago(3d)
  | where ProcessCommandLine matches regex @"(?i)powershell.*-e(nc)?.*[A-Za-z0-9+/]{50,}={0,2}"
  | project TimeGenerated, DeviceName, AccountName, ProcessCommandLine
  ```

- **Unusual parent-child process relationships**:
  ```kql
  DeviceProcessEvents
  | where TimeGenerated > ago(1d)
  | where InitiatingProcessFileName in~ ("excel.exe", "word.exe", "outlook.exe", "powerpnt.exe")
  | where FileName in~ ("cmd.exe", "powershell.exe", "wscript.exe", "cscript.exe", "mshta.exe")
  | project TimeGenerated, DeviceName, AccountName, FileName, InitiatingProcessFileName, ProcessCommandLine
  ```

### Copilot Prompts
- "Find PowerShell executions with encoded commands in our environment"
- "Identify Office applications launching command shells in the past day"
- "Show me long command lines that might indicate obfuscation"
- "Detect PowerShell commands that attempt to bypass security controls"

---

## Track File Downloads by User

### Template Overview
This query monitors potentially risky file download activities, focusing on executable files or other formats that commonly contain malware.

### KQL Template
```kql
DeviceFileEvents
| where TimeGenerated > ago(30d)
| where ActionType == "FileCreated" or ActionType == "FileModified"
| where FileName endswith ".exe" or 
        FileName endswith ".dll" or
        FileName endswith ".ps1" or
        FileName endswith ".vbs" or
        FileName endswith ".bat" or
        FileName endswith ".zip" or
        FileName endswith ".rar" or
        FileName endswith ".7z" or
        FileName endswith ".msi"
| summarize DownloadCount = count(), 
    FileList = make_set(FileName, 10),
    LastSeen = max(TimeGenerated)
    by InitiatingProcessAccountName, InitiatingProcessFileName
| where DownloadCount > 2
| order by DownloadCount desc
```

### Use Cases
- Monitoring for unusual file download behavior
- Detecting potential malware downloads
- Identifying users frequently downloading risky file types
- Tracking downloads initiated by unexpected applications

### Variations
- **Focus on browser downloads**:
  ```kql
  DeviceFileEvents
  | where TimeGenerated > ago(7d)
  | where InitiatingProcessFileName in~ ("chrome.exe", "msedge.exe", "firefox.exe", "iexplore.exe")
  | where FileName endswith ".exe" or FileName endswith ".ps1" or FileName endswith ".msi"
  | project TimeGenerated, DeviceName, InitiatingProcessAccountName, FileName, FolderPath
  ```

- **Track downloads to unusual locations**:
  ```kql
  DeviceFileEvents
  | where TimeGenerated > ago(14d)
  | where ActionType == "FileCreated"
  | where FileName endswith ".exe" or FileName endswith ".dll"
  | where FolderPath !contains "Program Files" and 
          FolderPath !contains "WindowsApps" and
          FolderPath !contains "AppData\\Local\\Temp"
  | project TimeGenerated, DeviceName, InitiatingProcessAccountName, FileName, FolderPath, InitiatingProcessFileName
  ```

### Copilot Prompts
- "Find executable files downloaded through browsers in the past week"
- "Identify users downloading unusual numbers of script files"
- "Show me executable downloads that weren't saved to standard program directories"
- "Generate a report of potentially risky file downloads by user"

---

## Identify High-Volume Alerts

### Template Overview
This query helps focus your attention on the most significant alerts by identifying frequently occurring high and medium severity alerts that may indicate persistent threats.

### KQL Template
```kql
SecurityAlert
| where TimeGenerated > ago(7d)
| summarize AlertCount = count(), 
    FirstSeen = min(TimeGenerated),
    LastSeen = max(TimeGenerated),
    Entities = make_set(Entities, 100),
    ResourceIds = make_set(ResourceId, 100)
    by AlertName, AlertSeverity, ProductName
| where AlertCount > 10 and AlertSeverity in ("High", "Medium")
| extend TimeSpan = datetime_diff('hour', LastSeen, FirstSeen)
| project AlertName, AlertSeverity, ProductName, AlertCount, FirstSeen, LastSeen, TimeSpan, Entities, ResourceIds
| order by AlertCount desc
```

### Use Cases
- Prioritizing security incidents based on frequency and severity
- Identifying persistent threats generating multiple alerts
- Focusing investigation on the most significant security issues
- Recognizing patterns in recurring security alerts

### Variations
- **Group alerts by entity**:
  ```kql
  SecurityAlert
  | where TimeGenerated > ago(7d)
  | mv-expand Entity = todynamic(Entities)
  | where Entity.Type == "host" or Entity.Type == "account"
  | summarize AlertCount = count(), AlertNames = make_set(AlertName, 10) by Entity.Type, tostring(Entity.Name), AlertSeverity
  | where AlertCount > 5
  | order by AlertCount desc
  ```

- **Correlate alerts across security products**:
  ```kql
  SecurityAlert
  | where TimeGenerated > ago(7d)
  | where isnotempty(CompromisedEntity)
  | summarize AlertCount = count(), Products = make_set(ProductName), Severities = make_set(AlertSeverity) by CompromisedEntity
  | where array_length(Products) > 1
  | order by AlertCount desc
  ```

### Copilot Prompts
- "Find entities that have triggered multiple high severity alerts in the past week"
- "Identify the most frequent security alerts we're receiving across all products"
- "Show me compromised entities that have alerts from multiple security products"
- "Generate a summary of persistent alert patterns affecting our environment"

---

## Hunt for Known IOCs

### Template Overview
This query enables you to search for known Indicators of Compromise (IOCs) across your environment, helping to identify potential security breaches linked to known threat actors or campaigns.

### KQL Template
```kql
// Create a table of known malicious indicators
let KnownIOCs = datatable(Indicator:string, Type:string, ThreatName:string, Confidence:string)
[
    "192.168.1.100", "ip", "APT29", "High",
    "evil.example.com", "domain", "Cobalt Strike", "Medium",
    "51f0f95abe71b0008b8add932d8f1b83", "hash", "Emotet", "High",
    "backup-service.example.net", "domain", "IcedID", "Medium",
    "195.35.76.12", "ip", "BlackCat Ransomware", "High"
];

// Search for IP matches
let IPMatches = DeviceNetworkEvents
| where TimeGenerated > ago(30d)
| where RemoteIP in~ (KnownIOCs | where Type == "ip" | project Indicator) or 
        RemoteUrl in~ (KnownIOCs | where Type == "domain" | project Indicator)
| extend MatchedIndicator = iff(RemoteIP in~ (KnownIOCs | where Type == "ip" | project Indicator), RemoteIP, RemoteUrl)
| project TimeGenerated, DeviceName, AccountName, MatchedIndicator, RemoteIP, RemoteUrl, ActionType;

// Search for file hash matches
let HashMatches = DeviceFileEvents
| where TimeGenerated > ago(30d)
| where SHA256 in~ (KnownIOCs | where Type == "hash" | project Indicator) or
        SHA1 in~ (KnownIOCs | where Type == "hash" | project Indicator) or
        MD5 in~ (KnownIOCs | where Type == "hash" | project Indicator)
| extend MatchedIndicator = iff(SHA256 in~ (KnownIOCs | where Type == "hash" | project Indicator), SHA256, 
                              iff(SHA1 in~ (KnownIOCs | where Type == "hash" | project Indicator), SHA1, MD5))
| project TimeGenerated, DeviceName, AccountName, MatchedIndicator, FileName, FolderPath;

// Combine results and enrich with threat information
union IPMatches, HashMatches
| join kind=inner (KnownIOCs) on $left.MatchedIndicator == $right.Indicator
| project TimeGenerated, DeviceName, AccountName, Indicator, Type, ThreatName, Confidence
| order by TimeGenerated desc
```

### Use Cases
- Hunting for known malicious IPs, domains, and file hashes
- Checking for signs of specific threat actors or malware
- Validating environment against threat intelligence feeds
- Retrospective hunting after receiving new threat intelligence

### Variations
- **Search with external threat intelligence**:
  ```kql
  // Load IOCs from your threat intelligence
  let ThreatIntelFeed = externaldata(Indicator:string, Type:string)
  [
      @"https://yourorg.sharepoint.com/sites/security/ThreatIntel.csv"
  ]
  with(format="csv", ignoreFirstRecord=true);
  
  DeviceNetworkEvents
  | where TimeGenerated > ago(7d)
  | where RemoteIP in~ (ThreatIntelFeed | where Type == "ip" | project Indicator)
  | project TimeGenerated, DeviceName, RemoteIP, ActionType
  ```

- **Search for MITRE ATT&CK techniques**:
  ```kql
  // Define IOCs associated with specific MITRE techniques
  let T1566_Phishing = datatable(Indicator:string, Type:string)
  [
      "invoice-statement.example.com", "domain",
      "statement-invoice.example.net", "domain"
  ];
  
  DeviceNetworkEvents
  | where TimeGenerated > ago(14d)
  | where RemoteUrl has_any (T1566_Phishing | project Indicator)
  | project TimeGenerated, DeviceName, AccountName, RemoteUrl
  ```

### Copilot Prompts
- "Search for these IOCs in our environment: [list your IOCs]"
- "Check if any devices have connected to known C2 domains in our threat intelligence feed"
- "Find any instances of the MITRE ATT&CK technique T1566 (Phishing) in our environment"
- "Generate a query to hunt for these file hashes across our endpoint data"

---

## Monitor Privilege Escalation

### Template Overview
This query detects potential privilege escalation activities by monitoring for special privilege assignment events and unusual admin account usage.

### KQL Template
```kql
SecurityEvent
| where TimeGenerated > ago(1d)
| where EventID in (4672, 4673, 4732) // Special privilege assignment, sensitive privilege use, user added to admin group
| extend Activity = case(
    EventID == 4672, "Special Logon with Admin Rights",
    EventID == 4673, "Sensitive Privilege Use",
    EventID == 4732, "User Added to Admin Group",
    "Other Activity"
)
| summarize EventCount = count(), 
    FirstSeen = min(TimeGenerated), 
    LastSeen = max(TimeGenerated) 
    by Activity, Account, Computer
| where EventCount > 3
| order by EventCount desc
```

### Use Cases
- Detecting unauthorized privilege elevation
- Monitoring for abuse of administrative accounts
- Identifying unusual administrative activities
- Discovering potential insider threats

### Variations
- **Focus on new admin accounts**:
  ```kql
  SecurityEvent
  | where TimeGenerated > ago(7d)
  | where EventID == 4728 or EventID == 4732 // User added to security-enabled group
  | where TargetUserName contains "admin" or GroupName contains "admin"
  | project TimeGenerated, Account, TargetUserName, GroupName, Computer
  ```

- **Detect user rights assignments**:
  ```kql
  SecurityEvent
  | where TimeGenerated > ago(7d)
  | where EventID == 4704 // User right assigned
  | parse EventData with * '<Data Name="PrivilegeList">' PrivilegeList '</Data>' *
  | where PrivilegeList contains "SeDebugPrivilege" or 
          PrivilegeList contains "SeTcbPrivilege" or 
          PrivilegeList contains "SeBackupPrivilege"
  | project TimeGenerated, Account, TargetAccount, Computer, PrivilegeList
  ```

### Copilot Prompts
- "Detect new accounts added to administrative groups in the past week"
- "Find instances of users being granted debug privileges"
- "Identify unusual patterns of administrative privilege use"
- "Show me accounts that have been newly granted sensitive privileges"

---

## Advanced KQL Techniques

### Working with Time Series Data

Time-based analysis is crucial for security investigations. Here's a template for detecting spikes in activity:

```kql
// Detect unusual spikes in authentication failures
SigninLogs
| where TimeGenerated > ago(7d)
| where ResultType != 0 // Failed logins
| summarize FailureCount = count() by bin(TimeGenerated, 1h), UserPrincipalName
| order by FailureCount desc
| render timechart
```

### Entity Correlation and Graph Queries

Connecting entities across different data sources can reveal complex attack patterns:

```kql
// Find devices accessed by compromised accounts
let CompromisedAccounts = 
    SigninLogs
    | where TimeGenerated > ago(7d)
    | where ResultType == 0 // Successful logins
    | where RiskLevelDuringSignIn in ("high", "medium")
    | distinct UserPrincipalName;
DeviceLogonEvents
| where TimeGenerated > ago(1d)
| where AccountName in~ (CompromisedAccounts)
| summarize LogonCount = count(), FirstSeen = min(TimeGenerated), LastSeen = max(TimeGenerated) by DeviceName, AccountName
| order by LogonCount desc
```

### Using Machine Learning Functions

Leverage KQL's machine learning capabilities for anomaly detection:

```kql
// Detect anomalies in network traffic volume
DeviceNetworkEvents
| where TimeGenerated > ago(14d)
| summarize OutboundCount = count() by bin(TimeGenerated, 1h), DeviceName
| order by TimeGenerated asc
| summarize avg_count = avg(OutboundCount), stdev = stdev(OutboundCount), max_count = max(OutboundCount) by DeviceName
| join kind=inner (
    DeviceNetworkEvents
    | where TimeGenerated > ago(1d)
    | summarize RecentCount = count() by bin(TimeGenerated, 1h), DeviceName
) on DeviceName
| where RecentCount > avg_count + 3*stdev // Traffic more than 3 standard deviations above average
| project TimeGenerated, DeviceName, RecentCount, avg_count, stdev, Anomaly_Score = (RecentCount - avg_count) / stdev
| order by Anomaly_Score desc
```

---

## Using KQL Templates with Copilot

### From KQL to Natural Language Prompts

Microsoft Copilot for Security allows you to translate these KQL templates into natural language prompts. Here's how to effectively adapt the templates:

1. **Identify the core security question** you're trying to answer with the query
2. **Translate technical parameters** into plain language
3. **Include specific details** about time frames, thresholds, or entities of interest
4. **Request specific formats** for the results if needed

#### Example Transformations

| KQL Template Purpose | Effective Copilot Prompt |
|----------------------|--------------------------|
| Unusual Sign-Ins | "Show me users who have logged in from multiple countries or unusual locations in the past week" |
| Suspicious Process Execution | "Find PowerShell commands with encoded payloads or suspicious parameters like 'bypass' across our endpoints" |
| Known IOC Hunting | "Check if any of our systems have connected to these IPs in the last month: 192.168.1.100, 195.35.76.12" |

### Iterative Refinement

Copilot for Security excels at iterative query refinement. After receiving initial results:

1. Ask Copilot to narrow or expand the scope: "Focus only on executive user accounts"
2. Request additional context: "Add information about the devices these users normally log in from"
3. Connect to other data sources: "Check if any of these users also accessed sensitive files"

### Advanced Analysis with Copilot

Beyond simple query generation, use Copilot for:

1. **Incident analysis**: "Analyze this security incident and suggest KQL queries to investigate it further"
2. **Threat hunting**: "Help me create a hunting campaign for signs of the BlackCat ransomware"
3. **Alert triage**: "What KQL queries should I run to validate whether this alert is a false positive?"

---

## Troubleshooting and Optimization

### Common KQL Issues and Solutions

| Issue | Solution |
|-------|----------|
| Query returns too many results | Add more specific filters or increase threshold values |
| Query performance is slow | Reduce time range, add filters earlier in the query, use summarize efficiently |
| No results returned | Check table names, verify column names, ensure data exists in the specified time range |
| Error about column not found | Verify table schema, check for typos in column names |

### Optimizing KQL for Performance

1. **Filter early**: Apply where clauses as early as possible in the query
2. **Use appropriate time ranges**: Limit queries to necessary timeframes
3. **Optimize summarize operations**: Only include needed columns
4. **Use efficient string operations**: Replace contains* with has* where possible
5. **Test with sample data**: Use the take operator to test logic on a small subset

### Advanced Copilot Techniques

1. **Specify query optimization needs**: "Generate an optimized KQL query for large environments"
2. **Request explanations**: "Explain how this KQL query works and where I might need to adjust it"
3. **Get alternatives**: "Can you suggest 2-3 different approaches to detect this threat?"
4. **Learning KQL**: "Show me how to improve this query and explain the KQL techniques you're using"

Remember that Copilot for Security combines the power of KQL with natural language understanding, allowing you to express security questions in plain language while leveraging the precision of KQL syntax behind the scenes.