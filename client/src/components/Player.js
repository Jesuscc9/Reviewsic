import React, { useEffect, useState } from "react";
import { Player as PlayerContainer } from "./styles/Player.style";
import SpotifyPlayer from "react-spotify-web-playback";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
  faForward,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({ token, song }) => {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (song?.paused) {
      setPlay(false);
    } else {
      setPlay(true);
    }
  }, [song]);

  return (
    <PlayerContainer>
      <SpotifyPlayer
        name="Reviewsic"
        token={token}
        callback={(state) => {
          if (!state.isPlaying) setPlay(false);
        }}
        play={play}
        uris={song ? [song.spotifyUri] : []}
      />
      {/* <div className="player-overlay-container">
        <div className="player-overlay">
          <div className="slider"></div>
          <div className="content">
            <div className="song-image">
              <img src="" alt="" />
            </div>
            <div className="info"></div>
          </div>
          <div className="controls">
            <button className="control-button backward">
              <FontAwesomeIcon icon={faBackward} />
            </button>
            <button
              className="control-button play"
              onClick={() => {
                setPlayerStatus({
                  ...playerStatus,
                  isPlaying: !playerStatus.isPlaying,
                });
              }}
            >
              <FontAwesomeIcon icon={faPause} />
            </button>
            <button className="control-button forward">
              <FontAwesomeIcon icon={faForward} />
            </button>
          </div>
        </div>
      </div> */}
    </PlayerContainer>
  );
};

export default Player;
