import React from "react";
import Carousel from "react-elastic-carousel";
import Card from './Card'

const CarouselRow = (props) => {

  console.log(props)
  return (
    <Carousel itemsToShow={2} focusOnSelect={true} renderPagination={({ pages, activePage, onClick }) => {
      return (<div/>)
    }} renderArrow={() => {
      return <div/>
    }}
      outerSpacing={0}
    >
      {(props.data.songList).map(song => {
        return (
          <Card data={song} likedSongs={props.likedSongs}></Card>
        );
      })}
    </Carousel>
  );
};

export default CarouselRow
