// ===== MANEJADOR DEL FORMULARIO RSVP =====
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxlJC-JY7BLCCu1Y0n35xeV4cmYSNC-nse8TsWdpfFQjKyCVOQC5OW_peLWWvDYiWyjqQ/exec";

const DEFAULT_TRIGGER_LABEL = 'Selecciona...';
const DEFAULT_SUBMIT_LABEL = 'Confirmar Asistencia';

export async function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const submitButton = form.querySelector('button[type="submit"]');
    const nameInput = form.querySelector('input[type="text"]');
    const asistentesSelect = form.querySelector('#asistentes');
    const consideracionesTextarea = form.querySelector('textarea[id="menu"]');

    const name = nameInput.value.trim();
    const acompanantes = asistentesSelect.value;
    const consideraciones = consideracionesTextarea.value.trim();

    if (!name) {
        nameInput.focus();
        nameInput.reportValidity();
        return;
    }

    if (!asistentesSelect.value) {
        const customSelect = form.querySelector('.custom-select');
        if (customSelect) {
            customSelect.classList.add('error');
        }
        alert('Por favor selecciona cuántos asisten.');
        return;
    }

    submitButton.disabled = true;
    submitButton.innerText = 'Enviando...';

    const formData = new FormData();
    formData.append('Nombre', name);
    formData.append('Acompañantes', acompanantes);
    formData.append('Consideraciones', consideraciones);

    try {
        const response = await fetch(SCRIPT_URL, { method: 'POST', body: formData });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        alert(`${name}, ¡gracias por confirmar!\n\nTe espero el 10 de octubre`);
        form.reset();
        resetCustomSelect(form);
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
}
