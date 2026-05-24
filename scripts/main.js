// ===== MAIN - INICIALIZACIÓN DE LA APLICACIÓN =====
import { createStars } from './stars.js';
import { initParallax } from './parallax.js';
import { initMoonScrollParallax } from './moon-scroll-parallax.js';
import { initDynamicSparkles } from './dynamic-sparkles.js';
import { openInvitation, openInvitationLite, openInvitationLiteAnimated } from './envelope-handlers.js';
import { updateCountdown } from './countdown.js';
import './scroll-observer.js';
import { initCustomSelects } from './custom-select.js';
import { handleFormSubmit } from './form-handler.js';
import { isLowPowerDevice, isVeryLowPowerDevice, prefersReducedMotion } from './utils.js';

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Crear estrellas y lunas
    createStars();

    // Inicializar parallax automático
    initParallax();

    // Inicializar parallax de la luna en scroll
    initMoonScrollParallax();

    // Inicializar sparkles dinámicos (deshabilitado - no se renderizaba correctamente)
    // initDynamicSparkles();

    // Envelope behavior policy: default to full animation unless device is very low-power.
    const veryLow = isVeryLowPowerDevice();
    const low = isLowPowerDevice() && !veryLow;
    const prefersReduced = prefersReducedMotion();
    let envelopeMode = 'full'; // 'full' | 'lite-controls' | 'immediate'

    // Query string overrides for testing:
    try {
        const params = new URLSearchParams(window.location.search);
        if (params.get('forceLite') === '1') envelopeMode = 'lite-controls';
        if (params.get('forceImmediate') === '1') envelopeMode = 'immediate';
        if (params.get('forceMotion') === '1') envelopeMode = 'full';
    } catch (e) {
        // ignore
    }

    // Honor accessibility and data-saver signals: force immediate (no animation)
    const saveData = navigator.connection && navigator.connection.saveData;
    if (prefersReduced || saveData || veryLow) {
        envelopeMode = 'immediate';
    } else if (low && envelopeMode === 'full') {
        envelopeMode = 'lite-controls';
    }

    // Apply lite-motion class for styling when not using full animations
    if (envelopeMode === 'lite-controls' || envelopeMode === 'immediate') {
        document.body.classList.add('lite-motion');
        const tapInstruction = document.querySelector('.tap-instruction');
        if (tapInstruction) tapInstruction.textContent = 'Toca para continuar';
    }

    // If in lite-controls mode, add small UI to allow user to play a lightweight animation or skip
    if (envelopeMode === 'lite-controls') {
        const envelopeWrapper = document.querySelector('.envelope-wrapper');
        if (envelopeWrapper && !envelopeWrapper.querySelector('.lite-controls')) {
            const controls = document.createElement('div');
            controls.className = 'lite-controls';
            controls.innerHTML = `
                <button class="lite-btn lite-btn-animate" type="button">Ver animación ligera</button>
                <button class="lite-btn lite-btn-skip" type="button">Saltar</button>
            `;
            envelopeWrapper.appendChild(controls);

            const animateBtn = controls.querySelector('.lite-btn-animate');
            const skipBtn = controls.querySelector('.lite-btn-skip');

            if (animateBtn) {
                animateBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    document.body.classList.add('allow-lite-animation');
                    try { openInvitationLiteAnimated(); } catch (err) { openInvitationLite(); }
                });
            }
            if (skipBtn) {
                skipBtn.addEventListener('click', (e) => { e.stopPropagation(); openInvitationLite(); });
            }
        }
    }

    // Configurar evento de click/tecla en el sobre
    const envelopeNode = document.querySelector('.envelope');
    if (envelopeNode) {
        const openEnvelope = () => {
            if (envelopeMode === 'immediate') {
                // actúa como botón simple: revelar sin animaciones
                if (typeof openInvitationImmediate === 'function') {
                    openInvitationImmediate();
                } else {
                    openInvitationLite();
                }
            } else if (envelopeMode === 'lite-controls') {
                // Si el usuario habilitó la animación ligera, ejecutarla; si no, la versión lite por defecto
                if (document.body.classList.contains('allow-lite-animation')) {
                    openInvitationLiteAnimated();
                } else {
                    openInvitationLite();
                }
            } else {
                openInvitation();
            }
        };

        envelopeNode.addEventListener('click', openEnvelope);
        envelopeNode.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openEnvelope();
            }
        });

        // Improve touch responsiveness: quick visual feedback
        envelopeNode.addEventListener('touchstart', () => envelopeNode.classList.add('touched'), { passive: true });
    }

    // Inicializar cuenta regresiva
    updateCountdown();

    // Inicializar custom selects
    initCustomSelects();


    // Configurar manejador del formulario
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
}
