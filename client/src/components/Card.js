import React, { useState, useEffect, useRef } from "react"
import "tailwindcss/tailwind.css"
import "../components/styles/Card.css"
import ReactStars from "react-rating-stars-component"

import { faSpotify } from "@fortawesome/fontawesome-free-brands"
import { faPen, faTrash, faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Axios from "axios"

const Card = (data) => {
  const props = data.props;

  const song_name = useRef(null)

  const [liked, setLiked] = useState(false)

  useEffect(() => {
    (data.likedSongs).forEach((e) => {
      if(e.track.name == props.songName){
        setLiked(true)
        console.log('Son iguales')
        handleHeartClick()
        return
      }
    })
  }, [])

  var rating = {
    size: 20,
    value: props.calification,
    edit: false,
  }
  
  let calc

  const card_options = React.useRef(null);
  const card = React.useRef(null);
  const heart = React.useRef(null)
  const span = React.useRef(null)

  const song_id = (props.spotifyUrl).slice(31, 53)


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
            <a  href={props.spotifyUrl} target="_blank">
            <img alt="" src={props.image} className="song-img"/>

            </a>
          </div>
        </div>
        <div className="card-body">

          <div className="song-name" ref={song_name}><span ref={span}>{props.songName}</span></div>

          <h5 className="artist-name">{props.artist}</h5>
          <p className="comment">{props.songReview}</p>
        </div>
        <div className="card-footer">
          <ReactStars {...rating} className="stars-calification" />{" "}
          <p className="autor">By: {props.author}</p>
          <div className="card-options" ref={card_options}>
            {props.author_id === data.user ? 
                (
                  <React.Fragment>
                    <div className="edit-option option-container" onClick={() => { 
                        data.update();
                      }}>
                      <FontAwesomeIcon
                        icon={faPen}
                        className="faPen"
                      />
                    </div>
                    <div className="edit-option option-container" onClick={(e) => {
                        data.delete({ id: props.id, image: props.image });
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
                  data.onLikeClick(props.songName, song_id)
                }}></div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Card;
