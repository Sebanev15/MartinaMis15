// ===== MANEJADORES DE TRANSICIÓN DEL SOBRE =====
export function revealMainContent() {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;
    mainContent.classList.add('show');
    document.body.classList.add('invitation-open');
}

/**
 * Transición mejorada para móvil: suave y gradual con múltiples fases
 * Fase 1 (0-250ms): Fade leve + reducción de backdrop-filter
 * Fase 2 (250-600ms): Fade significativo + escala menor del overlay
 * Fase 3 (600-1000ms): Fade final + blur completo + contenido aparece
 */
export function openInvitationLite() {
    const overlay = document.getElementById('welcome-overlay');
    const mainContent = document.getElementById('main-content');
    
    // Timing escalonado para transición más suave
    const phase1Duration = 250;   // Fade inicial suave
    const phase2Duration = 350;   // Fade intermedio
    const phase3Duration = 400;   // Fade final + reveal
    const totalDuration = phase1Duration + phase2Duration + phase3Duration;

    if (overlay) {
        overlay.classList.add('lite-exit');
    }

    // Fase 1: Iniciar fade leve (asegura que se vea el cambio)
    setTimeout(() => {
        if (overlay) {
            overlay.style.transition = `opacity ${phase1Duration}ms cubic-bezier(0.4, 0, 0.2, 1), 
                                                   backdrop-filter ${phase1Duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        }
    }, 10);

    // Fase 2: Revelar contenido principal de forma escalonada
    setTimeout(() => {
        if (mainContent) {
            mainContent.classList.add('show');
        }
    }, phase1Duration + 100);

    // Fase 3: Cerrar overlay completamente
    setTimeout(() => {
        if (overlay) {
            overlay.classList.add('opened');
        }
    }, totalDuration);
}

export function openInvitationLiteAnimated() {
    // Una animación ligera y segura para dispositivos con recursos limitados.
    const overlay = document.getElementById('welcome-overlay');
    const envelope = document.querySelector('.envelope');
    const wrapper = document.querySelector('.envelope-wrapper');
    const mainContent = document.getElementById('main-content');

    if (!envelope || envelope.classList.contains('open')) {
        // Si el sobre ya está abierto o no existe, caer a la versión lite normal
        openInvitationLite();
        return;
    }

    // Activar clase que habilita transiciones ligeras (CSS)
    document.body.classList.add('allow-lite-animation');

    // Iniciar fade del overlay (misma intención que openInvitationLite)
    if (overlay) overlay.classList.add('lite-exit');

    // Aplicar clases que activan transiciones CSS sencillas (.lite-open)
    envelope.classList.add('open', 'lite-open');
    if (wrapper) wrapper.style.pointerEvents = 'none';
    envelope.classList.add('is-opening');

    // Duración estimada de la animación ligera (coincide con CSS)
    const animationDuration = 700;

    // Mostrar contenido principal al inicio de la transición para evitar saltos
    setTimeout(() => {
        if (mainContent) mainContent.classList.add('show');
    }, 200);

    // Marcar overlay como "opened" cuando termina la animación principal
    setTimeout(() => {
        if (overlay) overlay.classList.add('opened');
        envelope.classList.remove('is-opening');
        envelope.classList.remove('lite-open');
        // limpiar flag de animación ligera
        document.body.classList.remove('allow-lite-animation');
    }, animationDuration);
}

export function openInvitationImmediate() {
    // Revelado inmediato sin animaciones (modo "simple botón").
    const overlay = document.getElementById('welcome-overlay');
    const wrapper = document.querySelector('.envelope-wrapper');
    if (overlay) {
        overlay.classList.add('opened');
        // ocultar rápidamente para evitar foco/elementos interactivos
        overlay.style.display = 'none';
    }
    if (wrapper) wrapper.style.pointerEvents = '';
    revealMainContent();
}

/**
 * Transición completa de sobre a pantalla completa (desktop)
 */
export function openInvitation() {
    const envelope = document.querySelector('.envelope');
    const overlay = document.getElementById('welcome-overlay');
    const wrapper = document.querySelector('.envelope-wrapper');
    const fullscreenNode = document.querySelector('#welcome-overlay .fullscreen-letter');
    const srcLetterNode = document.querySelector('#welcome-overlay .envelope .letter');

    const letterLiftMs = 1300;
    const hoverCycleMs = 2400;
    const overlayFadeDelayMs = 900;
    const mainRevealLeadMs = 520;
    let handoffStarted = false;

    if (!envelope || envelope.classList.contains('open')) return;

    envelope.classList.add('open');
    if (wrapper) wrapper.style.pointerEvents = 'none';

    envelope.style.animation = 'none';
    envelope.style.transform = 'translateY(0) rotate(0deg)';

    if (overlay) overlay.classList.add('overlay-lit');
    envelope.classList.add('is-opening');

    const startZoomHandoff = () => {
        if (handoffStarted) return;
        handoffStarted = true;
        envelope.classList.remove('is-hovering');

        if (overlay) overlay.classList.add('suppress-accent');

        requestAnimationFrame(() => {
            promoteSourceLetterToFullscreen();

            if (fullscreenNode) {
                fullscreenNode.classList.add('is-visible');
                requestAnimationFrame(() => {
                    fullscreenNode.classList.add('is-zooming');
                });
            }

            setTimeout(() => {
                envelope.classList.add('full-screen');
            }, overlayFadeDelayMs + 650);

            setTimeout(() => {
                revealMainContent();
            }, Math.max(overlayFadeDelayMs - mainRevealLeadMs, 0));

            setTimeout(() => {
                if (overlay) overlay.classList.add('opened');
            }, overlayFadeDelayMs);

            setTimeout(() => {
                if (fullscreenNode) fullscreenNode.classList.remove('is-visible');
                envelope.classList.remove('is-opening');
                if (overlay) overlay.classList.remove('suppress-accent');
            }, overlayFadeDelayMs + 1300);
        });
    };

    setTimeout(() => {
        envelope.classList.add('is-hovering');

        if (srcLetterNode) {
            srcLetterNode.addEventListener('animationiteration', () => {
                startZoomHandoff();
            }, { once: true });
        }

        setTimeout(() => {
            startZoomHandoff();
        }, hoverCycleMs + 160);
    }, letterLiftMs);
}

function promoteSourceLetterToFullscreen() {
    const fullscreen = document.querySelector('#welcome-overlay .fullscreen-letter');
    const srcLetter = document.querySelector('#welcome-overlay .envelope .letter');
    if (!fullscreen || !srcLetter) return;

    const srcRect = srcLetter.getBoundingClientRect();

    const placeholder = fullscreen.querySelector('.letter');
    if (placeholder && placeholder !== srcLetter) {
        fullscreen.replaceChild(srcLetter, placeholder);
    } else if (srcLetter.parentElement !== fullscreen) {
        fullscreen.appendChild(srcLetter);
    }

    const computed = window.getComputedStyle(srcLetter);
    const radius = computed.borderRadius || '2px';
    const srcCx = srcRect.left + srcRect.width / 2;
    const srcCy = srcRect.top + srcRect.height / 2;

    srcLetter.classList.remove('fs-morph-source');
    srcLetter.style.setProperty('--morph-width', `${srcRect.width}px`);
    srcLetter.style.setProperty('--morph-height', `${srcRect.height}px`);
    srcLetter.style.setProperty('--morph-top', `${srcCy}px`);
    srcLetter.style.setProperty('--morph-left', `${srcCx}px`);
    srcLetter.style.setProperty('--morph-radius', radius);
    const targetWidth = Math.round(Math.min(srcRect.width * 2.2, window.innerWidth * 0.95));
    const targetHeight = Math.round(Math.min(srcRect.height * 2.2, window.innerHeight * 0.9));
    srcLetter.style.setProperty('--morph-target-width', `${targetWidth}px`);
    srcLetter.style.setProperty('--morph-target-height', `${targetHeight}px`);
    srcLetter.style.setProperty('--content-scale', '0.5');
    srcLetter.style.margin = '0';
    srcLetter.style.borderRadius = radius;
    srcLetter.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)';
    srcLetter.style.padding = '20px';
    srcLetter.style.transition = '';
    srcLetter.style.position = 'fixed';
    srcLetter.style.opacity = '0';
    srcLetter.style.visibility = 'hidden';
    srcLetter.style.top = '';
    srcLetter.style.left = '';
    srcLetter.style.width = '';
    srcLetter.style.height = '';
    srcLetter.style.transform = '';

    requestAnimationFrame(() => {
        srcLetter.getBoundingClientRect();
        srcLetter.style.visibility = 'visible';
        srcLetter.style.opacity = '1';
        srcLetter.style.setProperty('--morph-target-width', `${targetWidth}px`);
        srcLetter.style.setProperty('--morph-target-height', `${targetHeight}px`);
        srcLetter.style.setProperty('--content-scale', '1');
        srcLetter.style.padding = 'clamp(24px, 4vw, 56px)';
        srcLetter.style.boxShadow = '0 8px 30px rgba(0,0,0,0.45), 0 0 40px rgba(212, 175, 55, 0.10)';
    });
}
