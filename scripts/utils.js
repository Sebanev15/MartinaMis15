// ===== UTILIDADES GENERALES =====
export function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}

export function isLowPowerDevice() {
    const mem = navigator.deviceMemory || 0;
    const cores = navigator.hardwareConcurrency || 0;
    const saveData = navigator.connection && navigator.connection.saveData;
    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Honor explicit user preferences first
    if (reduceMotionQuery.matches || Boolean(saveData)) return true;

    // If both memory and cores are available, consider low-power only when BOTH are low
    if (mem > 0 && cores > 0) {
        return mem <= 2 && cores <= 2; // conservative: require both metrics to be low
    }

    // If only one metric is available, be conservative and only treat as low when it's very low
    if (mem > 0) return mem <= 1; // ~1GB or less
    if (cores > 0) return cores <= 1; // single-core (rare)

    return false;
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

