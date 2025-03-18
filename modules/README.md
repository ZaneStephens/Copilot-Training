# Content Modules

This directory contains HTML modules that are loaded dynamically into the main page. Each module represents a major section of content in the learning guide.

## Module Structure

Each module should follow this general structure:

```html
<h2>Section Title</h2>
<div class="section-intro">
    <p>Brief introduction to the topic covered in this module.</p>
</div>

<!-- Topic Cards -->
<div class="topic-card">
    <h3>Topic Title</h3>
    <div class="topic-content">
        <p>Topic content here...</p>
        <!-- Examples, code blocks, tables as needed -->
    </div>
</div>

<!-- Additional topic cards as needed -->

<!-- Practice Section -->
<div class="practice-section">
    <h3>Practice Exercises</h3>
    <!-- Exercise content -->
</div>
```

## Core Modules

1. **home.html**: Landing page with feature highlights
2. **learning-path.html**: Structured learning progression
3. **basics.html**: Foundational concepts
4. **[topic-specific modules]**: Replace with your specific topic modules
5. **advanced.html**: Advanced features and techniques

## Adding New Modules

1. Create a new HTML file in this directory
2. Follow the established structure pattern
3. Add the module to navigation in index.html
4. Add appropriate module references in the learning path
5. Update the moduleDisplayNames object in script.js