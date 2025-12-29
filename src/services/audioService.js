let mediaRecorder = null;
let audioChunks = [];

export async function startRecording() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

  mediaRecorder = new MediaRecorder(stream, {
    mimeType: "audio/webm;codecs=opus",
  });

  audioChunks = [];

  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      audioChunks.push(event.data);
    }
  };

  mediaRecorder.start();
}

export function stopRecording() {
  return new Promise((resolve) => {
    if (!mediaRecorder) return resolve(null);

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, {
        type: "audio/webm",
      });

      mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      mediaRecorder = null;

      resolve(audioBlob);
    };

    mediaRecorder.stop();
  });
}
