import React, { useEffect, useState } from "react";
import CarouselRow from "./CarouselRow";
import { AnimatePresence } from "framer-motion";

const CardCarousel = (props) => {
  var genres = [];
  const splited_genres = [];

  const [sortType, setSortType] = useState(props.sortType);

  if (sortType != props.sortType) {
    setSortType(props.sortType);
  }

  const genreExist = (genre, arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].genre == genre) {
        return i;
      }
    }
    return "false";
  };

  //Classifies all the songs by genre in an array in the propertie of an object
  const instances = props.songList.reduce((arr = [], song) => {
    song.genre.split(" ").forEach((element) => {
      arr.push(element);

      const index = genreExist(element, splited_genres);

      //This does the same, but in the subgenres of each genre (If it has it)
      if (index != "false") {
        splited_genres[index].songList.push(song);
      } else {
        splited_genres.push({
          genre: element,
          songList: [song],
        });
      }
    });

    const index = genreExist(song.genre, genres);

    if (index != "false") {
      genres[index].songList.push(song);
    } else {
      genres.push({
        genre: song.genre,
        songList: [song],
      });
    }
    return arr;
  }, []);

  //genres = genres.sort((a, b) =>a.genre.localeCompare(b.genre, "en", { sensitivity: "base" }))

  return (
    <AnimatePresence>
      {genres
        .sort((a, b) => b.songList.length - a.songList.length)
        .map((genre) => {
          return (
            <CarouselRow
              key={genre}
              data={genre}
              likedSongs={props.likedSongs}
              user={props.user}
              update={(item) => {
                props.update(item);
              }}
              delete={(e) => {
                props.delete(e);
              }}
              addSong={async (songId, item) => {
                props.addSong(songId, item);
              }}
              deleteSong={async (songId, uri, pos, item) => {
                props.deleteSong(songId, uri, pos, item);
              }}
              sortType={sortType ? sortType : "song"}
            />
          );
        })}
    </AnimatePresence>
  );
};

export default CardCarousel;
