// ===== CUENTA REGRESIVA =====
export function updateCountdown() {
    const target = new Date(2026, 9, 10, 21, 30, 0).getTime();
    const countdownNodes = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    };

    let intervalId = null;

    const renderZeroState = () => {
        if (countdownNodes.days) countdownNodes.days.innerText = '00';
        if (countdownNodes.hours) countdownNodes.hours.innerText = '00';
        if (countdownNodes.minutes) countdownNodes.minutes.innerText = '00';
        if (countdownNodes.seconds) countdownNodes.seconds.innerText = '00';
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

        if (countdownNodes.days) countdownNodes.days.innerText = String(days).padStart(2, '0');
        if (countdownNodes.hours) countdownNodes.hours.innerText = String(hours).padStart(2, '0');
        if (countdownNodes.minutes) countdownNodes.minutes.innerText = String(minutes).padStart(2, '0');
        if (countdownNodes.seconds) countdownNodes.seconds.innerText = String(seconds).padStart(2, '0');
    };

    // Actualizar inmediatamente y luego cada segundo
    updateTimer();
    intervalId = setInterval(updateTimer, 1000);
}
