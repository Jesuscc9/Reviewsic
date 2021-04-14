import React, { useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";
import Card from "./Card";
import './styles/CarouselRow.css'

import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CarouselRow = (props) => {

  const carousel = React.useRef(null);

  const [index, setIndex] = useState(0)

  const handleClick = (value) => {
    if(index  + value == -1 || index + value == props.data.songList.length) return
    setIndex(index + value)
  }

  useEffect(() => {
    if(carousel.current)carousel.current.goTo(index)
  }, [index])

  console.log(props);
  return (
    <div>
      <div className="carousel-buttons">
        <div className="buttons-container">
          <button className="backward-button carousel-button" onClick={() => {
              handleClick(-1)
            }}>
            <FontAwesomeIcon icon={faChevronLeft} className={`carousel-arrows-icon ${index > 0 ? '' : 'disabled-carousel-arrows-icon' }`}/>
          </button>
          <button className="forward-button carousel-button" onClick={() => {
              handleClick(1)
            }}>
            <FontAwesomeIcon icon={faChevronRight} className={`carousel-arrows-icon ${index + 1 < props.data.songList.length ? '' : 'disabled-carousel-arrows-icon' }`}/>
          </button>
        </div>
      </div>
      <Carousel
        focusOnSelect={true}
        ref={carousel}
        // renderPagination={({ pages, activePage, onClick }) => {
        //   return (<div/>)
        // }} 
        renderArrow={() => {
          return <div/>
        }}
      >
        {props.data.songList.map((song) => {
          return (
            <Card data={song} likedSongs={props.likedSongs}></Card>
          );
        })}
      </Carousel>
    </div>
  );
};

export default CarouselRow;
