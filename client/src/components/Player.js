import React from "react";
import { Player as PlayerContainer } from "./styles/Player.style";
import SpotifyPlayer from "react-spotify-web-playback";
const Player = ({ token }) => {
  return (
    <PlayerContainer>
      <SpotifyPlayer
        name="Reviewsic"
        syncExternalDevice={true}
        syncExternalDeviceInterval={3}
        token={token}
        callback={(state) => {
          console.log(state);
        }}
      />
      <div className="player-overlay-container">
        <div className="player-overlay">
          <div className="slider"></div>
          <div className="content">
            <div className="song-image">
              <img src="" alt="" />
            </div>
            <div className="info"></div>
          </div>
          <div className="controls">
            <button>Forward</button>
            <button>Play</button>
            <button>Backwards</button>
          </div>
        </div>
      </div>
    </PlayerContainer>
  );
};

export default Player;
