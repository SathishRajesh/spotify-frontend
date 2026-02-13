import { useEffect, useRef, useState } from "react";

export default function Player({ current }) {
  const audioRef = useRef(new Audio());

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (current) {
      audioRef.current.src = current.preview;
      audioRef.current.play();
      setPlaying(true);
    }
  }, [current]);

  useEffect(() => {
    const audio = audioRef.current;

    const update = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    audio.addEventListener("timeupdate", update);

    return () => audio.removeEventListener("timeupdate", update);
  }, []);

  const play = () => {
    audioRef.current.play();
    setPlaying(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setPlaying(false);
  };

  const seek = (e) => {
    const value = e.target.value;
    audioRef.current.currentTime =
      (value / 100) * audioRef.current.duration;
    setProgress(value);
  };

  if (!current) return null;

  return (
    <div className="player">
      <div className="playerLeft">
        <img src={current.cover} />
        <div>
          <h4>{current.title}</h4>
          <p>{current.artist}</p>
        </div>
      </div>

      <div className="playerCenter">
        {playing ? (
          <button onClick={pause}>⏸</button>
        ) : (
          <button onClick={play}>▶</button>
        )}

        <input
          type="range"
          value={progress}
          onChange={seek}
          className="seek"
        />
      </div>
    </div>
  );
}
