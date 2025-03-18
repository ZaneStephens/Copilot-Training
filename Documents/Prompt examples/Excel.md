# Comprehensive List of Example Prompts for Microsoft Copilot in Excel

This document provides a curated list of example prompts for Microsoft Copilot in Excel, designed to leverage its AI capabilities for data analysis, visualization, and management as of March 17, 2025. Excel Copilot can be finicky—working seamlessly for some users but not others due to requirements like table formatting, cloud storage (OneDrive/SharePoint), and version differences (e.g., Current Channel vs. Semi-Annual). Prompts include a clear **goal**, optional **context**, and **expectations**, with notes on limitations and tips for success.

## Table of Contents
- [Data Analysis](#data-analysis)
- [Visualization](#visualization)
- [Formulas and Calculations](#formulas-and-calculations)
- [Data Management](#data-management)
- [Insights and Trends](#insights-and-trends)
- [Business and Professional Use](#business-and-professional-use)
- [Troubleshooting and Workarounds](#troubleshooting-and-workarounds)

---

## Data Analysis

### 1. Analyze Sales Trends
- **Prompt**: "Analyze this sales data and highlight trends over the past 6 months."
- **Use Case**: Identifying patterns in data.
- **Note**: Data must be in a table (Ctrl+T); may fail if not cloud-stored with AutoSave on.

### 2. Compare Columns
- **Prompt**: "Compare the 'Q1 Sales' and 'Q2 Sales' columns and summarize the differences."
- **Use Case**: Quick column comparisons.
- **Note**: Specify column headers exactly; vague prompts may yield generic results.

### 3. Filter High Values
- **Prompt**: "Filter this table to show only rows where 'Revenue' exceeds $10,000."
- **Use Case**: Targeted data filtering.
- **Note**: Works best with numeric columns; may not apply filter directly—check output.

---

## Visualization

### 4. Create a Chart
- **Prompt**: "Create a bar chart from this table showing 'Product' vs 'Sales'."
- **Use Case**: Visualizing data relationships.
- **Note**: Table must be selected; chart type may vary—specify (e.g., “pie chart”) if needed.

### 5. Visualize Growth
- **Prompt**: "Visualize the growth of 'Ad Spend' from last year in a line graph."
- **Use Case**: Tracking changes over time.
- **Note**: Dates must be formatted correctly (e.g., MM/DD/YYYY); may need manual tweaks.

### 6. Add Conditional Formatting
- **Prompt**: "Apply a red-yellow-green color scale to the 'Profit' column."
- **Use Case**: Highlighting data visually.
- **Note**: Works on numeric data; may fail on large tables (>2M cells).

---

## Formulas and Calculations

### 7. Generate Formula
- **Prompt**: "Add a formula column to calculate 'Total Cost' as 'Units' * 'Price'."
- **Use Case**: Automating calculations.
- **Note**: Column names must match table headers; verify formula accuracy.

### 8. Complex Calculation
- **Prompt**: "Create a column to show the percentage change between '2024 Sales' and '2023 Sales'."
- **Use Case**: Advanced analytics.
- **Note**: May suggest incorrect formulas—review and test output.

### 9. Explain Formula
- **Prompt**: "Explain the formula in cell B10 and suggest improvements."
- **Use Case**: Understanding existing formulas.
- **Note**: Select the cell first; explanation quality varies—cross-check.

---

## Data Management

### 10. Sort Data
- **Prompt**: "Sort this table by 'Date' in ascending order."
- **Use Case**: Organizing data.
- **Note**: Date column must be in a recognized format; may not sort in-place—check new sheet.

### 11. Highlight Duplicates
- **Prompt**: "Highlight duplicate values in the 'Customer ID' column."
- **Use Case**: Data cleaning.
- **Note**: Applies conditional formatting; may miss edge cases—verify.

### 12. Extract Data
- **Prompt**: "Extract the city from the 'Address' column into a new column."
- **Use Case**: Splitting text data.
- **Note**: Assumes consistent formatting (e.g., “City, State”); may require manual fixes.

---

## Insights and Trends

### 13. Identify Outliers
- **Prompt**: "Show me the outliers in the 'Expenses' column."
- **Use Case**: Spotting anomalies.
- **Note**: Adds insights to a new sheet; definition of “outlier” may differ—review.

### 14. Summarize Data
- **Prompt**: "Summarize this table into key stats like average, min, and max for 'Revenue'."
- **Use Case**: Quick data overview.
- **Note**: Output may appear in chat pane—request “add to sheet” if needed.

### 15. What-If Scenario
- **Prompt**: "Model how a 10% increase in 'Price' affects 'Total Revenue'."
- **Use Case**: Scenario analysis.
- **Note**: Limited to simple scenarios; complex models may fail—split prompts.

---

## Business and Professional Use

### 16. Sales Report
- **Prompt**: "Create a sales report from this table, ranking 'Salesperson' by 'Total Sales'."
- **Use Case**: Professional reporting.
- **Note**: May generate PivotTable; refine with “add chart” if desired.

### 17. Budget Forecast
- **Prompt**: "Forecast next quarter’s expenses based on this table’s 'Monthly Costs'."
- **Use Case**: Financial planning.
- **Note**: Basic forecasting only; verify with Excel’s native tools.

### 18. Inventory Check
- **Prompt**: "Highlight items in the 'Stock' column below 10 units in red."
- **Use Case**: Inventory management.
- **Note**: Applies conditional formatting; ensure numeric data.

---

## Troubleshooting and Workarounds

### 19. Fix Table Format
- **Prompt**: "Convert this range into a table so I can use Copilot."
- **Use Case**: Enabling Copilot functionality.
- **Note**: Essential step if Copilot button is grayed out; select range first.

### 20. Debug Prompt Failure
- **Prompt**: "Why didn’t ‘Sort by Revenue’ work? Fix it."
- **Use Case**: Addressing errors.
- **Note**: Copilot may suggest reformatting or rephrasing—test iteratively.

### 21. Manual Insight Request
- **Prompt**: "Analyze this data and add all insights to a new sheet."
- **Use Case**: Bypassing random outputs.
- **Note**: Forces structured output; review for relevance.

---

## Tips for Using These Prompts
- **Table Format Required**: Convert data to a table (Ctrl+T) before using Copilot—raw ranges won’t work.
- **Cloud Storage**: Save files to OneDrive/SharePoint with AutoSave on; local files disable Copilot.
- **Be Specific**: Use exact column names and details (e.g., “Sales” not “data”) to avoid vague results.
- **Iterate**: If output fails, rephrase (e.g., “Try again, sort by ‘Date’ descending”).
- **Verify**: Always check formulas, insights, and visuals—Copilot can hallucinate or misinterpret.
- **Limitations**: No workbook comparisons, max 2M cells, English prompts work best (other languages supported but less reliable).
- **Version Check**: Use Current Channel or web Excel; Semi-Annual Channel lacks Copilot.

These prompts are starting points—adjust based on your data and Copilot’s response. Its finicky nature means success varies by user setup, so experiment and refine!