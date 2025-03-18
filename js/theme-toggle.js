// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or use device preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Apply theme based on saved preference or device setting
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.replace('light-mode', 'dark-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    
    // Handle theme toggle click
    themeToggle.addEventListener('click', function() {
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        if (isDarkMode) {
            // Switch to light mode
            document.body.classList.replace('dark-mode', 'light-mode');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            // Switch to dark mode
            document.body.classList.replace('light-mode', 'dark-mode');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });
});