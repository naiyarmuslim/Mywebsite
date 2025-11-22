// --- GENERAL SITE LOGIC ---

// 1. Navigation Logic (Uses URL Hash for "Multi-Page" feel)
    
/**
 * Shows the page corresponding to the URL hash, defaulting to the first page.
 * @param {string} pageId - The ID of the page to show (e.g., 'home-page').
 */
function showPage(pageId) {
    // Fallback to a default page ID if the hash is empty (ensure you have a 'home-page' ID in HTML)
    const finalPageId = pageId || 'home-page'; 

    // Hide all pages
    const pages = document.querySelectorAll('.page-section');
    pages.forEach(page => {
        page.classList.remove('active');
        page.setAttribute('aria-hidden', 'true'); 
    });

    // Show selected page
    const activePage = document.getElementById(finalPageId);
    if (activePage) {
        activePage.classList.add('active');
        activePage.setAttribute('aria-hidden', 'false');
        window.scrollTo(0, 0); // Scroll to top
    }

    // Close mobile menu if open
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
    }
}

/**
 * Handles navigation based on the current URL hash.
 */
function handleNavigation() {
    // Get the page ID from the URL hash (e.g., #about-page -> about-page)
    const hash = window.location.hash.substring(1); 
    showPage(hash);
}


// Wait for the DOM to be fully loaded before looking for elements
document.addEventListener('DOMContentLoaded', () => {
    
    // A. Initialize the correct page on load
    handleNavigation();
    
    // B. Listen for hash changes (when a user clicks a link)
    window.addEventListener('hashchange', handleNavigation);


    // 2. Mobile Menu Toggle
    // Expose globally for inline HTML usage (e.g., onclick="toggleMobileMenu()")
    window.toggleMobileMenu = function() {
        const menu = document.getElementById('mobile-menu');
        if (menu) {
            menu.classList.toggle('hidden');
        }
    };
    
    // 3. Sticky Navbar Effect
    const nav = document.getElementById('navbar');
    if (nav) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 10) {
                // Now only uses the standard shadow-md class
                nav.classList.add('shadow-md');
            } else {
                nav.classList.remove('shadow-md');
            }
        });
    }

    // 4. Initialization Message
    console.log("Website Loaded - Welcome Naiyar!");
});

/* Tailwind Config (Keep this outside of the JS logic block if it's separate script) */
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#B91C1C', // Deep Red (Chef/Passion)
                secondary: '#059669', // Emerald Green (Nature/GB)
                // Removed 'dark' and 'light' colors as they relate to dark mode
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Poppins', 'sans-serif'],
            }
        }
    }
}