import React, { useEffect, useState } from "react";
import { Player as PlayerContainer } from "./styles/Player.style";
import SpotifyPlayer from "react-spotify-web-playback";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
  faForward,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({ token, song, setInitialSong, updateActivity }) => {
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
        syncExternalDevice={true}
        callback={(state) => {
          if (
            state.isActive == true &&
            state.isPlaying == true &&
            state.track.name == ""
          ) {
            setInitialSong();
            updateActivity({ ...state.track, isPlaying: false });
            return;
          }
          if (state.isPlaying && !song) setInitialSong(state.track);
          if (!state.isPlaying) setPlay(false);

          if (state.isPlaying != undefined) {
            updateActivity({ ...state.track, isPlaying: state.isPlaying });
          }
        }}
        play={play}
        uris={song?.spotifyUri && [song.spotifyUri]}
      />
    </PlayerContainer>
  );
};

export default Player;
