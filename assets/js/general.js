// --- Configuration ---
const PRIMARY_COLOR_CODE = '#DC2626'; // Red-600 (Tailwind Primary)

// --- General Navigation (for future use if pages were linked via JS) ---

/**
 * Placeholder function for multi-page navigation (currently using direct hrefs in HTML)
 * @param {string} pageId - The ID of the page to show.
 */
function showPage(pageId) {
    // This function is currently just for console logging or simple interactions,
    // as navigation is handled by standard HTML <a> tags.
    console.log(`Navigating to page: ${pageId}. (Using standard HTML links for now.)`);
    // In a real SPA, this would handle routing logic. For now, it just redirects.
    if (pageId === 'home') window.location.href = '../index.html';
    if (pageId === 'projects') window.location.href = './it.html';
    if (pageId === 'chef') window.location.href = './chef.html';
}

/**
 * Toggles the mobile menu visibility.
 */
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
}

// Apply Poppins to body for Tailwind font styling
document.body.style.fontFamily = 'Inter, sans-serif';

// --- Initialization: Sticky Navigation Bar ---
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-lg');
    } else {
        navbar.classList.remove('shadow-lg');
    }
});