// ===== MANEJADOR DEL FORMULARIO RSVP =====
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzwlmLfsF1pXDXNFeY6rjmqTVcVow-bU3IqoNpXhvhqzlPM5zMKHOnTBcGpz438GI-3Eg/exec";

const DEFAULT_TRIGGER_LABEL = 'Selecciona...';
const DEFAULT_SUBMIT_LABEL = 'Confirmar Asistencia';
const SUBMITTING_LABEL = 'Enviando...';

// Fecha límite: hasta el 25 de septiembre de 2026 inclusive.
// Se desactiva a partir del 26 de septiembre 00:00 (hora local).
const CONFIRM_DEADLINE = new Date(2026, 8, 26, 0, 0, 0);
// const CONFIRM_DEADLINE = new Date(2026, 8, 26, 0, 0, 0);
const dateToday = new Date();
export async function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const submitButton = form.querySelector('button[type="submit"]');
    const cedulaInput = form.querySelector('#cedula');
    const nameInput = form.querySelector('#nombre');
    const edadInput = form.querySelector('#edad');
    const asistentesSelect = form.querySelector('#asistentes');
    const consideracionesTextarea = form.querySelector('#menu');
    const musicaInput = form.querySelector('#musica');

    // Verificar fecha límite por seguridad
    if (isPastDeadline()) {
        alert('Las confirmaciones ya cerraron.');
        disableForm(form, true);
        return;
    }

    const cedula = cedulaInput ? cedulaInput.value.trim() : '';
    const name = nameInput ? nameInput.value.trim() : '';
    const edad = edadInput ? edadInput.value.trim() : '';
    const acompanantes = asistentesSelect ? parseInt(asistentesSelect.value, 10) : 0;
    const consideraciones = consideracionesTextarea ? consideracionesTextarea.value.trim() : '';
    const musica = musicaInput ? musicaInput.value.trim() : '';
    if (!cedula) {
        cedulaInput.focus();
        cedulaInput.reportValidity();
        return;
    }

    if (!name) {
        nameInput.focus();
        nameInput.reportValidity();
        return;
    }

    if(!edad){
        edadInput.focus();
        edadInput.reportValidity();
        return;
    }

    if (isNaN(acompanantes)) {
        const customSelect = form.querySelector('.custom-select');
        if (customSelect) customSelect.classList.add('error');
        alert('Por favor selecciona cuántos asisten.');
        return;
    }

    // Validar acompañantes: si hay acompañantes, cada bloque debe tener cédula y nombre
    const accompagnantesData = [];
    for (let i = 1; i <= acompanantes; i++) {
        const cedId = `acomp_cedula_${i}`;
        const nomId = `acomp_nombre_${i}`;
        const edadId = `acomp_edad_${i}`;
        const condId = `acomp_condicion_${i}`;

        const cedEl = form.querySelector(`#${cedId}`);
        const nomEl = form.querySelector(`#${nomId}`);
        const edadEl = form.querySelector(`#${edadId}`);
        const condEl = form.querySelector(`#${condId}`);

        const aCed = cedEl ? cedEl.value.trim() : '';
        const aNom = nomEl ? nomEl.value.trim() : '';
        const aEdad = edadEl ? edadEl.value.trim() : '';
        const aCond = condEl ? condEl.value.trim() : '';

        if (!aCed || !aNom) {
            alert(`Por favor completa cédula y nombre del acompañante #${i}.`);
            if (!aCed && cedEl) { cedEl.focus(); cedEl.reportValidity(); }
            else if (!aNom && nomEl) { nomEl.focus(); nomEl.reportValidity(); }
            return;
        }

        if (!aEdad){
            edadEl.focus();
            edadEl.reportValidity();
            return;
        }

        accompagnantesData.push({ cedula: aCed, nombre: aNom, edad: aEdad, condicion: aCond, invitadoPor: name });
    }

    submitButton.disabled = true;
    submitButton.innerText = SUBMITTING_LABEL;

    const formData = new FormData();
    formData.append('Cedula', cedula);
    formData.append('Nombre', name);
    formData.append('Edad', edad)
    formData.append('Acompañantes', String(acompanantes));
    formData.append('Consideraciones', consideraciones);
    formData.append('Musica', musica);

    // Enviar datos de acompañantes como JSON serializado
    if (accompagnantesData.length > 0) {
        formData.append('acompanantesJSON', JSON.stringify(accompagnantesData));
    }


    try {
        const response = await fetch(SCRIPT_URL, { method: 'POST', body: formData });

        if (!response.ok) {
            console.error(`HTTP ${response.status}`);
            alert('La confirmación no pudo enviarse. Inténtalo de nuevo.');
            return;
        }

        const responseData = await response.json();
        console.log('=== RESPUESTA DEL BACKEND ===');
        console.log(responseData);

        alert(`${name}, ¡gracias por confirmar!\n\nTe espero el 10 de octubre`);
        form.reset();
        resetCustomSelect(form);
        // limpiar contenedor de acompañantes
        const accContainer = document.querySelector('#accompanantes-container');
        if (accContainer) accContainer.innerHTML = '';
    } catch (error) {
        console.error('Error al enviar formulario:', error);
        alert('Uy, hubo un problema. Inténtalo de nuevo.');
    } finally {
        submitButton.disabled = false;
        submitButton.innerText = DEFAULT_SUBMIT_LABEL;
    }
}

function resetCustomSelect(form) {
    const customSelectTriggerSpan = form.querySelector('.custom-select-trigger span');
    const customSelect = form.querySelector('.custom-select');

    if (customSelectTriggerSpan) {
        customSelectTriggerSpan.textContent = DEFAULT_TRIGGER_LABEL;
    }

    if (customSelect) {
        customSelect.classList.remove('open');
    }

    form.querySelectorAll('.custom-option').forEach(opt => opt.classList.remove('selected'));

    // Limpiar campos dinámicos de acompañantes
    const accContainer = form.querySelector('#accompanantes-container');
    if (accContainer) accContainer.innerHTML = '';
}

function isPastDeadline() {
    const today = new Date();

    console.log('Fecha límite:', CONFIRM_DEADLINE);
    console.log('Fecha actual:', today);

    return today >= CONFIRM_DEADLINE;
}
function disableForm(form, disabled = true) {
    form.querySelectorAll('input, select, textarea, button').forEach(el => {
        el.disabled = disabled;
    });
    const customSelect = form.querySelector('.custom-select');

    if (customSelect) {
        customSelect.classList.add('disabled');
    }


    const submit = form.querySelector('button[type="submit"]');
    if (submit) {
        submit.textContent = disabled
            ? 'Confirmaciones cerradas'
            : DEFAULT_SUBMIT_LABEL;
    }
}

// Inicializar comportamiento extra del formulario: mensaje de fecha límite y generación de campos de acompañantes
export function initFormEnhancements() {
    const form = document.querySelector('form');
    if (!form) return;

    const deadlineMsg = document.getElementById('confirm-deadline-message');
    const asistentesSelect = form.querySelector('#asistentes');
    const accContainer = document.getElementById('accompanantes-container');
    const nameInput = form.querySelector('#nombre');

    if (deadlineMsg) {
        if (isPastDeadline()) {
            deadlineMsg.textContent = 'Las confirmaciones han finalizado.';
            deadlineMsg.style.color = 'rgba(253,82,82,0.94)';
            disableForm(form, true);
        } else {
            // Mostrar fecha formateada (día 25)
            deadlineMsg.textContent = 'tienes tiempo para confirmar hasta el 25 de septiembre de 2026';
        }
    }

    if (!asistentesSelect || !accContainer) return;

    asistentesSelect.addEventListener('change', function () {
        // limpiar
        accContainer.innerHTML = '';

        const count = parseInt(asistentesSelect.value, 10);
        if (isNaN(count) || count <= 0) return;

        for (let i = 1; i <= count; i++) {
            const block = document.createElement('div');
            block.className = 'form-group accompanante-block';

            const heading = document.createElement('div');
            heading.className = 'accompanante-heading';
            const headingTitle = document.createElement('span');
            headingTitle.textContent = `Acompañante ${i}`;
            const headingHint = document.createElement('span');
            headingHint.textContent = 'Datos de asistencia';
            heading.append(headingTitle, headingHint);

            // Cédula
            const cedLabel = document.createElement('label');
            cedLabel.setAttribute('for', `acomp_cedula_${i}`);
            cedLabel.textContent = 'Cédula';
            const cedInput = document.createElement('input');
            cedInput.type = 'text';
            cedInput.id = `acomp_cedula_${i}`;
            cedInput.name = `acomp_cedula_${i}`;
            cedInput.placeholder = 'Cédula';
            cedInput.required = true;

            // Nombre
            const nomLabel = document.createElement('label');
            nomLabel.setAttribute('for', `acomp_nombre_${i}`);
            nomLabel.textContent = 'Nombre y apellido';
            const nomInput = document.createElement('input');
            nomInput.type = 'text';
            nomInput.id = `acomp_nombre_${i}`;
            nomInput.name = `acomp_nombre_${i}`;
            nomInput.placeholder = 'Nombre completo';
            nomInput.required = true;

            const edadLabel = document.createElement('label');
            edadLabel.setAttribute('for', `acomp_edad_${i}`);
            edadLabel.textContent = 'Edad';
            const edadInput = document.createElement('input');
            edadInput.type = 'text';
            edadInput.id = `acomp_edad_${i}`;
            edadInput.name = `acomp_edad_${i}`;
            edadInput.placeholder = '15';
            edadInput.required = true;


            // Condición
            const condLabel = document.createElement('label');
            condLabel.setAttribute('for', `acomp_condicion_${i}`);
            condLabel.textContent = 'Alergias o consideraciones';
            const condInput = document.createElement('input');
            condInput.type = 'text';
            condInput.id = `acomp_condicion_${i}`;
            condInput.name = `acomp_condicion_${i}`;
            condInput.placeholder = 'Ej.: celíaco/a, vegetariano/a o alergias (opcional)';

            // Hidden invitado por
            const invitedBy = document.createElement('input');
            invitedBy.type = 'hidden';
            invitedBy.id = `acomp_invitado_por_${i}`;
            invitedBy.name = `acomp_invitado_por_${i}`;
            invitedBy.value = nameInput ? nameInput.value.trim() : '';

            // Acomodar orden: cedula, nombre, condición
            block.appendChild(heading);
            block.appendChild(cedLabel);
            block.appendChild(cedInput);
            block.appendChild(nomLabel);
            block.appendChild(nomInput);
            block.appendChild(edadLabel);
            block.appendChild(edadInput);
            block.appendChild(condLabel);
            block.appendChild(condInput);
            block.appendChild(invitedBy);

            accContainer.appendChild(block);
        }
    });

    // Mantener invitadoPor actualizado si cambia el nombre principal
    if (nameInput) {
        nameInput.addEventListener('input', () => {
            const val = nameInput.value.trim();
            accContainer.querySelectorAll('input[id^="acomp_invitado_por_"]').forEach(h => h.value = val);
        });
    }
}
