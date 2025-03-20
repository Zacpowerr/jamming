import { render, screen } from "@testing-library/react";
import Playlist from "./Playlist";

describe("Playlist", () => {
  let trackList;
  let handleSave;
  let removeTrackFromTrackList;
  beforeAll(() => {
    trackList = [];
    handleSave = jest.fn();
    removeTrackFromTrackList = jest.fn();
  });

  it("should render correctly", () => {
    const { container } = render(
      <Playlist
        trackList={trackList}
        handleSave={handleSave}
        removeTrackFromTrackList={removeTrackFromTrackList}
      />
    );
    expect(container).toMatchSnapshot();
  });
  it("should render a header", () => {
    render(
      <Playlist
        trackList={trackList}
        handleSave={handleSave}
        removeTrackFromTrackList={removeTrackFromTrackList}
      />
    );
    expect(screen.getByText("Playlist").innerHTML).toBe("Playlist");
  });
  it("should render an input element", () => {
    render(
      <Playlist
        trackList={trackList}
        handleSave={handleSave}
        removeTrackFromTrackList={removeTrackFromTrackList}
      />
    );
    expect(screen.getByDisplayValue("New Playlist")).toBeInTheDocument();
  });
  it("should render button element", () => {
    render(
      <Playlist
        trackList={trackList}
        handleSave={handleSave}
        removeTrackFromTrackList={removeTrackFromTrackList}
      />
    );
    expect(screen.getByRole("button").innerHTML).toBe("Save to Spotify");
  });
});
