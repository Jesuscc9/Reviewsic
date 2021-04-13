import React from "react";
import CarouselRow from './CarouselRow'

const CardCarousel = (props) => {

  const genres = []
  const splited_genres = []

  const genreExist = (genre, arr) =>{
    for(let i = 0; i<arr.length;i++){
      if(arr[i].genre == genre){
        return i
      }
    }
    return 'false'
  }

  //Classifies all the songs by genre in an array in the propertie of an object
  const instances = (props.songList).reduce((arr = [], song) => {
    ((song.genre).split(" ")).forEach(element => {
      arr.push(element)

      const index = genreExist(element, splited_genres)

      //This does the same, but in the subgenres of each genre (If it has it)
      if(index != 'false'){
        (splited_genres[index].songList).push(song)
      }else{
        splited_genres.push({
          genre: element,
          songList: [song]
        })
      }
    });

    const index = genreExist(song.genre, genres)

    if(index != 'false'){
      (genres[index].songList).push(song)
    }else{
      genres.push({
        genre: song.genre,
        songList: [song]
      })
    }
    return arr;
  }, [])

  console.log(genres)

  return (
    <React.Fragment>
      {genres.map((genre) => {
        return (
        <CarouselRow data={genre} likedSongs={props.likedSongs}/>
        )
      })}
    </React.Fragment>
  );
};


export default CardCarousel
