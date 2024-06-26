import React, { useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";
import Card from "./Card";
import "./styles/CarouselRow.css";

import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

import { motion } from "framer-motion";

const CarouselRow = (props) => {
  const likedSongs = useSelector((state) => state.user.likedSongs);

  const carousel = React.useRef(null);

  const [index, setIndex] = useState(0);
  const [sortTypeState, setSortTypeState] = useState(props.sortType);

  const handleClick = (value) => {
    if (index + value == -1 || index + value == props.data.songList.length)
      return;
    setIndex(index + value);
  };

  useEffect(() => {
    if (carousel.current) carousel.current.goTo(index);
  }, [index]);

  if (sortTypeState != props.sortType) {
    setSortTypeState(props.sortType);
  }

  let sorted = [];

  const sortType = props.sortType;

  if (sortType === "song")
    sorted = props.data.songList.sort((a, b) =>
      a[sortType].localeCompare(b[sortType], "en", { sensitivity: "base" })
    );
  else sorted = props.data.songList.sort((a, b) => b[sortType] - a[sortType]);

  return (
    <motion.div
      className="m-auto carousel-row"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.05,
        delay: 0.2,
      }}
    >
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
          song.isInPlaylist = likedSongs.findIndex((item) => {
            return item.track.id == song.id;
          });
          if (song.isInPlaylist > -1)
            song.uri = likedSongs[song.isInPlaylist].track.uri > -1;
          return (
            <Card
              data={song}
              {...props}
              sortType={sortTypeState ? sortTypeState : "song"}
            ></Card>
          );
        })}
      </Carousel>
    </motion.div>
  );
};

export default CarouselRow;
