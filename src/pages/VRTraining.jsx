import React, { useState, useRef, useEffect } from "react";
import "../styles/video.css";

const VRTraining = () => {
  const [lang, setLang] = useState("en");
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  // Sync play/pause/seek between video and external audio
  useEffect(() => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!video || !audio) return;

    const handlePlay = () => {
      if (lang === "hi") audio.play();
    };
    const handlePause = () => {
      if (lang === "hi") audio.pause();
    };
    const handleSeek = () => {
      if (lang === "hi") audio.currentTime = video.currentTime;
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("seeked", handleSeek);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("seeked", handleSeek);
    };
  }, [lang]);

  // Change audio/video behavior when language changes
  useEffect(() => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!video || !audio) return;

    if (lang === "hi") {
      // Hindi: video has English voice → mute and overlay Hindi dub
      video.muted = true;
      audio.src = "/videos/hindidub.mp3";
      audio.currentTime = video.currentTime;
      audio.volume = 1.0;
      audio.play().catch(() => {});
    } else {
      // Stop Hindi audio for other languages
      audio.pause();
      audio.currentTime = 0;

      // English and Marathi videos have their own voices
      video.muted = false;
    }
  }, [lang]);

  return (
    <div className="page">
      <h1 className="heading">Virtual Reality Safety Training</h1>

      <div className="player-container">
        <video
          className="video"
          ref={videoRef}
          controls
          autoPlay
          key={lang}
        >
          {lang === "en" && (
            <>
              <source src="/videos/training.mp4" type="video/mp4" />
              <track
                src="/videos/subtitles_en.vtt"
                kind="subtitles"
                srcLang="en"
                label="English"
                default
              />
            </>
          )}

          {lang === "hi" && (
            <>
              <source src="/videos/training_hi.mp4" type="video/mp4" />
              <track
                src="/videos/subtitles_hi.vtt"
                kind="subtitles"
                srcLang="hi"
                label="Hindi"
                default
              />
            </>
          )}

          {lang === "mr" && (
            <>
              <source src="/videos/traning_mi.mp4" type="video/mp4" />
              <track
                src="/videos/subtitles_mr.vtt"
                kind="subtitles"
                srcLang="mr"
                label="Marathi"
                default
              />
            </>
          )}
        </video>

        {/* External audio overlay for Hindi */}
        <audio ref={audioRef} />

        <div className="buttons-row">
          <button className="lang-button" onClick={() => setLang("en")}>
            English
          </button>
          <button className="lang-button" onClick={() => setLang("hi")}>
            हिंदी
          </button>
          <button className="lang-button" onClick={() => setLang("mr")}>
            मराठी
          </button>
        </div>
      </div>

      <p className="hint">
        Choose your preferred language to switch video, audio, and subtitles.
      </p>
    </div>
  );
};

export default VRTraining;
