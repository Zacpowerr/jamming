function SearchBar({ handleSearch }) {
  return (
    <div className="search-bar">
      <input className="input" type="text" placeholder="Search..." />
      <button
        className="button"
        onClick={() => {
          handleSearch();
        }}
      >
        SEARCH
      </button>
    </div>
  );
}
export default SearchBar;
