# Spelling Bee Synthesizer

![image](https://github.com/user-attachments/assets/097dcced-996e-4df3-a618-d2d1811d5ea0)

## Overview
The Spelling Bee Synthesizer is a web application made with Google Sheets, Google Apps Scripts, and a Flask Server acting as a REST API endpoint designed to assist students in practicing for spelling bees. This tool utilizes the Google Cloud Text-to-Speech (TTS) API, service workers, and Google Apps Scripts to automate the pronunciation of words through a server endpoint.

## Features

- **Automated Word Pronunciation:** Use the Google Cloud TTS API to hear the pronunciation of selected words.
- **Word Definitions:** Fetch definitions and example sentences for words from Wordnik.
- **User-Friendly Interface:** Easy to interact with via Google Sheets, allowing for quick access to pronunciation and definitions.
- **Dynamic Content:** Automatically updates with user input, enhancing learning efficiency.

## Technologies Used

- **Frontend:**
  - Google Apps Script for Google Sheets integration.
- **Backend:**
  - Flask for API development.
  - Google Cloud Text-to-Speech API for audio generation.
- **Scripting:**
  - Shell scripts for word definitions, synonyms, antonyms, and abbreviations.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/GSMSTCSClub/spellingbee-synthesizer
   cd spelling-bee-synthesizer
   ```

2. **Set Up Google Cloud TTS API:**
   - Create a Google Cloud project and enable the Text-to-Speech API.
   - Create and download a service account key JSON file, renaming it to `service_account_secret.json`.

3. **Install Dependencies:**
   - Ensure you have Python installed (preferably 3.6 or later).
   - Install the required libraries:

   ```bash
   pip install Flask google-cloud-texttospeech flask-cors
   ```

4. **Run the Application:**

   ```bash
   python app.py
   ```

   The application will be accessible at `http://localhost:5000`.

## Usage

1. Open the Google Sheets document containing your spelling words.
2. Highlight a cell containing a word and use the integrated functions to fetch pronunciations and definitions.
3. Access the audio output at `http://localhost:5000/output.mp3` to listen to the pronunciation.

### Functionality Breakdown

- **Word Pronunciation:**
  - Utilize the Google Cloud TTS API to pronounce words automatically.
  
- **Word Definitions and Examples:**
  - Functions to fetch definitions and example sentences for selected words.

- **Error Handling:**
  - Alerts users if the word is not found or if there are errors in fetching data.

## Code Overview

### Key Scripts

- **spelling_bee_functions.js:** 
  - Contains functions to fetch definitions, handle audio playback, and populate data in Google Sheets.

- **fetch.py:** 
  - Handles interactions with the Google Cloud TTS API, converting text to speech and saving the output as an audio file.

- **et:** 
  - A shell script that provides definitions, synonyms, antonyms, and abbreviations for a given word.

- **app.py:** 
  - The main Flask application file, defining routes and handling API requests.

### Example Code Snippet

Here's a simplified function to fetch and display definitions in Google Sheets:

```javascript
function populateData() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const words = sheet.getRange('B:B').getValues();
  // Process each word for definitions
}
```

## Security Considerations

- **API Security:** The current implementation has basically no security, since the REST API endpoint is publicly exposed, and the script running on the web server only checks for GET requests. Consider implementing authentication, or make sure that the IP address/domain is not known.
- **Sensitive Information:** Ensure that sensitive API keys and credentials are stored securely and not exposed in public repositories.
