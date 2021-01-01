import React from "react";
import "tailwindcss/tailwind.css";
import '../components/styles/Card.css';
import Clairo from '../assets/img/img-sample.jpg';
import ReactStars from "react-rating-stars-component";

const firstExample = {
  size: 30,
  value: 2.5,
  edit: false
};

const navbar = () => {
  return (
    <React.Fragment>
      <div className="card-custom shadow-lg">
        <div className="card-header">
          <div className="image-container">
            <img alt="" src={Clairo} className="song-img"/>          
          </div>
        </div>
        <div className="card-body">
          <h5 class="song-name">Pretty Girl</h5>
          <h5 class="artist-name">Clairo</h5>
          {/*40 caracteres máximo*/}
          <p className="comment">¡Nice song!, love bedroom pop vibessssssssssssss</p>
        </div>
        <div className="card-footer">
          <ReactStars {...firstExample} class="stars-calification"/>
          <p className="autor">By: Jesús9</p>
        </div>

      </div>
    </React.Fragment>
  );
};

export default navbar;
