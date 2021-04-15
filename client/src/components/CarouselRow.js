import React, { useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";
import Card from "./Card";
import "./styles/CarouselRow.css";

import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CarouselRow = (props) => {

  const carousel = React.useRef(null);

  const [index, setIndex] = useState(0);
  const [sortTypeState, setSortTypeState] = useState(props.sortType)

  const handleClick = (value) => {
    if (index + value == -1 || index + value == props.data.songList.length)
      return;
    setIndex(index + value);
  };

  useEffect(() => {
    if (carousel.current) carousel.current.goTo(index);
  }, [index]);

  if(sortTypeState != props.sortType){
    setSortTypeState(props.sortType)
  }

  let sorted = []

  const sortType = props.sortType;

  if (sortType === "song")
    sorted = props.data.songList.sort((a, b) =>
      a[sortType].localeCompare(b[sortType], "en", { sensitivity: "base" })
    );
  else sorted = props.data.songList.sort((a, b) => b[sortType] - a[sortType]);


  return (
    <div className="m-auto">
      <div className="w-100 flex justify-center">
        <div className="carousel-buttons">
          <h5 className="carousel-genre">{props.data.genre}</h5>
          <div className="buttons-container">
            <button
              className="backward-button carousel-button"
              onClick={() => {
                handleClick(-1);
              }}
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                className={`carousel-arrows-icon ${
                  index > 0 ? "" : "disabled-carousel-arrows-icon"
                }`}
              />
            </button>
            <button
              className="forward-button carousel-button"
              onClick={() => {
                handleClick(1);
              }}
            >
              <FontAwesomeIcon
                icon={faChevronRight}
                className={`carousel-arrows-icon ${
                  index + 1 < props.data.songList.length
                    ? ""
                    : "disabled-carousel-arrows-icon"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
      <Carousel
        focusOnSelect={true}
        ref={carousel}
        outerSpacing={10}
        renderArrow={() => {
          return <div />;
        }}
      >
        {sorted.map((song) => {
          return (
            <Card
              data={song}
              likedSongs={props.likedSongs}
              user={props.user}
              update={() => {
                props.update(song);
              }}
              delete={(e) => {
                props.delete(e);
              }}
              addSong={async (songId, item) => {
                props.addSong(songId, item);
              }}
              deleteSong={async (songId, uri, pos) => {
                props.deleteSong(songId, uri, pos, song);
              }}
              sortType={sortTypeState ? sortTypeState : 'song'}
            ></Card>
          );
        })}
      </Carousel>
    </div>
  );
};

export default CarouselRow;
