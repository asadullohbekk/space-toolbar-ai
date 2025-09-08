<template>
  <div
    class="text-foreground flex flex-col items-center justify-start px-4 py-10"
  >
    <!-- Toast notifications -->
    <!-- <div v-show="toast.visible" :class="['toast', toast.type]" id="error-toast">
      {{ toast.message }}
    </div> -->

    <div class="text-center mb-6">
      <h1 class="text-3xl font-bold">Toolbar Voice Agent</h1>
      <p class="text-xl">
        Speak with Toolbar Voice agent using real-time audio streaming
      </p>
    </div>

    <div
      class="mx-auto bg-card text-card-foreground shadow-2xl rounded-full aspect-square w-[360px] md:w-[380px] flex flex-col items-center justify-center p-6 gap-6"
    >
      <button
        id="start-button"
        class="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold min-w-[180px] mx-auto flex items-center justify-center gap-3 transition-all cursor-pointer disabled:opacity-60"
        @click="handleButtonClick"
        :disabled="isConnecting"
      >
        <!-- Connecting state -->
        <div v-if="isConnecting" class="icon-with-spinner">
          <div class="spinner"></div>
          <span>Connecting...</span>
        </div>

        <!-- Connected state -->
        <template v-else-if="isConnected">
          <div class="pulse-container">
            <div
              class="pulse-circle"
              :style="{ transform: `translateX(-0%) scale(${audioLevel})` }"
            ></div>
            <span>Stop Recording</span>
          </div>
          <div
            class="mute-toggle"
            :title="isMuted ? 'Unmute' : 'Mute'"
            @click.stop="toggleMute"
            v-html="isMuted ? micMutedIconSVG : micIconSVG"
          ></div>
        </template>

        <!-- Default state -->
        <span v-else>Start Recording</span>
      </button>
    </div>

    <audio ref="audioOutput" id="audio-output"></audio>
  </div>
</template>

<script>
import { ref, reactive, onMounted, onUnmounted, nextTick } from "vue";

export default {
  name: "GeminiVoiceChat",
  setup() {
    const BACKEND_BASE_URL = "https://0823da9b7bca.ngrok-free.app";
    // Reactive data
    const selectedVoice = ref("Puck");
    const numBars = ref(32);
    const barHeights = ref(Array(32).fill(0.1));
    const audioLevel = ref(1);
    const isMuted = ref(false);
    const isConnecting = ref(false);
    const isConnected = ref(false);
    const isRecording = ref(false);

    const toast = reactive({
      visible: false,
      message: "",
      type: "error",
    });

    // WebRTC and audio variables
    let peerConnection = null;
    let audioContext = null;
    let dataChannel = null;
    let webrtc_id = null;
    let analyser_input = null;
    let dataArray_input = null;
    let analyser = null;
    let dataArray = null;
    let source_input = null;
    let source_output = null;
    let animationId = null;
    let audioLevelAnimationId = null;

    // Template refs
    const audioOutput = ref(null);

    // SVG Icons
    const micIconSVG = `
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
            <line x1="12" y1="19" x2="12" y2="23"></line>
            <line x1="8" y1="23" x2="16" y2="23"></line>
        </svg>`;

    const micMutedIconSVG = `
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
            <line x1="12" y1="19" x2="12" y2="23"></line>
            <line x1="8" y1="23" x2="16" y2="23"></line>
            <line x1="1" y1="1" x2="23" y2="23"></line>
        </svg>`;

    // Methods
    const showToast = (message, type = "error") => {
      toast.message = message;
      toast.type = type;
      toast.visible = true;

      setTimeout(() => {
        toast.visible = false;
      }, 5000);
    };

    const toggleMute = () => {
      if (!peerConnection || peerConnection.connectionState !== "connected")
        return;

      isMuted.value = !isMuted.value;
      console.log("Mute toggled:", isMuted.value);

      peerConnection.getSenders().forEach((sender) => {
        if (sender.track && sender.track.kind === "audio") {
          sender.track.enabled = !isMuted.value;
          console.log(
            `Audio track ${sender.track.id} enabled: ${!isMuted.value}`
          );
        }
      });
    };

    const updateVisualization = () => {
      if (
        !analyser ||
        !peerConnection ||
        !["connected", "connecting"].includes(peerConnection.connectionState)
      ) {
        barHeights.value = Array(numBars.value).fill(0.1);
        return;
      }

      analyser.getByteFrequencyData(dataArray);
      const newHeights = [];

      for (let i = 0; i < numBars.value; i++) {
        const barHeight = (dataArray[i] / 255) * 2;
        newHeights.push(Math.max(0.1, barHeight));
      }

      barHeights.value = newHeights;
      animationId = requestAnimationFrame(updateVisualization);
    };

    const updateAudioLevel = () => {
      if (
        !analyser_input ||
        !peerConnection ||
        !["connected", "connecting"].includes(peerConnection.connectionState)
      ) {
        audioLevel.value = 1;
        return;
      }

      analyser_input.getByteFrequencyData(dataArray_input);
      const average =
        Array.from(dataArray_input).reduce((a, b) => a + b, 0) /
        dataArray_input.length;
      const level = average / 255;
      audioLevel.value = 1 + level;

      audioLevelAnimationId = requestAnimationFrame(updateAudioLevel);
    };

    const setupWebRTC = async () => {
      // Note: __RTC_CONFIGURATION__ would need to be defined or passed as props
      const config = window.__RTC_CONFIGURATION__ || {
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      };

      peerConnection = new RTCPeerConnection(config);
      webrtc_id = Math.random().toString(36).substring(7);
      isConnecting.value = true;

      const timeoutId = setTimeout(() => {
        showToast(
          "Connection is taking longer than usual. Are you on a VPN?",
          "warning"
        );
      }, 5000);

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        stream
          .getTracks()
          .forEach((track) => peerConnection.addTrack(track, stream));

        if (!audioContext || audioContext.state === "closed") {
          audioContext = new AudioContext();
        }
        if (source_input) {
          try {
            source_input.disconnect();
          } catch (e) {
            console.warn("Error disconnecting previous input source:", e);
          }
          source_input = null;
        }
        source_input = audioContext.createMediaStreamSource(stream);
        analyser_input = audioContext.createAnalyser();
        source_input.connect(analyser_input);
        analyser_input.fftSize = 64;
        dataArray_input = new Uint8Array(analyser_input.frequencyBinCount);
        updateAudioLevel();

        peerConnection.addEventListener("connectionstatechange", () => {
          console.log("connectionstatechange", peerConnection.connectionState);

          isConnecting.value = peerConnection.connectionState === "connecting";
          isConnected.value = peerConnection.connectionState === "connected";

          if (peerConnection.connectionState === "connected") {
            clearTimeout(timeoutId);
            toast.visible = false;
            if (analyser_input) updateAudioLevel();
            if (analyser) updateVisualization();
          } else if (
            ["disconnected", "failed", "closed"].includes(
              peerConnection.connectionState
            )
          ) {
            isConnected.value = false;
            isConnecting.value = false;
          }
        });

        peerConnection.onicecandidate = ({ candidate }) => {
          if (candidate) {
            console.debug("Sending ICE candidate", candidate);
            fetch(`${BACKEND_BASE_URL}/webrtc/offer`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                candidate: candidate.toJSON(),
                webrtc_id: webrtc_id,
                type: "ice-candidate",
              }),
            });
          }
        };

        peerConnection.addEventListener("track", (evt) => {
          if (evt.track.kind === "audio" && audioOutput.value) {
            if (audioOutput.value.srcObject !== evt.streams[0]) {
              audioOutput.value.srcObject = evt.streams[0];
              audioOutput.value
                .play()
                .catch((e) => console.error("Audio play failed:", e));

              if (!audioContext || audioContext.state === "closed") {
                console.warn(
                  "AudioContext not ready for output track analysis."
                );
                return;
              }
              if (source_output) {
                try {
                  source_output.disconnect();
                } catch (e) {
                  console.warn(
                    "Error disconnecting previous output source:",
                    e
                  );
                }
                source_output = null;
              }
              source_output = audioContext.createMediaStreamSource(
                evt.streams[0]
              );
              analyser = audioContext.createAnalyser();
              source_output.connect(analyser);
              analyser.fftSize = 2048;
              dataArray = new Uint8Array(analyser.frequencyBinCount);
              updateVisualization();
            }
          }
        });

        dataChannel = peerConnection.createDataChannel("text");
        dataChannel.onmessage = (event) => {
          const eventJson = JSON.parse(event.data);
          if (eventJson.type === "error") {
            showToast(eventJson.message);
          } else if (eventJson.type === "send_input") {
            fetch(`${BACKEND_BASE_URL}/input_hook`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                webrtc_id: webrtc_id,
                voice_name: selectedVoice.value,
              }),
            });
          }
        };

        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);

        const response = await fetch(`${BACKEND_BASE_URL}/webrtc/offer`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sdp: peerConnection.localDescription.sdp,
            type: peerConnection.localDescription.type,
            webrtc_id: webrtc_id,
          }),
        });

        const serverResponse = await response.json();

        if (serverResponse.status === "failed") {
          showToast(
            serverResponse.meta.error === "concurrency_limit_reached"
              ? `Too many connections. Maximum limit is ${serverResponse.meta.limit}`
              : serverResponse.meta.error
          );
          stopWebRTC();
          return;
        }

        await peerConnection.setRemoteDescription(serverResponse);
      } catch (err) {
        clearTimeout(timeoutId);
        console.error("Error setting up WebRTC:", err);
        showToast("Failed to establish connection. Please try again.");
        stopWebRTC();
      }
    };

    const stopWebRTC = () => {
      console.log("Running stopWebRTC");

      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
      if (audioLevelAnimationId) {
        cancelAnimationFrame(audioLevelAnimationId);
        audioLevelAnimationId = null;
      }

      if (peerConnection) {
        peerConnection.getSenders().forEach((sender) => {
          if (sender.track) {
            sender.track.stop();
          }
        });
        peerConnection.ontrack = null;
        peerConnection.onicegatheringstatechange = null;
        peerConnection.onconnectionstatechange = null;

        if (dataChannel) {
          dataChannel.onmessage = null;
          try {
            dataChannel.close();
          } catch (e) {
            console.warn("Error closing data channel:", e);
          }
          dataChannel = null;
        }
        try {
          peerConnection.close();
        } catch (e) {
          console.warn("Error closing peer connection:", e);
        }
        peerConnection = null;
      }

      if (audioOutput.value) {
        audioOutput.value.pause();
        audioOutput.value.srcObject = null;
      }

      if (source_input) {
        try {
          source_input.disconnect();
        } catch (e) {
          console.warn("Error disconnecting input source:", e);
        }
        source_input = null;
      }
      if (source_output) {
        try {
          source_output.disconnect();
        } catch (e) {
          console.warn("Error disconnecting output source:", e);
        }
        source_output = null;
      }

      if (audioContext && audioContext.state !== "closed") {
        audioContext
          .close()
          .then(() => {
            console.log("AudioContext closed successfully.");
            audioContext = null;
          })
          .catch((e) => {
            console.error("Error closing AudioContext:", e);
            audioContext = null;
          });
      } else {
        audioContext = null;
      }

      analyser_input = null;
      dataArray_input = null;
      analyser = null;
      dataArray = null;

      isMuted.value = false;
      isRecording.value = false;
      isConnected.value = false;
      isConnecting.value = false;

      barHeights.value = Array(numBars.value).fill(0.1);
      audioLevel.value = 1;
    };

    const handleButtonClick = () => {
      if (peerConnection && peerConnection.connectionState === "connected") {
        console.log("Stop button clicked");
        stopWebRTC();
      } else if (
        !peerConnection ||
        ["new", "closed", "failed", "disconnected"].includes(
          peerConnection?.connectionState || "new"
        )
      ) {
        console.log("Start button clicked");
        setupWebRTC();
        isRecording.value = true;
      }
    };

    // Lifecycle hooks
    onUnmounted(() => {
      stopWebRTC();
    });

    return {
      // Reactive data
      selectedVoice,
      numBars,
      barHeights,
      audioLevel,
      isMuted,
      isConnecting,
      isConnected,
      isRecording,
      toast,

      // Template refs
      audioOutput,

      // Constants
      micIconSVG,
      micMutedIconSVG,

      // Methods
      handleButtonClick,
      toggleMute,
    };
  },
};
</script>

<style scoped>
/* Use site CSS variables for colors; keep minimal component-specific styles */
:root {
  --boxSize: 8px;
  --gutter: 4px;
}

.wave-container {
  position: relative;
  display: flex;
  min-height: 100px;
  max-height: 128px;
  justify-content: center;
  align-items: center;
  margin: 0.5rem 0 0.5rem 0;
}

.box-container {
  display: flex;
  justify-content: space-between;
  height: 64px;
  width: 100%;
}

.box {
  height: 100%;
  width: var(--boxSize);
  background: var(--primary);
  border-radius: 8px;
  transition: transform 0.05s ease;
}

.controls {
  display: grid;
  gap: 1rem;
  margin-bottom: 2rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-size: 0.875rem;
  font-weight: 500;
}

input,
select {
  font-size: 1rem;
}

button:hover {
  transform: translateY(-1px);
}

.icon-with-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-width: 180px;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid white;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  flex-shrink: 0;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.pulse-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.pulse-circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: white;
  opacity: 0.2;
  flex-shrink: 0;
  transition: transform 0.1s ease;
}

.toast {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 16px 24px;
  border-radius: 4px;
  font-size: 14px;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.toast.error {
  background-color: #f44336;
  color: white;
}

.toast.warning {
  background-color: #ffd700;
  color: black;
}

.mute-toggle {
  width: 24px;
  height: 24px;
  cursor: pointer;
  flex-shrink: 0;
}

.mute-toggle :deep(svg) {
  display: block;
}

#start-button {
  margin-left: auto;
  margin-right: auto;
}
</style>
