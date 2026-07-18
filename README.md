# Martina Mis 15

Invitación web interactiva para los 15 años de Martina. Combina una apertura de sobre, estética nocturna con detalles mágicos y toda la información necesaria para el evento.

## Evento

- **Fecha:** 10 de octubre de 2026, 21:30 hs.
- **Lugar:** Salón El Portal, Alejandro Fiol de Pereda esq. Av. Millán, Uruguay.
- **Vestimenta:** formal elegante.

Los textos, datos bancarios, dirección y enlaces visibles se editan directamente en [index.html](index.html).

## Características

- Sobre inicial interactivo y accesible con teclado.
- Fondo de nebulosa, estrellas y lunas generadas dinámicamente.
- Cuenta regresiva al evento.
- Información de ubicación, vestimenta y regalos; mapa y enlace para llegar.
- Formulario RSVP conectado a Google Apps Script, con acompañantes dinámicos.
- Revelado progresivo de secciones al hacer scroll.
- Diseño responsive y adaptado a preferencias de accesibilidad.

## Apertura del sobre y compatibilidad

La apertura se ajusta automáticamente al dispositivo para priorizar una experiencia estable:

| Contexto | Comportamiento |
| --- | --- |
| Escritorio (`> 768px`) | Animación completa: se abre el sobre, la carta se eleva y pasa a pantalla completa. El parallax puede activarse si el dispositivo lo permite. |
| Móvil (`≤ 768px`) | Animación ligera: se abre la solapa y la carta se eleva brevemente antes de revelar el contenido. No utiliza el handoff 3D de escritorio. |
| Ahorro de datos, movimiento reducido o recursos muy limitados | Revelado inmediato, sin depender de animaciones. |

El criterio se define en [scripts/main.js](scripts/main.js): los móviles usan `openInvitationLiteAnimated()`, los equipos de escritorio usan `openInvitation()` y el modo inmediato usa `openInvitationImmediate()`.

Para probar un modo específico, añade uno de estos parámetros a la URL:

- `?forceMotion=1`: fuerza la animación completa.
- `?forceLite=1`: fuerza la animación ligera.
- `?forceImmediate=1`: desactiva la animación de apertura.

## Estructura

```text
index.html                 Contenido y estructura de la invitación
styles/                    Estilos, animaciones y reglas responsive
scripts/main.js            Inicialización y selección del modo de apertura
scripts/envelope-handlers.js  Transiciones del sobre
scripts/countdown.js       Cuenta regresiva
scripts/custom-select.js   Selector accesible de cantidad de asistentes
scripts/dynamic-sparkles.js  Efectos de destellos dinámicos (opcional)
scripts/form-handler.js    Envío y validación del RSVP
scripts/moon-scroll-parallax.js  Movimiento sutil de la luna al hacer scroll
scripts/parallax.js        Parallax automático para escritorio
scripts/scroll-observer.js Revelado de secciones al hacer scroll
scripts/stars.js           Creación de estrellas y luna
scripts/utils.js           Detección de dispositivo y utilidades compartidas
apps-script/Code.gs        Backend de referencia para Google Apps Script
images/                    Recursos visuales
```

El sitio es estático, usa módulos ES y no requiere un paso de build.

## Desarrollo y pruebas

Abre el proyecto con un servidor estático, por ejemplo mediante Live Server de WebStorm o VS Code. También puede utilizarse:

```bash
npx serve .
```

Comprueba como mínimo:

- En escritorio, que el sobre complete la transición a la carta y aparezca el contenido.
- En un móvil o en emulación de móvil, que la apertura sea breve, sin saltos y que el contenido quede interactivo.
- Con `prefers-reduced-motion: reduce`, que la invitación se abra inmediatamente.
- Que el formulario y el selector de acompañantes funcionen después de abrir la invitación.

## Personalización

- **Contenido visible:** [index.html](index.html).
- **Colores, tipografías y medidas globales:** [styles/variables.css](styles/variables.css).
- **Fecha y hora del contador:** `eventDate` en [scripts/countdown.js](scripts/countdown.js).
- **URL del formulario:** `scriptURL` en [scripts/form-handler.js](scripts/form-handler.js).

Al cambiar el backend de Apps Script, hay que actualizar y volver a desplegar su Web App. El frontend envía los acompañantes serializados en `acompanantesJSON`; [apps-script/Code.gs](apps-script/Code.gs) contiene la implementación de referencia.

## Compatibilidad

Requiere un navegador moderno con soporte de módulos ES y variables CSS. Se respetan `prefers-reduced-motion` y `navigator.connection.saveData` cuando están disponibles.
