import React from "react";
import { CardsContainer } from "./styles/CardsList.style";
import { useSelector } from "react-redux";
import Card from "./Card";
import { useParams } from "react-router";

const CardsList = (props) => {
  const params = useParams();

  const likedSongs = useSelector((state) => state.user.likedSongs);

  var cards = [];

  if (params.id) {
    cards = props.songList.filter((e) => e.id != params.id);
  } else {
    cards = props.songList;
  }

  cards = cards.map((item) => {
    item.isInPlaylist = likedSongs.findIndex((song) => {
      return song.track.id == item.id;
    });
    if (item.isInPlaylist > -1) {
      item.uri = likedSongs[item.isInPlaylist].track.uri > -1;
    }

    var cant = 0;

    const rating =
      (props.qualifications.reduce((acc, x) => {
        cant++;
        return x.reviewId == item.id ? acc + x.qualification : 0;
      }, 0) +
        item.qualification) /
      (cant + 1);

    item.rating = rating;

    item.likes = props.likes.reduce((acc, x) => {
      return x.reviewId == item.id && x.isLike ? acc + 1 : acc;
    }, 0);

    return item;
  });

  const sortType = props.sortType;

  if (props.sortType === "song") {
    cards = [...cards].sort((a, b) =>
      a[sortType].localeCompare(b[sortType], "en", { sensitivity: "base" })
    );
  } else {
    cards = [...cards].sort((a, b) => b[sortType] - a[sortType]);
  }

  return (
    <CardsContainer>
      {cards.map((item) => {
        return <Card data={item} {...props} />;
      })}
    </CardsContainer>
  );
};

export default CardsList;
