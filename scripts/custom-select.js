// ===== CUSTOM SELECT LOGIC =====
export function initCustomSelects() {
    document.querySelectorAll('.custom-select-wrapper').forEach(wrapper => {
        const select = wrapper.querySelector('select');
        const customSelect = wrapper.querySelector('.custom-select');
        const trigger = customSelect.querySelector('.custom-select-trigger');
        const options = customSelect.querySelectorAll('.custom-option');
        const span = trigger.querySelector('span');

        customSelect.addEventListener('click', function(e) {
            this.classList.toggle('open');
        });

        customSelect.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.classList.toggle('open');
            }
        });

        options.forEach(option => {
            option.addEventListener('click', function() {
                options.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                span.textContent = this.textContent;
                select.value = this.getAttribute('data-value');
                select.dispatchEvent(new Event('change'));
            });
        });

        document.addEventListener('click', function(e) {
            if (!customSelect.contains(e.target)) {
                customSelect.classList.remove('open');
            }
        });
    });
}

