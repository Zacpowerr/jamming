function Track({ track }) {
  return (
    <div className="track">
      <h3 className="track-title">{track.name}</h3>
      <p className="track-info">
        <small>
          {track.artist} | {track.album}
        </small>
      </p>
    </div>
  );
}

export default Track;
