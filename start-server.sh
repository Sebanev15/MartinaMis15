#!/bin/bash
# Script para iniciar el servidor local y probar la página

echo "🚀 Iniciando servidor local..."
echo "================================================"
echo "Puedes acceder a la página en:"
echo "  http://localhost:5500"
echo "================================================"
echo ""
echo "📝 Mejoras implementadas:"
echo "  ✅ Luna única, grande y realista con detalles avanzados"
echo "  ✅ Parallax suave en scroll para la luna"
echo "  ✅ Overlay con gradientes más dramáticos y nebulosos"
echo "  ✅ Efectos mágicos mejorados (glow, partículas, rays)"
echo "  ✅ Pantalla inicial más detallada y impactante"
echo "  ✅ Tipografía mejorada en invitación y carta"
echo "  ✅ Animaciones de levitación más suaves y realistas"
echo "  ✅ Partículas más visibles y brillantes"
echo "  ✅ Sombras y profundidad 3D mejoradas"
echo ""
echo "💡 Cambios principales en archivos:"
echo "  - scripts/stars.js: Luna única y realista"
echo "  - scripts/moon-scroll-parallax.js: Nuevo (parallax en scroll)"
echo "  - scripts/main.js: Inicialización del parallax de luna"
echo "  - styles/background.css: Mejor sombra de luna"
echo "  - styles/overlay.css: Gradientes y efectos mejorados"
echo "  - styles/magic-effects.css: Efectos más dramáticos"
echo "  - styles/envelope.css: Mejor sombreado del sobre"
echo "  - styles/letter.css: Tipografía y estilos mejorados"
echo ""
echo "✨ Presiona Ctrl+C para salir"
echo "================================================"

# Verificar si python está disponible
if command -v python &> /dev/null; then
    python -m http.server 5500
elif command -v python3 &> /dev/null; then
    python3 -m http.server 5500
else
    echo "❌ Python no encontrado. Por favor instala Python o usa Live Server en tu IDE."
fi

