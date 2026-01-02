"use client";

import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    async function initVAD() {
      const { interpolateInferno } = await import("d3-scale-chromatic");

      const indicator = document.getElementById("indicator");
      const toggleBtn = document.getElementById("toggle_vad_button") as HTMLButtonElement;

      const loading = setInterval(() => {
        if (indicator) {
          const [message, ...dots] = indicator.innerHTML.split(".");
          indicator.innerHTML = message + ".".repeat((dots.length + 1) % 7);
        }
      }, 200);

      try {
        const myvad = await (window as any).vad.MicVAD.new({
          model: "v5",
          positiveSpeechThreshold: 0.4,
          negativeSpeechThreshold: 0.4,
          minSpeechFrames: 15,
          preSpeechPadFrames: 30,
          onFrameProcessed: (probs: any) => {
            const indicatorColor = interpolateInferno(probs.isSpeech / 2);
            document.body.style.setProperty("--indicator-color", indicatorColor);
          },
          onSpeechEnd: (arr: Float32Array) => {
            const wavBuffer = (window as any).vad.utils.encodeWAV(arr);
            const base64 = (window as any).vad.utils.arrayBufferToBase64(wavBuffer);
            const url = `data:audio/wav;base64,${base64}`;
            const entry = document.createElement("li");
            const audio = document.createElement("audio");
            audio.controls = true;
            audio.src = url;
            entry.classList.add("newItem");
            entry.appendChild(audio);
            document.getElementById("playlist")?.prepend(entry);
          },
          onnxWASMBasePath: "https://cdn.jsdelivr.net/npm/onnxruntime-web@1.22.0/dist/",
          baseAssetPath: "https://cdn.jsdelivr.net/npm/@ricky0123/vad-web@0.0.28/dist/",
        });

        (window as any).myvad = myvad;

        clearInterval(loading);
        (window as any).toggleVAD = () => {
          if (myvad.listening === false) {
            myvad.start();
            toggleBtn.textContent = "STOP VAD";
            indicator!.textContent = "VAD is running";
          } else {
            myvad.pause();
            toggleBtn.textContent = "START VAD";
            indicator!.innerHTML = `VAD is <span style="color:red">stopped</span>`;
            const indicatorColor = interpolateInferno(0);
            document.body.style.setProperty("--indicator-color", indicatorColor);
          }
        };
        toggleBtn.disabled = false;
      } catch (e) {
        console.error("Failed:", e);
        clearInterval(loading);
        if (indicator) {
          indicator.innerHTML = `<span style="color:red">VAD failed to load</span>`;
        }
      }
    }

    initVAD();
  }, []);

  return (
    <div className="content-container">
      <div className="content">
        <div className="header">
          <a
            className="github-icon"
            href="https://github.com/ricky0123/vad"
            target="_blank"
          >
            <i className="fa fa-github"></i> /ricky0123/vad
          </a>
        </div>
        <h1>Voice Activity Detector (VAD) Demo</h1>
        <div className="control-row">
          <div id="indicator">
            VAD is <span style={{ color: "red" }}>LOADING</span>
          </div>
          <button id="toggle_vad_button" onClick={() => (window as any).toggleVAD()} disabled>
            START VAD
          </button>
        </div>
        <ol id="playlist" reversed></ol>
      </div>
    </div>
  );
}