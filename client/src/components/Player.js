import React, { useEffect, useState } from "react";
import { Player as PlayerContainer } from "./styles/Player.style";
import SpotifyPlayer from "react-spotify-web-playback";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
  faForward,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({ token }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <PlayerContainer>
      <SpotifyPlayer
        name="Reviewsic"
        syncExternalDevice={true}
        syncExternalDeviceInterval={3}
        token={token}
        play={playing}
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
            {/* <button className="control-button backward">
              <FontAwesomeIcon icon={faBackward} />
            </button> */}
            <button
              className="control-button play"
              onClick={() => {
                console.log("Se clickea");
                setPlaying(!playing);
              }}
            >
              <FontAwesomeIcon icon={faPause} />
            </button>
            {/*             <button className="control-button forward">
              <FontAwesomeIcon icon={faForward} />
            </button> */}
          </div>
        </div>
      </div>
    </PlayerContainer>
  );
};

export default Player;
