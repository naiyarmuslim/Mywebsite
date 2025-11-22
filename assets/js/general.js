
        // 1. Navigation Logic
        function showPage(pageId) {
            // Hide all pages
            const pages = document.querySelectorAll('.page-section');
            pages.forEach(page => {
                page.classList.remove('active');
            });

            // Show selected page
            const activePage = document.getElementById(pageId);
            if(activePage) {
                activePage.classList.add('active');
                window.scrollTo(0, 0); // Scroll to top
            }

            // Close mobile menu if open
            document.getElementById('mobile-menu').classList.add('hidden');
        }

        // 2. Mobile Menu Toggle
        function toggleMobileMenu() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        }

        // 3. Sticky Navbar Effect (Optional polish)
        window.addEventListener('scroll', function() {
            const nav = document.getElementById('navbar');
            if (window.scrollY > 10) {
                nav.classList.add('shadow-md');
            } else {
                nav.classList.remove('shadow-md');
            }
        });

        // 4. Initialize
        // Usually we might fetch GitHub data here via API
        // For this demo, the HTML is hardcoded with mock data based on prompt
        console.log("Website Loaded - Welcome Naiyar!");
// --- DARK MODE LOGIC (Must be run before DOMContentLoaded to prevent flash of unstyled content) ---

/**
 * Initializes the dark mode setting based on local storage or system preference.
 */
function initializeDarkMode() {
    const storedTheme = localStorage.getItem('color-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const html = document.documentElement;

    // Check if the user's preference is dark, OR if no preference is stored and the system prefers dark.
    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
        html.classList.add('dark');
    }
    // Note: If theme is 'light' or system prefers light, we don't need to do anything,
    // as the 'dark' class is absent by default.
}

/**
 * Updates the dark mode icon based on the current mode.
 */
function updateDarkModeIcon() {
    const isDark = document.documentElement.classList.contains('dark');
    const toggleButtons = document.querySelectorAll('.mode-toggle-icon');
    
    toggleButtons.forEach(btn => {
        // Replace the sun icon with the moon icon if dark mode is active, and vice versa.
        if (isDark) {
            btn.classList.replace('fa-sun', 'fa-moon');
        } else {
            btn.classList.replace('fa-moon', 'fa-sun');
        }
    });
}

/**
 * Toggles the dark mode state and saves it to local storage.
 */
function toggleDarkMode() {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');
    
    if (isDark) {
        html.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
    } else {
        html.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
    }
    updateDarkModeIcon();
}

// Run initialization immediately when the script loads
initializeDarkMode();

// --- GENERAL SITE LOGIC ---

// Wait for the DOM to be fully loaded before looking for elements
document.addEventListener('DOMContentLoaded', () => {
    // 1. Update the icon after the HTML elements are available
    updateDarkModeIcon();
    
    // 2. Mobile Menu Toggle
    window.toggleMobileMenu = function() {
        const menu = document.getElementById('mobile-menu');
        menu.classList.toggle('hidden');
    };

    // 3. Sticky Navbar Effect (Optional)
    const nav = document.getElementById('navbar');
    if (nav) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 10) {
                // Use dark:shadow-xl to ensure visibility in dark mode
                nav.classList.add('shadow-md', 'dark:shadow-xl');
            } else {
                nav.classList.remove('shadow-md', 'dark:shadow-xl');
            }
        });
    }
});
    tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#B91C1C', // Deep Red (Chef/Passion)
                        secondary: '#059669', // Emerald Green (Nature/GB)
                        dark: '#1F2937',
                        light: '#F3F4F6'
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        display: ['Poppins', 'sans-serif'],
                    }
                }
            }
        }