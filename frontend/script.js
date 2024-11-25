const demoModal = new bootstrap.Modal(document.getElementById('demoModal'));
demoModal.show();

// עדכון בזמן אמת של מק"טים בתיבת הטקסט
const textarea = document.getElementById('partNumbersInput');
const preview = document.getElementById('preview');

textarea.addEventListener('input', () => {
    // קבלת הטקסט שהוזן ופיצול לפי רווחים
    const text = textarea.value.trim();
    const parts = text.split(/\s+/).filter(Boolean); // מחיקת ריקים

    // ניקוי תצוגה קיימת
    preview.innerHTML = '';

    // יצירת אלמנטים מעוצבים לכל מק"ט
    parts.forEach(part => {
        const span = document.createElement('span');
        span.textContent = part;
        span.className = 'badge bg-primary text-white m-1';
        preview.appendChild(span);
    });
});

// טיפול באירוע שליחת הטופס
document.getElementById('partForm').addEventListener('submit', (e) => {
    e.preventDefault(); // מניעת רענון ברירת מחדל של הטופס

    // איסוף המקטים מתיבת הטקסט
    const inputText = document.getElementById('partNumbersInput').value.trim();
    if (!inputText) {
        alert("Please enter at least one part number.");
        return;
    }

    // פיצול המקטים לפי רווחים והסרת כפילויות וריקים
    const partNumbers = Array.from(new Set(inputText.split(/\s+/)));

    // בדיקה אם יש מק"טים
    if (partNumbers.length === 0) {
        alert("No valid part numbers found.");
        return;
    }

    // הצגת תוצאות ב-Accordion
    const accordionResults = document.getElementById('accordionFlushResults');
    accordionResults.innerHTML = partNumbers.map((part, index) => `
        <div class="accordion-item">
            <h2 class="accordion-header" id="flush-heading${index}">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${index}" aria-expanded="false" aria-controls="flush-collapse${index}">
                    Part Number: ${part}
                </button>
            </h2>
            <div id="flush-collapse${index}" class="accordion-collapse collapse" aria-labelledby="flush-heading${index}" data-bs-parent="#accordionFlushResults">
                <div class="accordion-body">
                    <p>Fetching details for <strong>${part}</strong>...</p>
                </div>
            </div>
        </div>
    `).join('');

    // סימולציה של ניתוח נתונים
    setTimeout(() => {
        partNumbers.forEach((part, index) => {
            const accordionBody = document.querySelector(`#flush-collapse${index} .accordion-body`);
            accordionBody.innerHTML = `
                <ul>
                    <li>Average Price: $100</li>
                    <li>Min Price: $80</li>
                    <li>Max Price: $120</li>
                    <li>Availability: In Stock</li>
                    <li>Manufacturer: Example Manufacturer</li>
                    <li>Lifecycle: Active</li>
                </ul>
            `;
        });
    }, 2000); // דיליי של 2 שניות לדימוי עיבוד נתונים
});