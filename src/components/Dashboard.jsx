import { useEffect, useState } from "react";
import API from "../api/api";

export default function Dashboard() {
  const [songs, setSongs] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(null);

  useEffect(() => {
    API.get("/api/songs").then(res => setSongs(res.data));
  }, []);

  const playPause = (url) => {
    if (!currentAudio) {
      const audio = new Audio(url);
      audio.play();
      setCurrentAudio(audio);
    } else if (currentAudio.src === url) {
      currentAudio.paused ? currentAudio.play() : currentAudio.pause();
    } else {
      currentAudio.pause();
      const audio = new Audio(url);
      audio.play();
      setCurrentAudio(audio);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4">Music Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {songs.map(song => (
          <div key={song._id} className="p-4 border rounded shadow-md">
            <img src={song.image} alt={song.title} className="w-full h-48 object-cover mb-2"/>
            <h3 className="font-bold">{song.title}</h3>
            <p>{song.artist}</p>
            <button onClick={() => playPause(song.preview_url)} className="bg-green-500 p-2 text-white mt-2 rounded">
              Play / Pause
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
