import React from "react";
import "tailwindcss/tailwind.css";
import "../components/styles/Contacts.css";
import ReactStars from "react-rating-stars-component";

const navbar = (props) => {
  const data = props.users;

  data.map((user) => {
    console.log("maped");
    console.log(user);
  });

  return (
    <React.Fragment>
      <div className="contacts">
        <div className="contact-header">
          <h1 className="contact-title">Contacts</h1>
        </div>
        <div className="contact-body">
          {data.map((user) => {
            return (
              <React.Fragment>
                <div className="divisor"></div>
                <div className="item">
                  <div className="item-info">
                    <div className="item-name">{user}</div>
                    <div className="item-info-status">Conectado</div>
                  </div>
                  <div className="item-status">
                    <div className="status"></div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
          <div className="divisor"></div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default navbar;
