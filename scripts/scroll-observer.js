// ===== OBSERVADOR DE SCROLL ===== 
export function observeElements() {
    const elements = Array.from(document.querySelectorAll('.fade-in-on-scroll'));

    if (!('IntersectionObserver' in window)) {
        elements.forEach(el => el.classList.add('visible'));
        return;
    }

    const options = {
        threshold: 0.05,
        rootMargin: '0px 0px -15% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = elements.indexOf(entry.target);
                const delay = Math.max(index, 0) * 60;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, options);

    elements.forEach(el => {
        observer.observe(el);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => observeElements(), { once: true });
} else {
    observeElements();
}
