import React, { useRef } from "react";
import "tailwindcss/tailwind.css";
import "../components/styles/Contacts.css";

const Contacts = (props) => {
  const data = props.users;

  return (
    <React.Fragment>
      <div className="contacts">
        <div className="contact-header">
          <h1 className="contact-title">Users</h1>
        </div>
        <div className="contact-body" >
          {data.map((user) => {
            return (
              <React.Fragment key={user}>
                <div className="divisor"></div>
                <div className="item">
                  <div className="item-image-container">
                    <img className="profile-image" src={user.image} alt=""/>
                  </div>
                  <div className="item-info">
                    <div className="item-name">{user.nickname}</div>
                    <div className="item-info-status">
                      {user.followers == 1 ? <p>1 follower </p> : <p>{user.followers} followers</p>}
                    </div>
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

export default Contacts;
