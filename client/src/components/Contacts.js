import React, { useEffect, useRef, useState } from "react";
import "tailwindcss/tailwind.css";
import "../components/styles/Contacts.css";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

const Contacts = ({ data }) => {
  const gifs = [
    "",
    "https://cdn.betterttv.net/emote/5ffa90b557784508462544e7/2x",
    "https://cdn.betterttv.net/emote/602e1e25ee839b1e5ec6e00b/2x",
    "https://cdn.betterttv.net/emote/60b11c96f8b3f62601c34a70/2x",
    "https://cdn.betterttv.net/emote/5f25a22265fe924464ef0799/2x",
    "https://cdn.betterttv.net/emote/60ac1dc867644f1d67e8c5f3/2x",
    "https://cdn.betterttv.net/emote/5ffa90b557784508462544e7/2x",
  ];

  console.log(data);

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
                      opacity: 0,
                      scale: 0,
                    }}
                    animate={{
                      scale: 1,
                      opacity: 1,
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
                          transition={{ type: "spring", duration: 0.4 }}
                          className="item-status"
                        >
                          <img src={gifs[user.activity.gifIndex]} />
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{
                            opacity: 0,
                            scale: 0,
                          }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          transition={{ type: "spring", duration: 0.4 }}
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
