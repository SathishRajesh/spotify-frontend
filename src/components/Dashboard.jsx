import { useEffect, useState } from "react";
import API from "../api/api";
import Topbar from "./Topbar";
import Player from "./Player";
import "./spotify.css";
import SongGrid from "./SongGrid";

export default function Dashboard() {
  const [songs, setSongs] = useState([]);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    fetchSongs("Tamil");
  }, []);

  const fetchSongs = async (q) => {
    const res = await API.get(`/api/songs?q=${q}`);
    setSongs(res.data);
  };

  return (
    <div className="layout">
      <div className="content">
        <Topbar onSearch={fetchSongs} />

        <h2 className="sectionTitle">Trending Songs</h2>
        <SongGrid songs={songs} setCurrent={setCurrent} />
      </div>

      <Player current={current} />
    </div>
  );
}
