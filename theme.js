(function() {
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/; SameSite=Strict";
    }
    
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    
    function applyTheme(themeName) {
        const isDark = themeName === 'dark';
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        setCookie('site-theme', isDark ? 'dark' : 'light', 365);
        try {
            localStorage.setItem('site-theme', isDark ? 'dark' : 'light');
        } catch (e) {
            console.warn('localStorage non disponible');
        }
        document.dispatchEvent(new CustomEvent('themeChange', { 
            detail: { theme: isDark ? 'dark' : 'light' } 
        }));
    }
    const storedTheme = getCookie('site-theme') || localStorage.getItem('site-theme');
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = storedTheme || systemPreference;

    applyTheme(initialTheme);

    window.addEventListener('DOMContentLoaded', function() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', function() {
                const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
                applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
            });
        }
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
            if (!getCookie('site-theme') && !localStorage.getItem('site-theme')) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    });
    
    window.addEventListener('storage', function(event) {
        if (event.key === 'site-theme') {
            const cookieTheme = getCookie('site-theme');
            if (cookieTheme !== event.newValue) {
                applyTheme(event.newValue);
            }
        }
    });
})(); 