import React, { useState, useEffect, useRef } from "react";
import "tailwindcss/tailwind.css";
import ReactStars from "react-rating-stars-component";

import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card as CustomCard, GlobalStyles } from "./styles/Card.style.js";
import { useSelector } from "react-redux";

const Card = ({ data, page }) => {
  const userId = useSelector((state) => state.user.userId);

  const song_name = useRef(null);

  var rating = {
    size: 25,
    value: data.qualification,
    edit: false,
  };

  let calc;

  const card = React.useRef(null);
  const span = React.useRef(null);

  const handleMouseOver = () => {
    if (song_name.current) {
      if (!calc) {
        calc = song_name.current.scrollWidth - song_name.current.offsetWidth;
      }
      if (isElementOverflowing(song_name.current)) {
        if (calc > 50) {
          span.current.style.transition = `${(calc / 100) * 2}s`;
        }

        span.current.style.transform = `translateX(${calc * -1}px)`;
      }
    }
  };

  const handleMouseLeave = () => {
    span.current.style.transform = `translateX(${0}px)`;
  };

  function isElementOverflowing(element) {
    return element.offsetWidth < element.scrollWidth;
  }

  return (
    <>
      <GlobalStyles />
      <Link to={`/${page}/${data.id}`} id={data.id}>
        <CustomCard>
          <div className="card-content-container">
            <motion.div
              className="card-content"
              key={data.id}
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
              layoutId={`card-container-${data.id}`}
            >
              <div className="card-header" ref={card}>
                <motion.div
                  className="image-container"
                  layoutId={`card-image-container-${data.id}`}
                >
                  <img
                    alt=""
                    src={data.image}
                    className="song-img"
                    loading="lazy"
                    layoutId={`card-image-${data.image}`}
                  />
                </motion.div>
              </div>
              <div className="card-body">
                <div className="song-name" ref={song_name}>
                  <span ref={span}>{data.song}</span>
                </div>

                <h5 className="artist-name">{data.artist}</h5>
                <p className="comment">{data.review}</p>
              </div>
              <div className="card-footer">
                <ReactStars {...rating} className="stars-calification" />{" "}
                <p className="autor">By: {data.user}</p>
              </div>
            </motion.div>
          </div>
        </CustomCard>
      </Link>
    </>
  );
};

export default Card;
