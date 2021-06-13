import React, { useRef } from "react";
import "tailwindcss/tailwind.css";
import "../components/styles/Contacts.css";
import { motion } from "framer-motion";

const Contacts = ({ data }) => {
  return (
    <React.Fragment>
      <div className="contacts">
        <div className="contact-header">
          <h1 className="contact-title">Online</h1>
        </div>
        <div className="contact-body">
          {data.map((user) => {
            return (
              <motion.div key={user}>
                <div className="divisor"></div>
                <a
                  href={`https://open.spotify.com/user/${user.id}`}
                  target="_blank"
                >
                  <motion.div
                    key={user.id}
                    className="item"
                    initial={{
                      scale: 0,
                    }}
                    animate={{
                      scale: 1,
                    }}
                    transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                    exit={{
                      opacity: 0,
                    }}
                  >
                    <div className="item-image-container">
                      <img className="profile-image" src={user.image} alt="" />
                    </div>
                    <div className="item-info">
                      <div className="item-name">{user.user}</div>
                      <div className="item-info-status">
                        {user.followers == 1 ? (
                          <p>1 follower </p>
                        ) : (
                          <p>{user.followers} followers</p>
                        )}
                      </div>
                    </div>
                    <div className="item-status">
                      <div className="status"></div>
                    </div>
                  </motion.div>
                </a>
              </motion.div>
            );
          })}
          <div className="divisor"></div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Contacts;
