// ===== MANEJADOR DEL FORMULARIO RSVP =====
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxlJC-JY7BLCCu1Y0n35xeV4cmYSNC-nse8TsWdpfFQjKyCVOQC5OW_peLWWvDYiWyjqQ/exec";

export function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const nameInput = form.querySelector('input[type="text"]');
    const asistentesSelect = form.querySelector('#asistentes');
    const consideracionesTextarea = form.querySelector('textarea[id="menu"]');

    if (!asistentesSelect.value) {
        alert('Por favor selecciona cuántos asisten.');
        return;
    }

    const name = nameInput.value;
    const acompanantes = asistentesSelect.value;
    const consideraciones = consideracionesTextarea.value;

    submitButton.disabled = true;
    submitButton.innerText = "Enviando...";

    const formData = new FormData();
    formData.append('Nombre', name);
    formData.append('Acompañantes', acompanantes);
    formData.append('Consideraciones', consideraciones);

    fetch(SCRIPT_URL, { method: 'POST', body: formData })
        .then(response => {
            alert(`${name}, ¡gracias por confirmar!\n\nTe espero el 10 de octubre`);
            form.reset();

            const customSelectTriggerSpan = form.querySelector('.custom-select-trigger span');
            if (customSelectTriggerSpan) {
                customSelectTriggerSpan.textContent = 'Selecciona...';
            }
            document.querySelectorAll('.custom-option').forEach(opt => opt.classList.remove('selected'));
        })
        .catch(error => {
            console.error('Error al enviar formulario:', error.message);
            alert('Uy, hubo un problema. Inténtalo de nuevo.');
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.innerText = "Confirmar Asistencia";
        });
}

