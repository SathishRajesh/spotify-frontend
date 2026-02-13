import { useEffect, useState } from "react";
import { Spin } from "antd";
import API from "../api/api";
import Topbar from "./Topbar";
import Player from "./Player";
import SongGrid from "./SongGrid";
import "./spotify.css";

export default function Dashboard() {
  const [songs, setSongs] = useState([]);
  const [current, setCurrent] = useState(null);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    fetchSongs("Tamil");
  }, []);

  const fetchSongs = async (q) => {
    try {
      setLoading(true); 

      const res = await API.get(`/api/songs?q=${q}`);
      setSongs(res.data);

    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="layout">
      <div className="content">
        <Topbar onSearch={fetchSongs} />

        <h2 className="sectionTitle">Trending Songs</h2>

        {loading ? (
          <div className="loaderBox">
            <Spin size="large" />
          </div>
        ) : (
          <SongGrid songs={songs} setCurrent={setCurrent} />
        )}
      </div>

      <Player current={current} />
    </div>
  );
}
