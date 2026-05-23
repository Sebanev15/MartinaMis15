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
        const size = 3 + Math.random() * 9; // 3px a 12px
        
        sparkle.style.cssText = `
            position: absolute;
            left: ${x}%;
            top: ${y}%;
            width: ${size}px;
            height: ${size}px;
            opacity: 0;
        `;

        sparkle.style.setProperty('--sparkle-size', `${size}px`);

        sparklesContainer.appendChild(sparkle);

        // Duración variable (2-5 segundos)
        const duration = 2.8 + Math.random() * 2.7;
        // Retraso antes de empezar
        const delay = Math.random() * 1.2;
        
        // Crear animación personalizada
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const endX = startX + (Math.random() * 24 - 12); // Movimiento ±12%
        const endY = startY + (Math.random() * 24 - 12);

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
