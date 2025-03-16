import TrackList from "./Tracklist";

function Playlist({ trackList, handleSave, removeTrackFromTrackList }) {
  return (
    <div>
      <h1>Playlist</h1>
      <input
        className="input mx-10"
        id="playlist-name"
        type="text"
        defaultValue="New Playlist"
      />
      <TrackList
        trackList={trackList}
        removeTrackFromTrackList={removeTrackFromTrackList}
      />
      <button
        className="button"
        onClick={() => {
          if (document.getElementById("playlist-name").value === "") {
            alert("Please enter a playlist name");
            return;
          } else if (trackList.length === 0) {
            alert("Please add tracks to the playlist");
            return;
          } else {
            handleSave();
          }
        }}
      >
        Save to Spotify
      </button>
    </div>
  );
}
export default Playlist;
