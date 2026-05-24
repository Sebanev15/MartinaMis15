# Martina Mis 15

Invitacion web interactiva para un cumple de 15 años (Martina) con animacion de sobre 3D, ambiente nocturno con parallax y secciones informativas del evento.

**📄 Ver cambios recientes:** en esta misma guía, en "Mejoras recientes" y "Notas técnicas".

---

## Datos del evento (actuales en la web)
- **Nombre:** Martina ("Martu").
- **Fecha evento:** 10 de octubre de 2026.
- **Hora evento:** 21:30 hs.
- **Lugar:** Salón El Portal.
- **Dirección:** Alejandro Fiol de Pereda esq, Av. Millán (Uruguay).
- **Dress Code:** Formal elegante.
- **Datos de regalos:** BROU - Caja de Ahorro $ / Cuenta: 1234567-8 / Alias: MARTU.15.RUIZ.

---

## Funcionalidades principales
- **Overlay interactivo:** Sobre 3D animado con partículas mágicas; click abre solapa, levanta carta y hace handoff a pantalla completa.
- **Fondo dinámico:** Nebulosa con estrellas parpadeantes, lunas con cráteres y parallax automático (solo desktop).
- **Cuenta regresiva:** Actualización en tiempo real (días, horas, minutos, segundos).
- **Secciones info:** Ubicación, dress code, regalos, confirmación, mapa embebido.
- **Formulario RSVP:** Conectado a Google Apps Script; valida nombre y asistentes, y almacena nombre, acompañantes y consideraciones.
- **"Cómo llegar":** Botón que abre Google Maps con dirección predefinida.
- **Fade-in scroll:** Secciones se revelan mientras scrolleas.
- **Responsive:** Optimizado para mobile (modo liviano) y desktop (animación completa).

### Mejoras recientes
- **Countdown robusto:** usa fecha local explícita y se detiene al llegar a cero.
- **Custom select accesible:** abre/cierra con teclado, cierra al elegir y limpia el estado de error.
- **Formulario más sólido:** maneja respuestas HTTP fallidas y reinicia el estado visual correctamente.
- **Guardas defensivas:** los handlers principales no fallan si falta algún nodo del DOM.
- **Animación del sobre refinada:** el mismo `.letter` sale del sobre y se expande de forma más natural, con el contenido creciendo junto con la carta.
- **`event-date` interactivo:** hover visible con pulso, glow y leve elevación.

---

## Secciones de contenido

### 1. **Sección Hero (Bienvenida)**
- **Descripción:** Primera sección visible después de abrir el sobre, con presentación elegante de la celebrante.
- **Contenido:**
  - Título principal: "Martu" (nombre de la celebrante)
  - Subtítulo: "Mis 15 Años"
  - Frase inspiradora: "Una noche mágica nos espera"
- **Estilo:** Fuente elegante Dancing Script, con efecto de sombra dorada.

### 2. **Sección Faltan (Cuenta Regresiva)**
- **Descripción:** Muestra el tiempo restante hasta el evento en tiempo real.
- **Formato:** Días, Horas, Minutos, Segundos en cuadros estilizados.
- **Actualización:** Automática cada segundo.
- **Utilidad:** Mantiene el entusiasmo hacia la fecha del evento.

### 3. **Sección Dirección (Ubicación)**
- **Descripción:** Información detallada del lugar del evento.
- **Contenido:**
  - Nombre del salón: "El Portal"
  - Dirección: "Alejandro Fiol de Pereda esq, Av. Millán"
  - Horario: 21:30 hs
  - Mapa interactivo embebido de Google Maps
  - Botón "Cómo llegar" que abre Google Maps con navegación
- **Interactividad:** El botón permite a los invitados obtener direcciones desde su ubicación actual.

### 4. **Sección Dress Code (Código de Vestimenta)**
- **Descripción:** Especifica el tipo de vestimenta esperada para el evento.
- **Contenido:**
  - **Código:** FORMAL ELEGANTE
  - **Descripción:** "Detalles que brillan como estrellas" (sugerencia de elementos elegantes)
- **Propósito:** Guiar a los invitados sobre el nivel de formalidad esperado.

### 5. **Sección Regalos (Opciones de Contribución)**
- **Descripción:** Información para quienes desean contribuir económicamente.
- **Contenido:**
  - Banco: BROU - Caja de Ahorro en pesos uruguayos
  - Número de cuenta: 1234567-8
  - Titular: Martina Ruiz
  - Alias para transferencias: MARTU.15.RUIZ
- **Nota:** Se presenta de forma elegante y discreta, sin presión.

### 6. **Sección Confirmación (Formulario RSVP)**
- **Descripción:** Formulario para que los invitados confirmen su asistencia.
- **Campos:**
  - **Nombre y Apellido:** Campo de texto obligatorio
  - **¿Cuántos asisten?:** Select personalizado con opciones (Solo yo, Yo + 1, Yo + 2, Yo + 3 acompañantes)
  - **Consideraciones/Alergias:** Textarea para especificar restricciones dietéticas o preferencias
- **Envío:** Conectado a Google Apps Script para almacenamiento automático
- **Validación:** Todos los campos son obligatorios

---

## Mejoras visuales implementadas

### Animaciones y efectos
- **Destellos de estrellas:** Forma de X+ como en caricaturas, con rotación dinámica y brillo realista
- **Luna prominente:** Tamaño aumentado (480px desktop, 300px mobile) con efecto de respiración sutil
- **Iluminación del sobre:** Gradientes suaves sin formas geométricas definidas (inner-glow y light-rays)
- **Fondos difusos:** Destellos de color que respiran lentamente, máximo 2-3 visibles simultáneamente
- **Magic glow:** Efecto de luz mágica alrededor del sobre durante la apertura

### Optimizaciones responsivas
- **Desktop:** Animaciones completas, parallax automático, luna grande (480px)
- **Mobile:** Modo lite-motion optimizado, luna más pequeña (300px), transiciones suaves
- **Bajo poder:** Detección automática, desactivación de animaciones complejas

---

### HTML Sections (orden en DOM)
1. `#welcome-overlay`: Overlay inicial con sobre animado, instrucción de tap y overlay fullscreen para la carta.
2. `.nebula-bg`: Fondo fijo con gradientes nebulosos.
3. `#stars-container`: Contenedor para estrellas y lunas (SVG + divs).
4. `#motion-permission-btn`: Botón para activar parallax (oculto por defecto).
5. `#main-content`:
   - `.hero`: Bienvenida con h1, h3, línea decorativa y párrafo.
   - `.info-section`: Secciones de info (Faltan, Dirección, Dress Code, Regalos, Confirmación).
   - `.photo-placeholder`: Espacios para fotos (vacíos).
   - `.map-container`: iframe embebido de Google Maps.
   - `form`: Formulario con campos de nombre, acompañantes (custom-select), menú y botón submit.

### CSS Root Variables (variables.css)
```
--bg-color: #0a0e27
--bg-gradient-1: #1a0f3a
--bg-gradient-2: #0d1b2a
--gold: #d4af37
--gold-light: #e8c547
--gold-dark: #b8941f
--silver: #e8e8e8
--text-light: #f5f5f5
--rose: #d946a6
--rose-light: #f08bc7
--particle-blur: 0.6px
--letter-lift: -220px
--tilt-envelope-rotateX/Y: Parallax tilt envelope
--tilt-content-rotateX/Y: Parallax tilt contenido
--tilt-content-translateX/Y: Parallax traslación contenido
```

### Funciones JavaScript clave

#### `openInvitation()`
- Triggered: click en sobre (desktop con animación completa).
- Flujo:
  1. Marca sobre como `.open`, desactiva punteros.
  2. Estabiliza envelope (animation: none).
  3. Enciende luz ambiente (`#welcome-overlay.overlay-lit`).
  4. Espera a animación de levitación (`animationiteration`).
  5. Sincroniza fullscreen-letter con posición de carta.
  6. Inicia zoom fullscreen (`.is-zooming`).
  7. Oculta sobre cuando zoom avanza (`.full-screen`).
  8. Revela contenido principal (`revealMainContent()`).
  9. Cierra overlay (`#welcome-overlay.opened`).
  10. Limpia estilos internos.

#### `openInvitationLite()`
- Triggered: click en sobre (mobile o bajo poder).
- Flujo simplificado: oculta overlay rápidamente sin animación compleja.
- Resultado: transición suave a contenido sin saltos de texto.

#### `isLowPowerDevice()`
- Detecta dispositivos de baja potencia y preferencias del usuario.
- Checkea:
  - `prefers-reduced-motion: reduce`
  - `navigator.connection.saveData`
  - `navigator.deviceMemory <= 3` GB
  - `navigator.hardwareConcurrency <= 3` cores
- Retorna: `true` → usa modo lite.

#### `isParallaxActive()`
- Retorna `true` solo si:
  - Fondo stars existe
  - NO hay `prefers-reduced-motion`
  - NO es mobile (`max-width: 768px`)
  - Puntero es fino (`pointer: fine`)
  - NO es bajo poder
- Resultado: parallax solo en desktop con recursos suficientes.

#### `applyParallaxFrame(now)`
- RAF loop contínuo que aplica parallax automático usando sine waves.
- Calcula:
  - `targetX = Math.sin(elapsed * 0.4) * 20` (movimiento X automático)
  - `targetY = Math.cos(elapsed * 0.5) * 20` (movimiento Y automático)
  - Suaviza con lerp: `currentX += (targetX - currentX) * 0.05`
- Aplica:
  - Traslación a `#stars-container`
  - Tilt al envelope (`--tilt-envelope-rotateX/Y`)
  - Tilt suave al contenido (`--tilt-content-rotateX/Y * 0.6`)
  - Traslación al contenido (`--tilt-content-translateX/Y`)
- Agrega clase `.has-tilt` al body si movimiento es visible.

#### `createStars()`
- Crea estrellas (dots) y lunas (SVG) dinámicamente.
- Mobile lite: 48 estrellas, 1 luna (top: 14%, left: 78%, size: 96px).
- Desktop: 120 estrellas, 2 lunas (una arriba derecha, otra abajo izquierda).
- Cada luna incluye:
  - Gradientes radiales (brillo y sombra).
  - Cráteres principales (5 posiciones fijas).
  - Cráteres aleatorios (15 pequeños).
- Animación twinkle: opacidad 0.3 → 1 → 0.3 (3s, infinita).

#### `updateCountdown()`
- Target local explícito: `new Date(2026, 9, 10, 21, 30, 0)`
- Calcula cada segundo: diferencia en días, horas, minutos, segundos.
- Actualiza `#days`, `#hours`, `#minutes`, `#seconds` con padding de 2 dígitos.
- Al llegar a cero, fija el display en `00` y detiene el intervalo.

#### `observeElements()`
- IntersectionObserver para `.fade-in-on-scroll`.
- Threshold: 0.1; rootMargin: '0px 0px -50px 0px'.
- Al ingresar: agrega clase `.visible` (opacity: 1, translateY: 0).
- Desactiva observador después (una sola vez).

#### `handleFormSubmit(e)`
- Previene default y valida nombre + asistentes.
- Desactiva botón submit y cambia texto a "Enviando...".
- Prepara FormData con: Nombre, Acompañantes, Consideraciones.
- POST a Google Apps Script (scriptURL).
- Respuesta: alert con nombre de confirmación.
- Limpia formulario, select visual y estado de error.
- Manejo de errores: alert si falla fetch o responde HTTP mal.
- Finalmente: reactiva botón.

#### Custom Select Logic
- `.custom-select-wrapper` envuelve select nativo (oculto).
- Crea DOM alternativo con `.custom-select` y `.custom-options`.
- Click en trigger abre/cierra dropdown y actualiza `aria-expanded`.
- Seleccionar opción: agrega `.selected`, actualiza span de trigger, sincroniza select nativo y cierra el dropdown.
- Click fuera: cierra dropdown.
- Keyboard: Enter/Space abre/cierra dropdown.

---

## Diferencias entre móviles y computadoras

### Mobile (`max-width: 768px`)
- **Detección:** `matchMedia('(max-width: 768px)')` y/o `pointer: coarse`.
- **Animación:** Modo liviano (`openInvitationLite()`); sin sobre flotante, sin handoff, sin zoom completo.
- **Parallax:** Desactivado (evita jitter).
- **Estrellas:** 48 (en lugar de 120).
- **Lunas:** 1 (en lugar de 2).
- **Overlay:** Transición rápida sin efectos complejos.
- **Texto:** Ajustado con `clamp()` para evitar overflow y saltos.
- **Interacción:** Toque (sin hover).
- **Instruction:** "Toca para continuar" (en lugar de "Toca para abrir").

### Desktop (`min-width: 769px`)
- **Detección:** `matchMedia('(min-width: 769px)')` y `pointer: fine`.
- **Animación:** Completa (`openInvitation()`); sobre flotante, levitación, handoff, zoom fullscreen.
- **Parallax:** Activo (si dispositivo tiene recursos y sin `prefers-reduced-motion`).
- **Estrellas:** 120 (con twinkle).
- **Lunas:** 2 (ubicadas estratégicamente).
- **Overlay:** Transición larga (1.2s) con luz ambiente encendida.
- **Texto:** Scales dinámicos con `clamp()` para grandes pantallas.
- **Interacción:** Hover, puntero fino, mayor precisión.
- **Instruction:** "Toca para abrir".

### Detección de bajo poder
- Si `isLowPowerDevice()` retorna `true`, fuerza modo lite incluso en desktop.
- Criterios:
  - `prefers-reduced-motion: reduce` (preferencia de usuario).
  - `navigator.connection.saveData` (modo ahorro).
  - RAM ≤ 3 GB.
  - CPU ≤ 3 cores.

---

## Animaciones CSS principales

### Envelope 3D (`.envelope`)
- `.floating`: levita arriba-abajo continuamente (antes del click).
- `.open`: transición a posición central, rotación 0, opacidad.
- `.full-screen`: oculta cuando zoom termina.
- `.is-hovering`: activa levitación.
- `.is-opening`: intensifica iluminación durante zoom.
- Transforms: perspective 3D con rotatex/rotatey/tilt basado en variables CSS de parallax.

### Fullscreen Letter (`.fullscreen-letter`)
- Clona contenido de carta a pantalla completa.
- `.is-visible`: opacity 1, aparece.
- `.is-zooming`: escala de pequeño a 100% viewport (transform-origin: center center).
- Transición: 1s ease-out.

### Fade-in on Scroll
- Estado base: opacity 0, translateY(30px).
- Al agregar `.visible`: opacity 1, translateY(0), transition 0.8s ease-out.

### Particles (`.particle`)
- Animación de ascenso + desvanecimiento usando CSS animations.
- Delay y duración controlados por inline CSS vars (`--d`, `--s`).
- Blur suave: `var(--particle-blur)`.

### Twinkle (`.star-dot`)
- 0%, 100%: opacity 0.3.
- 50%: opacity 1.
- Duración: 3s; repeat: infinite.

---

## Criterios de detección (resumen)

| Característica | Mobile | Desktop | Bajo Poder |
|---|---|---|---|
| Media Query | max-width: 768px | min-width: 769px | N/A |
| Puntero | coarse | fine | N/A |
| Animación sobre | Lite | Completa | Lite |
| Parallax | No | Sí | No |
| Estrellas | 48 | 120 | Menos |
| Modo reducido | Sí | No | Sí |
| Checkeos | deviceMemory, hardwareConcurrency, saveData, prefers-reduced-motion |

---

## Variables de configuración importantes

### Timing
- `overlayFadeDelayMs`: Tiempo total de fade del overlay (1200ms, definido en CSS: `transition: opacity 1.2s`).
- `mainRevealLeadMs`: Adelanto de reveal del main-content respecto al overlay (150ms aprox).
- `letterLiftMs`: Tiempo de levitación del sobre antes de handoff (~1.5s).
- `hoverCycleMs`: Duración del ciclo de levitación (~2s).
- `updateCountdown()`: Update cada 1000ms.

### Coordenadas y tamaños
- Estrellas mobile: 48.
- Estrellas desktop: 120.
- Lunas mobile: 1 (size: 96px, top: 14%, left: 78%).
- Lunas desktop: 2 (size: 140px/100px, posiciones fijas).
- Parallax range: ±20px (sine wave * 20).
- Tilt envelope: ±6deg (clamp).
- Tilt content: ±3.6deg (60% del tilt envelope).

### Google Apps Script
- **scriptURL:** `https://script.google.com/macros/s/AKfycbxlJC-JY7BLCCu1Y0n35xeV4cmYSNC-nse8TsWdpfFQjKyCVOQC5OW_peLWWvDYiWyjqQ/exec`
- **Campos POST:** Nombre, Acompañantes, Consideraciones.
- **Respuesta esperada:** Status 200 (cualquier respuesta válida).

### Google Maps
- **Embed iframe:** Salón El Portal, Uruguay (coordenadas: -34.87526, -56.18994).
- **Link "Cómo llegar":** https://www.google.com/maps/dir/?api=1&destination=Salón%20El%20Portal%2C%20Alejandro%20Fiol%20de%20Pereda%20esq%2C%20Av.%20Millán

---

## Media Queries principales
```css
@media (prefers-reduced-motion: reduce) {
  /* Desactiva todas las animaciones complejas */
  animation: none !important;
  transition: none !important;
}

@media (max-width: 768px) {
  /* Mobile adjustments */
  font-size: clamp(...);
  parallax: disabled;
  stars: 48;
  moons: 1;
}
```

---

## Flujo de carga y eventos

1. **Page Load:**
   - CSS aplica bg, nebula, z-index stacking.
   - JavaScript detecta dispositivo (mobile, bajo poder, etc).

2. **Stars & Moons init (`createStars()`):**
   - Crea DOMs dinámicamente.
   - Inyecta SVG con gradientes y cráteres.

3. **Parallax init (`applyParallaxFrame()`):**
   - Comienza RAF loop si `isParallaxActive()`.
   - Aplica sine wave movement si no es mobile/bajo poder.

4. **Overlay logic:**
   - Modo lite: `useLiteMotion = isLowPowerDevice() || mobileLiteQuery.matches`.
   - Si lite: agrega clase `.lite-motion` al body.

5. **Envelope click:**
   - Desktop: `openInvitation()` (animación completa).
   - Mobile/Bajo poder: `openInvitationLite()` (transición rápida).

6. **Main content reveal:**
   - Scroll observer activa `.visible` en `.fade-in-on-scroll`.

7. **Form submit:**
   - Valida, prepara datos, POST a Google Apps Script.
   - Maneja respuesta/error, limpia form.

---

## Notas técnicas

- **Archivo único:** Todo en `index.html` (HTML + CSS + JS).
- **No requiere build:** Abre directamente en navegador.
- **Scroll smooth:** `scroll-behavior: smooth;` en html, body.
- **Overflow hidden:** `overflow-x: hidden;` para evitar scrollbars horizontales.
- **Box sizing:** `box-sizing: border-box;` en `*`.
- **Font stack:** Dancing Script (cursive), Playfair Display (serif), Montserrat (sans-serif) desde Google Fonts.
- **Z-index stacking:** 0 (bg) → 1 (stars) → 2000 (overlay) → 3000+ (modal/form).
- **Pointer events:** Desactivados durante animaciones para evitar clicks múltiples.

---

Nota técnica (animación del sobre):
- La apertura desktop ahora usa el mismo elemento `.letter` para salir del sobre y expandirse, con un morph más natural y un contenido que escala junto con la carta.
- La expansión final quedó más amplia y el texto ya no aparece sobredimensionado desde el inicio.
- En dispositivos de bajo poder, el flujo sigue siendo ligero: se evita la animación completa y se prioriza una salida segura/inmediata.
- Para pruebas rápidas: agrega `?forceMotion=1` al URL para forzar las animaciones completas (ej. https://sebanev15.github.io/MartinaMis15/?forceMotion=1) o `?forceLite=1` para forzar el modo lite.

Nota técnica (event-date):
- La fecha del evento ahora tiene un hover animado propio con pulso, brillo y leve elevación para que el estado interactivo se note claramente.

## Despliegue y cómo subir los cambios (rápido)
Sigue estos pasos para preparar, verificar y subir los cambios al repositorio remoto.

1) Sincronizar y crear rama
   - git checkout main
   - git pull origin main
   - git checkout -b fix/event-date-and-animaciones

2) Probar localmente
   - Abrir en WebStorm con Live Server / Open in Browser (recomendado) 
   - O usar un servidor estático: `python -m http.server 8000` o `npx serve .` y abrir http://localhost:8000
   - Verificaciones clave:
     * Hacer scroll hasta la sección “Faltan” y confirmar que el elemento `.fade-in-on-scroll` recibe la clase `.visible` (DevTools → Elements).
     * Confirmar que `.event-date` anima en entrada y en hover. Si no, recargar con caché vacío (Ctrl+F5) y comprobar que `body` no tenga `.lite-motion` ni que `prefers-reduced-motion` esté activado.

3) Commit y push
   - git add -A
   - git commit -m "Suavizado: event-date reveal y hover; ajustes countdown"
   - IMPORTANTE: añadir trailer Co-authored-by en el commit message si corresponde:

     Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>

   - git push -u origin fix/event-date-and-animaciones

4) Crear Pull Request
   - Abrir PR contra `main` con descripción breve y pasos de prueba (ver Punto 2).

5) Archivar cambios y notas de pruebas
   - Añadir en el PR la lista de archivos modificados y capturas (si las hay).

## Archivos modificados (esta iteración)
- styles/countdown.css (eventDateReveal, eventDateHover, glow/pulse de .event-date y regla específica para .fade-in-on-scroll > .event-date)
- styles/content.css (revelado fade-in ajustes, visibilidad/pointer-events)
- scripts/scroll-observer.js (threshold/rootMargin/delay tuning)
- scripts/main.js (detector de movimiento simplificado: ya no fuerza `body.lite-motion` por ancho de pantalla; ahora solo activa modo lite cuando `isLowPowerDevice()` retorna true)
- scripts/envelope-handlers.js (morph del mismo elemento del sobre, expansión con anclaje real y escala del contenido)
- styles/letter.css (expansión del sobre, escala del contenido y ajuste visual del fullscreen)
- README.md (instrucciones de despliegue)

## Notas finales
- No hay paso de build: sitio estático. 
- Si el botón “Cómo llegar” fue modificado localmente por el mantenedor, confirmar que el PR no sobreescriba cambios manuales.
- En caso de emergencia, revertir la rama con `git restore --staged . && git checkout -- .` o usar `git reset --hard origin/main` (ten cuidado: esto descarta cambios locales).

- **Accessibility:** `role="button"`, `tabindex="0"`, `aria-label` en envelope.
- **Performance:** RAF para parallax, IntersectionObserver para fade-in.

---

## Problemas conocidos y consideraciones

1. **Animación de sobre en mobile:** En algunos dispositivos, la animación puede no ser fluida.
   - **Solución:** Modo lite activa automáticamente.
   - **Mejora:** Detectar frame rate y adaptar animación.

2. **Texto moviéndose en mobile:** Parallax puede causar saltos en contenido.
   - **Solución:** Parallax desactivado en mobile.

3. **"Cómo llegar" no funciona:** Verificar que Google Maps URL sea correcta.
   - **Solución:** Actualizar `href` con dirección exacta.

4. **RSVP no recibe datos:** Script URL puede estar expirada o cambió.
   - **Solución:** Regenerar URL en Google Apps Script.

---

## Preguntas para futuros desarrolladores (responder si es necesario)

1. **Fecha definitiva del evento:** ¿Cambió del 10 de octubre? fecha difinitiva es el 10 de octubre de 2026 a las 21:30 hs
2. **Ubicación:** ¿Sigue siendo Salón El Portal en Uruguay? sí, sigue siendo el mismo lugar
3. **Estilo/Diseño:** ¿Cambios en colores, fuentes o efectos? hay libertad de modificar el diseño siempre que se mantenga la estetica de ambiente nocturno, elegancia y magia, tener en cuenta que es una invitacion para un cumpleaños de 15 años, por lo que se busca un diseño elegante pero con toques de fantasía y diversión, los colores principales pueden mantenerse (azul oscuro, dorado, plateado) pero se pueden ajustar tonos o agregar acentos si se desea, las fuentes pueden mantenerse o cambiarse por otras similares que transmitan la misma sensación de elegancia y magia, los efectos de animación pueden mantenerse o ajustarse para mejorar la fluidez o adaptarse mejor a diferentes dispositivos, siempre buscando un equilibrio entre estética y rendimiento.
4. **Modo lite mobile:** ¿Forzar animación completa incluso en mobile? Si se puede generar una animación optimizada para mobile que no quede raro ni genere "saltos" si, sino no
5. **Audio/Música:** ¿Agregar música de fondo?
6. **Fotos:** ¿Llenar `.photo-placeholder` con imágenes reales? por ahora no se incluyen fotos reales, si se quiere añadir fotos reales como placeholders se puede añadir
7. **Idioma:** ¿Mantener solo español o agregar otro idioma? solo español
8. **Compartir:** ¿Agregar botones de compartir en redes? no
9. **QR:** ¿Incluir QR code para confirmación alternativa? no
10. **Términos/Privacy:** ¿Agregar footer con enlaces legales? no

---

## MEJORAS IMPLEMENTADAS (v2.0)

### 1. Transición Mejorada en Móvil

**Problema original:** La transición del sobre a la página inicial en móvil era brusca (800ms lineal), causando saltos visuales.

**Solución implementada:**
- ✅ Aumentado a 900ms con easing `cubic-bezier(0.4, 0, 0.2, 1)` para suavidad máxima
- ✅ **Transición en 3 fases animadas:**
  1. **Fase 0-30%:** Fade leve + reducción de backdrop-filter
  2. **Fase 30-70%:** Fade significativo + blur progresivo
  3. **Fase 70-100%:** Fade final + brillo sutil para sensación de "apertura"
- ✅ `#main-content` entra con `cubic-bezier(0.34, 1.56, 0.64, 1)` (easing elasticidad suave)
- ✅ Staggered entrada: `scale(0.98)` → `scale(1)` + `translateY(15px)` → `translateY(0)`
- ✅ Aplicado en: `styles/transitions.css` → `@keyframes mobile-overlay-fade-smooth` y `main-content-fade-smooth`

**Resultado:** Transición fluida, natural y sin saltos de contenido en todos los dispositivos móviles.

---

### 2. Mejoras de Código y Buenas Prácticas

#### 2.1 Separación de Responsabilidades
- ✅ **HTML:** `index.html` - estructura semántica limpia
- ✅ **CSS:** Modularizado en 12 archivos temáticos en `styles/`
- ✅ **JavaScript:** 9 módulos independientes en `scripts/` con ES6 imports

#### 2.2 Arquitectura de Estilos CSS
```
styles/
├── variables.css       # Variables raíz (colores, timing, easing)
├── reset.css           # Reset y estilos base
├── background.css      # Nebulosa, estrellas y lunas
├── overlay.css         # Overlay inicial y UI
├── envelope.css        # Estructura 3D del sobre
├── magic-effects.css   # Glow, partículas, luz interna
├── letter.css          # Carta interior y fullscreen
├── content.css         # Main content y secciones
├── countdown.css       # Estilos de cuenta regresiva
├── form.css            # Formulario y custom select
├── map.css             # Contenedor de mapa
└── transitions.css     # Transiciones suaves y responsive
```

**Ventajas:**
- Mantenibilidad: cada módulo tiene responsabilidad clara
- Reutilización: variables globales en `variables.css`
- Performance: carga selectiva posible
- Debugging: errores localizables rápidamente

#### 2.3 Arquitectura de JavaScript (ES6 Modules)
```
scripts/
├── main.js                    # Orquestador - punto de entrada
├── utils.js                   # Funciones reutilizables
├── stars.js                   # Generador de estrellas y lunas
├── parallax.js                # Sistema de parallax automático
├── envelope-handlers.js       # Lógica de apertura (lite y full)
├── countdown.js               # Actualización de cuenta regresiva
├── scroll-observer.js         # Fade-in on scroll
├── custom-select.js           # Lógica de select personalizado
└── form-handler.js            # Manejo de RSVP
```

**Ventajas:**
- Modularidad: cada módulo exporta funciones específicas
- Reutilización: imports/exports explícitos
- Testing: funciones puras y sin side-effects
- Mantenibilidad: cambios locales, impacto mínimo

#### 2.4 Eliminación de Código Duplicado
- ✅ Consolidadas funciones reutilizables en `utils.js`
- ✅ Extraída lógica de parallax a módulo independiente
- ✅ Centralizada detección de dispositivos (`isLowPowerDevice()`, `isMobileDevice()`)
- ✅ Eliminadas definiciones redundantes de animaciones

#### 2.5 Mejoras de Performance
- ✅ `will-change` selectivo en elementos animados
- ✅ GPU acceleration con `transform: translateZ(0)` en partículas
- ✅ Uso de `requestAnimationFrame` para parallax
- ✅ `IntersectionObserver` para fade-in on scroll
- ✅ Debounce/throttle helpers disponibles en `utils.js`
- ✅ Lazy loading de fuentes Google (display=swap)
- ✅ Backdrop filter con fallback para navegadores antiguos

#### 2.6 Buenas Prácticas Aplicadas
- ✅ **Documentación JSDoc:** comentarios claros en funciones críticas
- ✅ **Nombres descriptivos:** variables y funciones auto-documentadas
- ✅ **Error handling:** try-catch en fetch, validaciones en formularios
- ✅ **Accessibility:** ARIA labels, roles semánticos, keyboard support
- ✅ **Mobile-first:** media queries ordenadas de menor a mayor
- ✅ **CSS variables:** timing centralizado, fácil cambio de valores
- ✅ **Prefixes de navegador:** -webkit para máxima compatibilidad

---

### 3. Reestructuración del Proyecto

#### Antes:
```
MartinaMis15/
├── index.html (2339 líneas - HTML + CSS + JS incrustados)
├── index.js (vacío)
└── package.json
```

#### Después:
```
MartinaMis15/
├── index.html (234 líneas - HTML puro, importa módulos)
├── styles/
│   ├── variables.css
│   ├── reset.css
│   ├── background.css
│   ├── overlay.css
│   ├── envelope.css
│   ├── magic-effects.css
│   ├── letter.css
│   ├── content.css
│   ├── countdown.css
│   ├── form.css
│   ├── map.css
│   └── transitions.css
├── scripts/
│   ├── main.js
│   ├── utils.js
│   ├── stars.js
│   ├── parallax.js
│   ├── envelope-handlers.js
│   ├── countdown.js
│   ├── scroll-observer.js
│   ├── custom-select.js
│   └── form-handler.js
├── package.json
└── README.md
```

**Ventajas:**
- **91% reducción en tamaño de index.html** (2339 → 234 líneas)
- **Escalabilidad:** fácil agregar nuevas características en nuevos módulos
- **Colaboración:** múltiples desarrolladores pueden trabajar en paralelo
- **Versionado:** cambios por módulo, commits más claros
- **Testing:** módulos independientes se testean fácilmente

---

### 4. Compatibilidad Mantenida

✅ **Desktop (min-width: 769px):**
- Animación del sobre IDÉNTICA (sin cambios)
- Parallax automático funcionando igual
- Zoom fullscreen sin regresión
- Hover effects preservados

✅ **Mobile (max-width: 768px):**
- Transición mejorada (más suave, sin saltos)
- Estrellas y lunas optimizadas
- Parallax desactivado (sin impacto visual)
- Custom select funcional

✅ **Bajo Poder (RAM ≤3GB, cores ≤3):**
- Detección automática preservada
- Modo lite-motion activado sin cambios
- Sin degradación de experiencia

---

### 5. Detalles de la Transición Mejorada en Móvil

**Antes (800ms lineal):**
```
Overlay: fade-out 0.8s lineal
MainContent: fade-in 1s ease-in (desfasado)
Resultado: Efecto "cortante", cambio abrupto
```

**Después (900ms multi-fase):**
```
Overlay: 
  0-300ms: Fade 1→0.85, blur 0→2px, brightness 1→1 (sutil)
  300-600ms: Fade 0.85→0.4, blur 2→5px, brightness 1→1.05
  600-900ms: Fade 0.4→0, blur 5→8px, brightness 1.05→1.08

MainContent:
  0-350ms: scale 0.98→0.995, opacity 0→0.4, blur 3→2px
  350-700ms: scale 0.995→1.001, opacity 0.4→0.85, blur 2→1px
  700-1000ms: scale 1.001→1, opacity 0.85→1, blur 1→0px

Resultado: Transición suave, natural, sin saltos de layout
```

---

### 6. Pruebas Recomendadas

**Desktop:**
- [ ] Animación del sobre sin cambios
- [ ] Parallax automático funcionando
- [ ] Zoom fullscreen suave
- [ ] Hover effects en envelope

**Mobile:**
- [ ] Transición overlay suave (sin "clicks" visuales)
- [ ] Contenido principal aparece sin saltos
- [ ] Formulario funcional y responsive
- [ ] Touch events en custom select

**Performance:**
- [ ] Parallax smooth (~60fps) en desktop
- [ ] No jitter en partículas
- [ ] Scroll fluido en mobile

---

### 7. Archivos Generados

✅ **CSS (12 módulos):** ~2500 líneas de CSS optimizado
✅ **JavaScript (9 módulos):** ~800 líneas de JS modular
✅ **HTML:** Limpio, semántico, ~230 líneas
✅ **Total:** Mismo funcionamiento, mejor estructura

---

### 8. Cómo Usar la Nueva Versión

1. **Cambios en links:** Todos los `<link>` CSS importan desde `styles/`
2. **Cambios en scripts:** `<script type="module" src="scripts/main.js"></script>`
3. **Modularidad:** Para agregar features, crear nuevo archivo en `scripts/`, exportar función, importar en `main.js`
4. **Estilos:** Para cambiar colores, editar `styles/variables.css`

---

### 9. Notas de Compatibilidad

- **ES6 Modules:** Requiere navegador moderno (IE no soportado, ok para 2024+)
- **CSS Variables:** Soportado en todos los navegadores modernos
- **Backdrop filter:** Fallback incluido con `@supports`
- **SVG cráteres:** Generado por JavaScript, no requiere archivos externos

---

### 10. Mejoras Futuras Posibles

1. **Build system:** Webpack/Vite para minificar y bundlear
2. **SCSS:** Anidar selectores en estilos
3. **TypeScript:** Type safety en JavaScript
4. **Testing:** Jest para módulos JavaScript
5. **PWA:** Service Workers para offline
6. **CDN:** Optimizar entregas de fuentes Google

---

## Resumen de Cambios

| Aspecto | Antes | Después | Mejora |
|--------|-------|---------|--------|
| Archivo HTML | 2339 líneas | 234 líneas | 90% menos código |
| Estructura | Monolítico | Modular (21 archivos) | Mantenible |
| Transición móvil | 800ms lineal | 900ms multi-fase | Fluida, sin saltos |
| CSS | Incrustado | 12 módulos | Reutilizable |
| JavaScript | Incrustado | 9 módulos | Escalable |
| Desktop | Igual | Igual | Sin regresión |
| Performance | Buena | Mejor | Optimizaciones GPU |

---

## Cómo personalizar las descripciones

### Editar contenido de secciones

Todas las descripciones se encuentran en `index.html`. Para personalizarlas, simplemente edita los textos en las secciones correspondientes:

#### 1. Cambiar descripción del hero
```html
<!-- En: <section class="hero"> -->
<p>
    "Escribe aquí el mensaje de bienvenida personalizado"
</p>
```

#### 2. Cambiar descripción de dress code
```html
<!-- En: <section class="info-section"> (Dress Code) -->
<p>Descripción de la vestimenta esperada<br>
<span style="font-size: 0.85rem; opacity: 0.8;">Detalles adicionales</span></p>
```

#### 3. Cambiar alias de transferencia
```html
<!-- En: <section class="info-section"> (Regalos) -->
<p class="alias">Alias: TU_ALIAS_AQUI</p>
```

#### 4. Cambiar texto final
```html
<!-- En: <footer> -->
<footer>Tu mensaje de despedida personalizado</footer>
```

#### 5. Cambiar frases del sobre
```html
<!-- En: <div class="envelope"> -->
<h2>Mis 15</h2>      <!-- Titulo evento -->
<h3>Martu</h3>       <!-- Nombre celebrante -->
<p>Tu frase aquí.</p> <!-- Mensaje del sobre -->
<p class="date">10 de octubre</p> <!-- Fecha evento -->
```

---

## Estructura de contenido personalizable

| Sección | Ubicación en HTML | Campo a editar | Ejemplo |
|---------|------------------|-----------------|---------|
| Bienvenida | `.hero > p` | Mensaje inspirador | "Una noche llena de magia te espera" |
| Dress Code | `.info-section (4a)` | Descripción vestimenta | "Formal elegante con toque de fantasía" |
| Alias | `.gift-box > .alias` | Alias de transferencia | MARTU.15.RUIZ |
| Despedida | `footer` | Mensaje final | "Te espero para celebrar" |
| Sobre | `.letter-content` | Textos del envite | Título, nombre, frase, fecha |

---

## Datos dinámicos (actualizables sin editar HTML)

Algunos datos se actualizan automáticamente mediante JavaScript. Para cambiarlos:

### Fecha y hora del evento
- **Ubicación:** Variable `eventDate` en `scripts/countdown.js`
- **Formato:** `new Date('YYYY-MM-DD HH:mm:ss')`
- **Ejemplo:** `new Date('2026-10-10 21:30:00')`

### Google Apps Script (Formulario)
- **Ubicación:** Variable `scriptURL` en `scripts/form-handler.js`
- **Cómo obtener:** Crea un nuevo Google Apps Script conectado a un formulario de Google Sheets
