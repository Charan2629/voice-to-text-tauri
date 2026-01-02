# Voice-to-Text Desktop App (Tauri + Deepgram)

## Project Overview
This project is a cross-platform desktop application that converts voice input into text.
It is inspired by tools like Wispr Flow and focuses on the core voice-to-text workflow
rather than pixel-perfect UI design.

Users can press and hold a button to record their voice, release to stop recording,
and receive an accurate transcription powered by AI.

---

## Tech Stack
- **Frontend:** React + Vite
- **Desktop Framework:** Tauri
- **Speech-to-Text:** Deepgram API
- **Language:** JavaScript

---

## Core Features
- Push-to-talk voice input
- Microphone permission handling
- Audio recording using MediaRecorder
- Near real-time transcription using Deepgram
- Clear recording state feedback
- Basic error handling for microphone and API failures

---

## Architecture & Design Decisions

### Separation of Concerns
The application is structured with clear separation of responsibilities:
- **UI Layer (React):** Handles user interaction and displays transcription results
- **Audio Service:** Manages microphone access and audio recording
- **Transcription Service:** Sends recorded audio to Deepgram and processes responses

This structure improves maintainability and clarity.

### Transcription Approach
Real-time WebSocket streaming was initially explored. However, due to browser WebView
constraints in desktop environments, a near real-time REST-based transcription approach
was chosen for improved reliability and consistent behavior across platforms.

This approach still provides minimal latency while ensuring stability.

---

## Known Limitations
- Transcription occurs after recording stops (near real-time)
- Minimal UI styling (focus was on functionality)
- No offline transcription support

---

## Setup Instructions

### Prerequisites
- Node.js (v18 or later)
- Rust (required for Tauri)
- Deepgram API Key

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/Charan2629/voice-to-text-tauri.git
   ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a .env file in the project root:
    ```bash
    VITE_DEEPGRAM_API_KEY=your_api_key_here
    ```

4. Run the application:
    ```bash
    npm run dev
    npx tauri dev
    ```

---

## Demo Video

A short demo video demonstrating the complete voice-to-text workflow
(push-to-talk recording and transcription) is provided below:

🔗 Demo Video Link: https://drive.google.com/file/d/1D5e7IOZPQYRkzaE_80s0fhFIwgbvijbz/view?usp=sharing
