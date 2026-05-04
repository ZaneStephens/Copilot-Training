# Learning Guide Template

This template provides the foundational structure for creating comprehensive learning guides similar to the Excel Mastery project. Use this template as a starting point for creating guides on different topics.

## How to Use This Template

1. **Copy the Template**: Copy this Files_Template directory to a new location with your project name
2. **Customize the Content**: 
   - Modify README.md with your project details
   - Update STRUCTURE.md if your structure differs
   - Add content to the modules directory following the established patterns
   - Customize CSS variables in css/variables.css
3. **Update Navigation**: Modify index.html navigation links to reflect your content

## Required Packages

For local development and testing:

1. **Simple Web Server**: Install using npm (requires Node.js)
   ```bash
   npm install -g http-server
   ```
   Run the server from the project root:
   ```bash 
   http-server
   ```

2. **Required Libraries**:
   - Marked.js (already included via CDN in index.html)
   - Font Awesome (already included via CDN in index.html)

3. **For Production Deployment**:
   - Any static web server (Apache, Nginx, etc.)
   - No server-side scripting required

## Key Features to Implement

- **Modular Content**: Each topic in its own module HTML file
- **Learning Path**: Structure a logical learning progression
- **Interactive Elements**: Include practice exercises and challenges
- **Information Repository**: Organize content for easy reference and lookup
- **Progress Tracking**: Implement browser-based learning progress tracking

## Customization Tips

- Replace all instances of the current topic (Excel) with your guide topic
- Adjust the color scheme in variables.css to match your topic's identity
- Modify icons to be relevant to your content domain
- Restructure the learning path to fit your topic's learning curve

## Template Structure

See [STRUCTURE.md](STRUCTURE.md) for details on the file organization and purpose of each component.