# Electronic Parts Analyzer

Electronic Parts Analyzer is a web-based application designed to analyze and manage electronic components efficiently. The tool integrates smart automation and advanced API calls to provide real-time insights into component availability, pricing, specifications, and lifecycle status.

## Features

- **Component Analysis**:
  - Availability status (broad/limited, etc.).
  - Pricing details (average, minimum, maximum).
  - Lifecycle status (active/obsolete).
  - Production start and discontinued dates.
  - Alternative components.
  - Detailed descriptions and specifications.

- **Real-Time Interaction**:
  - Users can input multiple part numbers at once.
  - Immediate feedback with a dynamic, interactive accordion-style UI.

- **Smart Integrations**:
  - Seamless connection to APIs (e.g., OpenAI) for data retrieval and analysis.

## How It Works

1. **Frontend**:
   - Built with HTML, CSS (Bootstrap), and JavaScript.
   - Users input part numbers into a form, separated by spaces.
   - Dynamic previews and badges are displayed for each part number.
   - Accordion-style results are shown in a modal.

2. **Backend**:
   - Developed using Flask (Python).
   - Receives part numbers via API, processes them, and queries external APIs (e.g., OpenAI) for detailed data.
   - Validates API keys and ensures secure communication.

3. **Communication**:
   - Uses RESTful API endpoints to handle requests between the frontend and backend.
   - Implements CORS to handle cross-origin requests securely.

## Prerequisites

To run this project locally, you need:
- Python 3.8+
- Flask and Flask-CORS for backend development
- A paid OpenAI account (API keys are required)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yagelna/Electronic-Parts-Analyzer.git
   ```

2. Navigate to the backend directory and install the dependencies:
   ```bash
   cd backend
   pip install flask flask-cors openai
   ```

3. Start the Flask server:
   ```bash
   python app.py
   ```

4. Open the `index.html` file in the `frontend` directory with a web browser.

## Usage

- Input part numbers separated by spaces.
- Click "Analyze" to fetch data.
- View results in an interactive accordion.
