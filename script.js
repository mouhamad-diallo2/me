// Time zones configuration
const timeZones = [
    { name: 'UTC', timezone: 'UTC', city: 'Coordinated Universal Time' },
    { name: 'EST', timezone: 'America/New_York', city: 'New York' },
    { name: 'CST', timezone: 'America/Chicago', city: 'Chicago' },
    { name: 'MST', timezone: 'America/Denver', city: 'Denver' },
    { name: 'PST', timezone: 'America/Los_Angeles', city: 'Los Angeles' },
    { name: 'GMT', timezone: 'Europe/London', city: 'London' },
    { name: 'CET', timezone: 'Europe/Paris', city: 'Paris' },
    { name: 'IST', timezone: 'Asia/Kolkata', city: 'India' },
    { name: 'JST', timezone: 'Asia/Tokyo', city: 'Tokyo' },
    { name: 'AEST', timezone: 'Australia/Sydney', city: 'Sydney' },
    { name: 'NZST', timezone: 'Pacific/Auckland', city: 'Auckland' },
    { name: 'SGT', timezone: 'Asia/Singapore', city: 'Singapore' },
];

// Initialize clocks on page load
document.addEventListener('DOMContentLoaded', () => {
    createClocks();
    updateAllClocks();
    // Update clocks every second
    setInterval(updateAllClocks, 1000);
});

// Create clock elements for each timezone
function createClocks() {
    const clocksGrid = document.getElementById('clocksGrid');
    clocksGrid.innerHTML = '';

    timeZones.forEach((zone) => {
        const clockCard = document.createElement('div');
        clockCard.className = 'clock-card';
        clockCard.innerHTML = `
            <div class="timezone-name">${zone.name}</div>
            <div class="city-name">${zone.city}</div>
            <div class="digital-time" id="time-${zone.timezone}">--:--:--</div>
            <div class="time-period" id="period-${zone.timezone}">AM</div>
            <div class="date-display" id="date-${zone.timezone}">Loading...</div>
        `;
        clocksGrid.appendChild(clockCard);
    });
}

// Update all clocks with current time
function updateAllClocks() {
    timeZones.forEach((zone) => {
        updateClock(zone.timezone);
    });
}

// Update individual clock
function updateClock(timezone) {
    const now = new Date();
    
    // Format time for the given timezone
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        year: 'numeric',
        month: 'short',
        day: '2-digit'
    });

    // Get time components
    const parts = formatter.formatToParts(now);
    let hour, minute, second, year, month, day;

    parts.forEach((part) => {
        switch (part.type) {
            case 'hour':
                hour = part.value;
                break;
            case 'minute':
                minute = part.value;
                break;
            case 'second':
                second = part.value;
                break;
            case 'year':
                year = part.value;
                break;
            case 'month':
                month = part.value;
                break;
            case 'day':
                day = part.value;
                break;
        }
    });

    // Determine AM/PM
    const hourNum = parseInt(hour);
    const period = hourNum >= 12 ? 'PM' : 'AM';
    const displayHour = hourNum % 12 || 12;

    // Format the time display
    const timeString = `${String(displayHour).padStart(2, '0')}:${minute}:${second}`;
    
    // Update DOM elements
    const timeElement = document.getElementById(`time-${timezone}`);
    const periodElement = document.getElementById(`period-${timezone}`);
    const dateElement = document.getElementById(`date-${timezone}`);

    if (timeElement) timeElement.textContent = timeString;
    if (periodElement) periodElement.textContent = period;
    if (dateElement) dateElement.textContent = `${month} ${day}, ${year}`;
}
