import React, { useEffect, useRef, useState } from "react";
import "tailwindcss/tailwind.css";
import "../components/styles/Contacts.css";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

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
                  href={`https://open.spotify.com/user/${user.userId}`}
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
                    <AnimatePresence>
                      {user.activity?.isPlaying ? (
                        <motion.div
                          initial={{ x: 30, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{
                            x: 30,
                            opacity: 0,
                          }}
                          key="gif"
                          transition={{ type: "spring" }}
                          className="item-status"
                        >
                          <img src="https://i.kym-cdn.com/photos/images/original/001/879/958/fb1.gif" />
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{
                            scale: 0,
                            opacity: 0,
                          }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: "spring" }}
                          key="status"
                          className="item-status"
                        >
                          <div className="status"></div>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
