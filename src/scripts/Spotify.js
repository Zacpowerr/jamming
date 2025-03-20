class Spotify {
  _accessToken;
  _redirectUri;
  _clientId;
  constructor() {
    this._accessToken = "";
    this._redirectUri = "http://localhost:3000/";
    this._clientId = "3d46fea990804b40a725204860e8fa44";
  }
  getAccessToken() {
    if (this._accessToken) {
      return this._accessToken;
    }
    if (window.sessionStorage.getItem("accessToken")) {
      this._accessToken = window.sessionStorage.getItem("accessToken");
      return this._accessToken;
    }
    try {
      const accessTokenUrl = `https://accounts.spotify.com/authorize?client_id=${this.clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${this.redirectUri}`;
      window.open(accessTokenUrl, "_self").focus();
      const accessToken = window.location.href.match(/access_token=([^&]*)/);
      this.accessToken = accessToken[1];
      window.sessionStorage.setItem("accessToken", this.accessToken);
    } catch (error) {
      console.log(error);
    }
  }
  async search(term) {
    const response = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${term}`,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      }
    );
    const jsonResponse = await response.json();
    if (!jsonResponse.tracks) {
      return [];
    }
    return jsonResponse.tracks.items.map((track) => {
      return {
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
      };
    });
  }

  async savePlaylist(playlistName, trackUris) {
    if (!playlistName || !trackUris.length) {
      return;
    }
    const headers = {
      Authorization: `Bearer ${this.accessToken}`,
    };
    let userId;
    let playlistId;
    try {
      const response = await fetch("https://api.spotify.com/v1/me", {
        headers: headers,
      });
      const jsonResponse = await response.json();
      userId = jsonResponse.id;
    } catch (error) {
      console.log(error);
    }
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          method: "POST",
          headers: {
            ...headers,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: playlistName }),
        }
      );
      const jsonResponse = await response.json();
      playlistId = jsonResponse.id;
    } catch (error) {
      console.log(error);
    }
    try {
      await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
        {
          method: "POST",
          headers: {
            ...headers,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uris: trackUris }),
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  get accessToken() {
    return this._accessToken;
  }
  get redirectUri() {
    return this._redirectUri;
  }
  get clientId() {
    return this._clientId;
  }
  set accessToken(newAccessToken) {
    this._accessToken = newAccessToken;
  }
  set redirectUri(newRedirectUri) {
    this._redirectUri = newRedirectUri;
  }
  set clientId(newClientId) {
    this._clientId = newClientId;
  }
  toString() {
    return `accessToken: ${this._accessToken}, redirectUri: ${this._redirectUri}, clientId: ${this._clientId}`;
  }
}
export default Spotify;
