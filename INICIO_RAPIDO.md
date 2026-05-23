# 🚀 INICIO RÁPIDO - Mejoras v3.0

## ⚡ En 30 segundos

```bash
# 1. Navega a la carpeta
cd MartinaMis15

# 2. Inicia servidor (elige uno)
# Opción A - Python
python -m http.server 5500

# Opción B - Node
npx http-server -p 5500

# 3. Abre navegador
# http://localhost:5500

# 4. ¡Disfruta!
```

---

## 👀 Qué Ver Primero

### 1. La Luna 🌙
- Busca en esquina superior derecha
- **280px en desktop, 180px en mobile**
- ¿Ves los cráteres detallados?
- ¿Y los rayos radiantes?
- Scroll hacia abajo → la luna se mueve sutilmente

### 2. El Overlay (Pantalla Inicial) 🎭
- "Tienes una invitación especial" → texto más grande y con gradiente
- Fondo con colores púrpura/azul (nebulosa mejorada)
- Shimmer animation (brillo que oscila)
- "Toca para abrir" → Pulse más intenso

### 3. El Sobre 💌
- Hover → sombra más dramática
- Partículas más visibles
- Glow interno más intenso
- Al abrir → rayos de luz mejorados

### 4. Las Animaciones ✨
- Levitación del sobre más suave
- Partículas más brillantes
- Fade-in más elegante

---

## 📱 Prueba en Mobile

```bash
# En mismo móvil/PC en red local:
# 1. Obtén IP de tu máquina
ipconfig  # Windows
# o
ifconfig  # Mac/Linux

# 2. En móvil, accede a:
# http://TU_IP:5500
```

---

## 🎨 Personalización Rápida

### Cambiar tamaño de luna
Edita `scripts/stars.js` línea 27:
```javascript
const moonConfig = isMobile
    ? { top: 12, left: 72, size: 200 }  // Aumenta de 180 a 200
    : { top: 10, left: 75, size: 320 }  // Aumenta de 280 a 320
```

### Cambiar intensidad de parallax
Edita `scripts/moon-scroll-parallax.js` línea 20:
```javascript
const moveX = scrollProgress * 20 * factor;  // Cambiar 15 por 20 (más movimiento)
```

### Cambiar brillo de efectos mágicos
Edita `styles/magic-effects.css`:
- `.magic-glow { opacity: 0.9; }` ← aumentar número
- `.particle { box-shadow: ... }` ← aumentar blur

### Cambiar texto de bienvenida
Edita `index.html` línea ~29:
```html
<div class="invitation-prompt">
    Tu texto aquí
</div>
```

---

## 🔍 DevTools Debugging

### Ver si todo carga bien
```javascript
// En Console (F12):
// Verifica que no haya errores
console.log('Verificar scripts');
// Debería aparecer sin errores rojos

// Verifica la luna
document.querySelector('.moon-svg')
// Debería retornar el elemento SVG

// Verifica que parallax funciona
window.addEventListener('scroll', () => console.log('Scrolling'))
```

---

## 📊 Comparar Antes vs Después

### Abrir 2 navegadores lado a lado

**Rama anterior:**
```bash
# Si tienes git:
git log --oneline  # Ver commits anteriores
git checkout <commit-hash>  # Volver a versión anterior
```

**Con cambios (actual):**
- Todos los cambios están en los archivos modificados

---

## 🎯 Validación Rápida

- [ ] ¿Se ve la luna grande?
- [ ] ¿Tiene detalles (cráteres, rayos)?
- [ ] ¿Se mueve al scroll?
- [ ] ¿El overlay es mágico?
- [ ] ¿El texto es grande?
- [ ] ¿El sobre brilla al hover?
- [ ] ¿Las partículas se ven?
- [ ] ¿Sin errores en console?

Si todas marcan ✅ → **¡Todo bien!**

---

## 🆘 Troubleshooting Rápido

### La luna no aparece
```javascript
// En console:
document.getElementById('stars-container')
// Si retorna null → problema con HTML
```

### La luna aparece pero sin detalles
```css
/* Verifica en DevTools: */
/* Inspect moon-svg → busca filter attribute */
/* Debería tener filter="url(#moonTexture...)" */
```

### El parallax no funciona
```javascript
// En console mientras scrolleas:
window.scrollY  // Debería cambiar
// Si no cambia → no estás scrolleando en elemento scrollable
```

### Los efectos no se ven
```css
/* Aumentar opacidad en DevTools: */
.magic-glow { opacity: 1 !important; }  /* De 0.75 a 1 */
```

---

## 📈 Performance Check

### En DevTools (F12)
1. Abre "Performance" tab
2. Click "Record"
3. Scroll hacia abajo
4. Click "Stop"
5. Revisa gráfico:
   - Verde = bueno
   - Rojo = problema

**Esperado:** Mayormente verde, FPS ~60

---

## 🎓 Estructura de Archivos

```
MartinaMis15/
├── index.html                    ← Estructura
├── scripts/
│   ├── main.js                   ← Entrada
│   ├── stars.js                  ← Luna (modificado)
│   ├── moon-scroll-parallax.js   ← Nuevo parallax
│   └── ...otros scripts
├── styles/
│   ├── variables.css             ← Colores/timing
│   ├── background.css            ← Luna/estrellas (modificado)
│   ├── overlay.css               ← Pantalla inicial (modificado)
│   ├── magic-effects.css         ← Efectos (modificado)
│   ├── envelope.css              ← Sobre (modificado)
│   ├── letter.css                ← Carta (modificado)
│   └── ...otros estilos
├── MEJORAS_VISUALES_V3.md        ← Documentación completa
├── NOTAS_DEVELOPER.md            ← Para desarrolladores
└── README.md                     ← Documentación original
```

---

## 📚 Documentos de Referencia

| Archivo | Contenido |
|---------|-----------|
| `MEJORAS_VISUALES_V3.md` | **Documentación completa** de cambios |
| `NOTAS_DEVELOPER.md` | Notas técnicas para desarrollador |
| `CAMBIOS.md` | Cambios anteriores (v2.0) |
| `README.md` | Documentación técnica completa |

**Recomendación:** Lee `MEJORAS_VISUALES_V3.md` primero

---

## 🎉 ¡Listo!

Tu invitación está lista con:
- ✅ Luna realista y detallada
- ✅ Overlay mágico e inmersivo
- ✅ Efectos más dramáticos
- ✅ Animaciones suaves
- ✅ Compatibilidad total
- ✅ Sin degradación de performance

**Pregunta:** ¿Qué cambios quieres hacer?

Opciones:
- 🎨 Cambiar colores
- 📐 Cambiar tamaños
- ⚡ Más dramático o menos
- 🎬 Cambiar animaciones
- 📱 Ajustar responsive

**Solo dime y lo ajustamos** 🚀

---

## 💬 Feedback

Si ves algo que mejorar o quieres cambiar:

```
Tell me:
1. Qué quieres cambiar
2. Cómo te gustaría que se vea
3. En qué dispositivo lo probaste
```

**Ejemplo:**
> "La luna es muy grande, quiero que sea un 20% más pequeña"
> "El overlay es muy oscuro, quiero más brillo"
> "Las partículas se mueven muy rápido"

---

## ✨ ¡A Disfrutar!

Tu invitación de Mis 15 ahora es **mucho más bella** 🎉

```
          🌙
        ✨  ✨
      ✨    ✨
    ✨ Martina Mis 15 ✨
      ✨    ✨
        ✨  ✨
          
     Una noche mágica ✨
```

---

*Última actualización: 2026-05-22*
*Versión: 3.0*

