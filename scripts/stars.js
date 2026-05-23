// ===== GENERADOR DE ESTRELLAS Y LUNA (CON IMAGEN) =====
export function createStars() {
    const starContainer = document.getElementById('stars-container');
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const starCount = isMobile ? 48 : 140;

    // Crear estrellas
    for (let i = 0; i < starCount; i++) {
        const dot = document.createElement('div');
        dot.className = 'star-dot';
        const size = Math.random() * 2.8 + 0.4;
        dot.style.width = size + 'px';
        dot.style.height = size + 'px';
        dot.style.top = Math.random() * 100 + '%';
        dot.style.left = Math.random() * 100 + '%';
        dot.style.opacity = Math.random() * 0.7 + 0.3;
        dot.style.animationDelay = Math.random() * 3 + 's';
        starContainer.appendChild(dot);
    }

    // Una sola luna grande con IMAGEN
    const moonConfig = isMobile
        ? { top: 8, left: 70, size: 300 }
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
        object-fit: contain;
        filter: drop-shadow(0 0 40px rgba(212, 175, 55, 0.35))
                drop-shadow(0 8px 35px rgba(0, 0, 0, 0.5))
                drop-shadow(0 2px 8px rgba(212, 175, 55, 0.25));
        opacity: 0.92;
        animation: moon-breathe 6s ease-in-out infinite;
    `;
    
    container.appendChild(moonImg);
}

