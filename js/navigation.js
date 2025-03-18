// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Navigation link handling - now includes footer links
    const navLinks = document.querySelectorAll('.main-nav a, .dropdown-content a, footer a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section ID
            const targetId = this.getAttribute('href').substring(1);
            
            // Don't process external links in the footer
            if (this.getAttribute('target') === '_blank') {
                return;
            }
            
            // Remove active class from all navigation links (not footer links)
            const mainNavLinks = document.querySelectorAll('.main-nav a, .dropdown-content a');
            mainNavLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to corresponding nav link (if it exists)
            const matchingNavLink = document.querySelector(`.main-nav a[href="#${targetId}"]`) || 
                                   document.querySelector(`.dropdown-content a[href="#${targetId}"]`);
            if (matchingNavLink) {
                matchingNavLink.classList.add('active');
            }
            
            // Load content based on the target ID
            loadContent(targetId);
            
            // Update URL without page reload
            window.history.pushState({}, '', `#${targetId}`);
        });
    });
    
    // Handle card clicks on the home page
    const cards = document.querySelectorAll('.card[data-target]');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            
            // Remove active class from all links
            const mainNavLinks = document.querySelectorAll('.main-nav a, .dropdown-content a');
            mainNavLinks.forEach(l => l.classList.remove('active'));
            
            // Find and activate the corresponding nav link
            const matchingLink = document.querySelector(`.main-nav a[href="#${targetId}"]`) || 
                               document.querySelector(`.dropdown-content a[href="#${targetId}"]`);
            if (matchingLink) matchingLink.classList.add('active');
            
            // Load content
            loadContent(targetId);
            
            // Update URL without page reload
            window.history.pushState({}, '', `#${targetId}`);
        });
    });
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            document.querySelector('nav').classList.toggle('active');
        });
    }
    
    // Handle direct URL access with hash
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        
        // Check if the hash contains another hash (fragment identifier)
        if (targetId.includes('#')) {
            // This is an anchor link within a page
            const parts = targetId.split('#');
            loadContent(parts[0]);
            
            // Scroll to the anchor after content is loaded
            setTimeout(() => {
                const anchorElement = document.getElementById(parts[1]);
                if (anchorElement) {
                    anchorElement.scrollIntoView({ behavior: 'smooth' });
                }
            }, 500);
        } else {
            loadContent(targetId);
        }
        
        // Activate the correct nav link
        const matchingLink = document.querySelector(`.main-nav a[href="#${targetId}"]`) || 
                           document.querySelector(`.dropdown-content a[href="#${targetId}"]`);
        if (matchingLink) {
            const mainNavLinks = document.querySelectorAll('.main-nav a, .dropdown-content a');
            mainNavLinks.forEach(l => l.classList.remove('active'));
            matchingLink.classList.add('active');
        }
    }
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function() {
        if (window.location.hash) {
            const targetId = window.location.hash.substring(1);
            
            // Check if the hash contains another hash (fragment identifier)
            if (targetId.includes('#')) {
                // This is an anchor link within a page
                const parts = targetId.split('#');
                loadContent(parts[0]);
                
                // Scroll to the anchor after content is loaded
                setTimeout(() => {
                    const anchorElement = document.getElementById(parts[1]);
                    if (anchorElement) {
                        anchorElement.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 500);
            } else {
                loadContent(targetId);
            }
            
            // Activate the correct nav link
            const matchingLink = document.querySelector(`.main-nav a[href="#${targetId}"]`) || 
                               document.querySelector(`.dropdown-content a[href="#${targetId}"]`);
            if (matchingLink) {
                const mainNavLinks = document.querySelectorAll('.main-nav a, .dropdown-content a');
                mainNavLinks.forEach(l => l.classList.remove('active'));
                matchingLink.classList.add('active');
            }
        } else {
            // Default to home if no hash
            loadContent('home');
            
            // Activate home link
            const mainNavLinks = document.querySelectorAll('.main-nav a, .dropdown-content a');
            mainNavLinks.forEach(l => l.classList.remove('active'));
            document.querySelector('.main-nav a[href="#home"]').classList.add('active');
        }
    });
    
    // Add a global handler for all in-page anchor links (table of contents, etc.)
    document.addEventListener('click', function(e) {
        // Check if the clicked element is an anchor link
        const element = e.target.closest('a');
        if (element && element.getAttribute('href') && element.getAttribute('href').startsWith('#') && 
            !element.classList.contains('heading-anchor') && // Exclude heading anchor links
            !element.closest('.main-nav') && !element.closest('.dropdown-content')) { // Exclude main navigation
            
            e.preventDefault();
            const href = element.getAttribute('href');
            
            // If it's a simple anchor link
            if (href.indexOf('#', 1) === -1) {
                // This is a main navigation link, do nothing
                // The navigation event handlers will handle it
                return;
            }

            // Get the anchor portion
            const anchorId = href.substring(1);
            
            // Find and scroll to the element
            const anchorElement = document.getElementById(anchorId);
            if (anchorElement) {
                anchorElement.scrollIntoView({ behavior: 'smooth' });
                
                // Update URL without page reload
                window.history.pushState({}, '', href);
            }
        }
    });
});