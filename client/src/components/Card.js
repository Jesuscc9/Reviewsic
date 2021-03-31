import React, { useState, useEffect, useRef } from "react"
import "tailwindcss/tailwind.css"
import "../components/styles/Card.css"
import ReactStars from "react-rating-stars-component"
import Cookies from "js-cookie"

import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Axios from "axios"

const Card = (props) => {
  const data = props.data;

  const song_name = useRef(null)

  const [liked, setLiked] = useState(false)
  const [pos, setPos] = useState(0)
  const [uri, setUri] = useState('')
  const [token, setToken] = useState('')

  useEffect(() => {
    setToken(Cookies.get('spotifyAuthToken'))
    let i = 0;
    // (data.likedSongs).forEach((e) => {
    //   i++
    //   if(e.track.name == props.song){
    //     console.log(e)
    //     setUri(e.track.uri)
    //     setLiked(true)
    //     setPos(i)
    //     handleHeartClick()
    //     return
    //   }
    // })
  }, [])

  var rating = {
    size: 20,
    value: data.qualification,
    edit: false,
  }
  
  let calc

  const card_options = React.useRef(null);
  const card = React.useRef(null);
  const heart = React.useRef(null)
  const span = React.useRef(null)

  const song_id = '23'


  const handleMouseOver = () => {
    card_options.current.classList.add("card-options-visible")

    if(song_name.current){
      if(!calc){
        calc = (song_name.current.scrollWidth - song_name.current.offsetWidth)
      }
      if(isElementOverflowing(song_name.current)){
  
        if(calc > 50){
          span.current.style.transition = `${(calc / 100) * 2}s`
        }
  
          span.current.style.transform = `translateX(${calc * -1}px)`
      }
    }
  }

  const handleMouseLeave = () => {
    card_options.current.classList.remove("card-options-visible")
    span.current.style.transform = `translateX(${0}px)`

  }

  const onLikeClick = async () => {
    // const config = {
    //   headers: {
    //     Authorization: "Bearer " + token,
    //   },
    // };

    // const songUri = `spotify:track:${song_id}`;

    // async function getAllSongs(url, items) {
    //   const songs = await Axios.get(url, config);

    //   songs.data.items.forEach((e) => {
    //     items.push(e);
    //   });

    //   if (songs.data.next === null) return items;

    //   return getAllSongs(songs.data.next, items);
    // }

    // const songs = await getAllSongs(
    //   `https://api.spotify.com/v1/playlists/${reviewsicId}/tracks`,
    //   []
    // );

    // setlikedSongs(songs);

    // if (!value) {
    //   toast("🎵 Song added to your playlist!", {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: true,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });

    //   const addSong = await Axios.post(
    //     `https://api.spotify.com/v1/playlists/${reviewsicId}/tracks`,
    //     {
    //       uris: [songUri],
    //     },
    //     config
    //   );
    // } else {
    //   const headers = {
    //     Authorization: "Bearer " + token,
    //   };

    //   const data = {
    //     tracks: [
    //       {
    //         uri: uri.length > 0 ? uri : songUri,
    //         positions: [pos - 1],
    //       },
    //     ],
    //   };

    //   let i = 0;
    //   songs.forEach((e) => {
    //     i++;
    //     if (e.track.id == song_id) {
    //       data.tracks[0].positions[0] = i - 1;
    //       return;
    //     }
    //   });

    //   const removeSong = await Axios.delete(
    //     `https://api.spotify.com/v1/playlists/${reviewsicId}/tracks`,
    //     { headers, data }
    //   );
    // }
  }

  const handleHeartClick = () => {
    if(!heart.current.classList.contains('clicked_heart')){
      heart.current.classList.add('is_animating')
      heart.current.addEventListener('animationend', () => {
        heart.current.classList.remove('is_animating')
        heart.current.classList.add('clicked_heart')
      })
    }else{
      heart.current.classList.remove('clicked_heart')
      handleMouseLeave()
    }
  }

  function isElementOverflowing(element) {
    return element.offsetWidth < element.scrollWidth
  }

  return (
    <React.Fragment>
      <div className="card-custom" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
        <div className="card-header" ref={card}>
          <div className="image-container">
            <a  href={data.spotifyUrl} target="_blank">
            <img alt="" src={data.image} className="song-img"/>

            </a>
          </div>
        </div>
        <div className="card-body">

          <div className="song-name" ref={song_name}><span ref={span}>{data.song}</span></div>

          <h5 className="artist-name">{data.artist}</h5>
          <p className="comment">{data.review}</p>
        </div>
        <div className="card-footer">
          <ReactStars {...rating} className="stars-calification" />{" "}
          <p className="autor">By: {data.author}</p>
          <div className="card-options" ref={card_options}>
            {data.author_id === props.user ? 
                (
                  <React.Fragment>
                    <div className="edit-option option-container" onClick={() => { 
                        props.update()
                      }}>
                      <FontAwesomeIcon
                        icon={faPen}
                        className="faPen"
                      />
                    </div>
                    <div className="edit-option option-container" onClick={(e) => {
                        props.delete({id: data.id});
                      }}>
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="faTrash"
                      />
                    </div>
                  </React.Fragment>
                ) : (
                  <React.Fragment></React.Fragment>
                )
              }
            <div className="edit-option option-container">
              <button href={props.spotifyUrl} target="_blank">
                {/* <FontAwesomeIcon icon={faHeart} className="faHeart" /> */}
              </button>
                <div className="heart" ref={heart} onClick={() => {
                  handleHeartClick()
                  //data.onLikeClick(song_id, liked, pos, uri)
                  setLiked(!liked)
                }}></div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Card;
