// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search');
    const searchButton = document.getElementById('search-btn');
    
    if (searchInput && searchButton) {
        // Search on button click
        searchButton.addEventListener('click', function() {
            performSearch();
        });
        
        // Search on Enter key
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
});

// Perform the search across all content
async function performSearch() {
    const searchInput = document.getElementById('search');
    const query = searchInput.value.trim().toLowerCase();
    
    if (!query) return;
    
    // Create a search results container if it doesn't exist
    let resultsElement = document.getElementById('search-results-content');
    if (!resultsElement) {
        resultsElement = document.createElement('div');
        resultsElement.id = 'search-results-content';
        resultsElement.className = 'module-content';
        document.getElementById('content-container').appendChild(resultsElement);
    }
    
    // Show loading state
    resultsElement.innerHTML = `
        <section class="hero">
            <h2>Searching for "${query}"</h2>
            <p>Please wait while we search the documentation...</p>
        </section>
        <div class="loading">
            <div class="spinner"></div>
        </div>
    `;
    
    // Hide all content and show search results
    hideAllContent();
    resultsElement.classList.add('active');
    
    try {
        // Collect all content paths to search
        const allContentPaths = [
            ...Object.values(contentMap).filter(path => path !== 'custom-prompt-examples'),
            ...Object.values(promptExamplesMap)
        ];
        
        // Perform search across all content
        const results = await searchAcrossContent(query, allContentPaths);
        
        // Display results
        displaySearchResults(results, query, resultsElement);
    } catch (error) {
        resultsElement.innerHTML = `
            <div class="error-message">
                <h2>Search Error</h2>
                <p>${error.message}</p>
                <p>Please try again with a different search term.</p>
            </div>
        `;
        console.error('Search error:', error);
    }
}

// Search across all content files
async function searchAcrossContent(query, contentPaths) {
    const results = [];
    
    // Process each content file
    for (const path of contentPaths) {
        try {
            const response = await fetch(path);
            if (!response.ok) continue;
            
            const content = await response.text();
            
            // Find matches
            const matches = findMatches(content, query);
            
            if (matches.length > 0) {
                // Get the title from the first H1 tag or use the filename
                let title = path.split('/').pop().replace('.md', '');
                const titleMatch = content.match(/^# (.+)$/m);
                if (titleMatch) {
                    title = titleMatch[1];
                }
                
                // Determine the content type (guide or prompt example)
                let contentType = 'guide';
                let contentId = '';
                
                // Match to an ID in the content maps
                for (const [id, contentPath] of Object.entries(contentMap)) {
                    if (contentPath === path) {
                        contentId = id;
                        break;
                    }
                }
                
                if (!contentId) {
                    // Check prompt examples map
                    for (const [id, promptPath] of Object.entries(promptExamplesMap)) {
                        if (promptPath === path) {
                            contentId = id;
                            contentType = 'prompt';
                            break;
                        }
                    }
                }
                
                results.push({
                    title,
                    path,
                    matches,
                    contentType,
                    contentId
                });
            }
        } catch (error) {
            console.error(`Error searching ${path}:`, error);
        }
    }
    
    return results;
}

// Find matches of the query in content
function findMatches(content, query) {
    const matches = [];
    const lines = content.split('\n');
    
    // Look for query in content
    lines.forEach((line, index) => {
        const lowerLine = line.toLowerCase();
        if (lowerLine.includes(query)) {
            // Get context (lines around the match)
            const start = Math.max(0, index - 1);
            const end = Math.min(lines.length - 1, index + 1);
            
            // Extract the context
            const context = lines.slice(start, end + 1).join('\n');
            
            // Highlight the match
            const highlightedContext = context.replace(
                new RegExp(query, 'gi'),
                match => `<mark class="search-highlight">${match}</mark>`
            );
            
            matches.push({
                line: index + 1,
                context: highlightedContext
            });
        }
    });
    
    return matches;
}

// Display search results
function displaySearchResults(results, query, resultsElement) {
    if (results.length === 0) {
        resultsElement.innerHTML = `
            <section class="hero">
                <h2>Search Results</h2>
                <p>No results found for "${query}"</p>
            </section>
            <div class="search-no-results">
                <p>Try a different search term or browse the documentation using the navigation menu.</p>
            </div>
        `;
        return;
    }
    
    // Group results by content type
    const guideResults = results.filter(r => r.contentType === 'guide');
    const promptResults = results.filter(r => r.contentType === 'prompt');
    
    let resultsHTML = `
        <section class="hero">
            <h2>Search Results</h2>
            <p>Found ${results.length} results for "${query}"</p>
        </section>
    `;
    
    // Add guide results if any
    if (guideResults.length > 0) {
        resultsHTML += `
            <section class="search-results-section">
                <h3>Guide Results</h3>
                <div class="search-results-list">
                    ${guideResults.map(result => createResultCard(result, query)).join('')}
                </div>
            </section>
        `;
    }
    
    // Add prompt example results if any
    if (promptResults.length > 0) {
        resultsHTML += `
            <section class="search-results-section">
                <h3>Prompt Examples</h3>
                <div class="search-results-list">
                    ${promptResults.map(result => createResultCard(result, query)).join('')}
                </div>
            </section>
        `;
    }
    
    resultsElement.innerHTML = resultsHTML;
    
    // Add click handlers for the result cards
    const resultLinks = resultsElement.querySelectorAll('.search-result-card');
    resultLinks.forEach(link => {
        link.addEventListener('click', function() {
            const targetType = this.getAttribute('data-type');
            const targetId = this.getAttribute('data-id');
            
            // Navigate to the appropriate content
            if (targetType === 'guide') {
                // Direct link to guide
                loadContent(targetId);
                
                // Update URL and navigation state
                window.history.pushState({}, '', `#${targetId}`);
                
                // Update active nav link
                const navLinks = document.querySelectorAll('.main-nav a, .dropdown-content a');
                navLinks.forEach(l => l.classList.remove('active'));
                const matchingLink = document.querySelector(`.main-nav a[href="#${targetId}"]`) || 
                                   document.querySelector(`.dropdown-content a[href="#${targetId}"]`);
                if (matchingLink) matchingLink.classList.add('active');
            } else if (targetType === 'prompt') {
                // For prompts, first load prompt examples page
                loadContent('prompt-examples');
                
                // Then trigger click on the specific prompt card
                setTimeout(() => {
                    const promptCard = document.querySelector(`.prompt-card[data-prompt="${targetId}"]`);
                    if (promptCard) promptCard.click();
                }, 500);
                
                // Update URL and navigation state
                window.history.pushState({}, '', `#prompt-examples`);
                
                // Update active nav link
                const navLinks = document.querySelectorAll('.main-nav a, .dropdown-content a');
                navLinks.forEach(l => l.classList.remove('active'));
                const matchingLink = document.querySelector(`.main-nav a[href="#prompt-examples"]`);
                if (matchingLink) matchingLink.classList.add('active');
            }
        });
    });
}

// Create a result card HTML
function createResultCard(result, query) {
    const firstMatch = result.matches[0];
    const matchCount = result.matches.length;
    
    // Get icon based on content type and ID
    let icon = 'fas fa-file-alt';
    if (result.contentType === 'guide') {
        const guideIcons = {
            'admin': 'fas fa-user-shield',
            'enterprise': 'fas fa-building',
            'setup': 'fas fa-cogs',
            'security': 'fas fa-shield-alt',
            'studio': 'fas fa-code',
            'sales': 'fas fa-chart-line',
            'chat': 'fas fa-comments',
            'teams': 'fas fa-users',
            'word': 'fas fa-file-word',
            'excel': 'fas fa-file-excel',
            'powerpoint': 'fas fa-file-powerpoint',
            'outlook': 'fas fa-envelope',
            'loop': 'fas fa-sync'
        };
        icon = guideIcons[result.contentId] || icon;
    } else {
        // Use the same icon map as in the prompt examples
        icon = getIconForPrompt(result.contentId);
    }
    
    return `
        <div class="search-result-card" data-type="${result.contentType}" data-id="${result.contentId}">
            <div class="search-result-icon">
                <i class="${icon}"></i>
            </div>
            <div class="search-result-content">
                <h4>${result.title}</h4>
                <div class="search-result-context">
                    ${firstMatch.context}
                </div>
                <div class="search-result-info">
                    <span class="search-match-count">${matchCount} match${matchCount !== 1 ? 'es' : ''}</span>
                    <span class="search-result-path">${result.path}</span>
                </div>
            </div>
        </div>
    `;
}