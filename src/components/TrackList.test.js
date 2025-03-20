import { render, screen } from "@testing-library/react";
import TrackList from "./Tracklist";

describe("TrackList", () => {
  let trackList;
  let removeTrackFromTrackList;
  beforeAll(() => {
    trackList = [];
    removeTrackFromTrackList = jest.fn();
  });
  it("should render correctly", () => {
    render(
      <TrackList
        trackList={trackList}
        removeTrackFromTrackList={removeTrackFromTrackList}
      />
    );
  });
  it("should render a header", () => {
    render(
      <TrackList
        trackList={trackList}
        removeTrackFromTrackList={removeTrackFromTrackList}
      />
    );
    expect(screen.getByText("Track List")).toBeInTheDocument();
  });
  it("should render nothing when trackList is empty", () => {
    render(
      <TrackList
        trackList={trackList}
        removeTrackFromTrackList={removeTrackFromTrackList}
      />
    );
    expect(screen.queryByText("Track")).toBeNull();
  });
  it("should render a track when trackList is not empty", () => {
    trackList = [
      {
        id: 1,
        name: "Track 1",
        artist: "Artist 1",
        album: "Album 1",
      },
    ];
    render(
      <TrackList
        trackList={trackList}
        removeTrackFromTrackList={removeTrackFromTrackList}
      />
    );
    expect(screen.getByText("Track 1")).toBeInTheDocument();
  });
  it("should render a remove button when trackList is not empty", () => {
    trackList = [
      {
        id: 1,
        name: "Track 1",
        artist: "Artist 1",
        album: "Album 1",
      },
    ];
    render(
      <TrackList
        trackList={trackList}
        removeTrackFromTrackList={removeTrackFromTrackList}
      />
    );
    expect(screen.getByText("-")).toBeInTheDocument();
  });
  it("should call removeTrackFromTrackList when remove button is clicked", () => {
    trackList = [
      {
        id: 1,
        name: "Track 1",
        artist: "Artist 1",
        album: "Album 1",
      },
    ];
    render(
      <TrackList
        trackList={trackList}
        removeTrackFromTrackList={removeTrackFromTrackList}
      />
    );
    const button = screen.getByText("-");
    button.click();
    expect(removeTrackFromTrackList).toHaveBeenCalled();
  });
});
