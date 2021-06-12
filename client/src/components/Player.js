import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { Player as PlayerContainer } from "./styles/Player.style";

const Player = ({ token }) => {
  return (
    <PlayerContainer>
      <SpotifyPlayer
        name="Reviewsic"
        syncExternalDeviceInterval={1}
        token={token}
        uris={["spotify:artist:6HQYnRM4OzToCYPpVBInuU"]}
      />
    </PlayerContainer>
  );
};

export default Player;
