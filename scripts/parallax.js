// ===== PARALLAX Y MOVIMIENTO AUTOMÁTICO =====
import { clamp, isLowPowerDevice } from './utils.js';

const parallaxState = {
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    rafId: 0,
    startTime: performance.now()
};

export function initParallax() {
    const starContainer = document.getElementById('stars-container');
    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    const pointerFineQuery = window.matchMedia('(pointer: fine)');

    function isParallaxActive() {
        return Boolean(starContainer)
            && !reduceMotionQuery.matches
            && !mobileQuery.matches
            && pointerFineQuery.matches
            && !isLowPowerDevice();
    }

    function applyParallaxFrame(now) {
        parallaxState.rafId = requestAnimationFrame(applyParallaxFrame);

        if (!isParallaxActive()) {
            return;
        }

        const elapsed = (now - parallaxState.startTime) * 0.001; // segundos

        // Movimiento automático suave con seno/coseno
        parallaxState.targetX = Math.sin(elapsed * 0.4) * 20;
        parallaxState.targetY = Math.cos(elapsed * 0.5) * 20;

        // Lerp suave para transiciones fluidas
        parallaxState.currentX += (parallaxState.targetX - parallaxState.currentX) * 0.05;
        parallaxState.currentY += (parallaxState.targetY - parallaxState.currentY) * 0.05;

        // Aplicar transformaciones
        starContainer.style.transform = `translate(${-parallaxState.currentX}px, ${-parallaxState.currentY}px)`;

        const docStyle = document.documentElement.style;
        const envelopeTiltY = clamp(parallaxState.currentY / 35, -6, 6);
        const envelopeTiltX = clamp(parallaxState.currentX / 35, -6, 6);
        
        docStyle.setProperty('--tilt-envelope-rotateX', `${-envelopeTiltY}deg`);
        docStyle.setProperty('--tilt-envelope-rotateY', `${-envelopeTiltX}deg`);
        docStyle.setProperty('--tilt-content-rotateX', `${-envelopeTiltY * 0.6}deg`);
        docStyle.setProperty('--tilt-content-rotateY', `${-envelopeTiltX * 0.6}deg`);
        docStyle.setProperty('--tilt-content-translateX', `${-parallaxState.currentX * 0.35}px`);
        docStyle.setProperty('--tilt-content-translateY', `${-parallaxState.currentY * 0.35}px`);

        if (!document.body.classList.contains('has-tilt') && (Math.abs(envelopeTiltX) > 0.02 || Math.abs(envelopeTiltY) > 0.02)) {
            document.body.classList.add('has-tilt');
        }
    }

    // Iniciar loop de parallax automático
    parallaxState.rafId = requestAnimationFrame(applyParallaxFrame);

    return () => {
        cancelAnimationFrame(parallaxState.rafId);
    };
}

