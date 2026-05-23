// ===== SPARKLES DINÁMICOS - DESLUMBRAMIENTOS CON VIDA =====
export function initDynamicSparkles() {
    const container = document.getElementById('stars-container');
    if (!container) return;

    // Crear contenedor para sparkles
    const sparklesContainer = document.createElement('div');
    sparklesContainer.id = 'sparkles-container';
    sparklesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
        pointer-events: none;
        overflow: hidden;
    `;
    
    // Insertar después de stars-container en el DOM
    container.parentNode.insertBefore(sparklesContainer, container.nextSibling);

    // Crear múltiples sparkles
    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.className = 'dynamic-sparkle';
        
        // Posición aleatoria inicial - AHORA EN TODA LA PANTALLA
        const x = Math.random() * 100;
        const y = Math.random() * 100; // Cambié de 60% a 100%
        
        // Tamaño aleatorio (más grandes ahora)
        const size = 4 + Math.random() * 12; // De 3px a 15px
        
        sparkle.style.cssText = `
            position: absolute;
            left: ${x}%;
            top: ${y}%;
            width: ${size}px;
            height: ${size}px;
            background: 
                linear-gradient(45deg, 
                    rgba(255,255,255,0) 0%, 
                    rgba(255,255,255,0) calc(50% - 1px), 
                    rgba(255,255,255,1) 50%, 
                    rgba(255,255,255,0) calc(50% + 1px), 
                    rgba(255,255,255,0) 100%),
                linear-gradient(-45deg, 
                    rgba(255,255,255,0) 0%, 
                    rgba(255,255,255,0) calc(50% - 1px), 
                    rgba(255,255,255,1) 50%, 
                    rgba(255,255,255,0) calc(50% + 1px), 
                    rgba(255,255,255,0) 100%);
            opacity: 0;
            filter: blur(0px);
            box-shadow: 
                0 0 ${size * 2}px rgba(255, 255, 255, 0.9),
                0 0 ${size * 3}px rgba(212, 175, 55, 0.7),
                0 0 ${size * 5}px rgba(255, 220, 120, 0.4);
        `;

        sparklesContainer.appendChild(sparkle);

        // Duración variable (2-5 segundos)
        const duration = 2 + Math.random() * 3;
        // Retraso antes de empezar
        const delay = Math.random() * 1;
        
        // Crear animación personalizada
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const endX = startX + (Math.random() * 40 - 20); // Movimiento ±20%
        const endY = startY + (Math.random() * 40 - 20);

        sparkle.style.animation = `
            sparkle-float ${duration}s ease-in-out ${delay}s forwards
        `;
        
        // Agregar variables CSS para la animación
        sparkle.style.setProperty('--start-x', `${startX}%`);
        sparkle.style.setProperty('--start-y', `${startY}%`);
        sparkle.style.setProperty('--end-x', `${endX}%`);
        sparkle.style.setProperty('--end-y', `${endY}%`);

        // Eliminar sparkle después de que termine la animación
        setTimeout(() => {
            sparkle.remove();
        }, (delay + duration) * 1000);

        // Crear otro sparkle cuando este termina
        setTimeout(() => {
            createSparkle();
        }, (delay + duration) * 1000 + 300); // Más rápido
    }

    // Iniciar muchos sparkles simultáneamente (5 en lugar de 3)
    for (let i = 0; i < 5; i++) {
        setTimeout(() => createSparkle(), i * 400); // Intervalo de 400ms
    }
}

