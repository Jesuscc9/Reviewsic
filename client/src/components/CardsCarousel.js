import React from "react";
import Carousel from "react-elastic-carousel";
import Card from '../components/Card'

const CardCarousel = (props) => {
  return (
    <Carousel itemsToShow={2} focusOnSelect={true} enableAutoPlay={5000}   renderPagination={({ pages, activePage, onClick }) => {
      return (<div/>)
    }} renderArrow={() => {
      return <div/>
    }}
      outerSpacing={20}
    >
      {(props.songList).map(song => {
        return (
          <Card data={song} likedSongs={props.likedSongs}></Card>
        );
      })}
    </Carousel>
  );
};

export default CardCarousel
