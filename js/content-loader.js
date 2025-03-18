// Content loading functionality
const contentContainer = document.getElementById('content-container');
const homeContent = document.getElementById('home-content');

// Map of content IDs to their corresponding Markdown file paths
const contentMap = {
    // Main guides
    'admin': 'Documents/Admins.md',
    'enterprise': 'Documents/Enterprise.md',
    'setup': 'Documents/Set-up Considerations.md',
    'security': 'Documents/Security.md',
    'studio': 'Documents/Studio.md',
    'sales': 'Documents/Sales & Service.md',
    
    // Apps
    'chat': 'Documents/Chat.md',
    'teams': 'Documents/Teams.md',
    'word': 'Documents/Word.md',
    'excel': 'Documents/Excel.md',
    'powerpoint': 'Documents/PowerPoint.md',
    'outlook': 'Documents/Outlook.md',
    'loop': 'Documents/Loop.md',
    
    // Section landing pages
    'guides': 'custom-guides',
    'apps': 'custom-apps',
    
    // Prompt examples section will load a custom page with links to all examples
    'prompt-examples': 'custom-prompt-examples'
};

// Map of prompt examples
const promptExamplesMap = {
    'chat-prompts': 'Documents/Prompt examples/Chat.md',
    'excel-prompts': 'Documents/Prompt examples/Excel.md',
    'loop-prompts': 'Documents/Prompt examples/Loop.md',
    'outlook-prompts': 'Documents/Prompt examples/Outlook.md',
    'powerpoint-prompts': 'Documents/Prompt examples/PowerPoint.md',
    'security-prompts': 'Documents/Prompt examples/Security.md',
    'security-kql-prompts': 'Documents/Prompt examples/Security KQL.md',
    'teams-prompts': 'Documents/Prompt examples/Teams.md',
    'word-prompts': 'Documents/Prompt examples/Word.md'
};

// Function to load content based on the target ID
async function loadContent(targetId) {
    // Check if targetId contains a hash/anchor
    let mainContentId = targetId;
    let anchorId = null;
    if (targetId && targetId.includes('#')) {
        const parts = targetId.split('#');
        mainContentId = parts[0]; // The page ID
        anchorId = parts[1];      // The anchor ID
    }
    
    // If no target specified or target is 'home', show home content
    if (!mainContentId || mainContentId === 'home') {
        hideAllContent();
        homeContent.classList.add('active');
        return;
    }
    
    // Check if content with this ID already exists
    let contentElement = document.getElementById(`${mainContentId}-content`);
    
    // If not, we need to create and load it
    if (!contentElement) {
        contentElement = document.createElement('div');
        contentElement.id = `${mainContentId}-content`;
        contentElement.className = 'module-content';
        contentContainer.appendChild(contentElement);
        
        try {
            // Handle special case for section landing pages
            if (mainContentId === 'prompt-examples') {
                await loadPromptExamplesPage(contentElement);
            } else if (mainContentId === 'guides') {
                await loadGuidesPage(contentElement);
            } else if (mainContentId === 'apps') {
                await loadAppsPage(contentElement);
            } else {
                // Load content from Markdown file
                const contentPath = contentMap[mainContentId];
                if (!contentPath) {
                    throw new Error(`No content found for "${mainContentId}"`);
                }
                
                const response = await fetch(contentPath);
                if (!response.ok) {
                    throw new Error(`Failed to load content for "${mainContentId}"`);
                }
                
                const markdown = await response.text();
                
                // Generate table of contents if document is long enough
                let processedMarkdown = markdown;
                if (markdown.split('\n').length > 20) {
                    processedMarkdown = generateTableOfContents(markdown);
                }
                
                // Convert Markdown to HTML using marked library
                contentElement.innerHTML = marked.parse(processedMarkdown);
                
                // Apply any post-processing on the content
                applyContentEnhancements(contentElement);
            }
        } catch (error) {
            contentElement.innerHTML = `
                <div class="error-message">
                    <h2>Error Loading Content</h2>
                    <p>${error.message}</p>
                    <p>Please try again or contact the administrator.</p>
                </div>
            `;
            console.error('Error loading content:', error);
        }
    }
    
    // Hide all content and show the requested one
    hideAllContent();
    contentElement.classList.add('active');
    
    // If there's an anchor, scroll to it
    if (anchorId) {
        setTimeout(() => {
            const anchorElement = document.getElementById(anchorId);
            if (anchorElement) {
                anchorElement.scrollIntoView({ behavior: 'smooth' });
            }
        }, 300);
    } else {
        // Scroll to top if no anchor
        window.scrollTo(0, 0);
    }
}

// Function to generate a table of contents from markdown content
function generateTableOfContents(markdown) {
    // Check if document already has a table of contents section
    if (markdown.includes('## Table of Contents') || markdown.includes('## Contents')) {
        return markdown; // Keep existing table of contents
    }
    
    const lines = markdown.split('\n');
    const headings = [];
    const tocLines = ['## Table of Contents'];
    
    // Find only H2 headings for a cleaner, more focused TOC
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.startsWith('## ') && !line.startsWith('## Table of Contents') && !line.startsWith('## Contents')) {
            const text = line.replace(/^#+\s+/, '');
            const anchor = text.toLowerCase().replace(/[^\w]+/g, '-');
            
            headings.push({
                level: 2,
                text,
                anchor,
                lineIndex: i
            });
            
            // Generate TOC entry
            tocLines.push(`- [${text}](#${anchor})`);
        }
    }
    
    if (headings.length <= 1) {
        return markdown; // Not enough headings for a TOC
    }
    
    // Find the position to insert the TOC (after the first heading or paragraph)
    let insertPosition = 0;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('# ')) {
            // Find the first empty line after the title
            for (let j = i + 1; j < lines.length; j++) {
                if (lines[j].trim() === '') {
                    insertPosition = j + 1;
                    break;
                }
            }
            break;
        }
    }
    
    // Insert the TOC
    lines.splice(insertPosition, 0, '', ...tocLines, '');
    
    // Update the line indices of existing headings
    const tocLineCount = tocLines.length + 2; // +2 for the empty lines before and after
    headings.forEach(heading => {
        if (heading.lineIndex >= insertPosition) {
            heading.lineIndex += tocLineCount;
        }
    });
    
    return lines.join('\n');
}

// Function to load the prompt examples page
async function loadPromptExamplesPage(contentElement) {
    // Create a container for the prompt examples page
    const html = `
        <section class="hero">
            <h2>Microsoft Copilot Prompt Examples</h2>
            <p>Curated prompt templates to help you get the most from Microsoft Copilot across applications</p>
        </section>
        
        <section class="prompt-examples-container">
            <div class="card-grid">
                ${Object.entries(promptExamplesMap).map(([id, path]) => {
                    const name = id.replace('-prompts', '').split('-').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ');
                    
                    const icon = getIconForPrompt(id);
                    
                    return `
                        <div class="card prompt-card" data-prompt="${id}">
                            <div class="card-icon"><i class="${icon}"></i></div>
                            <h4>${name} Prompts</h4>
                            <p>Effective prompts for ${name} scenarios</p>
                        </div>
                    `;
                }).join('')}
            </div>
        </section>
        
        <div id="prompt-content-container"></div>
    `;
    
    contentElement.innerHTML = html;
    
    // Add click event listeners to the prompt cards
    const promptCards = contentElement.querySelectorAll('.prompt-card');
    promptCards.forEach(card => {
        card.addEventListener('click', async function() {
            const promptId = this.getAttribute('data-prompt');
            const promptPath = promptExamplesMap[promptId];
            const promptContainer = document.getElementById('prompt-content-container');
            
            try {
                const response = await fetch(promptPath);
                if (!response.ok) {
                    throw new Error(`Failed to load prompt examples for "${promptId}"`);
                }
                
                const markdown = await response.text();
                
                // Generate TOC for prompt examples if needed
                let processedMarkdown = markdown;
                if (markdown.split('\n').length > 20) {
                    processedMarkdown = generateTableOfContents(markdown);
                }
                
                // Convert Markdown to HTML and insert into container
                promptContainer.innerHTML = marked.parse(processedMarkdown);
                
                // Apply formatting and enhancements
                applyContentEnhancements(promptContainer);
                
                // Scroll to the content
                promptContainer.scrollIntoView({ behavior: 'smooth' });
            } catch (error) {
                promptContainer.innerHTML = `
                    <div class="error-message">
                        <h3>Error Loading Prompt Examples</h3>
                        <p>${error.message}</p>
                    </div>
                `;
                console.error('Error loading prompt examples:', error);
            }
        });
    });
}

// Function to load the guides landing page
async function loadGuidesPage(contentElement) {
    // Create a container for the guides page
    const html = `
        <section class="hero">
            <h2>Microsoft Copilot Guides</h2>
            <p>Comprehensive guides to help you implement and use Microsoft Copilot effectively</p>
        </section>
        
        <section class="guides-container">
            <div class="card-grid">
                <div class="card" data-target="admin">
                    <div class="card-icon"><i class="fas fa-user-shield"></i></div>
                    <h4>Copilot for Administrators</h4>
                    <p>Learn how to manage, secure, and optimize Copilot across your organization</p>
                </div>
                <div class="card" data-target="enterprise">
                    <div class="card-icon"><i class="fas fa-building"></i></div>
                    <h4>Enterprise Deployment</h4>
                    <p>Best practices for deploying Copilot in enterprise environments</p>
                </div>
                <div class="card" data-target="setup">
                    <div class="card-icon"><i class="fas fa-cogs"></i></div>
                    <h4>Setup Considerations</h4>
                    <p>Important factors to consider when setting up Copilot</p>
                </div>
                <div class="card" data-target="security">
                    <div class="card-icon"><i class="fas fa-shield-alt"></i></div>
                    <h4>Security</h4>
                    <p>Security considerations and best practices for Copilot</p>
                </div>
                <div class="card" data-target="studio">
                    <div class="card-icon"><i class="fas fa-code"></i></div>
                    <h4>Copilot Studio</h4>
                    <p>Create custom Copilot experiences for your organization</p>
                </div>
                <div class="card" data-target="sales">
                    <div class="card-icon"><i class="fas fa-chart-line"></i></div>
                    <h4>Sales & Service</h4>
                    <p>Enhance sales and service workflows with Copilot</p>
                </div>
            </div>
        </section>
    `;
    
    contentElement.innerHTML = html;
    
    // Add click event listeners to the guide cards
    const guideCards = contentElement.querySelectorAll('.card[data-target]');
    guideCards.forEach(card => {
        card.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            loadContent(targetId);
            
            // Update URL without page reload
            window.history.pushState({}, '', `#${targetId}`);
            
            // Update active nav link
            const navLinks = document.querySelectorAll('.main-nav a, .dropdown-content a');
            navLinks.forEach(l => l.classList.remove('active'));
            const matchingLink = document.querySelector(`.main-nav a[href="#${targetId}"]`) || 
                               document.querySelector(`.dropdown-content a[href="#${targetId}"]`);
            if (matchingLink) matchingLink.classList.add('active');
        });
    });
}

// Function to load the apps landing page
async function loadAppsPage(contentElement) {
    // Create a container for the apps page
    const html = `
        <section class="hero">
            <h2>Microsoft Copilot App Integrations</h2>
            <p>Learn how to leverage Copilot capabilities across Microsoft 365 applications</p>
        </section>
        
        <section class="apps-container">
            <div class="card-grid">
                <div class="card" data-target="chat">
                    <div class="card-icon"><i class="fas fa-comments"></i></div>
                    <h4>Chat</h4>
                    <p>Access AI assistance through Microsoft Copilot Chat</p>
                </div>
                <div class="card" data-target="teams">
                    <div class="card-icon"><i class="fas fa-users"></i></div>
                    <h4>Teams</h4>
                    <p>Improve collaboration with meeting assistance and summaries</p>
                </div>
                <div class="card" data-target="word">
                    <div class="card-icon"><i class="fas fa-file-word"></i></div>
                    <h4>Word</h4>
                    <p>Transform document creation with AI assistance</p>
                </div>
                <div class="card" data-target="excel">
                    <div class="card-icon"><i class="fas fa-file-excel"></i></div>
                    <h4>Excel</h4>
                    <p>Analyze data and create formulas with natural language</p>
                </div>
                <div class="card" data-target="powerpoint">
                    <div class="card-icon"><i class="fas fa-file-powerpoint"></i></div>
                    <h4>PowerPoint</h4>
                    <p>Design compelling presentations with AI assistance</p>
                </div>
                <div class="card" data-target="outlook">
                    <div class="card-icon"><i class="fas fa-envelope"></i></div>
                    <h4>Outlook</h4>
                    <p>Enhance email communication with smart assistance</p>
                </div>
                <div class="card" data-target="loop">
                    <div class="card-icon"><i class="fas fa-sync"></i></div>
                    <h4>Loop</h4>
                    <p>Transform collaborative workspaces with AI capabilities</p>
                </div>
            </div>
        </section>
    `;
    
    contentElement.innerHTML = html;
    
    // Add click event listeners to the app cards
    const appCards = contentElement.querySelectorAll('.card[data-target]');
    appCards.forEach(card => {
        card.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            loadContent(targetId);
            
            // Update URL without page reload
            window.history.pushState({}, '', `#${targetId}`);
            
            // Update active nav link
            const navLinks = document.querySelectorAll('.main-nav a, .dropdown-content a');
            navLinks.forEach(l => l.classList.remove('active'));
            const matchingLink = document.querySelector(`.main-nav a[href="#${targetId}"]`) || 
                               document.querySelector(`.dropdown-content a[href="#${targetId}"]`);
            if (matchingLink) matchingLink.classList.add('active');
        });
    });
}

// Helper function to get the appropriate icon for each prompt type
function getIconForPrompt(promptId) {
    const iconMap = {
        'chat-prompts': 'fas fa-comments',
        'excel-prompts': 'fas fa-file-excel',
        'loop-prompts': 'fas fa-sync',
        'outlook-prompts': 'fas fa-envelope',
        'powerpoint-prompts': 'fas fa-file-powerpoint',
        'security-prompts': 'fas fa-shield-alt',
        'security-kql-prompts': 'fas fa-terminal',
        'teams-prompts': 'fas fa-users',
        'word-prompts': 'fas fa-file-word'
    };
    
    return iconMap[promptId] || 'fas fa-file-alt';
}

// Hide all content sections
function hideAllContent() {
    const allContent = document.querySelectorAll('.module-content');
    allContent.forEach(element => {
        element.classList.remove('active');
    });
}

// Apply enhancements to the content after loading
function applyContentEnhancements(contentElement) {
    // Add CSS classes to elements for better styling
    const headings = contentElement.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(heading => {
        heading.classList.add('content-heading');
        
        // Create a sanitized ID for the heading if it doesn't have one
        if (!heading.id) {
            const text = heading.textContent;
            const id = text.toLowerCase().replace(/[^\w]+/g, '-');
            heading.id = id;
        }
        
        // Add anchor links to headings
        const anchor = document.createElement('a');
        anchor.href = `#${heading.id}`;
        anchor.classList.add('heading-anchor');
        anchor.innerHTML = '<i class="fas fa-link"></i>';
        heading.appendChild(anchor);
    });
    
    // Handle table of contents section
    const tocSection = contentElement.querySelector('h2#table-of-contents, h2#contents');
    if (tocSection) {
        // Create collapsible TOC container
        const tocContainer = document.createElement('div');
        tocContainer.className = 'table-of-contents collapsible';
        
        // Create TOC header with toggle button
        const tocHeader = document.createElement('div');
        tocHeader.className = 'toc-header';
        tocHeader.innerHTML = `
            <h3>Table of Contents</h3>
            <button class="toc-toggle" aria-label="Toggle table of contents">
                <i class="fas fa-chevron-down"></i>
            </button>
        `;
        tocContainer.appendChild(tocHeader);
        
        // Create content container that will be collapsed/expanded
        const tocContent = document.createElement('div');
        tocContent.className = 'toc-content collapsed';
        tocContainer.appendChild(tocContent);
        
        // Get all elements between TOC heading and next heading
        let tocElements = [];
        let nextEl = tocSection.nextElementSibling;
        
        while (nextEl && !nextEl.matches('h1, h2, h3, h4, h5, h6')) {
            if (nextEl.tagName === 'UL') {
                tocContent.appendChild(nextEl.cloneNode(true));
                tocElements.push(nextEl);
            }
            nextEl = nextEl.nextElementSibling;
        }
        
        // If we found a TOC list, enhance it
        if (tocContent.children.length > 0) {
            // Insert the styled TOC after the heading
            tocSection.parentNode.insertBefore(tocContainer, tocSection.nextSibling);
            
            // Fix links in the styled TOC
            enhanceTOCLinks(tocContainer, contentElement);
            
            // Hide the original TOC heading and list elements
            tocSection.style.display = 'none';
            tocElements.forEach(el => {
                el.style.display = 'none';
            });
            
            // Add click event to toggle button
            const toggleBtn = tocContainer.querySelector('.toc-toggle');
            toggleBtn.addEventListener('click', function() {
                tocContent.classList.toggle('collapsed');
                const icon = this.querySelector('i');
                if (tocContent.classList.contains('collapsed')) {
                    icon.className = 'fas fa-chevron-down';
                } else {
                    icon.className = 'fas fa-chevron-up';
                }
            });
        }
    }
    
    // Style tables
    const tables = contentElement.querySelectorAll('table');
    tables.forEach(table => {
        table.classList.add('content-table');
        const wrapper = document.createElement('div');
        wrapper.classList.add('table-wrapper');
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
    });
    
    // Add syntax highlighting to code blocks
    const codeBlocks = contentElement.querySelectorAll('pre code');
    codeBlocks.forEach(block => {
        block.classList.add('code-block');
        // If you want to add syntax highlighting library later
        // hljs.highlightElement(block);
    });
    
    // Style blockquotes
    const blockquotes = contentElement.querySelectorAll('blockquote');
    blockquotes.forEach(quote => {
        quote.classList.add('content-blockquote');
    });
    
    // Make links open in new tab if they're external
    const links = contentElement.querySelectorAll('a');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('http')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
}

// Enhanced function to properly handle TOC links
function enhanceTOCLinks(tocContainer, contentElement) {
    const links = tocContainer.querySelectorAll('a');
    
    links.forEach(link => {
        const href = link.getAttribute('href');
        
        if (href && href.startsWith('#')) {
            const targetId = href.substring(1);
            
            // Try to find the actual heading by ID
            let targetHeading = contentElement.querySelector(`#${targetId}`);
            
            // If not found by ID, try to find by text content
            if (!targetHeading) {
                // Try to derive the heading text from the link text
                const linkText = link.textContent.trim();
                
                // Find all headings and try to match by text
                const allHeadings = contentElement.querySelectorAll('h1, h2, h3, h4, h5, h6');
                allHeadings.forEach(heading => {
                    if (heading.textContent.trim() === linkText) {
                        targetHeading = heading;
                    }
                });
            }
            
            // Fix the link if we found the heading
            if (targetHeading) {
                // Update the link to point to the correct ID
                link.setAttribute('href', `#${targetHeading.id}`);
                
                // Add click event listener
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Scroll to the target
                    targetHeading.scrollIntoView({ behavior: 'smooth' });
                    
                    // Update URL hash without causing a page jump
                    history.pushState(null, null, `#${targetHeading.id}`);
                });
            }
        }
    });
}

// Add a document-wide event listener for handling TOC links
document.addEventListener('click', function(e) {
    // Find if the clicked element or its parent is a link
    const link = e.target.closest('a');
    
    if (link) {
        const href = link.getAttribute('href');
        
        // Check if it's an anchor link (starts with #) and is within a TOC container
        if (href && href.startsWith('#') && 
            (link.closest('.table-of-contents') || link.classList.contains('heading-anchor'))) {
            
            e.preventDefault();
            
            // Get the target ID from the href attribute
            const targetId = href.substring(1);
            
            // Find the target heading
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Scroll to the target element
                targetElement.scrollIntoView({ behavior: 'smooth' });
                
                // Update URL without causing page jump
                history.pushState(null, null, href);
            }
        }
    }
});