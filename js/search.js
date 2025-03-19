// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search');
    const searchButton = document.getElementById('search-btn');
    
    // Initialize search cache
    const searchCache = new Map();
    
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
        
        // Live search suggestions (optional, triggered after 300ms of typing)
        let typingTimer;
        searchInput.addEventListener('input', function() {
            clearTimeout(typingTimer);
            if (searchInput.value.trim()) {
                typingTimer = setTimeout(() => {
                    // Only show suggestions if the input has 3 or more characters
                    if (searchInput.value.trim().length >= 3) {
                        showSearchSuggestions(searchInput.value.trim());
                    }
                }, 300);
            }
        });
    }
    
    // Function to show search suggestions
    function showSearchSuggestions(query) {
        // Implementation can be added later if needed
        // This would show a dropdown with potential matches as the user types
    }
});

// Perform the search across all content
async function performSearch() {
    const searchInput = document.getElementById('search');
    const rawQuery = searchInput.value.trim();
    let query = rawQuery.toLowerCase();
    
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
            <h2>Searching for "${rawQuery}"</h2>
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
        // Check for special operators (like "/" command)
        let specialSearch = false;
        let searchType = '';
        
        if (query.startsWith('/')) {
            specialSearch = true;
            // Remove the slash and get the search type
            query = query.substring(1);
            
            // Determine search type from remaining query
            // This is a simple implementation - could be expanded based on requirements
            if (query.includes('file:') || query.includes('document:')) {
                searchType = 'file';
                query = query.replace(/(file:|document:)/g, '').trim();
            } else if (query.includes('person:')) {
                searchType = 'person';
                query = query.replace(/person:/g, '').trim();
            } else {
                // Default case - general keyword search with forward slash
                specialSearch = false;
                query = rawQuery.toLowerCase();
            }
        }
        
        // Collect all content paths to search
        const allContentPaths = [
            ...Object.values(contentMap).filter(path => path !== 'custom-prompt-examples'),
            ...Object.values(promptExamplesMap)
        ];
        
        // Check cache before performing search
        const cacheKey = `${query}-${specialSearch ? searchType : 'general'}`;
        let results;
        
        if (window.searchCache && window.searchCache.has(cacheKey)) {
            results = window.searchCache.get(cacheKey);
            console.log('Using cached search results');
        } else {
            // Perform search across all content
            results = await searchAcrossContent(query, allContentPaths, specialSearch, searchType);
            
            // Cache the results (maintain a reasonable cache size)
            if (!window.searchCache) window.searchCache = new Map();
            if (window.searchCache.size > 50) {
                // Remove oldest entry if cache gets too large
                const firstKey = window.searchCache.keys().next().value;
                window.searchCache.delete(firstKey);
            }
            window.searchCache.set(cacheKey, results);
        }
        
        // Display results
        displaySearchResults(results, rawQuery, resultsElement);
    } catch (error) {
        resultsElement.innerHTML = `
            <div class="error-message">
                <h2>Search Error</h2>
                <p>${error.message}</p>
                <p>Please try again with a different search term.</p>
                <button id="search-retry" class="btn">Try Again</button>
            </div>
        `;
        
        // Add event listener to the retry button
        const retryButton = document.getElementById('search-retry');
        if (retryButton) {
            retryButton.addEventListener('click', performSearch);
        }
        
        console.error('Search error:', error);
    }
}

// Search across all content files
async function searchAcrossContent(query, contentPaths, isSpecialSearch = false, searchType = '') {
    const results = [];
    const searchTerms = query.split(' ').filter(term => term.length > 1);
    
    // Process each content file
    for (const path of contentPaths) {
        try {
            const response = await fetch(path);
            if (!response.ok) continue;
            
            const content = await response.text();
            
            // Find matches with improved matching algorithm
            const matches = findMatches(content, query, searchTerms);
            
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
                
                // Calculate relevance score
                const relevanceScore = calculateRelevanceScore(matches, title, content, query);
                
                // For special searches, apply additional filtering
                if (isSpecialSearch) {
                    // Apply appropriate filters based on searchType
                    if ((searchType === 'file' && !isRelevantFileType(contentId, path)) ||
                        (searchType === 'person' && !contentContainsPerson(content, query))) {
                        continue; // Skip this result as it doesn't match the special search criteria
                    }
                }
                
                results.push({
                    title,
                    path,
                    matches,
                    contentType,
                    contentId,
                    relevanceScore
                });
            }
        } catch (error) {
            console.error(`Error searching ${path}:`, error);
        }
    }
    
    // Sort results by relevance score (highest first)
    return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
}

// Check if content contains references to a person
function contentContainsPerson(content, personName) {
    // This is a simple implementation - could be improved with more sophisticated matching
    const lowerContent = content.toLowerCase();
    const lowerName = personName.toLowerCase();
    return lowerContent.includes(lowerName);
}

// Check if file is relevant to the file type search
function isRelevantFileType(contentId, path) {
    // Simple implementation - could be expanded
    return true; // By default, include all files
}

// Calculate a relevance score for search results
function calculateRelevanceScore(matches, title, content, query) {
    let score = 0;
    
    // Base score is the number of matches
    score += matches.length;
    
    // Title match is more important
    if (title.toLowerCase().includes(query.toLowerCase())) {
        score += 10;
    }
    
    // H1, H2, H3 matches are more important
    const headerMatches = content.match(new RegExp(`^#{1,3} .*${query}.*$`, 'gim'));
    if (headerMatches) {
        score += headerMatches.length * 5;
    }
    
    // Exact phrase matches are more important than individual word matches
    const exactMatches = content.match(new RegExp(query, 'gi'));
    if (exactMatches) {
        score += exactMatches.length * 3;
    }
    
    return score;
}

// Find matches of the query in content with improved matching
function findMatches(content, query, searchTerms) {
    const matches = [];
    const lines = content.split('\n');
    
    // Look for query in content
    lines.forEach((line, index) => {
        const lowerLine = line.toLowerCase();
        
        // Check for exact query match
        if (lowerLine.includes(query)) {
            addMatch(line, index, matches, lines, searchTerms);
        } 
        // Check for all search terms appearing in the line
        else if (searchTerms.length > 1) {
            const allTermsMatch = searchTerms.every(term => lowerLine.includes(term));
            if (allTermsMatch) {
                addMatch(line, index, matches, lines, searchTerms);
            }
        }
    });
    
    return matches;
}

// Helper function to add a match to the matches array
function addMatch(line, index, matches, lines, searchTerms) {
    // Get context (lines around the match)
    const start = Math.max(0, index - 1);
    const end = Math.min(lines.length - 1, index + 1);
    
    // Extract the context
    const context = lines.slice(start, end + 1).join('\n');
    
    // Highlight all search terms in the context
    let highlightedContext = context;
    
    // First highlight the full query if it exists
    if (searchTerms.length > 1) {
        const fullQuery = searchTerms.join(' ');
        highlightedContext = highlightedContext.replace(
            new RegExp(fullQuery.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'gi'),
            match => `<mark class="search-highlight">${match}</mark>`
        );
    }
    
    // Then highlight individual terms
    searchTerms.forEach(term => {
        if (term.length > 1) {
            highlightedContext = highlightedContext.replace(
                new RegExp(term.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'gi'),
                match => `<mark class="search-highlight">${match}</mark>`
            );
        }
    });
    
    matches.push({
        line: index + 1,
        context: highlightedContext
    });
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
                <div class="search-tips">
                    <h4>Search Tips:</h4>
                    <ul>
                        <li>Use specific keywords instead of general terms</li>
                        <li>Try using "/" to search for specific content types</li>
                        <li>Check for typos in your search terms</li>
                    </ul>
                </div>
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
    
    resultsHTML += `
        <section class="search-footer">
            <p>Not finding what you need? Try <a href="#" id="refine-search">refining your search</a> or <a href="#home">browsing all documentation</a>.</p>
        </section>
    `;
    
    resultsElement.innerHTML = resultsHTML;
    
    // Add click handler for the "refine search" link
    const refineSearchLink = document.getElementById('refine-search');
    if (refineSearchLink) {
        refineSearchLink.addEventListener('click', function(e) {
            e.preventDefault();
            const searchInput = document.getElementById('search');
            searchInput.focus();
            searchInput.select();
        });
    }
    
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
            
            // Log search analytics (could be implemented if needed)
            logSearchClick(targetType, targetId, query);
        });
    });
}

// Optional: Log search analytics
function logSearchClick(contentType, contentId, searchQuery) {
    // This would implement analytics tracking if needed
    console.log(`Search click: ${contentType}/${contentId} from query "${searchQuery}"`);
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
        // Use the getIconForPrompt function
        const iconDetails = getIconForPrompt(result.contentId);
        icon = iconDetails.icon;
    }
    
    // Create relevance indicator based on score (optional feature)
    const relevanceHTML = result.relevanceScore > 10 ? 
        '<span class="relevance-indicator high">High match</span>' : 
        (result.relevanceScore > 5 ? '<span class="relevance-indicator medium">Medium match</span>' : '');
    
    return `
        <div class="search-result-card" data-type="${result.contentType}" data-id="${result.contentId}">
            <div class="search-result-icon">
                <i class="${icon}"></i>
            </div>
            <div class="search-result-content">
                <h4>${result.title} ${relevanceHTML}</h4>
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