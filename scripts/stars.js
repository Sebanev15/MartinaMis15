// ===== GENERADOR DE ESTRELLAS Y LUNAS =====
export function createStars() {
    const starContainer = document.getElementById('stars-container');
    const svgNamespace = "http://www.w3.org/2000/svg";
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const starCount = isMobile ? 48 : 120;

    // Crear estrellas
    for (let i = 0; i < starCount; i++) {
        const dot = document.createElement('div');
        dot.className = 'star-dot';
        const size = Math.random() * 2.5 + 0.5;
        dot.style.width = size + 'px';
        dot.style.height = size + 'px';
        dot.style.top = Math.random() * 100 + '%';
        dot.style.left = Math.random() * 100 + '%';
        dot.style.opacity = Math.random() * 0.7 + 0.3;
        dot.style.animationDelay = Math.random() * 3 + 's';
        starContainer.appendChild(dot);
    }

    // Configuración de lunas
    const moonConfigs = isMobile
        ? [{ top: 14, left: 78, size: 96 }]
        : [
            { top: 12, left: 80, size: 140 },
            { top: 70, left: 10, size: 100 }
        ];

    // Crear lunas con SVG
    moonConfigs.forEach((config, index) => {
        createMoon(starContainer, svgNamespace, config, index);
    });
}

function createMoon(container, svgNamespace, config, index) {
    const moonSvg = document.createElementNS(svgNamespace, "svg");
    moonSvg.setAttribute("viewBox", "0 0 100 100");
    moonSvg.setAttribute("class", "moon-svg");
    moonSvg.style.width = config.size + "px";
    moonSvg.style.top = config.top + "%";
    moonSvg.style.left = config.left + "%";

    // Definir gradientes
    const defs = document.createElementNS(svgNamespace, "defs");
    defs.innerHTML = `
        <radialGradient id="moonGlow${config.size}${index}" cx="35%" cy="35%">
            <stop offset="0%" stop-color="#fffef5" />
            <stop offset="30%" stop-color="#fffef5" />
            <stop offset="70%" stop-color="#f5e6c8" />
            <stop offset="100%" stop-color="#9d8c6e" />
        </radialGradient>
        <radialGradient id="moonShadow${config.size}${index}" cx="70%" cy="70%">
            <stop offset="0%" stop-color="rgba(0, 0, 0, 0)" />
            <stop offset="100%" stop-color="rgba(0, 0, 0, 0.3)" />
        </radialGradient>
    `;
    moonSvg.appendChild(defs);

    // Círculo principal de la luna
    const circle = document.createElementNS(svgNamespace, "circle");
    circle.setAttribute("cx", "50");
    circle.setAttribute("cy", "50");
    circle.setAttribute("r", "45");
    circle.setAttribute("fill", `url(#moonGlow${config.size}${index})`);
    moonSvg.appendChild(circle);

    // Sombra circular
    const shadowCircle = document.createElementNS(svgNamespace, "circle");
    shadowCircle.setAttribute("cx", "50");
    shadowCircle.setAttribute("cy", "50");
    shadowCircle.setAttribute("r", "45");
    shadowCircle.setAttribute("fill", `url(#moonShadow${config.size}${index})`);
    moonSvg.appendChild(shadowCircle);

    // Cráteres principales
    const craterPositions = [
        { x: 35, y: 35, r: 5 },
        { x: 65, y: 40, r: 3.5 },
        { x: 40, y: 60, r: 4 },
        { x: 70, y: 65, r: 2.5 },
        { x: 45, y: 25, r: 2.8 }
    ];

    craterPositions.forEach(crater => {
        addCrater(moonSvg, crater);
    });

    // Cráteres pequeños aleatorios
    for (let j = 0; j < 15; j++) {
        const smallCrater = document.createElementNS(svgNamespace, "circle");
        const x = 20 + Math.random() * 60;
        const y = 20 + Math.random() * 60;
        const r = 0.8 + Math.random() * 1.5;
        smallCrater.setAttribute("cx", x);
        smallCrater.setAttribute("cy", y);
        smallCrater.setAttribute("r", r);
        smallCrater.setAttribute("fill", "rgba(0, 0, 0, 0.08)");
        moonSvg.appendChild(smallCrater);
    }

    container.appendChild(moonSvg);
}

function addCrater(moonSvg, crater) {
    const svgNamespace = "http://www.w3.org/2000/svg";
    const craterOuter = document.createElementNS(svgNamespace, "circle");
    craterOuter.setAttribute("cx", crater.x);
    craterOuter.setAttribute("cy", crater.y);
    craterOuter.setAttribute("r", crater.r);
    craterOuter.setAttribute("fill", "rgba(0, 0, 0, 0.15)");
    moonSvg.appendChild(craterOuter);

    const craterInner = document.createElementNS(svgNamespace, "circle");
    craterInner.setAttribute("cx", crater.x - crater.r * 0.3);
    craterInner.setAttribute("cy", crater.y - crater.r * 0.3);
    craterInner.setAttribute("r", crater.r * 0.4);
    craterInner.setAttribute("fill", "rgba(255, 255, 255, 0.1)");
    moonSvg.appendChild(craterInner);
}

