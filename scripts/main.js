// ===== MAIN - INICIALIZACIÓN DE LA APLICACIÓN =====
import { createStars } from './stars.js';
import { initParallax } from './parallax.js';
import { initMoonScrollParallax } from './moon-scroll-parallax.js';
import { initDynamicSparkles } from './dynamic-sparkles.js';
import { openInvitation, openInvitationLite } from './envelope-handlers.js';
import { updateCountdown } from './countdown.js';
import './scroll-observer.js';
import { initCustomSelects } from './custom-select.js';
import { handleFormSubmit } from './form-handler.js';
import { isLowPowerDevice, isMobileDevice } from './utils.js';

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

    // Detectar dispositivo de bajo poder
    const useLiteMotion = isLowPowerDevice() || isMobileDevice();
    
    if (useLiteMotion) {
        document.body.classList.add('lite-motion');
        const tapInstruction = document.querySelector('.tap-instruction');
        if (tapInstruction) {
            tapInstruction.textContent = 'Toca para continuar';
        }
    }

    // Configurar evento de click/tecla en el sobre
    const envelopeNode = document.querySelector('.envelope');
    if (envelopeNode) {
        const openEnvelope = () => {
            if (useLiteMotion) {
                openInvitationLite();
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
