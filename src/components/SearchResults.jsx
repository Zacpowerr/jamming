import Track from "./Track";

function SearchResults({ results, addTrackToTrackList }) {
  return (
    <div>
      {results.map((result) => (
        <div key={`result-${result.id}`}>
          <div key={result.id} className="track-item">
            <Track key={`track-${result.id}`} track={result} />
            <button
              key={`add-${result.id}`}
              className="add-button"
              onClick={() => addTrackToTrackList(result)}
            >
              +
            </button>
          </div>
          <div key={`divider-${result.id}`} className="divider-h"></div>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
