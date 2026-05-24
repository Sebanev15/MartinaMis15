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
    let useLiteMotion = isLowPowerDevice();

    // Permitir overrides por query string para pruebas: ?forceMotion=1 para forzar animaciones completas
    try {
        const params = new URLSearchParams(window.location.search);
        if (params.get('forceMotion') === '1') {
            useLiteMotion = false;
        }
        if (params.get('forceLite') === '1') {
            useLiteMotion = true;
        }
    } catch (e) {
        // Ignore parsing errors
    }
    
    if (useLiteMotion) {
        document.body.classList.add('lite-motion');
        const tapInstruction = document.querySelector('.tap-instruction');
        if (tapInstruction) {
            tapInstruction.textContent = 'Toca para continuar';
        }

        // Añadir controles para dispositivos con modo lite: permitir ver una animación ligera o saltar
        const envelopeWrapper = document.querySelector('.envelope-wrapper');
        if (envelopeWrapper) {
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
                    // Habilitar la animación ligera (override) y ejecutar la animación simplificada
                    document.body.classList.add('allow-lite-animation');
                    try {
                        openInvitationLiteAnimated();
                    } catch (err) {
                        // fallback: ejecutar la versión sin animación si falla
                        openInvitationLite();
                    }
                });
            }

            if (skipBtn) {
                skipBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openInvitationLite();
                });
            }
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
