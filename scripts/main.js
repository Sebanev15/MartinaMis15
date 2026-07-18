// ===== MAIN - INICIALIZACIÓN DE LA APLICACIÓN =====
import { createStars } from './stars.js';
import { initParallax } from './parallax.js';
import { initMoonScrollParallax } from './moon-scroll-parallax.js';
import { initDynamicSparkles } from './dynamic-sparkles.js';
import { openInvitation, openInvitationLite, openInvitationLiteAnimated, openInvitationImmediate } from './envelope-handlers.js';
import { updateCountdown } from './countdown.js';
import './scroll-observer.js';
import { initCustomSelects } from './custom-select.js';
import { handleFormSubmit, initFormEnhancements } from './form-handler.js';
import { isLowPowerDevice, isVeryLowPowerDevice, isMobileDevice, prefersReducedMotion } from './utils.js';

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

    // La secuencia completa depende de un handoff 3D largo y está diseñada para
    // punteros finos. En móvil usamos la apertura corta: conserva el gesto de
    // abrir el sobre sin esperar la animación de escritorio ni forzar filtros
    // costosos en Safari/Chrome móvil.
    const mobile = isMobileDevice();
    const veryLow = isVeryLowPowerDevice();
    const low = isLowPowerDevice() && !veryLow;
    const prefersReduced = prefersReducedMotion();
    let envelopeMode = 'full'; // 'full' | 'lite' | 'immediate'

    // Query string overrides for testing:
    try {
        const params = new URLSearchParams(window.location.search);
        if (params.get('forceLite') === '1') envelopeMode = 'lite';
        if (params.get('forceImmediate') === '1') envelopeMode = 'immediate';
        if (params.get('forceMotion') === '1') envelopeMode = 'full';
    } catch (e) {
        // ignore
    }

    // Honor accessibility and data-saver signals: force immediate (no animation)
    const saveData = navigator.connection && navigator.connection.saveData;
    if (prefersReduced || saveData || veryLow) {
        envelopeMode = 'immediate';
    } else if ((mobile || low) && envelopeMode === 'full') {
        envelopeMode = 'lite';
    }

    // Apply lite-motion class for styling when not using full animations
    if (envelopeMode === 'lite' || envelopeMode === 'immediate') {
        document.body.classList.add('lite-motion');
        const tapInstruction = document.querySelector('.tap-instruction');
        if (tapInstruction) tapInstruction.textContent = 'Toca para continuar';
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
            } else if (envelopeMode === 'lite') {
                // Ejecutar la animación ligera automáticamente en dispositivos de bajo recurso
                try {
                    openInvitationLiteAnimated();
                } catch (err) {
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

    // Inicializar mejoras del formulario (deadline y campos de acompañantes)
    initFormEnhancements();


    // Configurar manejador del formulario
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
}
