import React from "react";
import { CardsContainer } from "./styles/CardsList.style";
import { useSelector } from "react-redux";
import Card from "./Card";

const CardsList = (props) => {
  const likedSongs = useSelector((state) => state.user.likedSongs);

  return (
    <CardsContainer>
      {props.songList.map((item) => {
        item.isInPlaylist = likedSongs.findIndex((song) => {
          return song.track.id == item.id;
        });
        if (item.isInPlaylist > -1)
          item.uri = likedSongs[item.isInPlaylist].track.uri > -1;
        return <Card data={item} {...props} />;
      })}
    </CardsContainer>
  );
};

export default CardsList;
