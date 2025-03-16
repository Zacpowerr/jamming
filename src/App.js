import { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Playlist from "./components/Playlist";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [trackList, setTrackList] = useState([]);
  function handleSearch() {
    console.log("Search clicked");
    const searchTerm = document.querySelector("input").value;
    // Mock call to Spotify API
    console.log(`Searching for ${searchTerm}...`);
    const searchResults = [
      {
        id: "1",
        name: "Tears in Heaven",
        album: "Rush (Soundtrack)",
        artist: "Eric Clapton",
      },
      {
        id: "2",
        name: "Locked Out of Heaven",
        album: "Unorthodox Jukebox",
        artist: "Bruno Mars",
      },
      {
        id: "3",
        name: "Heaven",
        album: "Bryan Adams Anthology",
        artist: "Bryan Adams",
      },
      {
        id: "4",
        name: "Stairway to Heaven",
        album: "Led Zeppelin IV",
        artist: "Led Zeppelin",
      },
      {
        id: "5",
        name: "Just Like Heaven",
        album: "Kiss Me, Kiss Me, Kiss Me",
        artist: "The Cure",
      },
      {
        id: "6",
        name: "Heaven Sent",
        album: "Afrodisiac",
        artist: "Brandy",
      },
      {
        id: "7",
        name: "Heaven Is a Place on Earth",
        album: "Heaven on Earth",
        artist: "Belinda Carlisle",
      },
      {
        id: "8",
        name: "Heaven Knows",
        album: "Ceremonials",
        artist: "Florence + The Machine",
      },
      {
        id: "9",
        name: "If Heaven Wasn’t So Far Away",
        album: "Outlaws Like Me",
        artist: "Justin Moore",
      },
      {
        id: "10",
        name: "Almost Heaven",
        album: "Dream Your Life Away",
        artist: "Vance Joy",
      },
    ];
    console.log(searchResults);
    setSearchResults(searchResults);
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
  function handleSave() {
    console.log(`Saving ${trackList.length} tracks to Spotify`);
    console.log(trackList);
    trackList.forEach((track) => {
      console.log(`Saving ${track.name} to Spotify`);
    });
    alert(`Saved ${trackList.length} tracks to Spotify`);
    setTrackList([]);
  }
  return (
    <div className="App">
      <header className="App-header">Jamming</header>
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
