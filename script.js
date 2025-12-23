// Theme persistence and toggle
// Run immediately to prevent flash
(function () {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
})();

function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');

    if (currentTheme === 'dark') {
        html.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        // Notify iframe of theme change
        const iframe = document.getElementById('contact-iframe');
        if (iframe) {
            iframe.contentWindow.postMessage({ type: 'themeChange', theme: 'light' }, '*');
        }
    } else {
        html.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        // Notify iframe of theme change
        const iframe = document.getElementById('contact-iframe');
        if (iframe) {
            iframe.contentWindow.postMessage({ type: 'themeChange', theme: 'dark' }, '*');
        }
    }
}

// Projects page tag filtering (only runs if elements exist)
if (document.querySelector('.tag-filter-container')) {
    let currentTagFilter = 'all';
    let currentStatusFilter = 'all';

    function filterProjects(status) {
        currentStatusFilter = status;
        applyFilters();

        const buttons = document.querySelectorAll('.filter-btn');
        buttons.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
    }

    function filterByTag(tag) {
        currentTagFilter = tag;
        applyFilters();

        const tagOptions = document.querySelectorAll('.tag-option');
        tagOptions.forEach(opt => opt.classList.remove('selected'));
        event.target.classList.add('selected');

        // Update button text
        const btn = document.querySelector('.tag-filter-btn');
        btn.textContent = tag === 'all' ? 'filter by tag' : `tag: ${tag}`;
    }

    function applyFilters() {
        const allCards = document.querySelectorAll('.project-card');
        const currentSection = document.getElementById('current-header');
        const completedSection = document.getElementById('completed-header');

        allCards.forEach(card => {
            const matchesStatus = currentStatusFilter === 'all' || card.dataset.status === currentStatusFilter;
            const matchesTag = currentTagFilter === 'all' || card.dataset.tags.includes(currentTagFilter);

            card.style.display = (matchesStatus && matchesTag) ? 'block' : 'none';
        });

        // Show/hide section headers
        if (currentStatusFilter === 'all') {
            currentSection.style.display = 'block';
            completedSection.style.display = 'block';
        } else if (currentStatusFilter === 'current') {
            currentSection.style.display = 'block';
            completedSection.style.display = 'none';
        } else if (currentStatusFilter === 'completed') {
            currentSection.style.display = 'none';
            completedSection.style.display = 'block';
        }
    }

    function toggleTagDropdown() {
        const container = document.querySelector('.tag-filter-container');
        container.classList.toggle('active');
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', function (event) {
        const container = document.querySelector('.tag-filter-container');
        if (container && !container.contains(event.target)) {
            container.classList.remove('active');
        }
    });

    // Make functions available globally for projects page
    window.filterProjects = filterProjects;
    window.filterByTag = filterByTag;
    window.toggleTagDropdown = toggleTagDropdown;
}

// Retrigger sidenote highlight animation on repeated clicks
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('sidenote-ref')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Save current scroll position
            const scrollPos = window.scrollY;

            // Remove and re-add the hash to retrigger :target
            window.location.hash = '';

            // Restore scroll position immediately
            window.scrollTo(0, scrollPos);

            // Re-add hash after brief delay
            setTimeout(function () {
                window.location.hash = targetId;
            }, 10);
        }
    }
});

// Jump back function for footnote 
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('footnote-ref')) {
        // Save current position 
        sessionStorage.setItem('footnote-return-position', window.scrollY);
    }

    if (e.target.classList.contains('footnote-return')) {
        e.preventDefault();
        const retPosition = sessionStorage.getItem('footnote-return-position');

        if (retPosition) {
            window.location.hash = '';

            window.scrollTo(0, parseInt(retPosition));

            setTimeout(function () {
                // Scroll back 
                window.scrollTo({
                    top: parseInt(retPosition), behavior: "smooth"
                });
            }, 10);

            // Remove highlight 
            //history.pushState("", document.title, window.location.pathname + window.location.search);

            // Remove saved position 
            sessionStorage.removeItem('footnote-return-position')
        }
    }
});

// Accessibility 
// High contrast toggle
function toggleContrast() {
    const html = document.documentElement;
    const currentContrast = html.getAttribute('data-contrast');
    
    if (currentContrast === 'high') {
        html.removeAttribute('data-contrast');
        localStorage.setItem('contrast', 'normal');
    } else {
        html.setAttribute('data-contrast', 'high');
        localStorage.setItem('contrast', 'high');
    }
}

// Initialize contrast on load
(function() {
    const savedContrast = localStorage.getItem('contrast');
    if (savedContrast === 'high') {
        document.documentElement.setAttribute('data-contrast', 'high');
    }
})();