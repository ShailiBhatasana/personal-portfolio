document.addEventListener('DOMContentLoaded', () => {
    // Select all sections and nav links
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    // Options for the IntersectionObserver
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.5 // trigger when 50% of the section is visible
    };

    // Callback function for IntersectionObserver
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                // Get id of the intersecting section
                const activeId = entry.target.getAttribute('id');

                // Find the corresponding nav link and add active class
                const activeLink = document.querySelector(`.nav-link[href="#${activeId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    };

    // Create the observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });

    // Dynamic Hover Grid Generation
    const gridContainer = document.querySelector('.hover-grid-container');
    const heroSection = document.querySelector('.hero-section');
    
    if (gridContainer && heroSection) {
        const fillGrid = () => {
            gridContainer.innerHTML = '';
            // Get dimensions of the hero section
            const width = heroSection.offsetWidth + 85; // Extra column as per CSS
            const height = heroSection.offsetHeight;
            
            // Tile dimensions
            const tileWidth = 84.71;
            const tileHeight = 83.71;
            
            // Calculate required tiles (round up to ensure coverage)
            const cols = Math.ceil(width / tileWidth);
            const rows = Math.ceil(height / tileHeight);
            const totalTiles = cols * rows;
            
            // Create a document fragment for better performance
            const fragment = document.createDocumentFragment();
            
            for (let i = 0; i < totalTiles; i++) {
                const component = document.createElement('div');
                component.className = 'hover-component';
                
                const inner = document.createElement('div');
                inner.className = 'hover-inner';
                
                component.appendChild(inner);
                fragment.appendChild(component);
            }
            
            gridContainer.appendChild(fragment);
        };
        
        // Initial fill
        fillGrid();
        
        // Refill on resize
        window.addEventListener('resize', () => {
            // Debounce resize
            clearTimeout(window.resizeTimer);
            window.resizeTimer = setTimeout(fillGrid, 200);
        });
    }

    // Mega Menu Toggle Logic
    const megaMenuToggle = document.getElementById('mega-menu-toggle');
    const megaMenu = document.getElementById('mega-menu');

    if (megaMenuToggle && megaMenu) {
        megaMenuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const isOpen = megaMenu.classList.contains('is-open');
            if (isOpen) {
                megaMenu.classList.remove('is-open');
                megaMenuToggle.setAttribute('aria-expanded', 'false');
            } else {
                megaMenu.classList.add('is-open');
                megaMenuToggle.setAttribute('aria-expanded', 'true');
            }
        });

        // Close mega menu when a link is clicked
        const megaMenuLinks = document.querySelectorAll('.mega-menu__link');
        megaMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                megaMenu.classList.remove('is-open');
                megaMenuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
});
