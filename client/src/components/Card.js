import React from "react";
import "tailwindcss/tailwind.css";
import '../components/styles/Card.css';
import ReactStars from "react-rating-stars-component";

const navbar = (data) => {

  const props = data.props;

  const stars = {
    size: 30,
    value: props.calification,
    edit: false,
    isHalf: true,
  }


  const images = require.context('../assets/img', true);
  let img = images('./' + props.image);

  return (
    <React.Fragment>
      <div className="card-custom shadow-lg">
        <div className="card-header">
          <div className="image-container">
            <img alt="" src={img.default} className="song-img"/>          
          </div>
        </div>
        <div className="card-body">
          <h5 className="song-name">{props.songName}</h5>
          <h5 className="artist-name">{props.singer}</h5>
          {/*40 caracteres máximo*/}
          <p className="comment">{props.songReview}</p>
        </div>
        <div className="card-footer">
          <ReactStars {...stars} className="stars-calification"/>
          <p className="autor">By: {props.author}</p>
        </div>

      </div>
    </React.Fragment>
  );
};

export default navbar;
