const demoModal = new bootstrap.Modal(document.getElementById('demoModal'));
demoModal.show();

// 
const textarea = document.getElementById('partNumbersInput');
const preview = document.getElementById('preview');
// event listener to input event
textarea.addEventListener('input', () => {
    const text = textarea.value.trim();
    const parts = text.split(/\s+/).filter(Boolean); // split by spaces and remove empty strings

    preview.innerHTML = '';
    // create a badge for each part
    parts.forEach(part => {
        const span = document.createElement('span');
        span.textContent = part;
        span.className = 'badge bg-primary text-white m-1';
        preview.appendChild(span);
    });
});

// event listener to form submit
document.getElementById('partForm').addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const inputText = document.getElementById('partNumbersInput').value.trim(); 
    if (!inputText) {
        alert("Please enter at least one part number.");
        return;
    }
    const partNumbers = Array.from(new Set(inputText.split(/\s+/))); // split by spaces and remove duplicates

    if (partNumbers.length === 0) {
        alert("No valid part numbers found.");
        return;
    }

    // show modal and loading spinner
    const modal = new bootstrap.Modal(document.getElementById('accordionModal'));
    modal.show();
    const accordionResults = document.getElementById('accordionFlushResults');
    const loadingSpinner = document.getElementById('loadingSpinner');
    accordionResults.style.display = 'none';
    loadingSpinner.style.display = 'block';

    // send partNumbers to server and get response
    try {
        const response = await fetch('http://127.0.0.1:5000/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-app-key':  'FLYagel',
            },
            body: JSON.stringify({ partNumbers }),
        });
        if (!response.ok) {
            throw new Error('Failed to fetch data from server.');
        }
        const serverResponse = await response.json();
        console.log("Real server response:")
        console.log(serverResponse);
        loadingSpinner.style.display = 'none'; 
        accordionResults.style.display = 'block'; 

        accordionResults.innerHTML = Object.entries(serverResponse).map(([part, details], index) => `
            <div class="accordion-item">
                <h2 class="accordion-header" id="flush-heading${index}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${index}" aria-expanded="false" aria-controls="flush-collapse${index}">
                        Part Number: ${part}
                    </button>
                </h2>
                <div id="flush-collapse${index}" class="accordion-collapse collapse" aria-labelledby="flush-heading${index}" data-bs-parent="#accordionFlushResults">
                    <div class="accordion-body">
                        <ul>
                            <li><strong>Availability:</strong> ${details.availability.status} (${details.availability.scope})</li>
                            <li><strong>Description:</strong> ${details.availability.description}</li>

                            <li><strong>Average Price:</strong> ${details.average_price}</li>
                            <li><strong>Min Price:</strong> ${details.min_price}</li>
                            <li><strong>Max Price:</strong> ${details.max_price}</li>
                            <li><strong>Production Start:</strong> ${details.production_start}</li>
                            <li><strong>Production Status:</strong> ${details.production_status}</li>
                            <li><strong>Discontinued Date:</strong> ${details.discontinued_date ? details.discontinued_date : 'N/A'}</li>
                            <li><strong>Alternatives:</strong> ${details.alternatives}</li>
                            <li><strong>Additional Details:</strong> ${details.additional_details}</li>
                        </ul>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to fetch data from server.");
        loadingSpinner.style.display = 'none';
        accordionResults.innerHTML = '<p class="text-danger">Failed to fetch data from server. Please try again later.</p>';
    }
});
