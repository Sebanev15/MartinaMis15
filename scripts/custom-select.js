// ===== CUSTOM SELECT LOGIC =====
export function initCustomSelects() {
    const customSelects = [];

    document.querySelectorAll('.custom-select-wrapper').forEach(wrapper => {
        const select = wrapper.querySelector('select');
        const customSelect = wrapper.querySelector('.custom-select');
        const trigger = customSelect.querySelector('.custom-select-trigger');
        const options = customSelect.querySelectorAll('.custom-option');
        const customOptions = customSelect.querySelector('.custom-options');
        const span = trigger.querySelector('span');
        const formGroup = wrapper.closest('.form-group');
        customSelects.push(customSelect);

        const setOpen = (isOpen) => {
            customSelect.classList.toggle('open', isOpen);
            trigger.setAttribute('aria-expanded', String(isOpen));
            if (formGroup) {
                formGroup.classList.toggle('select-open', isOpen);
            }
        };

        trigger.addEventListener('click', function(e) {
            e.stopPropagation();
            setOpen(!customSelect.classList.contains('open'));
        });

        trigger.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setOpen(!customSelect.classList.contains('open'));
            }
        });

        options.forEach(option => {
            option.addEventListener('click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                options.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                span.textContent = this.textContent;
                select.value = this.getAttribute('data-value');
                select.dispatchEvent(new Event('change', { bubbles: true }));
                setOpen(false);
                customSelect.classList.remove('error');
            });

            option.addEventListener('mousedown', function(e) {
                e.preventDefault();
            });
        });

        customOptions.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        select.addEventListener('change', () => {
            customSelect.classList.remove('error');
        });

        trigger.setAttribute('aria-expanded', 'false');
    });

    document.addEventListener('click', function(e) {
        customSelects.forEach(customSelect => {
            if (!customSelect.contains(e.target) && !customSelect.parentElement.contains(e.target)) {
                customSelect.classList.remove('open');
                const wrapper = customSelect.closest('.custom-select-wrapper');
                const formGroup = wrapper ? wrapper.closest('.form-group') : null;
                if (formGroup) {
                    formGroup.classList.remove('select-open');
                }
            }
        });
    });
}
