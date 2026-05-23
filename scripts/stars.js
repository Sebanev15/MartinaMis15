// ===== GENERADOR DE ESTRELLAS Y LUNA (CON IMAGEN) =====
export function createStars() {
    const starContainer = document.getElementById('stars-container');
    if (!starContainer) return;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const starCount = isMobile ? 56 : 160;

    // Crear estrellas multi-capa para diseño más realista
    for (let i = 0; i < starCount; i++) {
        const dot = document.createElement('div');
        dot.className = 'star-dot';
        
        // Crear 3 capas de estrellas con diferentes propiedades
        const layerType = i % 3; // 0=base, 1=media, 2=centelleante
        let size, opacity, animationName, animationDuration;
        
        if (layerType === 0) {
            // Capa base: estrellas pequeñas, opacidad constante
            size = Math.random() * 1.2 + 0.3;
            opacity = Math.random() * 0.4 + 0.2;
            animationName = 'twinkle-subtle';
            animationDuration = (Math.random() * 2 + 4) + 's';
        } else if (layerType === 1) {
            // Capa media: estrellas medianas, centelleo moderado
            size = Math.random() * 2 + 0.6;
            opacity = Math.random() * 0.5 + 0.3;
            animationName = 'twinkle-medium';
            animationDuration = (Math.random() * 3 + 3) + 's';
        } else {
            // Capa centelleante: estrellas más grandes, centelleo marcado
            size = Math.random() * 2.5 + 1;
            opacity = Math.random() * 0.8 + 0.4;
            animationName = 'twinkle-bright';
            animationDuration = (Math.random() * 4 + 2.5) + 's';
        }
        
        dot.style.width = size + 'px';
        dot.style.height = size + 'px';
        dot.style.top = Math.random() * 100 + '%';
        dot.style.left = Math.random() * 100 + '%';
        dot.style.opacity = opacity;
        dot.style.animation = `${animationName} ${animationDuration} ease-in-out infinite`;
        dot.style.animationDelay = Math.random() * 5 + 's';
        
        // Añadir efecto de resplandor sutil
        dot.style.boxShadow = `0 0 ${size * 1.5}px rgba(255, 255, 255, ${opacity * 0.6})`;
        
        starContainer.appendChild(dot);
    }

    // Una sola luna grande con IMAGEN
    const moonConfig = isMobile
        ? { top: 10, left: 50, size: 320 }
        : { top: 5, left: 72, size: 480 };

    createMoonImage(starContainer, moonConfig);
}

function createMoonImage(container, config) {
    const moonImg = document.createElement('img');
    moonImg.src = 'images/moon.png';
    moonImg.className = 'moon-svg';
    moonImg.alt = 'Luna';
    moonImg.style.cssText = `
        position: absolute;
        width: ${config.size}px;
        height: ${config.size}px;
        top: ${config.top}%;
        left: ${config.left}%;
        transform: translateX(-50%);
        object-fit: contain;
        filter: drop-shadow(0 0 40px rgba(212, 175, 55, 0.35))
                drop-shadow(0 8px 35px rgba(0, 0, 0, 0.5))
                drop-shadow(0 2px 8px rgba(212, 175, 55, 0.25));
        opacity: 0.92;
        animation: moon-breathe 6s ease-in-out infinite;
    `;
    
    container.appendChild(moonImg);
}
