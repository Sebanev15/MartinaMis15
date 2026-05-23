// ===== PARALLAX DE LUNA EN SCROLL =====
export function initMoonScrollParallax() {
    const moonSvg = document.querySelector('.moon-svg');
    if (!moonSvg) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // No aplicar parallax si reduce-motion está activado
    if (reduceMotionQuery.matches) return;

    let scrollRaf = null;

    function updateMoonParallax() {
        const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        
        // Factor de movimiento suave (menor en mobile)
        const factor = isMobile ? 0.12 : 0.18;
        
        // Calcular posición X (de derecha a izquierda de forma sutil)
        const moveX = scrollProgress * 15 * factor;
        
        // Calcular posición Y (sutil movimiento vertical)
        const moveY = Math.sin(scrollProgress * Math.PI) * 8 * factor;
        
        // Aplicar transformación suave
        moonSvg.style.transform = `translateX(-${moveX}px) translateY(${moveY}px)`;
    }

    function onScroll() {
        if (scrollRaf) cancelAnimationFrame(scrollRaf);
        scrollRaf = requestAnimationFrame(updateMoonParallax);
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Cleanup
    return () => {
        if (scrollRaf) cancelAnimationFrame(scrollRaf);
        window.removeEventListener('scroll', onScroll);
    };
}

