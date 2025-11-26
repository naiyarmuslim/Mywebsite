function generateAndInjectNavbar(activePage) {
    // Determine the base path: '' for index.html, '..' for pages/*.html
    const basePath = (activePage === 'home') ? '' : '..';

    // Helper function to generate desktop link HTML
    function createNavLink(text, href, pageName, activePage) {
        const isActive = pageName === activePage;
        // Updated styling: subtle underline hover effect
        const baseClasses = 'nav-link text-gray-600 hover:text-primary font-medium transition duration-300 relative group';
        
        if (pageName === 'contact') {
             // Contact button is kept highly visible
             return `<a href="${href}" class="nav-link px-4 py-2 bg-primary text-white rounded-full hover:bg-red-700 transition shadow-lg hover:shadow-xl">${text}</a>`;
        }
        
        const linkContent = `
            <a href="${href}" class="nav-link ${isActive ? 'text-primary font-semibold' : 'hover:text-gray-900'}">
                ${text}
                <span class="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}"></span>
            </a>
        `;
        return linkContent;
    }

    // Helper function to generate mobile link HTML
    function createMobileLink(text, href, pageName, activePage) {
        const isActive = pageName === activePage;
        const baseClasses = 'block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50';
        const activeClasses = 'block px-3 py-2 rounded-md text-base font-medium text-primary bg-gray-100';
        
        if (pageName === 'contact') {
            return `<a href="${href}" class="block px-3 py-2 rounded-md text-base font-medium bg-primary text-white text-center mt-4">${text}</a>`;
        }

        return `<a href="${href}" class="${isActive ? activeClasses : baseClasses}">${text}</a>`;
    }
    
    // The core HTML structure for the fixed navbar
    const navbarHTML = `
        <nav class="fixed w-full z-50 bg-white/95 backdrop-blur-sm shadow-lg transition-all duration-300 top-0" id="navbar">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <a href="${basePath}/index.html" class="flex-shrink-0 flex items-center cursor-pointer">
                        <span class="font-display font-bold text-3xl text-gray-900">NM<span class="text-primary">.</span></span>
                    </a>
                    
                    <div class="hidden md:flex space-x-8 items-center h-full">
                        ${createNavLink('Home', basePath + '/index.html', 'home', activePage)}
                        ${createNavLink('About', basePath + '/pages/about.html', 'about', activePage)}
                        ${createNavLink('Professional Profile', basePath + '/pages/profile.html', 'profile', activePage)}
                        ${createNavLink('IT Projects', basePath + '/pages/it.html', 'it', activePage)}
                        ${createNavLink('Contact', basePath + '/pages/contact.html', 'contact', activePage)}
                    </div>

                    <div class="md:hidden flex items-center">
                        <button onclick="document.getElementById('mobile-menu').classList.toggle('hidden')" class="text-gray-600 hover:text-primary focus:outline-none">
                            <i class="fas fa-bars text-2xl"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div id="mobile-menu" class="hidden md:hidden bg-white border-t">
                <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    ${createMobileLink('Home', basePath + '/index.html', 'home', activePage)}
                    ${createMobileLink('About Me', basePath + '/pages/about.html', 'about', activePage)}
                    ${createMobileLink('Professional Profile', basePath + '/pages/profile.html', 'profile', activePage)}
                    ${createMobileLink('IT Projects', basePath + '/pages/it.html', 'it', activePage)}
                    ${createMobileLink('Contact Me', basePath + '/pages/contact.html', 'contact', activePage)}
                </div>
            </div>
        </nav>
    `;

    document.body.insertAdjacentHTML('afterbegin', navbarHTML);
}