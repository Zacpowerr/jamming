import { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Playlist from "./components/Playlist";
import Spotify from "./scripts/Spotify";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const spotify = new Spotify();
  const [trackList, setTrackList] = useState([]);
  function handleSearch() {
    console.log("Search clicked");
    const searchTerm = document.querySelector("input").value;
    // Mock call to Spotify API
    console.log(`Searching for ${searchTerm}...`);
    spotify.getAccessToken();
    spotify.search(searchTerm).then((results) => {
      setSearchResults(results);
    });
  }
  function addTrackToTrackList(track) {
    console.log(`Adding ${track.name} to track list`);
    if (trackList.some((t) => t.id === track.id)) {
      console.log(`${track.name} is already in the track list`);
      return;
    } else {
      console.log(`${track.name} is not in the track list`);
      setTrackList([...trackList, track]);
    }
  }
  function removeTrackFromTrackList(track) {
    console.log(`Removing ${track.name} from track list`);
    setTrackList(trackList.filter((t) => t.id !== track.id));
  }
  function handleSave(playlistName) {
    console.log(`Saving ${trackList.length} tracks to Spotify`);
    const trackUris = trackList.map((track) => track.uri);
    spotify.getAccessToken();
    spotify.savePlaylist(playlistName, trackUris).then(() => {
      alert(`Saved ${trackList.length} tracks to Spotify`);
      setTrackList([]);
    });
  }

  function handleSignIn() {
    console.log("Signing in...");
    spotify.getAccessToken();
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Jamming</h1>
        {!window.sessionStorage.getItem("accessToken") && (
          <button
            className="mb-2"
            onClick={() => {
              handleSignIn();
            }}
          >
            Sign in
          </button>
        )}
      </header>
      <main className="container">
        <div className="search-container">
          <SearchBar handleSearch={handleSearch} />
        </div>
        <div className="results-playlist-container">
          <div className="search-results">
            <SearchResults
              results={searchResults}
              addTrackToTrackList={addTrackToTrackList}
            />
          </div>
          <div className="divider-v"></div>
          <div className="playlist">
            <Playlist
              trackList={trackList}
              handleSave={handleSave}
              removeTrackFromTrackList={removeTrackFromTrackList}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
