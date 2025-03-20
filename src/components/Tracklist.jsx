import Track from "./Track";

function TrackList({ trackList, removeTrackFromTrackList }) {
  return (
    <div className="tracklist">
      <h2>Track List</h2>
      {trackList.length > 0 &&
        trackList.map((track) => (
          <div key={`track-${track.id}`}>
            <div key={track.id} className="track-item">
              <Track key={track.id} track={track} />
              <button
                key={`remove-${track.id}`}
                className="remove-button"
                onClick={() => removeTrackFromTrackList(track)}
              >
                -
              </button>
            </div>
            <div key={`divider-${track.id}`} className="divider-h"></div>
          </div>
        ))}
    </div>
  );
}

export default TrackList;
