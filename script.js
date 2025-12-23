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