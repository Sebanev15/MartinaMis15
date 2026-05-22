// ===== UTILIDADES GENERALES =====
export function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}

export function isLowPowerDevice() {
    const mem = navigator.deviceMemory || 0;
    const cores = navigator.hardwareConcurrency || 0;
    const saveData = navigator.connection && navigator.connection.saveData;
    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    return reduceMotionQuery.matches
        || Boolean(saveData)
        || (mem > 0 && mem <= 3)
        || (cores > 0 && cores <= 3);
}

export function isMobileDevice() {
    return window.matchMedia('(max-width: 768px)').matches;
}

export function isPointerFine() {
    return window.matchMedia('(pointer: fine)').matches;
}

export function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

export function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

