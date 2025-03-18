# CSS Structure

This directory contains the modular CSS files for styling the learning guide. The main entry point is `main.css`, which imports all other CSS modules.

## File Organization

- **main.css**: Imports all other CSS files in the proper cascade order
- **variables.css**: Contains CSS custom properties for theming
- **reset.css**: Normalizes browser styles and provides base styling
- **layout.css**: Page structure and layout components
- **header.css**: Styles for site header and navigation
- **footer.css**: Styles for site footer
- **buttons.css**: Styles for buttons and controls
- **cards.css**: Card component styling
- **topics.css**: Styling for topic content sections
- **typography.css**: Text styling and typography rules
- **forms.css**: Form element styling
- **tables.css**: Table styling for data presentation
- **responsive.css**: Media queries for responsive layout

## Customization

1. Start by modifying **variables.css** to change colors, typography, and spacing
2. For structural changes, focus on **layout.css**
3. For component styling, modify the specific component CSS files

## CSS Best Practices

- Use the established CSS variables for consistency
- Follow the existing naming conventions (kebab-case)
- Add responsive styles to responsive.css
- Use comments to document complex selectors
- Keep specificity as low as possible for maintainability