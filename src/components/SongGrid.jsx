export default function SongGrid({ songs, setCurrent }) {
  return (
    <div className="grid">
      {songs.map((song) => (
        <div
          key={song.id}
          className="card"
          onClick={() => setCurrent(song)}
        >
          <div className="imgBox">
            <img src={song.cover} />
            <button className="playBtn">▶</button>
          </div>

          <h4>{song.title}</h4>
          <p>{song.artist}</p>
        </div>
      ))}
    </div>
  );
}
