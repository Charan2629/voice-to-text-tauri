import { useState, useEffect } from "react";
import { startRecording, stopRecording } from "./services/audioService";
import { transcribeAudio } from "./services/deepgramService";

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [status, setStatus] = useState("Idle");

  const handleStart = async () => {
    if (isRecording) return;

    setTranscript("");
    setStatus("Recording...");
    setIsRecording(true);
    await startRecording();
  };

  const handleStop = async () => {
    if (!isRecording) return;

    setIsRecording(false);
    setStatus("Transcribing...");

    try {
      const audioBlob = await stopRecording();
      if (audioBlob) {
        const text = await transcribeAudio(audioBlob);
        setTranscript(text);
      }
    } catch (err) {
      console.error(err);
      setTranscript("Transcription failed");
    }

    setStatus("Idle");
  };

  // ✅ GLOBAL mouse release handler
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      handleStop();
    };

    if (isRecording) {
      window.addEventListener("mouseup", handleGlobalMouseUp);
    }

    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isRecording]);

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h2>Voice to Text (Tauri + Deepgram)</h2>

      <button
        onMouseDown={handleStart}
        style={{
          padding: "12px 24px",
          fontSize: 16,
          backgroundColor: isRecording ? "#e74c3c" : "#2ecc71",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        {isRecording ? "Release to Stop" : "Hold to Talk"}
      </button>

      <p>Status: {status}</p>

      <div
        style={{
          marginTop: 20,
          padding: 12,
          minHeight: 80,
          border: "1px solid #ccc",
          borderRadius: 4,
        }}
      >
        {transcript || "Transcription will appear here..."}
      </div>
    </div>
  );
}

export default App;
