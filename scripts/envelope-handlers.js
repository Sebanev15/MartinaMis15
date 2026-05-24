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

    const letterLiftMs = 1300;
    const hoverCycleMs = 2400;
    const overlayFadeDelayMs = 900;
    const mainRevealLeadMs = 520;
    const fullscreenNode = document.querySelector('#welcome-overlay .fullscreen-letter');
    const srcLetterNode = document.querySelector('#welcome-overlay .envelope .letter');
    let handoffStarted = false;

    if (!envelope || envelope.classList.contains('open')) return;

    envelope.classList.add('open');
    if (wrapper) wrapper.style.pointerEvents = 'none';
    
    // Estabilizar sobre
    envelope.style.animation = 'none';
    envelope.style.transform = 'translateY(0) rotate(0deg)';

    if (overlay) overlay.classList.add('overlay-lit');
    envelope.classList.add('is-opening');

    const startZoomHandoff = () => {
        if (handoffStarted) return;
        handoffStarted = true;
        envelope.classList.remove('is-hovering');

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                syncFullscreenLetter();
                positionFullscreenLetterFromSource();

                if (fullscreenNode) {
                    fullscreenNode.classList.add('is-visible');
                    fullscreenNode.classList.remove('is-zooming');
                }

                requestAnimationFrame(() => {
                    if (fullscreenNode) fullscreenNode.classList.add('is-zooming');
                });

                setTimeout(() => {
                    envelope.classList.add('full-screen');
                }, overlayFadeDelayMs + 900);

                setTimeout(() => {
                    revealMainContent();
                }, Math.max(overlayFadeDelayMs - mainRevealLeadMs, 0));

                setTimeout(() => {
                    if (overlay) {
                        overlay.classList.add('opened');
                    }
                }, overlayFadeDelayMs);

                setTimeout(() => {
                    if (fullscreenNode) fullscreenNode.classList.remove('is-visible');
                    envelope.classList.remove('is-opening');
                    if (srcLetterNode) {
                        srcLetterNode.style.opacity = '';
                        srcLetterNode.style.transition = '';
                        srcLetterNode.style.transform = '';
                        srcLetterNode.style.animation = '';
                    }
                }, overlayFadeDelayMs + 1300);
            });
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

function syncFullscreenLetter() {
    const fullscreen = document.querySelector('#welcome-overlay .fullscreen-letter');
    const src = document.querySelector('#welcome-overlay .envelope .letter-content');
    const dst = fullscreen?.querySelector('.letter-content');
    if (!fullscreen || !src || !dst) return;

    const clone = src.cloneNode(true);
    dst.replaceWith(clone);
}

function positionFullscreenLetterFromSource() {
    const fullscreen = document.querySelector('#welcome-overlay .fullscreen-letter');
    const srcLetter = document.querySelector('#welcome-overlay .envelope .letter');
    const dstLetter = fullscreen?.querySelector('.letter');
    if (!fullscreen || !srcLetter || !dstLetter) return;

    const srcRect = srcLetter.getBoundingClientRect();
    const dstRect = dstLetter.getBoundingClientRect();

    const srcCx = srcRect.left + srcRect.width / 2;
    const srcCy = srcRect.top + srcRect.height / 2;

    const dstCx = dstRect.left + dstRect.width / 2;
    const dstCy = dstRect.top + dstRect.height / 2;

    const dx = srcCx - dstCx;
    const dy = srcCy - dstCy;

    const scale = srcRect.width / Math.max(dstRect.width, 1);

    fullscreen.style.setProperty('--fs-start-x', `${dx}px`);
    fullscreen.style.setProperty('--fs-start-y', `${dy}px`);
    fullscreen.style.setProperty('--fs-start-scale', `${scale}`);
}
