// ===== CUENTA REGRESIVA =====
export function updateCountdown() {
    const target = Date.UTC(2026, 9, 11, 0, 30, 0);
    const countdownNodes = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    };

    let intervalId = null;

    const renderZeroState = () => {
        if (countdownNodes.days) countdownNodes.days.textContent = '00';
        if (countdownNodes.hours) countdownNodes.hours.textContent = '00';
        if (countdownNodes.minutes) countdownNodes.minutes.textContent = '00';
        if (countdownNodes.seconds) countdownNodes.seconds.textContent = '00';
    };

    const updateTimer = () => {
        const diff = target - Date.now();
        if (diff <= 0) {
            renderZeroState();
            if (intervalId !== null) {
                clearInterval(intervalId);
                intervalId = null;
            }
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        if (countdownNodes.days) countdownNodes.days.textContent = String(days).padStart(2, '0');
        if (countdownNodes.hours) countdownNodes.hours.textContent = String(hours).padStart(2, '0');
        if (countdownNodes.minutes) countdownNodes.minutes.textContent = String(minutes).padStart(2, '0');
        if (countdownNodes.seconds) countdownNodes.seconds.textContent = String(seconds).padStart(2, '0');
    };

    // Actualizar inmediatamente y luego cada segundo
    updateTimer();
    intervalId = setInterval(updateTimer, 1000);
}
